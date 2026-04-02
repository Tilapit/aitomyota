import React, { useEffect, useState } from 'react';

interface NavbarProps {
  onOpenQuiz: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 60px',
        background: scrolled ? 'rgba(250,246,240,0.95)' : 'rgba(250,246,240,0.15)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled
          ? '1px solid rgba(196,103,74,0.1)'
          : '1px solid rgba(250,246,240,0.2)',
        transition: 'background 0.4s',
      }}
    >
      {/* Logo — alkuperäinen SVG täsmälleen */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <svg width="130" height="42" viewBox="0 0 130 42" fill="none">
          <text
            x="0"
            y="25"
            fontFamily="Georgia,serif"
            fontSize="23"
            fontWeight="600"
            fill="#1E1610"
            letterSpacing="-0.6"
          >
            Myötä
          </text>
          <path
            d="M1 36 C9 30,15 27,23 32 C31 39,37 40,45 35 C53 29,59 27,67 31 C73 34,77 36,83 35"
            stroke="#C4674A"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="88" cy="35" r="2.6" fill="#C4674A" />
        </svg>
      </a>

      {/* Nav links */}
      <ul style={{ listStyle: 'none', display: 'flex', gap: '32px', alignItems: 'center', margin: 0, padding: 0 }}>
        <li>
          <a
            href="#miten"
            style={{
              textDecoration: 'none',
              color: 'var(--ink)',
              fontSize: '14px',
              fontWeight: 600,
              opacity: 0.85,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--terra)'; e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.opacity = '0.85'; }}
          >
            Miten toimii
          </a>
        </li>
        <li>
          <a
            href="#terapeutit"
            style={{
              textDecoration: 'none',
              color: 'var(--ink)',
              fontSize: '14px',
              fontWeight: 600,
              opacity: 0.85,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--terra)'; e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.opacity = '0.85'; }}
          >
            Terapeutit
          </a>
        </li>
        <li>
          <button
            onClick={onOpenQuiz}
            style={{
              background: 'var(--terra)',
              color: 'white',
              border: 'none',
              borderRadius: '100px',
              padding: '10px 22px',
              fontFamily: 'Nunito, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 3px 14px rgba(196,103,74,0.35)',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--terra-mid)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--terra)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            Aloita matching
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
