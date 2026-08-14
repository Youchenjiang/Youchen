import React from 'react';
import { Tag } from 'lucide-react';

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
        <span>Filter by:</span>
      </div>
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
