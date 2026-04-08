import React from 'react';

const benefits = [
  {
    icon: '🎯',
    title: 'Oikeat asiakkaat, vähemmän hakua',
    body: 'Myötä yhdistää sinut asiakkaisiin, jotka sopivat juuri sinun työtapaasi ja erikoistumiseesi. Vähemmän sopimattomia yhteydenottoja, enemmän merkityksellisiä kohtaamisia.',
  },
  {
    icon: '📅',
    title: 'Kela-tilanteesi näkyy reaaliajassa',
    body: 'Voit päivittää vapaata Kela-kapasiteettiasi helposti. Asiakkaat näkevät tilanteesi aina ajantasaisena, eikä sinun tarvitse vastata kyselyihin manuaalisesti.',
  },
  {
    icon: '🤝',
    title: 'Ilmainen pilottikumppanuus',
    body: 'Olet mukana rakentamassa jotain uutta. Pilottivaiheen terapeutit saavat palvelun ilmaiseksi ja pääsevät vaikuttamaan siihen, miten alusta kehittyy.',
  },
  {
    icon: '💬',
    title: 'Sinä määrität, kuka sopii sinulle',
    body: 'Profiilit rakennetaan niin, että asiakkaat ymmärtävät työskentelytapasi ennen yhteydenottoa. Vähemmän epäselviä ensikohtaamisia.',
  },
];

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
        {/* Logo */}
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

      {/* Hero */}
      <div style={{
        background: '#2A1F18',
        padding: '80px 32px 90px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 300, height: 300,
          borderRadius: '50%',
          background: 'rgba(196,103,74,0.08)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -40, left: -40,
          width: 200, height: 200,
          borderRadius: '50%',
          background: 'rgba(196,103,74,0.06)',
          pointerEvents: 'none',
        }} />

        <p style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#C4674A',
          marginBottom: '20px',
        }}>
          Terapeuteille
        </p>

        <h1 style={{
          fontFamily: 'Lora, serif',
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 600,
          color: '#FAF6F0',
          lineHeight: 1.25,
          maxWidth: '640px',
          margin: '0 auto 24px',
        }}>
          Löydä asiakkaat, jotka sopivat juuri sinulle
        </h1>

        <p style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: '17px',
          color: 'rgba(250,246,240,0.65)',
          maxWidth: '480px',
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Myötä on matchmaking-alusta, joka yhdistää asiakkaat ja terapeutit persoonallisuuden, työskentelytavan ja käytännön tekijöiden perusteella.
        </p>

        <button
          style={{
            background: '#C4674A',
            color: '#FAF6F0',
            border: 'none',
            borderRadius: '30px',
            padding: '14px 36px',
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: 'Nunito, sans-serif',
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#b35c41')}
          onMouseLeave={e => (e.currentTarget.style.background = '#C4674A')}
        >
          Ilmoittaudu pilottiin →
        </button>

        <p style={{
          marginTop: '14px',
          fontSize: '12px',
          color: 'rgba(250,246,240,0.3)',
          fontFamily: 'Nunito, sans-serif',
        }}>
          Ilmainen pilottivaiheessa · Ei sitoumuksia
        </p>
      </div>

      {/* Wave */}
      <div style={{ lineHeight: 0, background: '#2A1F18' }}>
        <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '50px' }}>
          <path d="M0,25 C360,50 720,0 1080,25 C1260,38 1380,15 1440,25 L1440,50 L0,50 Z" fill="#FAF6F0"/>
        </svg>
      </div>

      {/* Benefits */}
      <div style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '72px 32px',
      }}>
        <h2 style={{
          fontFamily: 'Lora, serif',
          fontSize: 'clamp(22px, 3vw, 32px)',
          fontWeight: 600,
          color: '#1E1610',
          textAlign: 'center',
          marginBottom: '56px',
        }}>
          Miksi liittyä Myötään?
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '28px',
        }}>
          {benefits.map((b) => (
            <div key={b.title} style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(74,55,40,0.08)',
              boxShadow: '0 2px 16px rgba(74,55,40,0.06)',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>{b.icon}</div>
              <h3 style={{
                fontFamily: 'Lora, serif',
                fontSize: '17px',
                fontWeight: 600,
                color: '#1E1610',
                marginBottom: '10px',
              }}>
                {b.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b5448',
                lineHeight: 1.7,
                margin: 0,
              }}>
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{
        background: '#F8F2EA',
        padding: '72px 32px',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'Lora, serif',
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: 600,
            color: '#1E1610',
            marginBottom: '48px',
          }}>
            Miten se toimii?
          </h2>

          {[
            { num: '1', title: 'Täytät profiilin', body: 'Kerrot työskentelytavastasi, erikoistumisestasi ja Kela-tilanteestasi. Vie noin 10 minuuttia.' },
            { num: '2', title: 'Asiakkaat löytävät sinut', body: 'Kun asiakas täyttää kyselyn, Myötä ehdottaa hänelle sopivia terapeutteja, myös sinua.' },
            { num: '3', title: 'Asiakas ottaa yhteyttä', body: 'Yhteydenotto tulee suoraan sinulle. Sinä päätät, otatko asiakkaan vastaan.' },
          ].map((step) => (
            <div key={step.num} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
              marginBottom: '36px',
              textAlign: 'left',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#C4674A',
                color: '#FAF6F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '16px',
                fontFamily: 'Nunito, sans-serif',
                flexShrink: 0,
              }}>
                {step.num}
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'Lora, serif',
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#1E1610',
                  margin: '0 0 6px',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b5448',
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA bottom */}
      <div style={{
        background: '#2A1F18',
        padding: '72px 32px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'Lora, serif',
          fontSize: 'clamp(22px, 3vw, 34px)',
          fontWeight: 600,
          color: '#FAF6F0',
          marginBottom: '16px',
        }}>
          Kiinnostuitko?
        </h2>
        <p style={{
          fontSize: '16px',
          color: 'rgba(250,246,240,0.6)',
          marginBottom: '36px',
          fontFamily: 'Nunito, sans-serif',
          lineHeight: 1.6,
        }}>
          Olemme vielä pilottivaiheessa ja etsimme ensimmäisiä terapeuttikumppaneita.<br />
          Ota yhteyttä niin jutellaan lisää.
        </p>
        <a
          href="mailto:janne@myota.fi"
          style={{
            display: 'inline-block',
            background: '#C4674A',
            color: '#FAF6F0',
            borderRadius: '30px',
            padding: '14px 36px',
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: 'Nunito, sans-serif',
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#b35c41')}
          onMouseLeave={e => (e.currentTarget.style.background = '#C4674A')}
        >
          Ota yhteyttä →
        </a>
        <p style={{
          marginTop: '14px',
          fontSize: '12px',
          color: 'rgba(250,246,240,0.3)',
          fontFamily: 'Nunito, sans-serif',
        }}>
          janne@myota.fi
        </p>
      </div>

    </div>
  );
};

export default TherapistPage;
