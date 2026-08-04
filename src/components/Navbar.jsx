import React from 'react';
import { Shield, Search, Terminal, Github, BookOpen, Layers, Code2 } from 'lucide-react';

export default function Navbar({ activeTab, onChangeTab, onOpenSearch, onResetView }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(9, 13, 22, 0.95)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      transform: 'translateZ(0)'
    }}>
      <div className="container" style={{
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={onResetView}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(0,255,102,0.2), rgba(0,240,255,0.2))',
            border: '1px solid var(--accent-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px var(--accent-green-glow)'
          }}>
            <Shield size={22} color="var(--accent-green)" />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '1.2rem',
              letterSpacing: '0.05em',
              color: '#ffffff'
            }}>
              YOUCHEN<span style={{ color: 'var(--accent-green)' }}>.DEV</span>
            </span>
            <div style={{
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)'
            }}>
              PORTFOLIO & TECH BLOG
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(255,255,255,0.03)',
          padding: '0.25rem',
          borderRadius: '8px',
          border: '1px solid var(--border-color)'
        }}>
          <button
            onClick={() => onChangeTab('blog')}
            style={{
              background: activeTab === 'blog' ? 'var(--accent-green)' : 'transparent',
              color: activeTab === 'blog' ? 'var(--bg-primary)' : 'var(--text-secondary)',
              border: 'none',
              padding: '0.4rem 0.9rem',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'blog' ? '700' : '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s'
            }}
          >
            <BookOpen size={14} />
            <span>Blog 文章</span>
          </button>

          <button
            onClick={() => onChangeTab('projects')}
            style={{
              background: activeTab === 'projects' ? 'var(--accent-green)' : 'transparent',
              color: activeTab === 'projects' ? 'var(--bg-primary)' : 'var(--text-secondary)',
              border: 'none',
              padding: '0.4rem 0.9rem',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'projects' ? '700' : '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s'
            }}
          >
            <Layers size={14} />
            <span>Projects 作品集</span>
          </button>
        </div>

        {/* Search & GitHub Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={onOpenSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.2s'
            }}
            className="search-trigger-btn"
          >
            <Search size={16} color="var(--accent-green)" />
            <span>搜尋...</span>
            <kbd style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '0.1rem 0.4rem',
              borderRadius: '4px',
              fontSize: '0.75rem'
            }}>Ctrl K</kbd>
          </button>

          <a 
            href="https://github.com/Youchenjiang" 
            target="_blank" 
            rel="noreferrer"
            className="cyber-btn-outline"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
