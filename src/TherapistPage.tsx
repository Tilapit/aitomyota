import React from 'react';

interface TherapistPageProps {
  onClose: () => void;
}

const TherapistPage: React.FC<TherapistPageProps> = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      overflowY: 'auto',
      background: '#FAF6F0',
      fontFamily: 'Nunito, sans-serif',
    }}>

      {/* Navbar */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(250,246,240,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(74,55,40,0.08)',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <svg width="110" height="36" viewBox="0 0 130 42" fill="none">
          <text x="0" y="25" fontFamily="Georgia,serif" fontSize="23" fontWeight="600" fill="#1E1610" letterSpacing="-0.6">Myötä</text>
          <path d="M1 36 C9 30,15 27,23 32 C31 39,37 40,45 35 C53 29,59 27,67 31 C73 34,77 36,83 35" stroke="#C4674A" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <circle cx="88" cy="35" r="2.6" fill="#C4674A"/>
        </svg>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: '1px solid rgba(74,55,40,0.2)',
            borderRadius: '20px',
            padding: '7px 18px',
            fontSize: '13px',
            color: '#4a3728',
            cursor: 'pointer',
            fontFamily: 'Nunito, sans-serif',
          }}
        >
          ← Takaisin
        </button>
      </div>

      {/* HERO */}
      <div style={{
        background: '#2A1F18',
        minHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 8vw 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <p style={{
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#C4674A',
          margin: '0 0 24px',
        }}>
          Terapeuteille
        </p>

        <h1 style={{
          fontFamily: 'Lora, serif',
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 600,
          color: '#FAF6F0',
          lineHeight: 1.1,
          maxWidth: '700px',
          margin: '0 0 28px',
          letterSpacing: '-0.02em',
        }}>
          Löydä asiakkaat,<br />
          <span style={{ color: '#C4674A' }}>jotka sopivat</span><br />
          juuri sinulle.
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 1.8vw, 18px)',
          color: 'rgba(250,246,240,0.55)',
          maxWidth: '440px',
          margin: '0 0 48px',
          lineHeight: 1.75,
        }}>
          Myötä yhdistää sinulle sopivat asiakkaat persoonallisuutesi,
          työskentelytapasi ja käytännön tekijöiden perusteella.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <a
            href="mailto:janne@myota.fi"
            style={{
              background: '#C4674A',
              color: '#FAF6F0',
              borderRadius: '30px',
              padding: '14px 32px',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'Nunito, sans-serif',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              display: 'inline-block',
            }}
          >
            Ilmoittaudu pilottiin →
          </a>
          <span style={{ fontSize: '13px', color: 'rgba(250,246,240,0.28)' }}>
            Ilmainen · Ei sitoumuksia
          </span>
        </div>
      </div>

      {/* WAVE */}
      <div style={{ lineHeight: 0, background: '#2A1F18' }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px' }}>
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" fill="#FAF6F0"/>
        </svg>
      </div>

      {/* BENEFITS */}
      <div style={{ padding: '80px 8vw', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px', maxWidth: '480px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4674A', margin: '0 0 16px' }}>
            Miksi Myötä
          </p>
          <h2 style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 600, color: '#1E1610', lineHeight: 1.15, margin: 0, letterSpacing: '-0.02em' }}>
            Vähemmän väärät yhteydenotot. Enemmän oikeita kohtaamisia.
          </h2>
        </div>

        {[
          { num: '01', title: 'Oikeat asiakkaat, vähemmän hakua', body: 'Myötä yhdistää sinut asiakkaisiin, jotka sopivat juuri sinun työtapaasi ja erikoistumiseesi. Vähemmän sopimattomia yhteydenottoja, enemmän merkityksellisiä kohtaamisia.', accent: '#C4674A' },
          { num: '02', title: 'Sinä määrität, kuka sopii sinulle', body: 'Profiilit rakennetaan niin, että asiakkaat ymmärtävät työskentelytapasi ennen yhteydenottoa. Vähemmän epäselviä ensikohtaamisia, enemmän valmiita asiakkaita.', accent: '#4a3728' },
          { num: '03', title: 'Ilmainen pilottikumppanuus', body: 'Olet mukana rakentamassa jotain uutta. Pilottivaiheen terapeutit saavat palvelun ilmaiseksi ja pääsevät vaikuttamaan siihen, miten alusta kehittyy.', accent: '#C4674A' },
        ].map((b, i) => (
          <div key={b.num} style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr',
            gap: '32px',
            alignItems: 'start',
            paddingBottom: '48px',
            marginBottom: '48px',
            borderBottom: i < 2 ? '1px solid rgba(74,55,40,0.08)' : 'none',
          }}>
            <div style={{
              fontFamily: 'Lora, serif',
              fontSize: '56px',
              fontWeight: 600,
              color: 'rgba(196,103,74,0.15)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              paddingTop: '4px',
            }}>
              {b.num}
            </div>
            <div>
              <div style={{ width: '32px', height: '2px', background: b.accent, marginBottom: '16px', borderRadius: '2px' }} />
              <h3 style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 600, color: '#1E1610', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
                {b.title}
              </h3>
              <p style={{ fontSize: '15px', color: '#6b5448', lineHeight: 1.75, margin: 0, maxWidth: '560px' }}>
                {b.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: '#2A1F18', padding: '80px 8vw' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '56px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4674A', margin: '0 0 16px' }}>
              Prosessi
            </p>
            <h2 style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 600, color: '#FAF6F0', lineHeight: 1.15, margin: 0, letterSpacing: '-0.02em' }}>
              Kolme askelta.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2px' }}>
            {[
              { num: '1', title: 'Täytät profiilin', body: 'Kerrot työskentelytavastasi, erikoistumisestasi ja käytännön tiedoistasi. Vie noin 10 minuuttia.' },
              { num: '2', title: 'Asiakkaat löytävät sinut', body: 'Kun asiakas täyttää kyselyn, Myötä ehdottaa hänelle sopivia terapeutteja — myös sinua.' },
              { num: '3', title: 'Asiakas ottaa yhteyttä', body: 'Yhteydenotto tulee suoraan sinulle. Sinä päätät, otatko asiakkaan vastaan.' },
            ].map((step, i) => (
              <div key={step.num} style={{
                background: i === 1 ? 'rgba(196,103,74,0.12)' : 'rgba(250,246,240,0.04)',
                border: i === 1 ? '1px solid rgba(196,103,74,0.25)' : '1px solid rgba(250,246,240,0.06)',
                borderRadius: '20px',
                padding: '36px 32px',
              }}>
                <div style={{
                  fontFamily: 'Lora, serif',
                  fontSize: '48px',
                  fontWeight: 600,
                  color: i === 1 ? 'rgba(224,149,124,0.5)' : 'rgba(250,246,240,0.12)',
                  lineHeight: 1,
                  marginBottom: '24px',
                  letterSpacing: '-0.03em',
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontFamily: 'Lora, serif', fontSize: '18px', fontWeight: 600, color: '#FAF6F0', margin: '0 0 12px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(250,246,240,0.5)', lineHeight: 1.75, margin: 0 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div style={{ padding: '100px 8vw', textAlign: 'center', background: '#FAF6F0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(600px, 90vw)', height: 'min(600px, 90vw)',
          borderRadius: '50%', border: '1px solid rgba(196,103,74,0.1)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(400px, 70vw)', height: 'min(400px, 70vw)',
          borderRadius: '50%', border: '1px solid rgba(196,103,74,0.15)', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4674A', margin: '0 0 20px' }}>
            Kiinnostuitko?
          </p>
          <h2 style={{
            fontFamily: 'Lora, serif',
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 600,
            color: '#1E1610',
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            Etsimme ensimmäisiä<br />terapeuttikumppaneita.
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(30,22,16,0.5)', margin: '0 auto 40px', maxWidth: '380px', lineHeight: 1.7 }}>
            Olemme vielä pilottivaiheessa. Ota yhteyttä niin jutellaan lisää.
          </p>
          <a
            href="mailto:janne@myota.fi"
            style={{
              display: 'inline-block',
              background: '#1E1610',
              color: '#FAF6F0',
              borderRadius: '30px',
              padding: '16px 40px',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'Nunito, sans-serif',
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            Ota yhteyttä →
          </a>
          <p style={{ marginTop: '16px', fontSize: '12px', color: 'rgba(30,22,16,0.3)', fontFamily: 'Nunito, sans-serif' }}>
            janne@myota.fi
          </p>
        </div>
      </div>

    </div>
  );
};

export default TherapistPage;
