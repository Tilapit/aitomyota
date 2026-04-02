import React, { useEffect, useState } from 'react';

interface NavbarProps {
  onOpenQuiz: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
        padding: '0 48px',
        height: '72px',
        background: scrolled ? 'rgba(250, 246, 240, 0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(196,103,74,0.12)' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
          <rect width="56" height="56" rx="14" fill="#C4674A" />
          <path
            d="M8 34 C13 29,17 27,22 31 C27 36,31 37,36 32 C40 28,44 27,48 30"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="50" cy="31" r="3.2" fill="white" />
        </svg>
        <span
          style={{
            fontFamily: 'Lora, serif',
            fontSize: '22px',
            fontWeight: 600,
            color: 'var(--ink)',
            letterSpacing: '-0.3px',
          }}
        >
          Myötä
        </span>
      </a>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <a
          href="#how-it-works"
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--ink-mid)',
            textDecoration: 'none',
            letterSpacing: '0.2px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--terra)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-mid)')}
        >
          Miten toimii
        </a>
        <a
          href="#therapists"
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--ink-mid)',
            textDecoration: 'none',
            letterSpacing: '0.2px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--terra)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-mid)')}
        >
          Terapeutit
        </a>
        <button
          onClick={onOpenQuiz}
          style={{
            background: 'var(--terra)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '10px 24px',
            fontFamily: 'Nunito, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.2px',
            transition: 'background 0.2s ease, transform 0.2s ease',
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
      </div>
    </nav>
  );
};

export default Navbar;
