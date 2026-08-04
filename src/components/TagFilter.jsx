import React from 'react';
import { Tag, Filter } from 'lucide-react';

export default function TagFilter({ tags, activeTag, onSelectTag }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      flexWrap: 'wrap',
      margin: '1.5rem 0 2rem 0',
      padding: '0.75rem 1rem',
      background: 'rgba(15, 23, 42, 0.5)',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        marginRight: '0.5rem'
      }}>
        <Filter size={15} color="var(--accent-green)" />
        <span>FILTER:</span>
      </div>

      {tags.map((tag) => {
        const isActive = activeTag === tag;
        return (
          <button
            key={tag}
            onClick={() => onSelectTag(tag)}
            style={{
              background: isActive ? 'var(--accent-green)' : 'rgba(255, 255, 255, 0.04)',
              color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
              border: isActive ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
              padding: '0.3rem 0.8rem',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: isActive ? '700' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Tag size={12} />
            <span>{tag}</span>
          </button>
        );
      })}
    </div>
  );
}
