import React, { useEffect, useRef } from 'react';

const HowItWorksSection: React.FC = () => {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animation = 'fadeUp 0.6s ease forwards';
            (entry.target as HTMLElement).style.opacity = '1';
          }
        });
      },
      { threshold: 0.15 }
    );
    stepRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="miten"
        style={{ padding: '80px 72px 100px', background: 'var(--sand-pale)' }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="s-label" style={{ justifyContent: 'center' }}>Miten toimii</div>
            <h2 style={{ maxWidth: '100%', textAlign: 'center' }}>
              Kolme askelta oikeaan terapeuttiin
            </h2>
            <p className="s-sub" style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
              Et tarvitse tietää mistä aloittaa. Me kysymme, kuuntelemme ja löydämme sinulle oikean ihmisen.
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative', maxWidth: '680px', margin: '0 auto' }}>
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                left: '35px',
                top: '50px',
                bottom: '50px',
                width: '2px',
                background: 'linear-gradient(to bottom, #C4674A, rgba(196,103,74,0.1))',
              }}
            />

            {/* Step 1 */}
            <div
              ref={(el) => { stepRefs.current[0] = el; }}
              className="tl-step"
              style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', marginBottom: '56px', opacity: 0 }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: 'var(--terra)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(196,103,74,0.3)',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M5 6C5 4.9 5.9 4 7 4H25C26.1 4 27 4.9 27 6V20C27 21.1 26.1 22 25 22H18L13 28V22H7C5.9 22 5 21.1 5 20V6Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M10 13 C12 10, 14 16, 16 13 C18 10, 20 16, 22 13" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ paddingTop: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '6px' }}>
                  Askel 01
                </div>
                <div style={{ fontFamily: 'Lora, serif', fontSize: '22px', fontWeight: 600, color: 'var(--ink)', marginBottom: '10px', lineHeight: 1.2 }}>
                  Kerro tilanteestasi
                </div>
                <p style={{ fontSize: '15px', color: 'var(--ink-mid)', lineHeight: 1.65, margin: 0, maxWidth: '440px' }}>
                  Muutama kysymys siitä, miltä elämässä juuri nyt tuntuu. Ei oikeita tai vääriä vastauksia. Kerro vain mitä sinulle kuuluu.
                </p>
                <div style={{ marginTop: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', background: 'var(--terra-pale)', padding: '6px 14px', borderRadius: '100px' }}>
                  n. 5–8 minuuttia
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div
              ref={(el) => { stepRefs.current[1] = el; }}
              className="tl-step"
              style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', marginBottom: '56px', opacity: 0 }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: 'var(--cream)',
                  border: '2px solid var(--terra-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="10" r="4" stroke="#C4674A" strokeWidth="1.8" fill="none"/>
                  <path d="M8 27C8 22.6 11.6 19 16 19C20.4 19 24 22.6 24 27" stroke="#C4674A" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                  <path d="M23 5 L23.6 7 L25.6 7 L24 8.2 L24.6 10.2 L23 9 L21.4 10.2 L22 8.2 L20.4 7 L22.4 7 Z" fill="#C4674A"/>
                  <path d="M9 5 L9.5 6.6 L11 6.6 L9.8 7.5 L10.2 9.1 L9 8.2 L7.8 9.1 L8.2 7.5 L7 6.6 L8.5 6.6 Z" fill="#C4674A" opacity="0.45"/>
                </svg>
              </div>
              <div style={{ paddingTop: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '6px' }}>
                  Askel 02
                </div>
                <div style={{ fontFamily: 'Lora, serif', fontSize: '22px', fontWeight: 600, color: 'var(--ink)', marginBottom: '10px', lineHeight: 1.2 }}>
                  Saat 3 henkilökohtaista suositusta
                </div>
                <p style={{ fontSize: '15px', color: 'var(--ink-mid)', lineHeight: 1.65, margin: 0, maxWidth: '440px' }}>
                  Saat kolme terapeuttisuositusta, joista jokainen on valittu juuri sinua varten. Kerromme myös <em>miksi</em> he sopivat sinulle.
                </p>
                <div style={{ marginTop: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', background: 'var(--terra-pale)', padding: '6px 14px', borderRadius: '100px' }}>
                  Selitetty suositus
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div
              ref={(el) => { stepRefs.current[2] = el; }}
              className="tl-step"
              style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', opacity: 0 }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: 'var(--cream)',
                  border: '2px solid var(--terra-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="6" width="24" height="22" rx="4" stroke="#C4674A" strokeWidth="1.8" fill="none"/>
                  <path d="M4 12H28" stroke="#C4674A" strokeWidth="1.8"/>
                  <line x1="10" y1="4" x2="10" y2="9" stroke="#C4674A" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="22" y1="4" x2="22" y2="9" stroke="#C4674A" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M13 21 L19 21 M16 18 L19 21 L16 24" stroke="#C4674A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ paddingTop: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '6px' }}>
                  Askel 03
                </div>
                <div style={{ fontFamily: 'Lora, serif', fontSize: '22px', fontWeight: 600, color: 'var(--ink)', marginBottom: '10px', lineHeight: 1.2 }}>
                  Varaa aika heti
                </div>
                <p style={{ fontSize: '15px', color: 'var(--ink-mid)', lineHeight: 1.65, margin: 0, maxWidth: '440px' }}>
                  Varaa aika suoraan terapeutin kalenterista. Ensimmäinen tapaaminen on usein jo saman viikon sisällä.
                </p>
                <div style={{ marginTop: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', background: 'var(--terra-pale)', padding: '6px 14px', borderRadius: '100px' }}>
                  Usein saman viikon sisällä
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave miten → vertailu */}
      <div style={{ lineHeight: 0, background: 'white' }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px' }}>
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="#F8F2EA"/>
        </svg>
      </div>
    </>
  );
};

export default HowItWorksSection;
