import React, { useEffect, useRef } from 'react';

const profiles = [
  {
    name: 'Emilia Korhonen',
    title: 'Psykoterapeutti',
    specialties: ['Ahdistus', 'Ihmissuhteet', 'Itsetunto'],
    approach: 'Kognitiivinen käyttäytymisterapia (KKT)',
    matchReason: 'Sopii sinulle, koska olet hakenut apua ahdistukseen ja arvostat selkeää rakennetta.',
    initials: 'EK',
    color: '#C4674A',
  },
  {
    name: 'Markus Leinonen',
    title: 'Psykologi',
    specialties: ['Trauma', 'Masennus', 'Elämänmuutokset'],
    approach: 'EMDR & Hyväksymis- ja omistautumisterapia',
    matchReason: 'Sopii sinulle, koska hän on erikoistunut traumoihin ja työskentelee kehon kanssa.',
    initials: 'ML',
    color: '#5C4E3D',
  },
  {
    name: 'Saara Virtanen',
    title: 'Psykoterapeutti',
    specialties: ['Kasvu', 'Parisuhde', 'Vanhemmuus'],
    approach: 'Ratkaisukeskeinen terapia',
    matchReason: 'Sopii sinulle, koska haluat konkreettisia välineitä arjen muutoksiin.',
    initials: 'SV',
    color: '#9C8C7A',
  },
];

const ProfilesSection: React.FC = () => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    refs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="therapists"
      style={{ padding: '100px 32px', background: 'var(--cream)' }}
    >
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={(el) => { refs.current[0] = el; }}
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '64px' }}
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
            Näyttely
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
            Näin suositukset näyttävät
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--ink-mid)', marginTop: '16px', maxWidth: '420px', margin: '16px auto 0' }}>
            Jokainen suositus kertoo <em>miksi juuri sinulle</em> — ei vain tittelin.
          </p>
        </div>

        {/* Profile cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {profiles.map((profile, i) => (
            <div
              key={profile.name}
              ref={(el) => { refs.current[i + 1] = el; }}
              className="reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '32px',
                  height: '100%',
                  boxShadow: '0 2px 20px rgba(30,22,16,0.06)',
                  border: '1px solid rgba(30,22,16,0.06)',
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
                  el.style.boxShadow = '0 2px 20px rgba(30,22,16,0.06)';
                }}
              >
                {/* Avatar + name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: profile.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Lora, serif',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: 'white',
                      flexShrink: 0,
                    }}
                  >
                    {profile.initials}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Lora, serif', fontSize: '17px', fontWeight: 600, color: 'var(--ink)' }}>
                      {profile.name}
                    </div>
                    <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', color: 'var(--ink-light)', marginTop: '2px' }}>
                      {profile.title}
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {profile.specialties.map((s) => (
                    <span
                      key={s}
                      style={{
                        background: 'var(--terra-pale)',
                        color: 'var(--terra)',
                        borderRadius: '50px',
                        padding: '4px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        fontFamily: 'Nunito, sans-serif',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Approach */}
                <div style={{ fontSize: '13px', color: 'var(--ink-light)', fontFamily: 'Nunito, sans-serif', marginBottom: '20px' }}>
                  {profile.approach}
                </div>

                {/* Match reason — the core feature */}
                <div
                  style={{
                    background: 'var(--terra-wash)',
                    borderRadius: '12px',
                    padding: '16px',
                    borderLeft: '3px solid var(--terra)',
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--terra)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
                    Miksi juuri sinulle
                  </div>
                  <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
                    {profile.matchReason}
                  </p>
                </div>

                {/* CTA */}
                <button
                  style={{
                    marginTop: '20px',
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1.5px solid var(--terra)',
                    background: 'transparent',
                    color: 'var(--terra)',
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.background = 'var(--terra)';
                    btn.style.color = 'white';
                  }}
                  onMouseLeave={e => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.background = 'transparent';
                    btn.style.color = 'var(--terra)';
                  }}
                >
                  Varaa aika
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilesSection;
