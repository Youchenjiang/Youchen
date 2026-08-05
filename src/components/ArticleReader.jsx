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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  // Convert markdown string to html with sanitization to prevent XSS
  const htmlContent = marked.parse(post.content || '', { sanitizer: marked.sanitizer.sanitize });

  return (
    <div style={{ padding: '2rem 0 4rem 0' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            transition: 'all 0.2s'
          }}
          className="cyber-btn-outline"
        >
          <ArrowLeft size={16} />
          <span>返回文章列表</span>
        </button>

        {/* Article Container Header */}
        <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="cyber-badge">{post.category}</span>
            {tags.map(t => (
              <span key={t} className="cyber-badge cyan">#{t}</span>
            ))}
          </div>

          <h1 style={{
            fontSize: '2.1rem',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.3,
            marginBottom: '1rem'
          }}>
            {post.title}
          </h1>

          {post.subtitle && (
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              fontStyle: 'italic'
            }}>
              {post.subtitle}
            </p>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fff' }}>
                <User size={15} color="var(--accent-green)" />
                {post.author}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={15} />
                {post.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={15} />
                {post.readTime}
              </span>
            </div>

            <button
              onClick={copyArticleLink}
              style={{
                background: 'transparent',
                border: 'none',
                color: copied ? 'var(--accent-green)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              {copied ? <Check size={16}/> : <Share2 size={16}/>}
              <span>{copied ? '連結已複製' : '分享文章'}</span>
            </button>
          </div>
        </div>

        {/* Article Body Content */}
        <div 
          className="glass-card article-content"
          style={{ padding: '2.5rem' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
