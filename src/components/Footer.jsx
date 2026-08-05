import React from 'react';
import { Shield, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(9, 13, 22, 0.9)',
      padding: '3rem 0 2rem 0',
      marginTop: '4rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={20} color="var(--accent-green)" />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.05em'
          }}>
            YOUCHEN<span style={{ color: 'var(--accent-green)' }}>.SEC</span>
          </span>
        </div>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
          maxWidth: '500px',
          lineHeight: 1.6
        }}>
          National Central University — Network Security Laboratory
          <br/>
          Focusing on LLM Security Repair & AI Systems.
        </p>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          fontSize: '0.85rem',
          fontFamily: 'var(--font-mono)'
        }}>
          <a href="https://github.com/Youchenjiang" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="cyber-link">
            GitHub Profile
          </a>
          <a href="mailto:g1014308@gmail.com" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="cyber-link">
            g1014308@gmail.com
          </a>
        </div>

        <div style={{
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          width: '100%'
        }}>
          © {new Date().getFullYear()} Youchen Jiang (蔣侑宸). All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
