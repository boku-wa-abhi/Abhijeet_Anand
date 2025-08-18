// Terminal Portfolio JavaScript

class TerminalPortfolio {
    constructor() {
        this.commandInput = document.getElementById('commandInput');
        this.output = document.getElementById('output');
        this.landingOverlay = document.getElementById('landingOverlay');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentPath = '~';
        this.helpTyped = false;
        
        this.commands = {
            help: this.showHelp.bind(this),
            about: this.showAbout.bind(this),
            skills: this.showSkills.bind(this),
            'work experience': this.showProjects.bind(this),
            projects: this.showProjects.bind(this),
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
            'J': [
                '     ██╗',
                '     ██║',
                '     ██║',
                '██   ██║',
                '╚█████╔╝',
                ' ╚════╝ '
            ],
            'O': [
                ' ██████╗ ',
                '██╔═══██╗',
                '██║   ██║',
                '██║   ██║',
                '╚██████╔╝',
                ' ╚═════╝ '
            ],
            'L': [
                '██╗     ',
                '██║     ',
                '██║     ',
                '██║     ',
                '███████╗',
                '╚══════╝'
            ],
            'I': [
                '██╗',
                '██║',
                '██║',
                '██║',
                '██║',
                '╚═╝'
            ],
            'N': [
                '███╗   ██╗',
                '████╗  ██║',
                '██╔██╗ ██║',
                '██║╚██╗██║',
                '██║ ╚████║',
                '╚═╝  ╚═══╝'
            ],
            'A': [
                ' █████╗ ',
                '██╔══██╗',
                '███████║',
                '██╔══██║',
                '██║  ██║',
                '╚═╝  ╚═╝'
            ],
            ' ': [
                '      ',
                '      ',
                '      ',
                '      ',
                '      ',
                '      '
            ],
            'V': [
                '██╗   ██╗',
                '██║   ██║',
                '██║   ██║',
                '╚██╗ ██╔╝',
                ' ╚████╔╝ ',
                '  ╚═══╝  '
            ],
            'E': [
                '███████╗',
                '██╔════╝',
                '█████╗  ',
                '██╔══╝  ',
                '███████╗',
                '╚══════╝'
            ],
            'R': [
                '██████╗ ',
                '██╔══██╗',
                '██████╔╝',
                '██╔══██╗',
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
            'H': [
                '██╗  ██╗',
                '██║  ██║',
                '███████║',
                '██╔══██║',
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
            'D': [
                '██████╗ ',
                '██╔══██╗',
                '██║  ██║',
                '██║  ██║',
                '██████╔╝',
                '╚═════╝ '
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
        this.asciiAnimationActive = true;
        this.currentAsciiTimer = null;
        this.currentAsciiTimeout = null;
        
        const animateOnce = () => {
            if (!this.asciiAnimationActive) return;
            
            const lines = text.split('\n');
            let currentLine = 0;
            element.innerHTML = '';
            element.classList.add('typing');
            
            const animateNextLine = () => {
                if (!this.asciiAnimationActive) return;
                
                if (currentLine < lines.length) {
                    // Add the current line
                    if (currentLine > 0) {
                        element.innerHTML += '\n';
                    }
                    element.innerHTML += lines[currentLine];
                    currentLine++;
                    
                    // Schedule next line
                    this.currentAsciiTimeout = setTimeout(animateNextLine, 200);
                } else {
                    // Animation complete
                    element.classList.remove('typing');
                    element.classList.add('finished');
                    
                    // Loop the animation continuously until 'help' is typed
                    this.currentAsciiTimeout = setTimeout(() => {
                        if (this.asciiAnimationActive && !this.helpTyped) {
                            animateOnce();
                        }
                    }, 2000);
                }
            };
            
            animateNextLine();
        };
        
        animateOnce();
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
        this.commandInput.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.setupLandingPage();
        this.commandInput.focus();
        
        // Initialize ASCII art in welcome section after a short delay
        setTimeout(() => {
            this.initWelcomeSection();
        }, 100);
        
        // Show welcome message with typing effect
        setTimeout(() => {
            this.typeText('Type "help" to see available commands.', 'info');
        }, 1000);
        
        // Keep input focused
        document.addEventListener('click', () => {
            this.commandInput.focus();
        });
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
        const text1 = "Hi Dear! I'm Abhijeet Anand, a passionate Data Scientist & Analytics Expert.";
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
        this.addOutput(`jolina@portfolio:${this.currentPath}$ ${input}`, 'command-line');
        
        // Parse and execute command
        const [command, ...args] = input.split(' ');
        
        if (this.commands[command]) {
            // Stop ASCII animation when help is typed
            if (command === 'help') {
                this.helpTyped = true;
                this.stopAsciiAnimation();
            }
            this.commands[command](args);
        } else {
            this.addOutput(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
        }
        
        // Clear input
        this.commandInput.value = '';
        
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
            return;
        }
        
        this.commandInput.value = this.commandHistory[this.historyIndex] || '';
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
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                }
            }, delay);
        } else {
            // For plain text, use textContent as before
            let i = 0;
            const typeInterval = setInterval(() => {
                div.textContent += text[i];
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                }
            }, delay);
        }
    }
    
    scrollToBottom() {
        const terminalBody = document.querySelector('.terminal-body');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    // Command implementations
    showHelp() {
        const helpText = `
<div class="help-section">
    <div class="help-title">Available Commands:</div>
    <div class="help-commands">
        <div class="help-command"><span class="command-name">help</span> - Show this help message</div>
        <div class="help-command"><span class="command-name">about</span> - Learn more about Jolina</div>
        <div class="help-command"><span class="command-name">skills</span> - View technical skills and tools</div>
        <div class="help-command"><span class="command-name">projects</span> - Browse portfolio projects</div>
        <div class="help-command"><span class="command-name">education</span> - View educational background</div>
        <div class="help-command"><span class="command-name">resume</span> - Download resume (UI/UX or Front-End)</div>
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
        const technicalSkills = [
            { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
            { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
            { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
            { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            { name: 'Hosting', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg' },
            { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' }
        ];
        
        const designSkills = [
            { name: 'Responsive Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
            { name: 'Visual Layout', icon: 'https://img.icons8.com/fluency/48/design.png' },
            { name: 'Project Execution', icon: 'https://img.icons8.com/fluency/48/project-management.png' },
            { name: 'Collaboration', icon: 'https://img.icons8.com/fluency/48/collaboration.png' },
            { name: 'Adaptability', icon: 'https://img.icons8.com/color/48/change.png' }
        ];
        
        this.addOutput('Skills Portfolio:', 'help-title');
        this.addOutput('', '');
        
        // Technical Skills Section
        setTimeout(() => {
            this.typeText('Technical Skills & Tools:', 'section-title', 30);
        }, 200);
        
        setTimeout(() => {
            let techTable = '<table style="width: 100%; margin: 10px 0;"><tr>';
            technicalSkills.forEach((skill, index) => {
                if (index % 4 === 0 && index > 0) {
                    techTable += '</tr><tr>';
                }
                techTable += `<td align="center" style="width: 120px; padding: 10px;">
                    <img src="${skill.icon}" width="48" height="48" style="filter: brightness(0.9);" />
                    <br><span style="color: #00ff00; font-size: 0.9em;">${skill.name}</span>
                </td>`;
            });
            techTable += '</tr></table>';
            this.addOutput(techTable, 'skills-table');
        }, 800);
        
        // Design & Soft Skills Section
        setTimeout(() => {
            this.addOutput('', '');
            this.typeText('Design & Soft Skills:', 'section-title', 30);
        }, 1400);
        
        setTimeout(() => {
            let designTable = '<table style="width: 100%; margin: 10px 0;"><tr>';
            designSkills.forEach((skill, index) => {
                if (index % 3 === 0 && index > 0) {
                    designTable += '</tr><tr>';
                }
                designTable += `<td align="center" style="width: 150px; padding: 10px;">
                    <img src="${skill.icon}" width="48" height="48" style="filter: brightness(0.9);" />
                    <br><span style="color: #00ff00; font-size: 0.9em;">${skill.name}</span>
                </td>`;
            });
            designTable += '</tr></table>';
            this.addOutput(designTable, 'skills-table');
        }, 2000);
        
        setTimeout(() => {
            this.addOutput('', '');
            this.typeText('💡 Always learning and expanding my skillset!', 'info', 40);
        }, 2600);
    }
    
    showProjects() {
        const workExperience = [
            { 
                name: 'Retail Sales Prediction Model', 
                company: 'Finance Sector', 
                description: 'Developed predictive models using Python and machine learning algorithms to forecast retail sales, improving business forecasting accuracy by 25% and enabling data-driven inventory management decisions.' 
            },
            { 
                name: 'Shipping Algorithm Optimization', 
                company: 'Logistics & Operations', 
                description: 'Designed and implemented optimized shipping algorithms using R and advanced analytics, reducing operational costs by 15% and improving delivery efficiency across multiple distribution centers.' 
            },
            { 
                name: 'Recommendation System Development', 
                company: 'Advertising Technology', 
                description: 'Built sophisticated recommendation systems using collaborative filtering and content-based approaches, increasing user engagement by 30% and improving click-through rates for targeted advertising campaigns.' 
            },
            { 
                name: 'Healthcare Analytics Platform', 
                company: 'Healthcare Sector', 
                description: 'Created comprehensive analytics solutions for healthcare data, developing patient outcome prediction models and treatment optimization algorithms that improved clinical decision-making processes.' 
            },
            { 
                name: 'Financial Risk Assessment Models', 
                company: 'Financial Services', 
                description: 'Implemented machine learning models for credit risk assessment and fraud detection, utilizing Python and advanced statistical techniques to reduce financial losses and improve risk management strategies.' 
            }
        ];
        
        this.addOutput('Work Experience Portfolio:', 'help-title');
        this.addOutput('', '');
        
        let delay = 0;
        workExperience.forEach((experience, index) => {
            setTimeout(() => {
                const experienceLine = `${index + 1}. <span class="project-link">${experience.name}</span> - <span class="company-name">${experience.company}</span>`;
                this.typeText(experienceLine, 'project-item', 30);
            }, delay);
            delay += 800;
            
            setTimeout(() => {
                this.typeText(`   ${experience.description}`, 'project-description', 20);
                this.addOutput('', '');
            }, delay);
            delay += 1000;
        });
        
        setTimeout(() => {
            this.typeText('💡 Six years of experience delivering data-driven solutions across diverse industries!', 'info', 40);
        }, delay + 300);
    }
    
    showEducation() {
        this.addOutput('Education & Certifications:', 'help-title');
        this.addOutput('', '');
        
        // Google UX Design Certificate
        setTimeout(() => {
            const googleCert = `
                <div class="education-entry">
                    <div class="education-header">
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" width="32" height="32" style="vertical-align: middle; margin-right: 10px;" />
                        <strong>Google UX Design Certificate — Coursera</strong>
                        <span class="education-date">Jul–Oct 2024</span>
                    </div>
                    <div class="education-courses">
                        <div class="course-item">✅ 1. Foundations of User Experience (UX) Design</div>
                        <div class="course-item">✅ 2. Start the UX Design Process: Empathize, Define, and Ideate</div>
                        <div class="course-item">✅ 3. Build Wireframes and Low-Fidelity Prototypes</div>
                        <div class="course-item">✅ 4. Conduct UX Research and Test Early Concepts</div>
                        <div class="course-item">✅ 5. Create High-Fidelity Designs and Prototypes in Figma</div>
                        <div class="course-item">✅ 6. Responsive Web Design in Adobe XD and Figma</div>
                        <div class="course-item">✅ 7. Design a User Experience for Social Good & Prepare for Jobs</div>
                    </div>
                </div>`;
            this.addOutput(googleCert, 'education-section');
        }, 300);
        
        // UI/UX Design Specialization
        setTimeout(() => {
            const calartsCert = `
                <div class="education-entry">
                    <div class="education-header">
                        <img src="https://img.icons8.com/fluency/48/000000/adobe-xd.png" width="32" height="32" style="vertical-align: middle; margin-right: 10px;" />
                        <strong>UI/UX Design Specialization — California Institute of the Arts / Coursera</strong>
                        <span class="education-date">Jul–Oct 2024</span>
                    </div>
                    <div class="education-courses">
                        <div class="course-item">✅ 1. Visual Elements of User Interface Design</div>
                        <div class="course-item">✅ 2. UX Design Fundamentals</div>
                    </div>
                </div>`;
            this.addOutput(calartsCert, 'education-section');
        }, 1200);
        
        // Bachelor's Degree
        setTimeout(() => {
            const bachelorDegree = `
                <div class="education-entry">
                    <div class="education-header">
                        <span style="font-size: 32px; margin-right: 10px; vertical-align: middle;">🎓</span>
                        <strong>Bachelor of Science in Hospitality Management — University of Eastern Philippines</strong>
                        <span class="education-date">2020–2024</span>
                    </div>
                    <div class="education-description">
                        Foundation in customer service, project management, and business operations.
                    </div>
                </div>`;
            this.addOutput(bachelorDegree, 'education-section');
        }, 2100);
        
        setTimeout(() => {
            this.addOutput('', '');
            this.typeText('🌟 Continuously learning and growing in UX/UI design!', 'info', 40);
        }, 2800);
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
    <div class="help-title">Get In Touch</div>
    <br>
    <p>I'm always interested in new opportunities and collaborations!</p>
    <br>
    <div class="contact-links">
        <a href="mailto:jolina.javier@email.com" class="contact-link">
            <i class="fas fa-envelope"></i> jolina.javier@email.com
        </a>
        <a href="https://linkedin.com/in/jolina-javier" target="_blank" class="contact-link">
            <i class="fab fa-linkedin"></i> LinkedIn Profile
        </a>
        <a href="https://wantedly.com/users/jolina-javier" target="_blank" class="contact-link">
            <i class="fas fa-briefcase"></i> Wantedly Profile
        </a>
        <a href="https://github.com/jolina-javier" target="_blank" class="contact-link">
            <i class="fab fa-github"></i> GitHub Profile
        </a>
    </div>
    <br>
    <p><span class="highlight">Available for:</span> UI/UX Design projects, Front-End Development, Freelance work, and Full-time opportunities.</p>
    <br>
    <p><span class="highlight">Response time:</span> I typically respond within 24 hours.</p>
</div>`;
        this.addOutput(contactText);
    }
    
    clearTerminal() {
        this.output.innerHTML = '';
        this.addOutput('Terminal cleared.', 'success');
    }
    
    whoami() {
        this.addOutput('jolina', 'info');
    }
    
    listDirectory() {
        const files = [
            'about.txt',
            'skills.json',
            'projects/',
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
        this.addOutput(`/home/jolina${this.currentPath}`, 'info');
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

// Handle minimize and maximize functionality
document.addEventListener('DOMContentLoaded', () => {
    const minimizeBtn = document.getElementById('minimizeBtn');
    const maximizeBtn = document.getElementById('maximizeBtn');
    const terminalContainer = document.querySelector('.terminal-container');
    
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            terminalContainer.classList.remove('maximized');
            terminalContainer.classList.add('minimized');
        });
    }
    
    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', () => {
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