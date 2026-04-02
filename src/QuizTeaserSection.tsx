import React, { useEffect, useRef } from 'react';

interface QuizTeaserSectionProps {
  onOpenQuiz: () => void;
}

const QuizTeaserSection: React.FC<QuizTeaserSectionProps> = ({ onOpenQuiz }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="reveal"
      style={{ padding: '100px 32px', background: 'var(--terra-wash)' }}
    >
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Decorative wave logo */}
        <div style={{ marginBottom: '32px' }}>
          <svg width="48" height="28" viewBox="0 0 56 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 24 C9 18,14 16,20 21 C26 27,31 28,37 22 C41 18,46 17,52 20"
              stroke="#C4674A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="54" cy="21" r="3.5" fill="#C4674A" />
          </svg>
        </div>

        <h2
          style={{
            fontFamily: 'Lora, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 600,
            color: 'var(--ink)',
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
            marginBottom: '20px',
          }}
        >
          Valmis löytämään{' '}
          <em style={{ color: 'var(--terra)' }}>oikean terapeutin?</em>
        </h2>

        <p
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '17px',
            color: 'var(--ink-mid)',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '480px',
            margin: '0 auto 40px',
          }}
        >
          6 kysymystä. 5 minuuttia. Ei rekisteröitymistä ennen kuin näet tulokset.
        </p>

        <button
          onClick={onOpenQuiz}
          style={{
            background: 'var(--terra)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '18px 44px',
            fontFamily: 'Nunito, sans-serif',
            fontSize: '17px',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.2px',
            boxShadow: '0 6px 32px rgba(196,103,74,0.35)',
            transition: 'background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = 'var(--terra-mid)';
            btn.style.transform = 'translateY(-2px)';
            btn.style.boxShadow = '0 10px 40px rgba(196,103,74,0.45)';
          }}
          onMouseLeave={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = 'var(--terra)';
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = '0 6px 32px rgba(196,103,74,0.35)';
          }}
        >
          Aloita ilmainen matching →
        </button>

        <p style={{ marginTop: '20px', fontSize: '13px', color: 'var(--ink-light)', fontFamily: 'Nunito, sans-serif' }}>
          Täysin ilmainen · Ei sitoutumista · Tulokset heti
        </p>
      </div>
    </section>
  );
};

export default QuizTeaserSection;
