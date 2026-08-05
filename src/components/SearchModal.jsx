import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Shield } from 'lucide-react';

/**
 * SearchModal Component
 * Provides a global search modal overlay to filter articles by title, summary, or tags.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls overlay visibility
 * @param {Function} props.onClose - Modal close handler
 * @param {Array} props.posts - Array of article objects
 * @param {Function} props.onSelectPost - Handler invoked when an article is selected
 */
export default function SearchModal({ isOpen = false, onClose, posts = [], onSelectPost }) {
  const [query, setQuery] = useState('');

  // Close on Escape key for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query when modal opens
  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const safePosts = Array.isArray(posts) ? posts : [];
  const filteredPosts = safePosts.filter(post => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const titleMatch = post.title?.toLowerCase().includes(q) ?? false;
    const summaryMatch = post.summary?.toLowerCase().includes(q) ?? false;
    const tagMatch = post.tags?.some(t => t.toLowerCase().includes(q)) ?? false;
    return titleMatch || summaryMatch || tagMatch;
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '10vh'
    }}>
      <div 
        className="glass-card"
        style={{
          width: '90%',
          maxWidth: '650px',
          padding: '1.25rem',
          border: '1px solid var(--accent-green)',
          boxShadow: '0 0 30px rgba(0, 255, 102, 0.2)'
        }}
      >
        {/* Input Field */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <Search size={20} color="var(--accent-green)" />
          <input
            type="text"
            placeholder="關鍵字搜尋 (例如: Android, LLM, PicoCTF, Web)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '1rem',
              fontFamily: 'var(--font-mono)'
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingTop: '1rem' }}>
          {filteredPosts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)'
            }}>
              無匹配的文章結果
            </div>
          ) : (
            filteredPosts.map(post => (
              <div
                key={post.id}
                onClick={() => {
                  onSelectPost(post.id);
                  onClose();
                }}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: 'rgba(255,255,255,0.02)',
                  marginBottom: '0.5rem',
                  border: '1px solid transparent',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 102, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 102, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="cyber-badge" style={{ fontSize: '0.65rem' }}>{post.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {post.date}
                  </span>
                </div>
                <h4 style={{ color: '#fff', fontSize: '1rem', marginTop: '0.4rem', marginBottom: '0.3rem' }}>
                  {post.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {post.summary.slice(0, 80)}...
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
