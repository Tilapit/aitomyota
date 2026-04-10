import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

interface FAQSectionProps {
  onOpenQuiz: () => void;
  onOpenLongQuiz: () => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ onOpenQuiz, onOpenLongQuiz }) => {
  const { t } = useLanguage();
  const { faq: f } = t;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section style={{ background: "var(--cream)", padding: "80px 24px" }}>
      <div className="page-shell-narrow">
        <div style={{ textAlign: "center", marginBottom: "34px" }}>
          <div className="teaser-kicker">{f.eyebrow}</div>
          <h2 className="teaser-title">{f.title}</h2>
          <p
            className="teaser-subtitle"
            style={{ maxWidth: "620px", marginLeft: "auto", marginRight: "auto" }}
          >
            {f.subtitle}
          </p>
        </div>

        <div className="faq-list">
          {f.items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <button
                key={faq.question}
                type="button"
                className={`faq-item${isOpen ? " open" : ""}`}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <div className="faq-question-row">
                  <span className="faq-question">{faq.question}</span>
                  <span className="faq-toggle">{isOpen ? "−" : "+"}</span>
                </div>
                {isOpen && <div className="faq-answer">{faq.answer}</div>}
              </button>
            );
          })}
        </div>

        <div className="teaser-secondary" style={{ marginTop: "26px", textAlign: "center" }}>
          <p className="teaser-secondary-text">{f.secondaryText}</p>
          <div className="faq-actions">
            <button onClick={onOpenQuiz} className="teaser-secondary-btn">
              {f.shortQuizBtn}
            </button>
            <button onClick={onOpenLongQuiz} className="teaser-secondary-btn">
              {f.longQuizBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;