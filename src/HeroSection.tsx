import React, { useEffect, useRef } from 'react';

interface HeroSectionProps {
  onOpenQuiz: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuiz }) => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stats fade-up animation with delay (matches original CSS)
    const el = statsRef.current;
    if (el) {
      el.style.animation = 'fadeUp 0.8s 0.3s ease both';
    }
  }, []);

  return (
    <>
      <section
        className="hero"
        style={{ position: 'relative' }}
      >
        <div className="hero-overlay" />

        <div className="hero-content">
          {/* Eyebrow */}
          <div className="eyebrow">Matching-palvelu</div>

          {/* Headline */}
          <h1>
            Löydä oikea terapeutti
            <br />
            <em>ensimmäisellä kerralla.</em>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub">
            Terapeutin löytäminen voi tuntua ylivoimaiselta. Me teemme sen puolestasi — pehmeästi,
            henkilökohtaisesti ja juuri sinulle sopivalla tavalla.
          </p>

          {/* CTA button */}
          <button className="btn-primary" onClick={onOpenQuiz}>
            Aloita matching →
          </button>

          {/* Stats */}
          <div ref={statsRef} className="hero-stats">
            <div className="stat">
              <div className="num">99+</div>
              <div className="lbl">Terapeuttia</div>
            </div>
            <div className="stat-div" />
            <div className="stat">
              <div className="num">5 min</div>
              <div className="lbl">Kysely kestää</div>
            </div>
            <div className="stat-div" />
            <div className="stat">
              <div className="num">3</div>
              <div className="lbl">Suositusta selityksineen</div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider hero → miten */}
      <div style={{ marginTop: '-2px', lineHeight: 0, background: 'var(--sand-pale)' }}>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '80px' }}
        >
          <path
            d="M0,40 C200,80 400,0 720,40 C1040,80 1240,10 1440,40 L1440,80 L0,80 Z"
            fill="#FAF6F0"
          />
        </svg>
      </div>
    </>
  );
};

export default HeroSection;
