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
      className="article-card glass-card"
      onClick={() => onSelectPost?.(post.id)}
    >
      {post.featured && (
        <div className="article-featured-badge">
          <Star size={12} fill="var(--accent-green)"/>
          <span>FEATURED RESEARCH</span>
        </div>
      )}

      <div>
        {/* Category & Tags */}
        <div className="article-tags">
          <span className={`cyber-badge ${post.category === 'AI Application' ? 'cyan' : ''}`}>
            {post.category === 'AI Application' ? <Cpu size={12}/> : <Shield size={12}/>}
            {post.category}
          </span>
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="article-tag">
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="article-title">
          {post.title}
        </h2>

        {/* Subtitle / Excerpt */}
        <p className="article-subtitle">
          {post.summary}
        </p>
      </div>

      {/* Meta Details & Action */}
      <div className="article-meta">
        <div className="article-meta-left">
          <span className="article-meta-item">
            <Calendar size={13} />
            {post.date}
          </span>
          <span className="article-meta-item">
            <Clock size={13} />
            {post.readTime}
          </span>
        </div>

        <span className="article-action">
          閱讀內文 <ArrowRight size={14} />
        </span>
      </div>
    </article>
  );
}
