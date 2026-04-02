import React from 'react';

interface QuizTeaserSectionProps {
  onOpenQuiz: () => void;
}

const options = [
  { val: 'ahdistus',     label: 'Ahdistus tai huolet' },
  { val: 'mieliala',     label: 'Mieliala tai masennus' },
  { val: 'uupumus',      label: 'Väsymys tai uupumus' },
  { val: 'ihmissuhteet', label: 'Ihmissuhteet' },
  { val: 'trauma',       label: 'Jokin vaikea kokemus menneisyydessä' },
  { val: 'elamanmuutos', label: 'Elämänmuutos tai epävarmuus' },
  { val: 'enmata',       label: 'En osaa vielä nimetä, mutta jokin painaa' },
];

const QuizTeaserSection: React.FC<QuizTeaserSectionProps> = ({ onOpenQuiz }) => {
  return (
    <section style={{ background: 'var(--cream)', padding: '80px 24px' }}>
      <div style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '14px' }}>
          Kokeile
        </div>
        <h2 style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.2 }}>
          Mistä haluaisit puhua terapiassa?
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--ink-light)', marginBottom: '32px', lineHeight: 1.6 }}>
          Ei oikeita tai vääriä vastauksia. Kerro vain miltä nyt tuntuu.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
          {options.map((opt) => (
            <button key={opt.val} onClick={onOpenQuiz} className="teaser-opt">
              {opt.label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--ink-light)' }}>
          Ilmainen · Ei rekisteröitymistä · Luottamuksellinen
        </p>
      </div>
    </section>
  );
};

export default QuizTeaserSection;