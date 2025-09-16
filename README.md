<!DOCTYPE html>
<html lang="en" class="dark h-screen min-h-screen">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terminal UI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
    <script src="https://unpkg.com/feather-icons"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        'mono': ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        'terminal-green': '#00ff00',
                        'terminal-bg': '#0a0a0a',
                        'terminal-line': '#1e1e1e',
                    },
                    animation: {
                        'cursor-blink': 'cursor-blink 1s infinite',
                    },
                    keyframes: {
                        'cursor-blink': {
                            '0%, 100%': { opacity: '1' },
                            '50%': { opacity: '0' },
                        }
                    }
                }
            }
        }
    </script>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap');
        .terminal-text {
            text-shadow: 0 0 5px rgba(0, 255, 0, 0.7);
        }
        .terminal-input:focus {
            outline: none;
        }
        .command-response {
            height: 0;
            overflow: hidden;
            transition: height 0.3s ease;
        }
        .command-response.show {
            height: auto;
        }
        .glow-effect {
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }
        /* Mobile touch improvements */
        @media (max-width: 640px) {
            .terminal-scroll {
                -webkit-overflow-scrolling: touch;
                scroll-behavior: smooth;
                padding-bottom: 80px; /* Extra padding for keyboard */
                -webkit-tap-highlight-color: transparent; /* Remove tap highlight */
            }
            .glow-effect {
                box-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
            }
            .command-response p {
                line-height: 1.6;
                margin-bottom: 0.75rem;
                font-size: 14px;
            }
            .terminal-input {
                font-size: 16px !important; /* Prevent zoom on iOS */
                padding: 8px 0;
            }
            #cursor {
                height: 20px;
            }
            button {
                min-width: 44px; /* Larger touch target */
                min-height: 44px; /* Larger touch target */
                display: flex;
                align-items: center;
                justify-content: center;
                -webkit-tap-highlight-color: transparent;
            }
            .grid {
                gap: 0.75rem; /* Larger gaps for touch targets */
            }
        }
        /* Improve command response spacing */
        .command-response {
            padding: 0.5rem 0;
        }
        .command-response p {
            margin-bottom: 0.25rem;
        }
    </style>
</head>
<body class="bg-terminal-bg text-terminal-green font-mono h-screen min-h-screen w-screen overflow-hidden flex flex-col">
    <div id="vanta-globe" class="fixed inset-0 pointer-events-none opacity-20"></div>
    
    <div class="relative z-10 w-full h-full px-3 sm:px-4 py-3 sm:py-8 flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between mb-3 sm:mb-6 border-b border-terminal-line pb-2 sm:pb-4">
            <div class="flex items-center space-x-2 sm:space-x-3">
                <i data-feather="terminal" class="text-terminal-green w-5"></i>
                <h1 class="text-base sm:text-xl terminal-text truncate">root@dev-terminal:~</h1>
            </div>
            <div class="flex space-x-3 sm:space-x-4">
                <button class="hover:text-white transition-colors p-2">
                    <i data-feather="minimize" class="w-4 sm:w-5"></i>
                </button>
                <button class="hover:text-white transition-colors p-2">
                    <i data-feather="maximize" class="w-4 sm:w-5"></i>
                </button>
                <button class="hover:text-red-500 transition-colors p-2">
                    <i data-feather="x" class="w-4 sm:w-5"></i>
                </button>
            </div>
        </div>

        <!-- Terminal Body -->
        <div class="flex-grow overflow-y-auto mb-4 space-y-4 terminal-scroll">
            <div class="flex items-start px-1">
                <span class="text-terminal-green mr-2">$</span>
                <p class="terminal-text text-sm sm:text-base">Welcome to the interactive terminal UI. Type 'help' to see available commands.</p>
            </div>

            <div id="command-history" class="space-y-4"></div>

            <div class="flex items-start">
                <span class="text-terminal-green mr-2">$</span>
                <div class="flex-1 flex items-center">
                    <input type="text" id="terminal-input" 
                           class="terminal-input bg-transparent flex-1 caret-terminal-green text-terminal-green text-sm sm:text-base w-full" 
                           autocomplete="off" 
                           autocorrect="off"
                           autocapitalize="off"
                           spellcheck="false"
                           placeholder="Type a command...">
                    <span id="cursor" class="ml-1 bg-terminal-green w-3 h-6 inline-block animate-cursor-blink"></span>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-gray-500 border-t border-terminal-line pt-2 sm:pt-3 space-y-2 sm:space-y-0 pb-safe">
            <div class="flex items-center space-x-2">
                <i data-feather="cpu" class="w-3 sm:w-4 h-3 sm:h-4"></i>
                <span>System: Online</span>
            </div>
            <div class="flex items-center space-x-3 sm:space-x-4">
                <span class="flex items-center">
                    <i data-feather="wifi" class="w-3 sm:w-4 h-3 sm:h-4 mr-1"></i>
                    <span class="hidden sm:inline">100%</span>
                    <span class="sm:hidden">WiFi</span>
                </span>
                <span class="flex items-center">
                    <i data-feather="battery" class="w-3 sm:w-4 h-3 sm:h-4 mr-1"></i>
                    <span>87%</span>
                </span>
                <span id="current-time" class="text-xs sm:text-sm"></span>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"></script>
    <script>
        feather.replace();
        
        // Vanta.js background
        VANTA.GLOBE({
            el: "#vanta-globe",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: window.innerHeight,
            minWidth: window.innerWidth,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00ff00,
            backgroundColor: 0x0a0a0a,
            size: 1.0
        });

        // Update Vanta.js size on window resize
        window.addEventListener('resize', () => {
            if (window.VANTA) {
                window.VANTA.resize();
            }
        });

        // Terminal functionality
        const commands = {
            help: {
                response: `<div class="space-y-2 px-1">
                    <p class="text-sm sm:text-base">Available commands:</p>
                    <p class="ml-3 sm:ml-4 text-sm sm:text-base">- <span class="text-white">about</span>: Shows information about this project</p>
                    <p class="ml-3 sm:ml-4 text-sm sm:text-base">- <span class="text-white">contact</span>: Displays contact information</p>
                    <p class="ml-3 sm:ml-4 text-sm sm:text-base">- <span class="text-white">skills</span>: Lists technical skills</p>
                    <p class="ml-3 sm:ml-4 text-sm sm:text-base">- <span class="text-white">projects</span>: Shows recent projects</p>
                    <p class="ml-3 sm:ml-4 text-sm sm:text-base">- <span class="text-white">clear</span>: Clears the terminal</p>
                    <p class="ml-3 sm:ml-4 text-sm sm:text-base">- <span class="text-white">theme</span>: Toggles between light/dark mode</p>
                </div>`
            },
            about: {
                response: `<div class="space-y-2 px-1">
                    <p class="text-sm sm:text-base">Terminal UI Portfolio v1.0</p>
                    <p class="text-sm sm:text-base">A unique developer portfolio that mimics a terminal interface for a sleek, tech-inspired look.</p>
                    <p class="text-sm sm:text-base">Built using HTML, CSS, JavaScript, and TailwindCSS.</p>
                </div>`
            },
            contact: {
                response: `<div class="space-y-2 px-1">
                    <p class="text-sm sm:text-base">You can reach me at:</p>
                    <p class="ml-3 sm:ml-4 text-sm sm:text-base">- Email: <span class="text-white">miadninezeo@gmail.com</span></p>
                    <p class="ml-3 sm:ml-4 text-sm sm:text-base">- Phone: <span class="text-white">+8801608229699</span></p>
                </div>`
            },
            skills: {
                response: `<div class="space-y-2 px-1">
                    <p class="text-sm sm:text-base">Technical Skills:</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        <span class="bg-terminal-line px-3 py-2 sm:py-1 rounded glow-effect hover:bg-gray-800 transition text-center">JavaScript</span>
                        <span class="bg-terminal-line px-3 py-2 sm:py-1 rounded glow-effect hover:bg-gray-800 transition text-center">HTML/CSS</span>
                        <span class="bg-terminal-line px-3 py-2 sm:py-1 rounded glow-effect hover:bg-gray-800 transition text-center">React</span>
                        <span class="bg-terminal-line px-3 py-2 sm:py-1 rounded glow-effect hover:bg-gray-800 transition text-center">Node.js</span>
                        <span class="bg-terminal-line px-3 py-2 sm:py-1 rounded glow-effect hover:bg-gray-800 transition text-center">Python</span>
                        <span class="bg-terminal-line px-3 py-2 sm:py-1 rounded glow-effect hover:bg-gray-800 transition text-center">SQL</span>
                    </div>
                </div>`
            },
            projects: {
                response: `<div class="space-y-3 px-1">
                    <div class="border border-terminal-line p-4 sm:p-3 rounded glow-effect hover:border-terminal-green transition active:bg-gray-900">
                        <p class="text-white text-sm sm:text-base">Terminal UI Portfolio</p>
                        <p class="text-xs sm:text-sm mt-1">An interactive terminal-style portfolio website</p>
                        <p class="text-xs mt-2 text-gray-500">HTML, CSS, JavaScript</p>
                    </div>
                </div>`
            },
            theme: {
                response: `<p class="px-1 text-sm sm:text-base">Toggling theme...</p>`,
                execute: () => {
                    document.documentElement.classList.toggle('dark');
                }
            }
        };

        const terminalInput = document.getElementById('terminal-input');
        const commandHistory = document.getElementById('command-history');
        
        function updateTime() {
            const now = new Date();
            document.getElementById('current-time').textContent = now.toLocaleTimeString();
        }
        
        setInterval(updateTime, 1000);
        updateTime();

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';
                
                // Add command to history
                const commandElement = document.createElement('div');
                commandElement.className = 'flex items-start';
                commandElement.innerHTML = `
                    <span class="text-terminal-green mr-2">$</span>
                    <p class="terminal-text">${command}</p>
                `;
                commandHistory.appendChild(commandElement);
                
                // Process command
                setTimeout(() => {
                    const responseElement = document.createElement('div');
                    responseElement.className = 'command-response';
                    
                    if (command === 'clear') {
                        commandHistory.innerHTML = '';
                        return;
                    }
                    
                    if (commands[command]) {
                        responseElement.innerHTML = commands[command].response;
                        if (commands[command].execute) {
                            commands[command].execute();
                        }
                    } else {
                        responseElement.innerHTML = `<p class="text-red-500 px-1 text-sm sm:text-base">Command not found: ${command}. Type 'help' for available commands.</p>`;
                    }
                    
                    commandHistory.appendChild(responseElement);
                    setTimeout(() => {
                        responseElement.classList.add('show');
                    }, 10);
                    
                    // Scroll to bottom
                    document.querySelector('.terminal-scroll').scrollTop = document.querySelector('.terminal-scroll').scrollHeight;
                }, 100);
            }
        });

        // Focus input on page load and clicks
        terminalInput.focus();
        document.addEventListener('click', () => {
            terminalInput.focus();
        });
    </script>
</body>
</html>
