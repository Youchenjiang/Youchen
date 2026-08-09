import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, User, Share2, Tag, BookOpen, Check, Copy } from 'lucide-react';
import { marked } from 'marked';

/**
 * ArticleReader Component
 * Renders full markdown content for a single article with meta header, author details, and back action.
 *
 * @param {Object} props
 * @param {Object} props.post - Article data object containing markdown content
 * @param {Function} props.onBack - Callback to return to article list view
 */
export default function ArticleReader({ post = {}, onBack }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [post]);

  const copyArticleLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(false);
    }
  };

  if (!post || !post.title) return null;

  const tags = Array.isArray(post.tags) ? post.tags : [];
  // Parse markdown content safely to HTML string
  const htmlContent = marked.parse(post.content || '');

  return (
    <div className="article-reader-container">
      <div className="article-reader-content">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="article-reader-back-button cyber-btn-outline"
        >
          <ArrowLeft size={16} />
          <span>返回文章列表</span>
        </button>

        {/* Article Container Header */}
        <div className="article-reader-header glass-card">
          <div className="article-reader-meta-row">
            <span className="cyber-badge">{post.category}</span>
            {tags.map(t => (
              <span key={t} className="cyber-badge cyan">#{t}</span>
            ))}
          </div>

          <h1 className="article-reader-title">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="article-reader-subtitle">
              {post.subtitle}
            </p>
          )}

          <div className="article-reader-meta-section">
            <div className="article-reader-meta-left">
              <span className="article-reader-meta-icon-text color-white">
                <User size={15} color="var(--accent-green)" />
                {post.author || 'Youchen Jiang'}
              </span>
              <span className="article-reader-meta-icon-text color-text-secondary">
                <Calendar size={15} />
                {post.date || '2026-03-01'}
              </span>
              <span className="article-reader-meta-icon-text color-text-secondary">
                <Clock size={15} />
                {post.readTime || '5 min read'}
              </span>
            </div>

            <button
              onClick={copyArticleLink}
              className={`cyber-btn-outline ${copied ? 'copied-active' : ''}`}
            >
              {copied ? <Check size={16}/> : <Share2 size={16}/>}
              <span>{copied ? '連結已複製' : '分享文章'}</span>
            </button>
          </div>
        </div>

        {/* Article Body Content */}
        <div
          className="glass-card article-reader-content-section article-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
