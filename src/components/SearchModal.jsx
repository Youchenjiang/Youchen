import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

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
      if (e.key === 'Escape') {
        onClose?.();
      }
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
    <div className="search-modal-overlay">
      <div className="search-modal-card">
        {/* Input Field */}
        <div className="search-modal-input-field">
          <Search size={20} color="var(--accent-green)" />
          <input
            type="text"
            placeholder="關鍵字搜尋 (例如: Android, LLM, PicoCTF, Web)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="search-modal-input"
          />
          <button
            onClick={onClose}
            className="search-modal-close-button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results List */}
        <div className="search-modal-results">
          {filteredPosts.length === 0 ? (
            <div className="search-modal-no-results">
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
                className="search-modal-result-item"
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add('search-modal-result-item-hover');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove('search-modal-result-item-hover');
                }}
              >
                <div className="search-modal-result-header">
                  <span className="cyber-badge search-modal-category-badge">{post.category}</span>
                  <span className="search-modal-date">
                    {post.date}
                  </span>
                </div>
                <h4 className="search-modal-result-title">
                  {post.title}
                </h4>
                <p className="search-modal-result-summary">
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