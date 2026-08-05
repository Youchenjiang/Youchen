import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroTerminal from './components/HeroTerminal';
import TagFilter from './components/TagFilter';
import ArticleCard from './components/ArticleCard';
import ArticleReader from './components/ArticleReader';
import ProjectsSection from './components/ProjectsSection';
import SearchModal from './components/SearchModal';
import Footer from './components/Footer';
import { POSTS } from './data/posts';

export default function App() {
  const [activeTab, setActiveTab] = useState('blog'); // 'blog' | 'projects'
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [activeTag, setActiveTag] = useState('ALL');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcuts: Ctrl+K to toggle search, Escape to close
  const handleGlobalKeyDown = useCallback((e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsSearchOpen((prev) => !prev);
    }
    if (e.key === 'Escape' && isSearchOpen) {
      setIsSearchOpen(false);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleGlobalKeyDown]);

  // Extract all unique tags for blog
  const allTags = ['ALL', ...Array.from(new Set(POSTS.flatMap(p => [p.category, ...p.tags])))];

  // Filter posts based on active tag
  const filteredPosts = activeTag === 'ALL'
    ? POSTS
    : POSTS.filter(p => p.category === activeTag || p.tags.includes(activeTag));

  const currentPost = POSTS.find(p => p.id === selectedPostId);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Grid background effect */}
      <div className="grid-bg"></div>

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab);
          setSelectedPostId(null);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onResetView={() => {
          setActiveTab('blog');
          setSelectedPostId(null);
          setActiveTag('ALL');
        }}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentPost ? (
          <ArticleReader
            post={currentPost}
            onBack={() => setSelectedPostId(null)}
          />
        ) : (
          <>
            {/* Terminal Hero Profile Banner */}
            <HeroTerminal />

            {/* View Switch: Blog Articles vs Projects Showcase */}
            {activeTab === 'blog' ? (
              <section style={{ paddingBottom: '3rem' }}>
                <div className="container">
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '0.75rem'
                  }}>
                    <h3 style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.25rem',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ color: 'var(--accent-green)' }}>[#]</span> LATEST RESEARCH & ARTICLES
                    </h3>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}>
                      Total: {filteredPosts.length} post(s)
                    </span>
                  </div>

                  {/* Filter Pills */}
                  <TagFilter
                    tags={allTags}
                    activeTag={activeTag}
                    onSelectTag={setActiveTag}
                  />

                  {/* Article Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {filteredPosts.map(post => (
                      <ArticleCard
                        key={post.id}
                        post={post}
                        onSelectPost={(id) => setSelectedPostId(id)}
                      />
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              <ProjectsSection />
            )}
          </>
        )}
      </main>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={POSTS}
        onSelectPost={(id) => {
          setActiveTab('blog');
          setSelectedPostId(id);
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
