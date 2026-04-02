import React, { useState, useEffect } from 'react';
import { quizQuestions } from "./Quizdata";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setAnswers({});
      setSelectedOption(null);
      setIsComplete(false);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const question = quizQuestions[currentStep];
  const progress = ((currentStep) / quizQuestions.length) * 100;

  const handleSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);

    if (currentStep < quizQuestions.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setSelectedOption(null);
        setAnimating(false);
      }, 200);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setSelectedOption(answers[quizQuestions[currentStep - 1].id] || null);
        setAnimating(false);
      }, 150);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(30,22,16,0.6)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div
        style={{
          background: 'var(--cream)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 32px 80px rgba(30,22,16,0.3)',
          animation: 'slideUp 0.3s ease',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '28px 32px 20px',
            borderBottom: '1px solid rgba(30,22,16,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="28" height="28" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
              <rect width="56" height="56" rx="14" fill="#C4674A" />
              <path d="M8 34 C13 29,17 27,22 31 C27 36,31 37,36 32 C40 28,44 27,48 30" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="50" cy="31" r="3.2" fill="white" />
            </svg>
            <span style={{ fontFamily: 'Lora, serif', fontSize: '18px', fontWeight: 600, color: 'var(--ink)' }}>Myötä</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ink-light)',
              fontSize: '22px',
              lineHeight: 1,
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--sand-pale)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {isComplete ? (
            /* Completion screen */
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>✨</div>
              <h2 style={{ fontFamily: 'Lora, serif', fontSize: '26px', fontWeight: 600, color: 'var(--ink)', marginBottom: '16px' }}>
                Etsitään sopivia terapeutteja...
              </h2>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '16px', color: 'var(--ink-mid)', lineHeight: 1.65, marginBottom: '32px' }}>
                Hienosti! Vastaustesi perusteella löydämme sinulle 3 sopivinta terapeuttia selityksineen.
              </p>
              <button
                style={{
                  background: 'var(--terra)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '14px 36px',
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  width: '100%',
                  boxShadow: '0 4px 20px rgba(196,103,74,0.3)',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--terra-mid)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--terra)')}
                onClick={onClose}
              >
                Katso suosituksesi →
              </button>
              <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--ink-light)' }}>
                (MVP-vaihe: tämä vie sinut takaisin etusivulle)
              </p>
            </div>
          ) : (
            /* Quiz flow */
            <div style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.15s ease' }}>
              {/* Progress */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', color: 'var(--ink-light)' }}>
                    Kysymys {currentStep + 1} / {quizQuestions.length}
                  </span>
                  <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--terra)' }}>
                    {Math.round(((currentStep + 1) / quizQuestions.length) * 100)}%
                  </span>
                </div>
                <div style={{ height: '4px', background: 'var(--terra-pale)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${progress + (1 / quizQuestions.length) * 100}%`,
                      background: 'var(--terra)',
                      borderRadius: '4px',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3
                style={{
                  fontFamily: 'Lora, serif',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  lineHeight: 1.35,
                  marginBottom: '28px',
                }}
              >
                {question.question}
              </h3>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {question.options.map((option: any) => {
                  const isSelected = selectedOption === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      style={{
                        padding: '14px 20px',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid var(--terra)' : '1.5px solid rgba(30,22,16,0.12)',
                        background: isSelected ? 'var(--terra-wash)' : 'white',
                        color: isSelected ? 'var(--terra)' : 'var(--ink)',
                        fontFamily: 'Nunito, sans-serif',
                        fontSize: '15px',
                        fontWeight: isSelected ? 600 : 400,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                      onMouseEnter={e => {
                        if (!isSelected) {
                          const btn = e.currentTarget as HTMLButtonElement;
                          btn.style.borderColor = 'rgba(196,103,74,0.4)';
                          btn.style.background = 'var(--terra-wash)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isSelected) {
                          const btn = e.currentTarget as HTMLButtonElement;
                          btn.style.borderColor = 'rgba(30,22,16,0.12)';
                          btn.style.background = 'white';
                        }
                      }}
                    >
                      <span
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: isSelected ? '2px solid var(--terra)' : '2px solid rgba(30,22,16,0.15)',
                          background: isSelected ? 'var(--terra)' : 'transparent',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {isSelected && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    style={{
                      flex: '0 0 auto',
                      padding: '14px 24px',
                      borderRadius: '12px',
                      border: '1.5px solid rgba(30,22,16,0.15)',
                      background: 'transparent',
                      color: 'var(--ink-mid)',
                      fontFamily: 'Nunito, sans-serif',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(30,22,16,0.3)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(30,22,16,0.15)')}
                  >
                    ← Takaisin
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  style={{
                    flex: 1,
                    padding: '14px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    background: selectedOption ? 'var(--terra)' : 'rgba(30,22,16,0.1)',
                    color: selectedOption ? 'white' : 'var(--ink-light)',
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: selectedOption ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedOption ? '0 4px 16px rgba(196,103,74,0.25)' : 'none',
                  }}
                >
                  {currentStep === quizQuestions.length - 1 ? 'Katso suositukset →' : 'Seuraava →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
