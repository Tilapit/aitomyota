import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: 'var(--cream)',
        padding: '56px 32px 40px',
      }}
    >
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <svg width="32" height="32" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
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
              <span style={{ fontFamily: 'Lora, serif', fontSize: '20px', fontWeight: 600, color: 'var(--cream)' }}>
                Myötä
              </span>
            </div>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: 'rgba(250,246,240,0.55)', lineHeight: 1.65, maxWidth: '240px' }}>
              Autamme sinua löytämään oikean terapeutin ensimmäisellä kerralla.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: 'Nunito, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(250,246,240,0.4)', marginBottom: '16px' }}>
              Palvelu
            </h4>
            {['Miten toimii', 'Terapeutit', 'Hinnasto', 'Usein kysyttyä'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  display: 'block',
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '14px',
                  color: 'rgba(250,246,240,0.65)',
                  textDecoration: 'none',
                  marginBottom: '10px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--terra-light)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,246,240,0.65)')}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontFamily: 'Nunito, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(250,246,240,0.4)', marginBottom: '16px' }}>
              Juridinen
            </h4>
            {['Tietosuojaseloste', 'Käyttöehdot', 'Evästeet'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  display: 'block',
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '14px',
                  color: 'rgba(250,246,240,0.65)',
                  textDecoration: 'none',
                  marginBottom: '10px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--terra-light)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,246,240,0.65)')}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(250,246,240,0.1)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', color: 'rgba(250,246,240,0.35)' }}>
            © 2026 Myötä. Kaikki oikeudet pidätetään.
          </p>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', color: 'rgba(250,246,240,0.35)' }}>
            Turku, Suomi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
