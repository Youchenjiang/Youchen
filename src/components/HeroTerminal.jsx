import React, { useState } from 'react';
import { Terminal, Shield, Cpu, Code2, Sparkles, Copy, Check } from 'lucide-react';

export default function HeroTerminal() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const copyContact = async () => {
    try {
      const email = import.meta.env.VITE_CONTACT_EMAIL || 'g1014308@gmail.com';
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  };

  return (
    <section className="hero-terminal">
      <div className="container">
        <div className="terminal-window">
          {/* Terminal Titlebar */}
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="hero-terminal-header-info">
              <Terminal size={14} color="var(--accent-green)" />
              <span>youchen@cyber-lab:~ (zsh)</span>
            </div>
            <div className="cyber-badge hero-terminal-system-badge">
              ● SYSTEM ONLINE
            </div>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body">
            <div className="hero-terminal-prompt-container">
              <span className="terminal-prompt">$</span>
              <span className="hero-terminal-command">whoami --verbose</span>
            </div>

            <div className="hero-terminal-whoami-box">
              <h1 className="hero-terminal-name">
                Youchen Jiang (蔣侑宸)
                <Sparkles size={18} color="var(--accent-green)" />
              </h1>
              <p className="hero-terminal-title">
                Master Student @ NCU Network Security Laboratory
              </p>
              <div className="hero-terminal-badges">
                <span className="cyber-badge"><Shield size={12}/> Cybersecurity</span>
                <span className="cyber-badge cyan"><Cpu size={12}/> AI Application</span>
                <span className="cyber-badge purple"><Code2 size={12}/> Full-Stack Dev</span>
              </div>
            </div>

            <div className="hero-terminal-core-focus-label">
              <span className="terminal-prompt">$</span>
              <span>cat core_focus.txt</span>
            </div>
            <div className="hero-terminal-core-focus-text">
              主修程式碼安全自動化修復、LLM AI 應用落地方案、與 Web 攻擊防禦測試。在此分享近期的研究心得與實務筆記。
            </div>

            <div className="hero-terminal-footer">
              <div className="hero-terminal-footer-info">
                <span className="hero-terminal-footer-label">Location: <strong className="hero-terminal-footer-value">Taoyuan / Pingtung, TW</strong></span>
                <span className="hero-terminal-footer-label">Status: <strong className="hero-terminal-footer-value">Building AI & Security Tools</strong></span>
              </div>
              <button
                onClick={copyContact}
                className={`hero-terminal-copy-button ${copied ? 'copied' : copyError ? 'error' : 'default'}`}
              >
                {copied ? <Check size={14}/> : <Copy size={14}/>}
                <span>{copied ? '已複製 Email' : copyError ? '複製失敗，請重試' : 'Copy Contact'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
