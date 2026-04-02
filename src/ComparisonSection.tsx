import React, { useEffect, useRef } from 'react';

const rows = [
  { label: 'Tulos', others: 'Lista terapeuteista', myota: '3 suositusta selityksineen' },
  { label: 'Prosessi', others: 'Selaa ja arvaa', myota: 'Ohjattu kysely' },
  { label: 'Päätös', others: 'Sinä valitset puolisokeasti', myota: 'Me ehdotamme, sinä päätät' },
  { label: 'Tieto terapeutista', others: 'Nimi ja erikoistuminen', myota: 'Miksi juuri sinulle -selitys' },
  { label: 'Rekisteröityminen', others: 'Ennen kuin näet mitään', myota: 'Vasta tuloksien jälkeen' },
];

const ComparisonSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

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
    if (tableRef.current) observer.observe(tableRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="reveal"
      style={{ padding: '100px 32px', background: 'var(--sand-pale)' }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
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
            Vertailu
          </span>
          <h2
            style={{
              fontFamily: 'Lora, serif',
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 600,
              color: 'var(--ink)',
              lineHeight: 1.25,
              letterSpacing: '-0.5px',
            }}
          >
            Muut palvelut auttavat löytämään terapeutin.
            <br />
            <em style={{ color: 'var(--terra)' }}>Myötä auttaa löytämään oikean.</em>
          </h2>
        </div>

        {/* Comparison table */}
        <div
          ref={tableRef}
          className="reveal"
          style={{
            background: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 32px rgba(30,22,16,0.07)',
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              background: 'var(--terra-wash)',
              padding: '20px 28px',
              borderBottom: '1px solid rgba(196,103,74,0.12)',
            }}
          >
            <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', fontWeight: 700, color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              &nbsp;
            </div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', fontWeight: 700, color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'center' }}>
              Muut palvelut
            </div>
            <div style={{ fontFamily: 'Lora, serif', fontSize: '16px', fontWeight: 600, color: 'var(--terra)', textAlign: 'center' }}>
              Myötä
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                padding: '18px 28px',
                borderBottom: i < rows.length - 1 ? '1px solid rgba(30,22,16,0.06)' : 'none',
                alignItems: 'center',
                background: i % 2 === 0 ? 'white' : 'rgba(250,246,240,0.5)',
              }}
            >
              <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
                {row.label}
              </div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: 'var(--ink-light)', textAlign: 'center' }}>
                {row.others}
              </div>
              <div
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--terra)',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ color: 'var(--terra)', fontSize: '16px' }}>✓</span>
                {row.myota}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
