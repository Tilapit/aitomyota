import React, { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Kerrot tilanteestasi',
    description: '6–8 kysymystä – ei lomaketta, vaan lyhyt keskustelu. Kestää noin 5 minuuttia.',
    icon: '💬',
  },
  {
    number: '02',
    title: 'Saat 3 suositusta',
    description: 'Ei listoja – teemme päätöksen puolestasi. Jokaisen suosituksen syyt kerrotaan selväkielisesti.',
    icon: '✨',
  },
  {
    number: '03',
    title: 'Varaat ajan suoraan',
    description: 'Suora yhteys valitsemaasi terapeuttiin. Ei välikäsiä, ei odottamista.',
    icon: '📅',
  },
];

const HowItWorksSection: React.FC = () => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    refs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      style={{ padding: '100px 32px', background: 'var(--cream)' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Section header */}
        <div
          ref={(el) => { refs.current[0] = el; }}
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--terra)',
              marginBottom: '16px',
            }}
          >
            Kolme askelta
          </span>
          <h2
            style={{
              fontFamily: 'Lora, serif',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 600,
              color: 'var(--ink)',
              lineHeight: 1.25,
              letterSpacing: '-0.5px',
            }}
          >
            Miten Myötä toimii
          </h2>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px',
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { refs.current[i + 1] = el; }}
              className="reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div
                style={{
                  background: i === 1 ? 'var(--terra)' : 'var(--sand-pale)',
                  borderRadius: '20px',
                  padding: '40px 32px',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 16px 40px rgba(30,22,16,0.1)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    fontFamily: 'Lora, serif',
                    fontSize: '56px',
                    fontWeight: 600,
                    color: i === 1 ? 'rgba(255,255,255,0.15)' : 'rgba(196,103,74,0.15)',
                    lineHeight: 1,
                    marginBottom: '8px',
                    userSelect: 'none',
                  }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{step.icon}</div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'Lora, serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: i === 1 ? 'white' : 'var(--ink)',
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '15px',
                    color: i === 1 ? 'rgba(255,255,255,0.85)' : 'var(--ink-mid)',
                    lineHeight: 1.65,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
