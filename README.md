# YOUCHEN.DEV — Personal Portfolio & Tech Blog

[![Build Status](https://img.shields.io/badge/build-passing-00FF66?style=for-the-badge&logo=github-actions&logoColor=090d16)](https://github.com/Youchenjiang/Youchen/actions)
[![React](https://img.shields.io/badge/React-18-00F0FF?style=for-the-badge&logo=react&logoColor=090d16)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-A855F7?style=for-the-badge&logo=vite&logoColor=fff)](https://vitejs.dev)
[![Open Code Review](https://img.shields.io/badge/Open--Code--Review-Alibaba-00FF66?style=for-the-badge&logo=github-actions&logoColor=090d16)](https://github.com/alibaba/open-code-review)
[![License](https://img.shields.io/badge/license-MIT-00FF66?style=for-the-badge)](LICENSE)

> Personal Engineering Portfolio and Cybersecurity/AI Research Blog by **Youchen Jiang (蔣侑宸)**. Hosted on GitHub Pages.

---

## 🌟 Key Features

- **Cyberpunk & AI Dark Theme**: Customized HSL dark slate palette (`#090d16`), cyber green accents, hardware-accelerated animations, and sleek typography (`Fira Code` + `Inter`).
- **Interactive Terminal Hero Banner**: Terminal-style profile header featuring `$ whoami` credentials, research focus, and one-click contact copying (`g1014308@gmail.com`).
- **Tab Navigation System**: Seamless toggle between **[Blog Articles]** and **[Projects Portfolio]**.
- **Interactive Projects Showcase**: Categorized portfolio cards with key highlights, technology tags, and direct GitHub repository links.
- **Markdown Article Reader**: Built-in Markdown parser with syntax code highlighting, estimated reading time, and shareable links.
- **Global Search Modal**: Instant keyword search popup triggered by clicking or pressing `Ctrl + K`.
- **Alibaba Open Code Review**: Integrated [`alibaba/open-code-review`](https://github.com/alibaba/open-code-review) GitHub Action for automated AI Code Review and security auditing on PRs.
- **Automated Pre-Commit CI Interception**: Active `.git/hooks/pre-commit` hook automatically running `npm run build` locally before any `git commit` is accepted.
- **GitHub Actions Auto Deployment**: Integrated CI/CD workflow (`.github/workflows/deploy.yml`) deploying to GitHub Pages upon pushing to `main`.

---

## 🛠️ Tech Stack

- **Core**: React 18, Vite 5, JavaScript (ESNext)
- **Styling**: Modern Vanilla CSS, CSS Variables, Glassmorphism & GPU Acceleration (`transform: translateZ(0)`)
- **Icons**: Lucide React
- **Markdown Parser**: Marked
- **Code Review & CI/CD**: Alibaba Open Code Review, Qodo PR Agent, GitHub Actions, Automated Git Pre-commit Hooks

---

## 🚀 Quick Start & Local Preview

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/Youchenjiang/Youchen.git
cd Youchen

# Install dependencies (automatically installs Git pre-commit hook)
npm install

# Start local dev server (http://localhost:5173/Youchen/)
npm run dev
```

### Production Build & Automated Testing

```bash
# Run Playwright automated UI regression tests across viewports
npm test

# Manually run local production build
npm run build

# Preview build locally
npm run preview
```

---

## 📁 Repository Structure & Documentation

```
Youchen/
├── .agents/
│   └── AGENTS.md               # Mandatory repository guidelines & feature-level atomic commit rules
├── .github/
│   ├── pull_request_template.md # PR description & Open Code Review template
│   └── workflows/
│       ├── deploy.yml           # GitHub Pages automated CI/CD workflow
│       └── open-code-review.yml # Alibaba Open Code Review GitHub Action workflow
├── .pr_agent.toml               # Automated PR Agent & Qodo Review config
├── docs/                        # Project Documentation Storage
│   ├── architecture.md          # UI & System Architecture specification
│   └── deployment.md            # GitHub Pages deployment & Pre-commit Hook guidelines
├── scripts/
│   ├── pre-commit.sh            # Local pre-commit CI bash hook script
│   └── install-hooks.js         # Auto-installer script for Git hooks
├── src/
│   ├── components/              # Modular UI components (Navbar, HeroTerminal, etc.)
│   ├── data/                    # Articles & Projects data sources (posts.js, projects.js)
│   └── styles/                  # High-performance design system (index.css)
├── vite.config.js               # Vite config with base path '/Youchen/'
└── README.md
```

---

## 📄 Documentation Links

- [Repository Guidelines & Rules (`.agents/AGENTS.md`)](file:///.agents/AGENTS.md)
- [Architecture Specification (`docs/architecture.md`)](file:///docs/architecture.md)
- [Deployment & Pre-commit Hook Guidelines (`docs/deployment.md`)](file:///docs/deployment.md)

---

## ✉️ Contact

- **Name**: Youchen Jiang (蔣侑宸)
- **Email**: [g1014308@gmail.com](mailto:g1014308@gmail.com)
- **GitHub**: [github.com/Youchenjiang](https://github.com/Youchenjiang)