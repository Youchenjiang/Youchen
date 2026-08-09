import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, FolderGit2, CheckCircle2, Shield, Cpu, Layers } from 'lucide-react';
import { PROJECTS } from '../data/projects';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'AI Application', 'Security & AI', 'Full-Stack & Tools', 'Cybersecurity'];

  const filteredProjects = activeCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section className="projects-section">
      <div className="container">
        {/* Section Title */}
        <div className="projects-section-header">
          <h3 className="projects-section-title">
            <span className="projects-section-title-number">[#]</span> FEATURED PROJECTS & PORTFOLIO
          </h3>
          <span className="projects-section-count">
            Total: {filteredProjects.length} project(s)
          </span>
        </div>

        {/* Category Pills */}
        <div className="projects-category-pills">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`projects-category-pill ${isActive ? 'active' : 'default'}`}
              >
                <Layers size={13} />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card projects-card"
            >
              <div>
                {/* Header Badge */}
                <div className="projects-card-header">
                  <span className="cyber-badge projects-category-badge">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="cyber-badge projects-featured-badge">
                      <Sparkles size={10} /> FEATURED
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="projects-title">
                  {project.title}
                </h3>

                <p className="projects-subtitle">
                  {project.subtitle}
                </p>

                <p className="projects-summary">
                  {project.summary}
                </p>

                {/* Highlights List */}
                <div className="projects-highlights">
                  <div className="projects-highlights-label">
                    KEY HIGHLIGHTS:
                  </div>
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="projects-highlight-item">
                      <CheckCircle2 size={13} color="var(--accent-green)" className="projects-highlight-icon" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Tech Stack & Github Link */}
              <div>
                <div className="projects-tags">
                  {project.tags.map((t) => (
                    <span key={t} className="projects-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="projects-footer">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="cyber-btn-outline projects-github-link"
                  >
                    <Github size={15} />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}