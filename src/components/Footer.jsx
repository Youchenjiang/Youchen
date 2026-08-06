import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  const year = import.meta.env.VITE_COPYRIGHT_YEAR || new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <Shield size={20} color="var(--accent-green)" />
          <span className="footer-brand-text">
            YOUCHEN<span className="footer-brand-text accent-green">.SEC</span>
          </span>
        </div>

        <p className="footer-description">
          National Central University — Network Security Laboratory
          <br/>
          Focusing on LLM Security Repair & AI Systems.
        </p>

        <div className="footer-links">
          <a href="https://github.com/Youchenjiang" target="_blank" rel="noreferrer" className="footer-links link">
            GitHub Profile
          </a>
          <a href="mailto:g1014308@gmail.com" className="footer-links link">
            g1014308@gmail.com
          </a>
        </div>

        <div className="footer-copyright">
          © {year} Youchen Jiang (�蔣�侑�宸). All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}