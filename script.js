/**
 * Modern Resume Portfolio - JavaScript
 * Handles tab navigation and dynamic content loading
 */

class ResumePortfolio {
    constructor() {
        this.mainContent = document.getElementById('mainContent');
        this.navTabs = document.getElementById('navTabs');
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.currentTab = 'about';

        // Page content cache
        this.pageCache = {};

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadPage('about'); // Load default page
        this.handleURLHash();
    }

    setupEventListeners() {
        // Tab button clicks
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Mobile menu toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => {
                this.navTabs.classList.toggle('show');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-tabs') && !e.target.closest('.mobile-menu-toggle')) {
                this.navTabs.classList.remove('show');
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleURLHash();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.navigateWithArrows(e.key);
            }
        });
    }

    handleURLHash() {
        const hash = window.location.hash.slice(1);
        if (hash && this.isValidTab(hash)) {
            this.switchTab(hash, false);
        }
    }

    isValidTab(tab) {
        return ['about', 'experience', 'skills', 'education', 'contact'].includes(tab);
    }

    async switchTab(tab, updateURL = true) {
        if (tab === this.currentTab) return;

        // Update active button
        this.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });

        // Close mobile menu
        this.navTabs.classList.remove('show');

        // Load new content
        await this.loadPage(tab);

        // Update current tab
        this.currentTab = tab;

        // Update URL hash
        if (updateURL) {
            history.pushState(null, '', `#${tab}`);
        }

        // Scroll to top of content
        this.mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    async loadPage(pageName) {
        // Show loading state
        this.mainContent.innerHTML = '<div class="loading">Loading...</div>';
        this.mainContent.style.opacity = '0';

        try {
            let content;

            // Check cache first
            if (this.pageCache[pageName]) {
                content = this.pageCache[pageName];
            } else {
                // Fetch page content
                const response = await fetch(`pages/${pageName}.html`);
                if (!response.ok) throw new Error('Page not found');
                content = await response.text();

                // Cache the content
                this.pageCache[pageName] = content;
            }

            // Insert content with animation
            this.mainContent.innerHTML = content;

            // Trigger reflow for animation
            void this.mainContent.offsetWidth;

            // Fade in
            this.mainContent.style.opacity = '1';
            this.mainContent.style.transition = 'opacity 0.3s ease';

            // Initialize any interactive elements in the new content
            this.initializePageElements();

        } catch (error) {
            console.error('Error loading page:', error);
            this.mainContent.innerHTML = `
                <div class="error-message glass-card" style="text-align: center; padding: 3rem;">
                    <h3 style="color: var(--accent-secondary);">Oops!</h3>
                    <p style="color: var(--text-secondary);">Unable to load content. Please try again.</p>
                </div>
            `;
            this.mainContent.style.opacity = '1';
        }
    }

    initializePageElements() {
        // Add staggered animation to cards
        const cards = this.mainContent.querySelectorAll('.glass-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });

        // Add hover effects to skill tags
        const skillTags = this.mainContent.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-3px) scale(1.02)';
            });
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = '';
            });
        });
    }

    navigateWithArrows(key) {
        const tabs = ['about', 'experience', 'skills', 'education', 'contact'];
        const currentIndex = tabs.indexOf(this.currentTab);

        let newIndex;
        if (key === 'ArrowRight') {
            newIndex = (currentIndex + 1) % tabs.length;
        } else {
            newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        }

        this.switchTab(tabs[newIndex]);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ResumePortfolio();
});

// Add loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
        color: var(--text-secondary);
        font-size: 1.1rem;
    }
    
    .loading::after {
        content: '';
        width: 20px;
        height: 20px;
        margin-left: 10px;
        border: 2px solid var(--accent-primary);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyles);