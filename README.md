<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Professional portfolio of MD MIAD - AI Specialist, ML Researcher, and Full-stack Developer">
    <meta name="keywords" content="portfolio, AI specialist, developer, Python, React, Node.js">
    <meta name="author" content="MD MIAD">
    <meta name="theme-color" content="#0a0a0a">
    
    <title>MD MIAD - AI Specialist & Developer Portfolio</title>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --bg-primary: #0a0a0a;
            --bg-secondary: #1a1a1a;
            --accent-green: #00ff00;
            --accent-dim: #00cc00;
            --text-primary: #e0e0e0;
            --text-secondary: #808080;
            --border-color: #333333;
        }

        html, body {
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Fira Code', 'Monaco', 'Courier New', monospace;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            background-image: 
                linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, 0.05) 25%, rgba(0, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.05) 75%, rgba(0, 255, 0, 0.05) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, 0.05) 25%, rgba(0, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.05) 75%, rgba(0, 255, 0, 0.05) 76%, transparent 77%, transparent);
            background-size: 50px 50px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header & Navigation */
        header {
            border-bottom: 2px solid var(--border-color);
            padding-bottom: 30px;
            margin-bottom: 40px;
            animation: slideIn 0.6s ease-out;
        }

        .header-content {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .title-section h1 {
            font-size: 2.5rem;
            color: var(--accent-green);
            text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
            margin-bottom: 5px;
            word-break: break-word;
        }

        .title-section .subtitle {
            font-size: 1.1rem;
            color: var(--accent-dim);
        }

        .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            padding-top: 15px;
            border-top: 1px solid var(--border-color);
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            word-break: break-word;
        }

        .contact-item::before {
            content: "→";
            color: var(--accent-green);
            font-weight: bold;
        }

        .contact-link {
            color: var(--accent-green);
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .contact-link:hover {
            text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }

        /* Main Content */
        .content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;
        }

        section {
            animation: slideIn 0.6s ease-out;
        }

        section:nth-child(1) { animation-delay: 0.1s; }
        section:nth-child(2) { animation-delay: 0.2s; }
        section:nth-child(3) { animation-delay: 0.3s; }
        section:nth-child(4) { animation-delay: 0.4s; }
        section:nth-child(5) { animation-delay: 0.5s; }
        section:nth-child(6) { animation-delay: 0.6s; }

        .section-title {
            font-size: 1.4rem;
            color: var(--accent-green);
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--accent-green);
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        /* About Section */
        .about-content {
            background-color: var(--bg-secondary);
            padding: 20px;
            border-left: 3px solid var(--accent-green);
            line-height: 1.8;
            border-radius: 4px;
        }

        /* Education */
        .education-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }

        .education-item {
            background-color: var(--bg-secondary);
            padding: 20px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            transition: all 0.3s ease;
        }

        .education-item:hover {
            border-color: var(--accent-green);
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.2);
        }

        .education-item .degree {
            color: var(--accent-green);
            font-weight: 600;
            margin-bottom: 5px;
        }

        .education-item .institution {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: 8px;
        }

        .education-item .details {
            font-size: 0.85rem;
            color: var(--text-secondary);
        }

        /* Experience */
        .experience-item {
            background-color: var(--bg-secondary);
            padding: 20px;
            border-left: 3px solid var(--accent-green);
            margin-bottom: 20px;
            border-radius: 4px;
            transition: all 0.3s ease;
        }

        .experience-item:hover {
            transform: translateX(5px);
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.1);
        }

        .experience-item .title {
            color: var(--accent-green);
            font-weight: 600;
            margin-bottom: 5px;
        }

        .experience-item .company {
            color: var(--accent-dim);
            font-size: 0.9rem;
            margin-bottom: 5px;
        }

        .experience-item .period {
            color: var(--text-secondary);
            font-size: 0.85rem;
            margin-bottom: 10px;
        }

        .experience-item ul {
            list-style: none;
            padding-left: 0;
        }

        .experience-item li {
            padding-left: 20px;
            margin-bottom: 8px;
            position: relative;
            font-size: 0.95rem;
        }

        .experience-item li::before {
            content: "◆";
            position: absolute;
            left: 0;
            color: var(--accent-green);
        }

        /* Skills */
        .skills-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
        }

        .skill-category {
            background-color: var(--bg-secondary);
            padding: 20px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
        }

        .skill-category .category-title {
            color: var(--accent-green);
            font-weight: 600;
            margin-bottom: 15px;
            font-size: 1.05rem;
        }

        .skill-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .skill-tag {
            background-color: var(--bg-primary);
            border: 1px solid var(--accent-green);
            color: var(--accent-green);
            padding: 8px 12px;
            border-radius: 3px;
            font-size: 0.85rem;
            transition: all 0.3s ease;
            cursor: default;
        }

        .skill-tag:hover {
            background-color: var(--accent-green);
            color: var(--bg-primary);
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }

        /* Languages */
        .language-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }

        .language-item {
            background-color: var(--bg-secondary);
            padding: 15px;
            border-left: 3px solid var(--accent-green);
            border-radius: 4px;
        }

        .language-item .lang-name {
            color: var(--accent-green);
            font-weight: 600;
            margin-bottom: 5px;
        }

        /* Extra Curricular */
        .extracurricular-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }

        .extra-item {
            background-color: var(--bg-secondary);
            padding: 15px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            transition: all 0.3s ease;
        }

        .extra-item:hover {
            border-color: var(--accent-green);
            background-color: rgba(0, 255, 0, 0.05);
        }

        .extra-item .extra-title {
            color: var(--accent-green);
            font-weight: 600;
            margin-bottom: 8px;
        }

        .extra-item p {
            font-size: 0.9rem;
            color: var(--text-secondary);
            line-height: 1.5;
        }

        /* Interests */
        .interests-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 12px;
        }

        .interest-item {
            background-color: var(--bg-secondary);
            padding: 15px;
            text-align: center;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            transition: all 0.3s ease;
        }

        .interest-item:hover {
            border-color: var(--accent-green);
            transform: scale(1.05);
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
        }


        /* Footer */
        footer {
            border-top: 2px solid var(--border-color);
            padding-top: 30px;
            margin-top: 60px;
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        /* Animations */
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }

            .title-section h1 {
                font-size: 1.8rem;
            }

            .section-title {
                font-size: 1.2rem;
                letter-spacing: 1px;
            }

            .contact-info {
                grid-template-columns: 1fr;
                gap: 10px;
            }

            .contact-item {
                font-size: 0.85rem;
            }

            .education-grid,
            .skills-container,
            .extracurricular-list,
            .interests-grid {
                grid-template-columns: 1fr;
            }

            .experience-item {
                padding: 15px;
            }

            .skill-list {
                gap: 8px;
            }

            .skill-tag {
                padding: 6px 10px;
                font-size: 0.8rem;
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 12px;
            }

            .title-section h1 {
                font-size: 1.5rem;
            }

            .title-section .subtitle {
                font-size: 0.95rem;
            }

            .section-title {
                font-size: 1.1rem;
                letter-spacing: 0.5px;
            }

            header {
                padding-bottom: 20px;
                margin-bottom: 25px;
            }

            .content {
                gap: 30px;
            }

            .about-content,
            .education-item,
            .experience-item,
            .skill-category,
            .language-item,
            .extra-item,
            .interest-item,
            .reference-card {
                padding: 12px;
            }

            .experience-item li {
                font-size: 0.9rem;
                padding-left: 15px;
            }

            body {
                background-size: 30px 30px;
            }
        }

        /* Print Styles */
        @media print {
            body {
                background: white;
                color: black;
            }

            .container {
                max-width: 100%;
            }

            section {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header>
            <div class="header-content">
                <div class="title-section">
                    <h1>> MD MIAD</h1>
                    <p class="subtitle">AI Specialist | ML Researcher | Full-Stack Developer</p>
                </div>
                <div class="contact-info">
                    <div class="contact-item">
                        <span>📍 Changaun, Ashulia, Savar, Dhaka</span>
                    </div>
                    <div class="contact-item">
                        <span>📱 <a href="tel:+8801608229699" class="contact-link">+88 01608229699</a></span>
                    </div>
                    <div class="contact-item">
                        <span>📧 <a href="mailto:miadninezero@gmail.com" class="contact-link">miadninezero@gmail.com</a></span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="content">
            <!-- About Section -->
            <section id="about">
                <h2 class="section-title">About Me</h2>
                <div class="about-content">
                    <p>I am a creative and self-motivated student with a strong focus on AI and technology. I have practical experience working with AI agent workflows, Large Language Models (LLMs), and adaptive systems. Driven by a 'learning-by-doing' approach, I am eager to apply my technical skills to real-world projects.</p>
                </div>
            </section>

            <!-- Education Section -->
            <section id="education">
                <h2 class="section-title">Education</h2>
                <div class="education-grid">
                    <div class="education-item">
                        <div class="degree">B.Sc. Computer Science & Engineering</div>
                        <div class="institution">Daffodil International University</div>
                        <div class="details">Expected: 2026</div>
                    </div>
                    <div class="education-item">
                        <div class="degree">HSC (Higher Secondary)</div>
                        <div class="institution">Agricultural University College</div>
                        <div class="details">Batch-25 | GPA: 4.83</div>
                    </div>
                    <div class="education-item">
                        <div class="degree">SSC (Secondary)</div>
                        <div class="institution">Chandipahsa Govt High School</div>
                        <div class="details">Batch-23 | GPA: 5.00</div>
                    </div>
                </div>
            </section>

            <!-- Experience Section -->
            <section id="experience">
                <h2 class="section-title">Working Experience</h2>
                
                <div class="experience-item">
                    <div class="title">AI Model Trainer & Researcher</div>
                    <div class="company">Hugging Face / Independent</div>
                    <div class="period">2024 - Present</div>
                    <ul>
                        <li>Trained and fine-tuned custom Large Language Models (LLMs) on specific datasets to improve output accuracy</li>
                        <li>Deployed functional AI models to Hugging Face and conducted rigorous testing of various open-source AI tools</li>
                        <li>Developed specialized models for specific use cases and documented performance metrics</li>
                    </ul>
                </div>

                <div class="experience-item">
                    <div class="title">AI Workflow & Automation Specialist</div>
                    <div class="company">Self-Employed</div>
                    <div class="period">2023 - Present</div>
                    <ul>
                        <li>Designed advanced automation pipelines using n8n and ComfyUI to integrate generative AI into real-world applications</li>
                        <li>Managed GitHub repositories to version-control custom Python scripts and share workflow configurations</li>
                        <li>Created end-to-end automation solutions for clients, improving efficiency and reducing manual workload</li>
                    </ul>
                </div>
            </section>

            <!-- Skills Section -->
            <section id="skills">
                <h2 class="section-title">Skills</h2>
                <div class="skills-container">
                    <div class="skill-category">
                        <div class="category-title">Hard Skills</div>
                        <div class="skill-list">
                            <span class="skill-tag">Python Programming</span>
                            <span class="skill-tag">Prompt Engineering</span>
                            <span class="skill-tag">Generative AI</span>
                            <span class="skill-tag">AI Workflows</span>
                            <span class="skill-tag">LLM Fine-tuning</span>
                            <span class="skill-tag">n8n</span>
                            <span class="skill-tag">ComfyUI</span>
                            <span class="skill-tag">Illustration</span>
                            <span class="skill-tag">UI/UX Design</span>
                        </div>
                    </div>
                    <div class="skill-category">
                        <div class="category-title">Soft Skills</div>
                        <div class="skill-list">
                            <span class="skill-tag">Communication</span>
                            <span class="skill-tag">Problem Solving</span>
                            <span class="skill-tag">Adaptability</span>
                            <span class="skill-tag">Continuous Learning</span>
                            <span class="skill-tag">Team Collaboration</span>
                            <span class="skill-tag">Project Management</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Languages Section -->
            <section id="languages">
                <h2 class="section-title">Languages</h2>
                <div class="language-grid">
                    <div class="language-item">
                        <div class="lang-name">English</div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">Fluent</div>
                    </div>
                    <div class="language-item">
                        <div class="lang-name">Bangla</div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">Native</div>
                    </div>
                </div>
            </section>

            <!-- Extra-Curricular Section -->
            <section id="extracurricular">
                <h2 class="section-title">Extra-Curricular Activities</h2>
                <div class="extracurricular-list">
                    <div class="extra-item">
                        <div class="extra-title">Science Club Member</div>
                        <p>Collaborated with peers on technology-focused projects and participated in science fairs to showcase innovative ideas.</p>
                    </div>
                    <div class="extra-item">
                        <div class="extra-title">Sports Club Member</div>
                        <p>Actively participated in team sports, fostering discipline, leadership, and strong teamwork skills.</p>
                    </div>
                    <div class="extra-item">
                        <div class="extra-title">Open Source Contributor</div>
                        <p>Maintained an active portfolio of code repositories on GitHub, testing new AI tools and contributing to community discussions.</p>
                    </div>
                </div>
            </section>

            <!-- Interests Section -->
            <section id="interests">
                <h2 class="section-title">Interests</h2>
                <div class="interests-grid">
                    <div class="interest-item">🤖 AI Research</div>
                    <div class="interest-item">🎨 Digital Art</div>
                    <div class="interest-item">📸 Photography</div>
                    <div class="interest-item">🏸 Badminton</div>
                    <div class="interest-item">✈️ Travelling</div>
                </div>
            </section>

        </main>

        <!-- Footer -->
        <footer>
            <p>© 2026 MD MIAD. Built with passion for technology and AI.</p>
            <p style="margin-top: 10px; font-size: 0.8rem;">terminal-style portfolio | Last updated: January 2026</p>
        </footer>
    </div>
</body>
</html>
