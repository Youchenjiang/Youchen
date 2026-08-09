import { Shield, BookOpen, Layers, Search, Github } from 'lucide-react';

/**
 * Navbar Component
 * Main header navigation bar featuring brand identity, view switching tabs, search modal, and GitHub link.
 *
 * @param {Object} props
 * @param {string} props.activeTab - Currently active navigation tab ('terminal' | 'blog' | 'projects')
 * @param {Function} props.onChangeTab - Tab change callback
 * @param {Function} [props.onOpenSearch=()=>{}] - Callback to trigger search modal
 * @param {Function} [props.onResetView=()=>{}] - Callback to reset view to home
 */
export default function Navbar({ activeTab, onChangeTab = () => {}, onOpenSearch = () => {}, onResetView = () => {} }) {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div
          onClick={onResetView}
          className="navbar-brand"
        >
          <div className="navbar-brand-bg">
            <Shield size={22} color="var(--accent-green)" />
          </div>
          <div className="navbar-brand-text">
            <span className="navbar-brand-name">
              YOUCHEN<span className="navbar-domain">.DEV</span>
            </span>
            <div className="navbar-brand-tagline">
              PORTFOLIO & TECH BLOG
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Controls */}
        <div className="navbar-tabs">
          <button
            className={`navbar-tab ${activeTab === 'blog' ? 'active' : ''}`}
            onClick={() => onChangeTab('blog')}
          >
            <BookOpen size={14} />
            <span>Blog 文章</span>
          </button>

          <button
            className={`navbar-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => onChangeTab('projects')}
          >
            <Layers size={14} />
            <span>Projects 作品集</span>
          </button>
        </div>

        {/* Search & GitHub Link */}
        <div className="navbar-actions">
          <button
            className="navbar-search-btn"
            onClick={onOpenSearch}
          >
            <Search size={16} color="var(--accent-green)" />
            <span>搜尋...</span>
            <kbd className="navbar-shortcut">Ctrl K</kbd>
          </button>

          <a
            href="https://github.com/Youchenjiang"
            target="_blank"
            rel="noreferrer"
            className="cyber-btn-outline navbar-github-link"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}