import React, { useEffect, useRef } from 'react';

interface HeroSectionProps {
  onOpenQuiz: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuiz }) => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300);
    }
  }, []);

  return (
    <>
      <section
        style={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#FBF0EC',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '72px',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(250,246,240,0.88) 0%, rgba(250,246,240,0.82) 35%, rgba(250,246,240,0.50) 60%, rgba(250,246,240,0.10) 80%, rgba(250,246,240,0) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '700px',
            width: '100%',
            margin: '0 auto',
            padding: '60px 40px 0 40px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'fadeUp 0.8s ease both',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '11.5px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#C4674A',
              marginBottom: '12px',
            }}
          >
            <span style={{ display: 'block', width: '20px', height: '1.5px', background: '#C4674A' }} />
            Matching-palvelu
            <span style={{ display: 'block', width: '20px', height: '1.5px', background: '#C4674A' }} />
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'Lora, serif',
              fontSize: 'clamp(36px, 4vw, 58px)',
              lineHeight: 1.08,
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: '#1E1610',
              marginBottom: '14px',
              textShadow: '0 2px 16px rgba(250,246,240,1), 0 0 40px rgba(250,246,240,0.9)',
            }}
          >
            Löydä oikea terapeutti
            <br />
            <em style={{ fontStyle: 'italic', color: '#C4674A' }}>ensimmäisellä kerralla.</em>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '15.5px',
              color: '#5C4E3D',
              maxWidth: '480px',
              marginBottom: '28px',
              lineHeight: 1.65,
              textAlign: 'center',
              textShadow: '0 2px 12px rgba(250,246,240,1)',
            }}
          >
            Terapeutin löytäminen voi tuntua ylivoimaiselta. Me teemme sen puolestasi — pehmeästi,
            henkilökohtaisesti ja juuri sinulle sopivalla tavalla.
          </p>

          {/* CTA */}
          <button
            onClick={onOpenQuiz}
            style={{
              background: '#C4674A',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '100px',
              fontFamily: 'Nunito, sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 5px 24px rgba(196,103,74,0.38)',
              transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#B05840';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#C4674A';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            Aloita matching →
          </button>

          {/* Stats */}
          <div
            ref={statsRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              justifyContent: 'center',
              marginTop: '60px',
              width: '100%',
            }}
          >
            {[
              { num: '99+', lbl: 'Terapeuttia' },
              { num: '5 min', lbl: 'Kysely kestää' },
              { num: '3', lbl: 'Suositusta selityksineen' },
            ].map((stat, i) => (
              <React.Fragment key={stat.lbl}>
                {i > 0 && (
                  <div style={{ width: '1px', height: '28px', background: 'rgba(196,103,74,0.18)', flexShrink: 0 }} />
                )}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Lora, serif', fontSize: '26px', fontWeight: 600, color: '#1E1610' }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: '12px', color: '#5C4E3D', marginTop: '1px', fontWeight: 500 }}>
                    {stat.lbl}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div style={{ marginTop: '-2px', lineHeight: 0, background: '#F8F2EA' }}>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '80px' }}
        >
          <path d="M0,40 C200,80 400,0 720,40 C1040,80 1240,10 1440,40 L1440,80 L0,80 Z" fill="#FAF6F0" />
        </svg>
      </div>
    </>
  );
};

export default HeroSection;
