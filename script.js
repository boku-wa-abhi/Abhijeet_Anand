// Terminal Portfolio JavaScript

class TerminalPortfolio {
    constructor() {
        this.commandInput = document.getElementById('commandInput');
        this.output = document.getElementById('output');
        this.landingOverlay = document.getElementById('landingOverlay');
        this.typedText = document.getElementById('typedText');
        this.cursor = document.querySelector('.cursor-blink');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentPath = '~';
        this.helpTyped = false;
        
        this.commands = {
            help: this.showHelp.bind(this),
            about: this.showAbout.bind(this),
            skills: this.showSkills.bind(this),
            'work experience': this.showProjects.bind(this),
            education: this.showEducation.bind(this),
            resume: this.showResume.bind(this),
            contact: this.showContact.bind(this),
            clear: this.clearTerminal.bind(this),
            whoami: this.whoami.bind(this),
            ls: this.listDirectory.bind(this),
            pwd: this.printWorkingDirectory.bind(this),
            date: this.showDate.bind(this),
            echo: this.echo.bind(this)
        };
        
        this.init();
    }
    
    generateAsciiArt(text) {
        // ASCII character mappings for block letters
        const asciiChars = {
            'A': [
                ' █████╗ ',
                '██╔══██╗',
                '███████║',
                '██╔══██║',
                '██║  ██║',
                '╚═╝  ╚═╝'
            ],
            'B': [
                '██████╗ ',
                '██╔══██╗',
                '██████╔╝',
                '██╔══██╗',
                '██████╔╝',
                '╚═════╝ '
            ],
            'D': [
                '██████╗ ',
                '██╔══██╗',
                '██║  ██║',
                '██║  ██║',
                '██████╔╝',
                '╚═════╝ '
            ],
            'E': [
                '███████╗',
                '██╔════╝',
                '█████╗  ',
                '██╔══╝  ',
                '███████╗',
                '╚══════╝'
            ],
            'H': [
                '██╗  ██╗',
                '██║  ██║',
                '███████║',
                '██╔══██║',
                '██║  ██║',
                '╚═╝  ╚═╝'
            ],
            'I': [
                '██╗',
                '██║',
                '██║',
                '██║',
                '██║',
                '╚═╝'
            ],
            'J': [
                '     ██╗',
                '     ██║',
                '     ██║',
                '██   ██║',
                '╚█████╔╝',
                ' ╚════╝ '
            ],
            'L': [
                '██╗     ',
                '██║     ',
                '██║     ',
                '██║     ',
                '███████╗',
                '╚══════╝'
            ],
            'N': [
                '███╗   ██╗',
                '████╗  ██║',
                '██╔██╗ ██║',
                '██║╚██╗██║',
                '██║ ╚████║',
                '╚═╝  ╚═══╝'
            ],
            'O': [
                ' ██████╗ ',
                '██╔═══██╗',
                '██║   ██║',
                '██║   ██║',
                '╚██████╔╝',
                ' ╚═════╝ '
            ],
            'R': [
                '██████╗ ',
                '██╔══██╗',
                '██████╔╝',
                '██╔══██╗',
                '██║  ██║',
                '╚═╝  ╚═╝'
            ],
            'T': [
                '████████╗',
                '╚══██╔══╝',
                '   ██║   ',
                '   ██║   ',
                '   ██║   ',
                '   ╚═╝   '
            ],
            ' ': [
                '   ',
                '   ',
                '   ',
                '   ',
                '   ',
                '   '
            ]
        };
        
        const lines = ['', '', '', '', '', ''];
        const chars = text.toUpperCase().split('');
        
        chars.forEach(char => {
            const charLines = asciiChars[char] || asciiChars[' '];
            for (let i = 0; i < 6; i++) {
                lines[i] += charLines[i];
            }
        });
        
        return lines.join('\n');
    }
    
    initWelcomeSection() {
        const asciiNameElement = document.getElementById('ascii-name');
        if (asciiNameElement) {
            this.animateAsciiName(asciiNameElement, 'ABHIJEET ANAND');
        }
        
        // Focus on command input after welcome animation
        setTimeout(() => {
            if (this.commandInput) {
                this.commandInput.focus();
            }
        }, 3000);
    }
    
    animateAsciiName(element, text) {
        // Generate ASCII art for the text
        const asciiArt = this.generateAsciiArt(text);
        const lines = asciiArt.split('\n');
        
        // Set up styling
        element.style.fontFamily = 'monospace';
        element.style.color = '#00FF00';
        element.style.whiteSpace = 'pre';
        element.style.textAlign = 'center';
        element.style.lineHeight = '1';
        element.style.fontSize = '12px';
        element.style.transition = 'opacity 0.8s ease-in-out';
        
        // Animation loop function
        const animationLoop = () => {
            // Start with fade in
            element.style.opacity = '0';
            element.innerHTML = '';
            
            // Fade in effect
            setTimeout(() => {
                element.style.opacity = '1';
                
                // Typewriter effect - display line by line
                let currentLine = 0;
                const typewriterInterval = setInterval(() => {
                    if (currentLine < lines.length) {
                        element.innerHTML += lines[currentLine] + '\n';
                        currentLine++;
                    } else {
                        clearInterval(typewriterInterval);
                        element.classList.add('finished');
                        
                        // Hold the text for 3 seconds, then fade out
                        setTimeout(() => {
                            element.style.opacity = '0';
                            element.classList.remove('finished');
                            
                            // Wait for fade out to complete, then restart
                            setTimeout(() => {
                                animationLoop();
                            }, 800); // Wait for fade out transition
                        }, 3000); // Hold text for 3 seconds
                    }
                }, 150); // 150ms delay between lines
            }, 500); // Initial delay before fade in
        };
        
        // Start the animation loop
        animationLoop();
    }
    
    stopAsciiAnimation() {
        this.asciiAnimationActive = false;
        if (this.currentAsciiTimer) {
            clearInterval(this.currentAsciiTimer);
        }
        if (this.currentAsciiTimeout) {
            clearTimeout(this.currentAsciiTimeout);
        }
    }
    
    init() {
        this.setupEventListeners();
        this.setupLandingPage();
        this.commandInput.focus();
        
        // Initialize ASCII art in welcome section after a short delay
        setTimeout(() => {
            this.initWelcomeSection();
        }, 100);
        
        // Welcome message removed
        
        // Keep input focused
        document.addEventListener('click', () => {
            this.commandInput.focus();
        });
    }
    
    setupEventListeners() {
        this.commandInput.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.commandInput.addEventListener('input', this.handleInput.bind(this));
        this.commandInput.focus();
        
        // Focus input when clicking anywhere on terminal
        document.addEventListener('click', () => {
            this.commandInput.focus();
        });
    }
    
    handleInput(e) {
         // Synchronize visible text with input
         const inputValue = e.target.value;
         if (this.typedText) {
             this.typedText.textContent = inputValue;
         }
     }
    
    setupLandingPage() {
        // Handle Enter key press on landing page
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.landingOverlay && !this.landingOverlay.classList.contains('hidden')) {
                this.hideLandingPage();
            }
        });
        
        // Also handle click on landing page
        if (this.landingOverlay) {
            this.landingOverlay.addEventListener('click', () => {
                this.hideLandingPage();
            });
        }
        
        // Start typewriter animation
        this.startTypewriterAnimation();
    }
    
    startTypewriterAnimation() {
        const text1 = "I'm Abhijeet Anand, a passionate Data Scientist & Analytics Expert.";
        const text2 = "I specialize in Python and R with six years of experience across diverse sectors.";
        
        const typewriter1 = document.getElementById('typewriter1');
        const typewriter2 = document.getElementById('typewriter2');
        const instructionDiv = document.querySelector('.landing-instruction');
        
        // Hide instruction initially
        if (instructionDiv) {
            instructionDiv.style.opacity = '0';
            instructionDiv.style.transition = 'opacity 0.5s ease-in';
        }
        
        if (typewriter1 && typewriter2) {
            // Start first line immediately (no continuous animation)
            this.typeTextTypewriter(typewriter1, text1, 50, () => {
                // Start second line after first is complete
                setTimeout(() => {
                    this.typeTextTypewriter(typewriter2, text2, 50, () => {
                        // Show instruction after both lines are complete
                        setTimeout(() => {
                            if (instructionDiv) {
                                instructionDiv.style.opacity = '1';
                            }
                        }, 500);
                    });
                }, 500);
            });
        }
    }
    
    typeTextTypewriter(element, text, speed, callback) {
        let i = 0;
        element.innerHTML = '';
        element.classList.add('typing');
        element.style.width = '0';
        element.style.display = 'inline-block';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                element.style.width = (i + 1) * 0.6 + 'em';
                i++;
            } else {
                clearInterval(timer);
                element.classList.remove('typing');
                element.classList.add('finished');
                element.style.width = 'auto';
                
                if (callback) {
                    callback();
                }
            }
        }, speed);
    }
    
    hideLandingPage() {
        if (this.landingOverlay) {
            this.landingOverlay.classList.add('hidden');
            // Focus on terminal input after landing page disappears
            setTimeout(() => {
                this.commandInput.focus();
            }, 500);
        }
    }
    
    handleKeyDown(e) {
         switch(e.key) {
            case 'Enter':
                this.stopAsciiAnimation();
                this.processCommand();
                break;
            case 'ArrowUp':
                this.navigateHistory(-1);
                e.preventDefault();
                break;
            case 'ArrowDown':
                this.navigateHistory(1);
                e.preventDefault();
                break;
            case 'Tab':
                this.autoComplete();
                e.preventDefault();
                break;
        }
    }
    
    processCommand() {
        const input = this.commandInput.value.trim();
        if (!input) return;
        
        // Add to history
        this.commandHistory.push(input);
        this.historyIndex = this.commandHistory.length;
        
        // Display command
        this.addOutput(`abhijeet@portfolio:${this.currentPath}$ ${input}`, 'command-line');
        
        // Check for exact command match first (for multi-word commands)
        let commandFound = false;
        let commandToExecute = null;
        let argsToPass = [];
        
        // Check if the entire input matches a command
        if (this.commands[input]) {
            commandToExecute = this.commands[input];
            commandFound = true;
        } else {
            // Check for partial matches (multi-word commands)
            const commandKeys = Object.keys(this.commands).sort((a, b) => b.length - a.length); // Sort by length desc
            for (const cmd of commandKeys) {
                if (input.startsWith(cmd)) {
                    const remainingInput = input.substring(cmd.length).trim();
                    commandToExecute = this.commands[cmd];
                    argsToPass = remainingInput ? remainingInput.split(' ') : [];
                    commandFound = true;
                    break;
                }
            }
        }
        
        // If no multi-word command found, try single word parsing
        if (!commandFound) {
            const [command, ...args] = input.split(' ');
            if (this.commands[command]) {
                commandToExecute = this.commands[command];
                argsToPass = args;
                commandFound = true;
            }
        }
        
        if (commandFound && commandToExecute) {
            // Stop ASCII animation when help is typed
            if (input === 'help' || input.startsWith('help')) {
                this.helpTyped = true;
                this.stopAsciiAnimation();
            }
            commandToExecute(argsToPass);
        } else {
            this.addOutput(`Command not found: ${input}. Type 'help' for available commands.`, 'error');
        }
        
        // Clear input and typed text
        this.commandInput.value = '';
        if (this.typedText) {
            this.typedText.textContent = '';
        }
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        this.historyIndex += direction;
        
        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length;
            this.commandInput.value = '';
            if (this.typedText) {
                this.typedText.textContent = '';
            }
            return;
        }
        
        this.commandInput.value = this.commandHistory[this.historyIndex] || '';
        if (this.typedText) {
            this.typedText.textContent = this.commandHistory[this.historyIndex] || '';
        }
    }
    
    autoComplete() {
        const input = this.commandInput.value;
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            this.commandInput.value = matches[0];
        } else if (matches.length > 1) {
            this.addOutput(`Available commands: ${matches.join(', ')}`, 'info');
        }
    }
    
    addOutput(text, className = '') {
        const div = document.createElement('div');
        div.className = `command-output ${className}`;
        div.innerHTML = text;
        this.output.appendChild(div);
        this.scrollToBottom();
    }
    
    typeText(text, className = '', delay = 50) {
        const div = document.createElement('div');
        div.className = `command-output ${className}`;
        this.output.appendChild(div);
        
        // Check if text contains HTML tags
        const hasHTML = /<[^>]*>/.test(text);
        
        if (hasHTML) {
            // For HTML content, type character by character but preserve HTML structure
            let i = 0;
            let currentHTML = '';
            const typeInterval = setInterval(() => {
                currentHTML += text[i];
                // Update innerHTML to render HTML properly
                div.innerHTML = currentHTML;
                // Scroll every few characters for smoother experience
                if (i % 5 === 0 || i >= text.length - 1) {
                    this.scrollToBottom();
                }
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                    this.scrollToBottom();
                }
            }, delay);
        } else {
            // For plain text, use textContent as before
            let i = 0;
            const typeInterval = setInterval(() => {
                div.textContent += text[i];
                // Scroll every few characters for smoother experience
                if (i % 5 === 0 || i >= text.length - 1) {
                    this.scrollToBottom();
                }
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                    this.scrollToBottom();
                }
            }, delay);
        }
    }
    
    scrollToBottom() {
        const terminalBody = document.querySelector('.terminal-body');
        if (terminalBody) {
            terminalBody.scrollTo({
                top: terminalBody.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
    
    // Command implementations
    showHelp() {
        const helpText = `
<div class="help-section">
    <div class="help-title">Available Commands:</div>
    <div class="help-commands">
        <div class="help-command"><span class="command-name">help</span> - Show this help message</div>
        <div class="help-command"><span class="command-name">about</span> - Learn more about Abhijeet</div>
        <div class="help-command"><span class="command-name">skills</span> - View technical skills and tools</div>
        <div class="help-command"><span class="command-name">work experience</span> - Browse work experience</div>
        <div class="help-command"><span class="command-name">education</span> - View educational background</div>
        <div class="help-command"><span class="command-name">resume</span> - Download resume (Data Scientist)</div>
        <div class="help-command"><span class="command-name">contact</span> - Get contact information</div>
        <div class="help-command"><span class="command-name">clear</span> - Clear the terminal</div>
        <div class="help-command"><span class="command-name">whoami</span> - Display current user</div>
        <div class="help-command"><span class="command-name">ls</span> - List directory contents</div>
        <div class="help-command"><span class="command-name">pwd</span> - Print working directory</div>
        <div class="help-command"><span class="command-name">date</span> - Show current date and time</div>
        <div class="help-command"><span class="command-name">echo</span> - Display a line of text</div>
    </div>
</div>`;
        this.addOutput(helpText);
    }
    
    showAbout() {
        this.addOutput('About Me', 'help-title');
        this.addOutput('', '');
        
        setTimeout(() => {
            const aboutContent = `
                <div class="about-section">
                    <div class="about-intro">
                        <p>Hi! I'm <strong>Abhijeet Anand</strong>, a <span class="highlight">Data Scientist</span> with six years of experience, specializing in Python and R.</p>
                        <p>I am passionate about using data to solve real-world problems and drive meaningful business impact.</p>
                        <p>I have applied my skills across diverse sectors such as Finance, Advertising, and Healthcare, developing solutions that turn complex data into actionable insights.</p>
                    </div>
                    
                    <div class="about-focus">
                        <div class="focus-title">🎯 I focus on:</div>
                        <div class="focus-list">
                            <div class="focus-item">• Designing and implementing predictive models to optimize business outcomes</div>
                            <div class="focus-item">• Conducting data analysis and research to understand patterns and trends</div>
                            <div class="focus-item">• Developing innovative solutions using advanced machine learning techniques</div>
                            <div class="focus-item">• Translating complex data into actionable insights and recommendations</div>
                        </div>
                    </div>
                    
                    <div class="about-projects">
                        <div class="projects-title">🚀 Some of my projects include:</div>
                        <div class="projects-list">
                            <div class="project-brief">• Retail sales prediction models to enhance business forecasting</div>
                            <div class="project-brief">• Optimized shipping algorithms for operational efficiency</div>
                            <div class="project-brief">• Recommendation systems to improve user engagement</div>
                            <div class="project-brief">• Financial and healthcare analytics projects demonstrating practical, data-driven solutions</div>
                        </div>
                    </div>
                    
                    <div class="about-philosophy">
                        <p>I approach each project with <span class="highlight">curiosity</span>, <span class="highlight">creativity</span>, and <span class="highlight">problem-solving</span>, aiming to deliver impactful analytical capabilities.</p>
                        <p>My goal is to leverage data science to identify high-impact use cases and create solutions that make a tangible difference.</p>
                    </div>
                    
                    <div class="about-cta">
                        <p>💡 Type <span class="command-highlight">'work experience'</span> to see my work, or <span class="command-highlight">'contact'</span> to get in touch!</p>
                    </div>
                </div>`;
            this.addOutput(aboutContent, 'about-content');
        }, 300);
    }
    
    showSkills() {
        const skills = [
            // Programming Languages
            { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'Programming Languages' },
            { name: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg', category: 'Programming Languages' },
            { name: 'SQL', icon: 'https://img.icons8.com/color/48/sql.png', category: 'Programming Languages' },
            
            // Data Analysis
            { name: 'Data Analytics', icon: 'https://img.icons8.com/color/48/analytics.png', category: 'Data Analysis' },
            { name: 'Statistics', icon: 'https://img.icons8.com/color/48/statistics.png', category: 'Data Analysis' },
            { name: 'Machine Learning', icon: 'https://img.icons8.com/color/48/artificial-intelligence.png', category: 'Data Analysis' },
            { name: 'Time Series', icon: 'https://img.icons8.com/color/48/time-series.png', category: 'Data Analysis' },
            { name: 'Data Exploration', icon: 'https://img.icons8.com/color/48/search-database.png', category: 'Data Analysis' },
            
            // Data Tools
            { name: 'ETL', icon: 'https://img.icons8.com/color/48/data-transfer.png', category: 'Data Tools' },
            { name: 'Tableau', icon: 'https://img.icons8.com/color/48/tableau-software.png', category: 'Data Tools' },
            { name: 'BI Tools', icon: 'https://img.icons8.com/color/48/business-intelligence.png', category: 'Data Tools' },
            { name: 'Snowflake', icon: 'https://img.icons8.com/color/48/snowflake.png', category: 'Data Tools' },
            { name: 'Analytics Libraries', icon: 'https://img.icons8.com/color/48/library.png', category: 'Data Tools' },
            
            // Visualization Tools
            { name: 'Tableau', icon: 'https://img.icons8.com/color/48/tableau-software.png', category: 'Visualization Tools' },
            
            // Cloud Platforms
            { name: 'AWS Boto', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', category: 'Cloud Platforms' },
            
            // Source Control
            { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'Source Control' }
        ];
        
        const skillsHtml = `
        <div class="skills-section">
            <h2 style="color: #00ff00; text-align: center; margin-bottom: 30px;">Skills & Tools</h2>
            <div class="skills-icons">
                ${skills.map((skill, index) => `
                    <div class="skill" style="animation-delay: ${index * 0.1}s;">
                        <img src="${skill.icon}" alt="${skill.name}" onerror="this.src='https://img.icons8.com/color/48/code.png'">
                        <p>${skill.name}</p>
                    </div>
                `).join('')}
            </div>
        </div>`;
        
        this.addOutput(skillsHtml, 'skills-content');
    }
    
    showProjects() {
        const workExperience = [
            {
                company: 'DataFluct Inc.',
                location: 'Tokyo, Japan',
                role: 'Data Scientist',
                date: 'Present - Present',
                icon: 'https://img.icons8.com/ios-filled/50/000000/data-configuration.png',
                achievements: [
                    'Demand Forecasting: Engineered geospatial retail models for sales prediction, incorporating GIS data to inform strategic store placements and manage competitor influence using statistical integration techniques.',
                    'Algorithm Optimization: Developed a box packaging algorithm, reducing shipping costs by 3% for 1.5M+ shipments, showcasing operational efficiency and cost-saving solutions.',
                    'Recommendation Systems: Implemented a sophisticated recommendation engine for a cosmetics website, leveraging user data for personalized marketing which enhanced engagement metrics.',
                    'ESG Reporting: Devised an ESG assessment framework, utilizing web scraping and data analysis to evaluate sustainability performance of major Japanese firms, resulting in a patent award.',
                    'NLP-Driven Product Categorization: Led development of an NLP system to categorize over 5 million JICFS dataset products into 400+ carbon footprint categories using BERT and FastText with Mecab.',
                    'Data Integration: Built robust APIs for data-driven solutions, integrating with cloud services like AWS Lambda and S3, and using Snowflake for comprehensive data handling.'
                ]
            },
            {
                company: 'ARBLET INC.',
                location: 'Tokyo, Japan',
                role: 'R&D Engineer',
                date: 'Dec 2018 - Sep 2020',
                icon: 'https://img.icons8.com/ios-filled/50/000000/artificial-intelligence.png',
                achievements: [
                    'ML and DL Innovations: Leveraged ML and DL methods, including boosting, ANN, and LSTM networks, to refine activity recognition with 95% accuracy.',
                    'Activity Classification: Specialized in classifying activities using tri-axial accelerometer data from wearable devices.',
                    'Data Preprocessing and Feature Extraction: Executed advanced data preprocessing to minimize noise and extracted key time and frequency domain features.',
                    'Hierarchical Modeling: Developed a hierarchical tree-based model for structuring daily activities effectively.',
                    'Elderly Healthcare Application: Led a cloud-based project for elderly healthcare, classifying activities, predicting walking speeds, and recommending exercises for improved mobility.'
                ]
            }
        ];
        
        this.addOutput('Work Experience Portfolio:', 'help-title');
        this.addOutput('', '');
        
        workExperience.forEach((experience, index) => {
            setTimeout(() => {
                const experienceHtml = `
                <div class="work-experience-entry">
                    <div class="experience-header">
                        <img src="${experience.icon}" width="32" height="32" style="vertical-align: middle; margin-right: 10px; filter: brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);" onerror="this.src='https://img.icons8.com/ios-filled/50/000000/briefcase.png'" />
                        <strong>${experience.company} — ${experience.location}</strong>
                        <span class="experience-date">${experience.date}</span>
                    </div>
                    <div class="experience-role">
                        <strong>Role:</strong> ${experience.role}
                    </div>
                    <div class="experience-achievements">
                        ${experience.achievements.map(achievement => `
                            <div class="achievement-item">✅ ${achievement}</div>
                        `).join('')}
                    </div>
                </div>`;
                this.addOutput(experienceHtml, 'work-experience-section');
            }, index * 800);
        });
        
        setTimeout(() => {
            this.addOutput('', '');
            this.typeText('🚀 Proven track record of delivering impactful data science solutions across diverse industries!', 'info', 40);
        }, workExperience.length * 800 + 500);
    }
    
    showEducation() {
        this.addOutput('Education & Certifications:', 'help-title');
        this.addOutput('', '');
        
        // Indian Statistical Institute
        setTimeout(() => {
            const isiDegree = `
                <div class="education-entry">
                    <div class="education-header">
                        <img src="https://img.icons8.com/ios-filled/50/000000/graduation-cap.png" width="32" height="32" style="vertical-align: middle; margin-right: 10px; filter: brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);" />
                        <strong>Indian Statistical Institute — Kolkata, India</strong>
                        <span class="education-date">2018-2020</span>
                    </div>
                    <div class="education-role">
                        <strong>Degree:</strong> Post Graduate Diploma in Applied Statistics
                    </div>
                    <div class="education-achievements">
                        <div class="achievement-item">✅ Advanced Statistical Methods and Data Analysis</div>
                        <div class="achievement-item">✅ Machine Learning and Predictive Modeling</div>
                        <div class="achievement-item">✅ Research Methodology and Statistical Computing</div>
                        <div class="achievement-item">✅ Probability Theory and Mathematical Statistics</div>
                        <div class="achievement-item">✅ Applied Statistics in Real-world Scenarios</div>
                    </div>
                </div>`;
            this.addOutput(isiDegree, 'education-section');
        }, 300);
        
        // Indian Institute of Technology
        setTimeout(() => {
            const iitDegree = `
                <div class="education-entry">
                    <div class="education-header">
                        <img src="https://img.icons8.com/ios-filled/50/000000/graduation-cap.png" width="32" height="32" style="vertical-align: middle; margin-right: 10px; filter: brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);" />
                        <strong>Indian Institute of Technology — Bombay, India</strong>
                        <span class="education-date">Jan 2017</span>
                    </div>
                    <div class="education-role">
                        <strong>Degree:</strong> Bachelor of Technology
                    </div>
                    <div class="education-achievements">
                        <div class="achievement-item">✅ Engineering Fundamentals and Technical Problem Solving</div>
                        <div class="achievement-item">✅ Mathematics and Computational Methods</div>
                        <div class="achievement-item">✅ Data Structures and Algorithm Design</div>
                        <div class="achievement-item">✅ Software Development and Programming</div>
                        <div class="achievement-item">✅ Research and Innovation Projects</div>
                    </div>
                </div>`;
            this.addOutput(iitDegree, 'education-section');
        }, 1200);
        
        setTimeout(() => {
            this.addOutput('', '');
            this.typeText('🎓 Strong foundation in statistics, technology, and data science!', 'info', 40);
        }, 2100);
    }
    
    showResume() {
        this.addOutput('Resume Downloads:', 'help-title');
        this.addOutput('', '');
        
        const resumeText = `
<div class="resume-section">
    <div class="resume-option">
        <div class="resume-header">
            <span style="font-size: 24px; margin-right: 10px;">📊</span>
            <strong style="color: #00ff00;">Data Scientist Resume</strong>
        </div>
        <div class="resume-description">
            Comprehensive overview of data science skills, machine learning expertise, and analytical projects across Finance, Advertising, and Healthcare sectors.
        </div>
        <div class="resume-download">
            <a href="Abhijeet Anand_Data Scientist_20240704.pdf" download="Abhijeet_Anand_Data_Scientist_Resume.pdf" 
               style="color: #74c0fc; text-decoration: none; font-weight: bold;"
               onmouseover="this.style.color='#339af0'" 
               onmouseout="this.style.color='#74c0fc'">
               📥 Download Data Scientist Resume
            </a>
        </div>
    </div>
</div>`;
        
        this.addOutput(resumeText, 'resume-section');
        
        setTimeout(() => {
            this.addOutput('', '');
            this.typeText('💡 Six years of experience in Python, R, and machine learning!', 'info', 40);
        }, 500);
    }
    
    showContact() {
        const contactText = `
<div class="contact-section">
    <div class="contact-title">📬 Let's Connect!</div>
    <br>
    <div class="contact-icons">
        <a href="mailto:abbi163@gmail.com" class="contact-icon" title="Email">
            <img src="https://img.icons8.com/fluency/48/1e90ff/email.png" alt="Email" />
        </a>
        <a href="https://www.linkedin.com/in/abhijeet-anand-9b411781/" target="_blank" class="contact-icon" title="LinkedIn">
            <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" />
        </a>
        <a href="https://github.com/boku-wa-abhi" target="_blank" class="contact-icon" title="GitHub">
            <img src="https://img.icons8.com/ios-glyphs/48/1e90ff/github.png" alt="GitHub" />
        </a>
        <a href="https://x.com/boku_wa_abhi" target="_blank" class="contact-icon" title="X (Twitter)">
            <img src="https://img.icons8.com/ios-filled/48/1e90ff/twitter.png" alt="X (Twitter)" />
        </a>
        <a href="https://medium.com/@boku.wa.abhi" target="_blank" class="contact-icon" title="Medium">
            <img src="https://img.icons8.com/ios-filled/48/1e90ff/medium-monogram.png" alt="Medium" />
        </a>
    </div>
</div>`;
        this.addOutput(contactText);
    }
    
    clearTerminal() {
        this.output.innerHTML = '';
        this.addOutput('Terminal cleared.', 'success');
    }
    
    whoami() {
        this.addOutput('abhijeet', 'info');
    }
    
    listDirectory() {
        const files = [
            'about.txt',
            'skills.json',
            'work_experience/',
            'education.md',
            'contact.vcf',
            'resume.pdf'
        ];
        
        this.addOutput('Directory contents:', 'info');
        files.forEach(file => {
            const isDirectory = file.endsWith('/');
            const color = isDirectory ? 'info' : '';
            this.addOutput(`  ${file}`, color);
        });
    }
    
    printWorkingDirectory() {
        this.addOutput(`/home/abhijeet${this.currentPath}`, 'info');
    }
    
    showDate() {
        const now = new Date();
        const dateString = now.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        this.addOutput(dateString, 'info');
    }
    
    echo(args) {
        const text = args.join(' ');
        this.addOutput(text || '', 'info');
    }
}

// ASCII Art Animation
function animateAsciiArt() {
    const asciiArt = document.querySelector('.ascii-art');
    if (asciiArt) {
        asciiArt.style.opacity = '0';
        setTimeout(() => {
            asciiArt.style.transition = 'opacity 2s ease-in';
            asciiArt.style.opacity = '1';
        }, 500);
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TerminalPortfolio();
    animateAsciiArt();
    
    // Add some easter eggs
    const easterEggs = {
        'sudo': () => 'Nice try! But you don\'t have sudo privileges here. 😄',
        'rm -rf /': () => 'Whoa there! Let\'s not delete everything. 😅',
        'hack': () => 'I\'m already in! Just kidding... 🕵️‍♀️',
        'coffee': () => '☕ Here\'s your virtual coffee! Fuel for coding!',
        'matrix': () => 'There is no spoon... 🥄',
        'konami': () => '⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️ - You found the Konami code!'
    };
    
    // Add easter eggs to terminal
    const terminal = window.terminal || {};
    Object.assign(terminal, easterEggs);
});

// Handle maximize functionality for green button (minimize and close are now handled inline)
document.addEventListener('DOMContentLoaded', () => {
    const greenBtn = document.querySelector('.window-controls .green');
    const terminalContainer = document.querySelector('.terminal-container');
    
    if (greenBtn) {
        greenBtn.addEventListener('click', () => {
            terminalContainer.classList.remove('minimized');
            terminalContainer.classList.toggle('maximized');
        });
    }
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    const commandInput = document.getElementById('commandInput');
    if (commandInput) {
        commandInput.focus();
    }
});

// Prevent context menu on right click for more terminal-like experience
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Add some visual effects
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        // Add a subtle flash effect when enter is pressed
        const terminal = document.querySelector('.terminal-container');
        terminal.style.boxShadow = '0 20px 40px rgba(0, 255, 0, 0.1)';
        setTimeout(() => {
            terminal.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
        }, 100);
    }
});

// Export for potential future use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TerminalPortfolio;
}