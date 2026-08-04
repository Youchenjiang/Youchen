import React, { useState } from 'react';
import { Terminal, Shield, Cpu, Code2, Sparkles, Copy, Check } from 'lucide-react';

export default function HeroTerminal() {
  const [copied, setCopied] = useState(false);

  const copyContact = () => {
    navigator.clipboard.writeText('g1014308@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section style={{ padding: '2.5rem 0 1.5rem 0' }}>
      <div className="container">
        <div className="terminal-window">
          {/* Terminal Titlebar */}
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <Terminal size={14} color="var(--accent-green)" />
              <span>youchen@cyber-lab:~ (zsh)</span>
            </div>
            <div className="cyber-badge" style={{ fontSize: '0.65rem' }}>
              ● SYSTEM ONLINE
            </div>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body">
            <div style={{ marginBottom: '0.75rem' }}>
              <span className="terminal-prompt">$</span>
              <span style={{ color: 'var(--accent-cyan)' }}>whoami --verbose</span>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderLeft: '3px solid var(--accent-green)',
              padding: '1rem',
              borderRadius: '0 8px 8px 0',
              marginBottom: '1.25rem'
            }}>
              <h1 style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.5rem',
                color: '#ffffff',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Youchen Jiang (蔣侑宸)
                <Sparkles size={18} color="var(--accent-green)" />
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Master Student @ NCU Network Security Laboratory
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginTop: '0.75rem'
              }}>
                <span className="cyber-badge"><Shield size={12}/> Cybersecurity</span>
                <span className="cyber-badge cyan"><Cpu size={12}/> AI Application</span>
                <span className="cyber-badge purple"><Code2 size={12}/> Full-Stack Dev</span>
              </div>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <span className="terminal-prompt">$</span>
              <span>cat core_focus.txt</span>
            </div>
            <div style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              paddingLeft: '1rem',
              marginBottom: '1.25rem'
            }}>
              主修程式碼安全自動化修復、LLM AI 應用落地方案、與 Web 攻擊防禦測試。在此分享近期的研究心得與實務筆記。
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Location: <strong style={{ color: '#fff' }}>Taoyuan / Pingtung, TW</strong></span>
                <span style={{ color: 'var(--text-muted)' }}>Status: <strong style={{ color: 'var(--accent-green)' }}>Building AI & Security Tools</strong></span>
              </div>
              <button 
                onClick={copyContact}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: copied ? 'var(--accent-green)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                {copied ? <Check size={14}/> : <Copy size={14}/>}
                <span>{copied ? '已複製 Email' : 'Copy Contact'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
