<!DOCTYPE html>
<html lang="en" class="dark">
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
    </style>
</head>
<body class="bg-terminal-bg text-terminal-green font-mono h-screen overflow-hidden flex flex-col">
    <div id="vanta-globe" class="absolute inset-0 pointer-events-none opacity-20"></div>
    
    <div class="relative z-10 container mx-auto px-4 py-8 flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6 border-b border-terminal-line pb-4">
            <div class="flex items-center space-x-3">
                <i data-feather="terminal" class="text-terminal-green"></i>
                <h1 class="text-xl terminal-text">root@dev-terminal:~</h1>
            </div>
            <div class="flex space-x-4">
                <button class="hover:text-white transition-colors">
                    <i data-feather="minimize"></i>
                </button>
                <button class="hover:text-white transition-colors">
                    <i data-feather="maximize"></i>
                </button>
                <button class="hover:text-red-500 transition-colors">
                    <i data-feather="x"></i>
                </button>
            </div>
        </div>

        <!-- Terminal Body -->
        <div class="flex-grow overflow-y-auto mb-4 space-y-4 terminal-scroll">
            <div class="flex items-start">
                <span class="text-terminal-green mr-2">$</span>
                <p class="terminal-text">Welcome to the interactive terminal UI. Type 'help' to see available commands.</p>
            </div>

            <div id="command-history" class="space-y-4"></div>

            <div class="flex items-start">
                <span class="text-terminal-green mr-2">$</span>
                <div class="flex-1 flex items-center">
                    <input type="text" id="terminal-input" 
                           class="terminal-input bg-transparent flex-1 caret-terminal-green text-terminal-green" 
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
        <div class="flex items-center justify-between text-sm text-gray-500 border-t border-terminal-line pt-3">
            <div class="flex items-center space-x-2">
                <i data-feather="cpu" class="w-4 h-4"></i>
                <span>System: Online</span>
            </div>
            <div class="flex items-center space-x-4">
                <span class="flex items-center">
                    <i data-feather="wifi" class="w-4 h-4 mr-1"></i>
                    <span>100%</span>
                </span>
                <span class="flex items-center">
                    <i data-feather="battery" class="w-4 h-4 mr-1"></i>
                    <span>87%</span>
                </span>
                <span id="current-time"></span>
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
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00ff00,
            backgroundColor: 0x0a0a0a,
            size: 0.7
        });

        // Terminal functionality
        const commands = {
            help: {
                response: `<div class="space-y-2">
                    <p>Available commands:</p>
                    <p class="ml-4">- <span class="text-white">about</span>: Shows information about this project</p>
                    <p class="ml-4">- <span class="text-white">contact</span>: Displays contact information</p>
                    <p class="ml-4">- <span class="text-white">skills</span>: Lists technical skills</p>
                    <p class="ml-4">- <span class="text-white">projects</span>: Shows recent projects</p>
                    <p class="ml-4">- <span class="text-white">clear</span>: Clears the terminal</p>
                    <p class="ml-4">- <span class="text-white">theme</span>: Toggles between light/dark mode</p>
                </div>`
            },
            about: {
                response: `<div class="space-y-2">
                    <p>Terminal UI Portfolio v1.0</p>
                    <p>A unique developer portfolio that mimics a terminal interface for a sleek, tech-inspired look.</p>
                    <p>Built using HTML, CSS, JavaScript, and TailwindCSS.</p>
                </div>`
            },
            contact: {
                response: `<div class="space-y-2">
                    <p>You can reach me at:</p>
                    <p class="ml-4">- Email: <span class="text-white">miadninezeo@gmail.com</span></p>
                    <p class="ml-4">- Phone: <span class="text-white">+8801608229699</span></p>
                </div>`
            },
            skills: {
                response: `<div class="space-y-2">
                    <p>Technical Skills:</p>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        <span class="bg-terminal-line px-3 py-1 rounded glow-effect hover:bg-gray-800 transition">JavaScript</span>
                        <span class="bg-terminal-line px-3 py-1 rounded glow-effect hover:bg-gray-800 transition">HTML/CSS</span>
                        <span class="bg-terminal-line px-3 py-1 rounded glow-effect hover:bg-gray-800 transition">React</span>
                        <span class="bg-terminal-line px-3 py-1 rounded glow-effect hover:bg-gray-800 transition">Node.js</span>
                        <span class="bg-terminal-line px-3 py-1 rounded glow-effect hover:bg-gray-800 transition">Python</span>
                        <span class="bg-terminal-line px-3 py-1 rounded glow-effect hover:bg-gray-800 transition">SQL</span>
                    </div>
                </div>`
            },
            projects: {
                response: `<div class="space-y-3">
                    <div class="border border-terminal-line p-3 rounded glow-effect hover:border-terminal-green transition">
                        <p class="text-white">Terminal UI Portfolio</p>
                        <p class="text-sm mt-1">An interactive terminal-style portfolio website</p>
                        <p class="text-xs mt-2 text-gray-500">HTML, CSS, JavaScript</p>
                    </div>
                </div>`
            },
            theme: {
                response: `<p>Toggling theme...</p>`,
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
                        responseElement.innerHTML = `<p class="text-red-500">Command not found: ${command}. Type 'help' for available commands.</p>`;
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
