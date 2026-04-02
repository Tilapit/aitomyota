import React, { useEffect, useRef } from 'react';

interface HeroSectionProps {
  onOpenQuiz: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuiz }) => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const timeout = setTimeout(() => el.classList.add('visible'), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      ref={heroRef}
      className="reveal"
      style={{
        minHeight: '100vh',
        background: 'var(--terra-wash)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '72px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blob */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-80px',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,103,74,0.13) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,103,74,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '760px',
          padding: '80px 32px 60px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(196,103,74,0.1)',
            border: '1px solid rgba(196,103,74,0.2)',
            borderRadius: '50px',
            padding: '6px 16px',
            marginBottom: '32px',
          }}
        >
          <span style={{ fontSize: '12px', color: 'var(--terra)', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            Matching-palvelu
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'Lora, serif',
            fontSize: 'clamp(38px, 6vw, 62px)',
            fontWeight: 600,
            color: 'var(--ink)',
            lineHeight: 1.18,
            letterSpacing: '-1px',
            marginBottom: '28px',
          }}
        >
          Ensimmäinen terapiatunti
          <br />
          <em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>ei saisi olla arvaus</em>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '18px',
            color: 'var(--ink-mid)',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto 44px',
          }}
        >
          6 kysymystä. 3 terapeuttisuositusta selityksineen.
          Löydä oikea terapeutti ensimmäisellä kerralla.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenQuiz}
            style={{
              background: 'var(--terra)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '16px 36px',
              fontFamily: 'Nunito, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.2px',
              boxShadow: '0 4px 24px rgba(196,103,74,0.3)',
              transition: 'background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = 'var(--terra-mid)';
              btn.style.transform = 'translateY(-2px)';
              btn.style.boxShadow = '0 8px 32px rgba(196,103,74,0.4)';
            }}
            onMouseLeave={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = 'var(--terra)';
              btn.style.transform = 'translateY(0)';
              btn.style.boxShadow = '0 4px 24px rgba(196,103,74,0.3)';
            }}
          >
            Aloita ilmainen matching →
          </button>

          <a
            href="#how-it-works"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'transparent',
              color: 'var(--ink-mid)',
              border: '1.5px solid rgba(30,22,16,0.2)',
              borderRadius: '50px',
              padding: '16px 32px',
              fontFamily: 'Nunito, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--terra)';
              e.currentTarget.style.color = 'var(--terra)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(30,22,16,0.2)';
              e.currentTarget.style.color = 'var(--ink-mid)';
            }}
          >
            Miten toimii
          </a>
        </div>

        {/* Social proof */}
        <div
          style={{
            marginTop: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { number: '99+', label: 'Terapeuttia' },
            { number: '5 min', label: 'Kysely kestää' },
            { number: '3', label: 'Suositusta selityksineen' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Lora, serif', fontSize: '24px', fontWeight: 600, color: 'var(--terra)' }}>
                {stat.number}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--ink-light)', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Wave divider */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '60px' }}>
            <path d="M0 60 L0 30 C360 60 720 0 1080 30 C1260 45 1380 36 1440 30 L1440 60 Z" fill="var(--cream)" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
