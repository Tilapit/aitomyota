import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getHomeContent } from "../../content/homeContent";
import { useCurrentLocale } from "../../hooks/useCurrentLocale";

interface FAQSectionProps {
  onOpenQuiz: () => void;
  onOpenLongQuiz: () => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ onOpenQuiz, onOpenLongQuiz }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation("landing-client");
  const { faqs } = getHomeContent(locale);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section style={{ background: "var(--cream)", padding: "80px 24px" }}>
      <div className="page-shell-narrow">
        <div style={{ textAlign: "center", marginBottom: "34px" }}>
          <div className="teaser-kicker">{t("faq.eyebrow")}</div>
          <h2 className="teaser-title">{t("faq.title")}</h2>
          <p className="teaser-subtitle" style={{ maxWidth: "620px", marginLeft: "auto", marginRight: "auto" }}>
            {t("faq.description")}
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
            {t("faq.ctaDescription")}
          </p>
          <div className="faq-actions">
            <button onClick={onOpenQuiz} className="teaser-secondary-btn">
              {t("faq.ctaShort")}
            </button>
            <button onClick={onOpenLongQuiz} className="teaser-secondary-btn">
              {t("faq.ctaLong")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
