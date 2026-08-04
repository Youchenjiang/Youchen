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
    <section style={{ paddingBottom: '3rem' }}>
      <div className="container">
        {/* Section Title */}
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
            <span style={{ color: 'var(--accent-green)' }}>[#]</span> FEATURED PROJECTS & PORTFOLIO
          </h3>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            Total: {filteredProjects.length} project(s)
          </span>
        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          flexWrap: 'wrap',
          margin: '1rem 0 2rem 0'
        }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: isActive ? 'var(--accent-green)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
                  padding: '0.35rem 0.9rem',
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
                <Layers size={13} />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="glass-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                {/* Header Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="cyber-badge cyan" style={{ fontSize: '0.7rem' }}>
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="cyber-badge" style={{ fontSize: '0.65rem' }}>
                      <Sparkles size={10} /> FEATURED
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '0.4rem',
                  lineHeight: 1.3
                }}>
                  {project.title}
                </h3>

                <p style={{
                  color: 'var(--accent-green)',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '1rem'
                }}>
                  {project.subtitle}
                </p>

                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  marginBottom: '1.25rem'
                }}>
                  {project.summary}
                </p>

                {/* Highlights List */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  padding: '0.8rem 1rem',
                  marginBottom: '1.25rem',
                  border: '1px solid rgba(255,255,255,0.04)'
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    marginBottom: '0.4rem'
                  }}>
                    KEY HIGHLIGHTS:
                  </div>
                  {project.highlights.map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.4rem',
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.3rem'
                    }}>
                      <CheckCircle2 size={13} color="var(--accent-green)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Tech Stack & Github Link */}
              <div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginBottom: '1rem'
                }}>
                  {project.tags.map((t) => (
                    <span key={t} style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      background: 'rgba(255,255,255,0.04)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px'
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.9rem',
                  borderTop: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                    className="cyber-btn-outline"
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
