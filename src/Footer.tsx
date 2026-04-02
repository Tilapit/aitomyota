import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      {/* Wave into footer */}
      <div style={{ lineHeight: 0, background: '#2A1F18' }}>
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '70px' }}>
          <path d="M0,35 C360,70 720,0 1080,35 C1260,52 1380,25 1440,35 L1440,70 L0,70 Z" fill="#FAF6F0"/>
        </svg>
      </div>

      <footer style={{
        background: '#2A1F18',
        padding: '60px 72px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <a href="#" style={{ marginBottom: '20px', textDecoration: 'none' }}>
          <svg width="130" height="42" viewBox="0 0 130 42" fill="none">
            <text x="0" y="25" fontFamily="Georgia,serif" fontSize="23" fontWeight="600" fill="#FAF6F0" letterSpacing="-0.6">Myötä</text>
            <path d="M1 36 C9 30,15 27,23 32 C31 39,37 40,45 35 C53 29,59 27,67 31 C73 34,77 36,83 35" stroke="#E0957C" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <circle cx="88" cy="35" r="2.6" fill="#E0957C"/>
          </svg>
        </a>

        {/* Quote */}
        <p style={{
          fontFamily: 'Lora, serif',
          fontStyle: 'italic',
          fontSize: '18px',
          color: 'rgba(250,246,240,0.75)',
          maxWidth: '440px',
          lineHeight: 1.6,
          margin: '0 0 32px',
        }}>
          "Ensimmäisen terapiakerran pitäisi tuntua turvalliselta, ei arvaukselta."
        </p>

        {/* Links */}
        <div style={{ display: 'flex', gap: '32px', marginBottom: '40px' }}>
          {['Tietosuoja', 'Terapeuteille', 'Yhteystiedot'].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: '13px',
                color: 'rgba(250,246,240,0.4)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(250,246,240,0.8)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,246,240,0.4)')}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div style={{ fontSize: '11px', color: 'rgba(250,246,240,0.2)', letterSpacing: '0.05em' }}>
          © 2026 Myötä · Helsinki, Suomi
        </div>
      </footer>
    </>
  );
};

export default Footer;
