import React from 'react';
import { Calendar, Clock, ArrowRight, Shield, Cpu, Tag, Star } from 'lucide-react';

/**
 * ArticleCard Component
 * Displays a summary card for a blog article with tag badges, reading time, and click handler.
 *
 * @param {Object} props
 * @param {Object} props.post - Article data object
 * @param {Function} props.onSelectPost - Handler invoked when card is clicked
 */
export default function ArticleCard({ post = {}, onSelectPost }) {
  if (!post || !post.id) return null;

  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <article 
      className="glass-card"
      onClick={() => onSelectPost?.(post.id)}
      style={{
        padding: '1.75rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {post.featured && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontSize: '0.7rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--accent-green)',
          background: 'rgba(0, 255, 102, 0.1)',
          padding: '0.2rem 0.6rem',
          borderRadius: '20px',
          border: '1px solid rgba(0,255,102,0.3)'
        }}>
          <Star size={12} fill="var(--accent-green)"/>
          <span>FEATURED RESEARCH</span>
        </div>
      )}

      <div>
        {/* Category & Tags */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.9rem' }}>
          <span className={`cyber-badge ${post.category === 'AI Application' ? 'cyan' : ''}`}>
            {post.category === 'AI Application' ? <Cpu size={12}/> : <Shield size={12}/>}
            {post.category}
          </span>
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              background: 'rgba(255,255,255,0.03)',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '0.6rem',
          lineHeight: 1.4,
          transition: 'color 0.2s'
        }}>
          {post.title}
        </h2>

        {/* Subtitle / Excerpt */}
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.92rem',
          lineHeight: 1.6,
          marginBottom: '1.25rem'
        }}>
          {post.summary}
        </p>
      </div>

      {/* Meta Details & Action */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Calendar size={13} />
            {post.date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Clock size={13} />
            {post.readTime}
          </span>
        </div>

        <span style={{
          color: 'var(--accent-green)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontWeight: 600
        }}>
          閱讀內文 <ArrowRight size={14} />
        </span>
      </div>
    </article>
  );
}
