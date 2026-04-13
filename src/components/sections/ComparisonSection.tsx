import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "../layout/Logo";
import { getHomeContent } from "../../content/homeContent";
import { useCurrentLocale } from "../../hooks/useCurrentLocale";

const ComparisonSection: React.FC = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation("landing-client");
  const { directoryPoints, myotaPoints } = getHomeContent(locale);

  return (
    <>
      <div style={{ lineHeight: 0, background: "white" }}>
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "60px" }}
        >
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z"
            fill="#FAF6F0"
          />
        </svg>
      </div>

      <section style={{ padding: "80px 72px 100px", background: "white" }}>
        <div className="page-shell-tight">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div className="s-label" style={{ justifyContent: "center" }}>
              {t("comparison.eyebrow")}
            </div>
            <h2 style={{ maxWidth: "100%", textAlign: "center" }}>
              {t("comparison.title")}
            </h2>
          </div>

          <div className="comparison-layout">
            <div className="comparison-side">
              <div className="compare-title compare-title-muted">
                {t("comparison.directoryTitle")}
              </div>
              <div className="comparison-list">
                {directoryPoints.map((text) => (
                  <div key={text} className="comparison-row comparison-row-muted">
                    <span className="comparison-mark comparison-mark-muted">✕</span>
                    <span className="compare-copy compare-copy-muted">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="comparison-side comparison-side-strong">
              <div className="comparison-brand">
                <Logo width={110} height={38} />
              </div>
              <div className="comparison-list">
                {myotaPoints.map((item, index) => (
                  <div key={index} className="comparison-row">
                    <span className="comparison-mark">✓</span>
                    <span className="compare-copy compare-copy-strong">
                      {item.text}
                      {item.em && <em>{item.em}</em>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComparisonSection;
