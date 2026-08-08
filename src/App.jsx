import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  const allTags = useMemo(() => {
    return ['ALL', ...Array.from(new Set(POSTS.flatMap(p => [p.category, ...(p.tags || [])])))];
  }, []);

  // Filter posts based on active tag with null guard
  const filteredPosts = useMemo(() => {
    if (!activeTag || activeTag === 'ALL') return POSTS;
    return POSTS.filter(p => p.category === activeTag || (Array.isArray(p.tags) && p.tags.includes(activeTag)));
  }, [activeTag]);

  const currentPost = POSTS.find(p => p.id === selectedPostId);

  return (
    <div className="app-container">
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
      <main className="main-content">
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
              <section className="blog-section-padding">
                <div className="container">
                  <div className="blog-header-container">
                    <h3 className="blog-header-title">
                      <span className="accent-green-text">[#]</span> LATEST RESEARCH & ARTICLES
                    </h3>
                    <span className="blog-header-count">
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
                  <div className="blog-posts-grid">
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
