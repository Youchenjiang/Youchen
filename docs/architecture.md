# System Architecture Specification — YOUCHEN.DEV

This document describes the architectural layout, component responsibility breakdown, and data flow of the `Youchen` Portfolio & Tech Blog application.

---

## 1. System Overview

The application is built as an ultra-fast, static Single Page Application (SPA) leveraging **React 18** and **Vite 5**. It compiles into static HTML/JS/CSS bundles served directly via **GitHub Pages**.

---

## 2. Component Hierarchy & Responsibilities

```
App.jsx (Root State & Layout Container)
├── Navbar.jsx (Sticky Header, Tab Navigation, Search Trigger, Brand Logo)
├── HeroTerminal.jsx (Interactive Terminal Profile Header with $ whoami)
├── View Container (State-driven View Switch)
│   ├── Blog View (activeTab === 'blog')
│   │   ├── TagFilter.jsx (Category & Tag Filter Pills)
│   │   └── ArticleCard.jsx (Post Cards Grid)
│   ├── Article Reader View (selectedPostId !== null)
│   │   └── ArticleReader.jsx (Markdown parser & Full Article Viewer)
│   └── Projects View (activeTab === 'projects')
│       └── ProjectsSection.jsx (Categorized Project Portfolio Grid)
├── SearchModal.jsx (Global Search Command-Palette Overlay, Ctrl+K)
└── Footer.jsx (Copyright, Contact Info, External Links)
```

---

## 3. Data Sources

- **`src/data/posts.js`**: Contains structured article metadata and Markdown content strings.
- **`src/data/projects.js`**: Contains project portfolio entries, key highlights, tech stacks, and GitHub repository links.

---

## 4. UI Performance & CSS Design System

- **Design System (`src/styles/index.css`)**: Implements standard CSS custom variables for colors, fonts (`Fira Code` & `Inter`), and layout grids.
- **Rendering Performance**: Uses `transform: translateZ(0)` to trigger GPU compositing layers, completely avoiding heavy `backdrop-filter: blur(...)` repaints during window scrolling.
