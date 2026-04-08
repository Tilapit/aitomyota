import React, { useState } from "react";

interface FAQSectionProps {
  onOpenQuiz: () => void;
  onOpenLongQuiz: () => void;
}

const faqs = [
  {
    question: "How long does this take?",
    answer:
      "Most people can finish the main flow in about two minutes. There is also a longer version if you want to give the match more context.",
  },
  {
    question: "Do I need to know exactly what is wrong before I start?",
    answer:
      "No. Many people begin when they can only describe a feeling, not a clear label. The questions are designed to work with that uncertainty rather than against it.",
  },
  {
    question: "Will I only see one recommendation?",
    answer:
      "No. You receive three recommendations, along with a short explanation of why each one could be a good fit for you.",
  },
  {
    question: "Can I start with the short quiz and go deeper later?",
    answer:
      "Yes. You can begin with the shorter path and switch to the longer version later if you want a fuller recommendation.",
  },
];

const FAQSection: React.FC<FAQSectionProps> = ({ onOpenQuiz, onOpenLongQuiz }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section style={{ background: "var(--cream)", padding: "80px 24px" }}>
      <div className="page-shell-narrow">
        <div style={{ textAlign: "center", marginBottom: "34px" }}>
          <div className="teaser-kicker">FAQs</div>
          <h2 className="teaser-title">Questions that usually come up</h2>
          <p className="teaser-subtitle" style={{ maxWidth: "620px", marginLeft: "auto", marginRight: "auto" }}>
            The practical details, without repeating the whole pitch.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
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
          <p className="teaser-secondary-text">
            Start with the standard match flow, or choose the longer version if you want to give the recommendation more detail.
          </p>
          <div className="faq-actions">
            <button onClick={onOpenQuiz} className="teaser-secondary-btn">
              Start the short quiz
            </button>
            <button onClick={onOpenLongQuiz} className="teaser-secondary-btn">
              Take the deeper quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
