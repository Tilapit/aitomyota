import React, { useEffect, useRef } from 'react';

const ComparisonSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Wave before comparison */}
      <div style={{ lineHeight: 0, background: 'white' }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px' }}>
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="#FAF6F0"/>
        </svg>
      </div>

      <section
        ref={sectionRef}
        style={{ padding: '80px 72px 100px', background: 'white' }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="s-label" style={{ justifyContent: 'center' }}>Miksi Myötä</div>
            <h2 style={{ maxWidth: '100%', textAlign: 'center' }}>
              Erilainen kuin tavallinen hakemisto
            </h2>
          </div>

          {/* Two columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

            {/* Tavallinen hakemisto */}
            <div style={{ background: '#F7F5F2', borderRadius: '24px', padding: '36px', border: '1px solid #EDE8E1' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9C8C7A', marginBottom: '24px', paddingTop: '6px', lineHeight: '38px' }}>
                Tavallinen hakemisto
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Satoja profiileja, mutta et tiedä mistä aloittaa',
                  'Et saa selitystä sille, miksi juuri tämä terapeutti sopisi sinulle',
                  'Ensimmäinen tapaaminen on arvaus, joka maksaa jo rahaa',
                  'Oikean löytäminen voi kestää kuukausia',
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#C4A882', fontSize: '16px', marginTop: '1px', flexShrink: 0 }}>✕</span>
                    <span style={{ fontSize: '14px', color: '#7A6E65', lineHeight: 1.5 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Myötä */}
            <div style={{ background: 'linear-gradient(135deg, #FBF0EC 0%, #FAF6F0 100%)', borderRadius: '24px', padding: '36px', border: '2px solid rgba(196,103,74,0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(196,103,74,0.08) 0%, transparent 70%)' }} />
              {/* Myötä logo inline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <svg width="110" height="38" viewBox="0 0 130 42" fill="none">
                  <text x="0" y="28" fontFamily="Georgia,serif" fontSize="28" fontWeight="600" fill="#1E1610" letterSpacing="-0.5">Myötä</text>
                  <path d="M1 38 C9 32,15 29,23 34 C31 41,37 42,45 37 C53 31,59 29,67 33 C73 36,77 38,83 37" stroke="#C4674A" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <circle cx="87" cy="37" r="2.8" fill="#C4674A"/>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { text: '8 minuutin kysely — saat 3 henkilökohtaista suositusta' },
                  { text: 'Jokainen suositus selitetään: ', em: 'miksi juuri sinulle' },
                  { text: 'Ensimmäinen tapaaminen on jo hyvä match — ei arvaus' },
                  { text: 'Ensimmäinen tapaaminen on suunniteltu sopimaan juuri sinulle' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#C4674A', fontSize: '16px', marginTop: '1px', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '14px', color: 'var(--ink)', lineHeight: 1.5, fontWeight: 500 }}>
                      {item.text}{item.em && <em>{item.em}</em>}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ComparisonSection;
