import React from 'react';
import { Tag, Filter } from 'lucide-react';

/**
 * TagFilter Component
 * Renders filter pill buttons for article categories and tags.
 *
 * @param {Object} props
 * @param {string[]} [props.tags=[]] - List of tag labels
 * @param {string} props.activeTag - Currently selected tag
 * @param {Function} props.onSelectTag - Tag selection handler
 */
export default function TagFilter({ tags = [], activeTag, onSelectTag }) {
  const safeTags = Array.isArray(tags) ? tags : [];

  return (
    <div className="tag-filter-container">
      <div className="tag-filter-label">
        <Tag size={16} />
        <span>Tags:</span>
      </div>
      <button
        className={`tag-filter-button ${activeTag === '' ? 'active' : ''}`}
        onClick={() => onSelectTag('')}
      >
        <Filter size={15} color="var(--accent-green)" />
        <span>All</span>
      </button>
      {safeTags.map((tag) => (
        <button
          key={tag}
          className={`tag-filter-button ${activeTag === tag ? 'active' : ''}`}
          onClick={() => onSelectTag(tag)}
        >
          <Tag size={13} />
          <span>{tag}</span>
        </button>
      ))}
    </div>
  );
}