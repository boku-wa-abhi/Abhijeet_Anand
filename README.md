# Abhijeet Anand - Portfolio Website

A modern, tab-based resume portfolio website showcasing my experience as a Data Scientist & Analytics Expert.

## 🌐 Live Site

Visit: [abhijeetanand.com](https://abhijeetanand.com) *(or your custom domain)*

## 📁 Project Structure

```
Abhijeet_Anand/
├── index.html          # Main entry point with navigation
├── styles.css          # Complete design system (dark mode, glassmorphism)
├── script.js           # Tab navigation and dynamic page loading
├── CNAME               # Custom domain configuration
├── README.md           # This file
├── pages/              # Modular page content
│   ├── about.html      # About section
│   ├── experience.html # Work experience details
│   ├── skills.html     # Technical skills
│   ├── education.html  # Education background
│   └── contact.html    # Contact information
└── resources/          # Static assets
    └── Abhijeet_Anand_Data Scientist_20240704.pdf  # Resume PDF
```

## ✨ Features

- **Modern Design**: Dark mode with glassmorphism effects and gradient accents
- **Tab-Based Navigation**: Smooth transitions between sections
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Modular**: Each section is in a separate file for easy editing
- **Fast**: Page content is cached after first load
- **Accessible**: Keyboard navigation support (arrow keys)

## 🛠️ Technologies

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, flexbox, grid, animations
- **JavaScript** - Vanilla JS with dynamic page loading
- **Font Awesome** - Icons
- **Google Fonts** - Inter font family

## 🚀 Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/boku-wa-abhi/Abhijeet_Anand.git
   cd Abhijeet_Anand
   ```

2. Serve locally (requires Node.js):
   ```bash
   npx serve
   ```

3. Open `http://localhost:3000` in your browser

## 📝 Editing Content

Each section can be edited independently:

| Section | File | Description |
|---------|------|-------------|
| About | `pages/about.html` | Introduction and focus areas |
| Experience | `pages/experience.html` | Work history and achievements |
| Skills | `pages/skills.html` | Technical skills by category |
| Education | `pages/education.html` | Academic background |
| Contact | `pages/contact.html` | Contact links and resume download |

## 🎨 Customizing Theme

Theme colors and design tokens are defined in `styles.css` using CSS custom properties:

```css
:root {
    --accent-primary: #6c5ce7;
    --accent-secondary: #a29bfe;
    --bg-primary: #0f0f1a;
    /* ... more variables */
}
```

## 📄 License

© 2024 Abhijeet Anand. All rights reserved.