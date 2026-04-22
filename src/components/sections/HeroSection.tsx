import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import heroBg from "../../assets/hero-bg.webp";
import AudienceTabs from "../layout/AudienceTabs";
import { useCurrentLocale } from "../../hooks/useCurrentLocale";

interface HeroSectionProps {
  onOpenQuiz: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuiz }) => {
  const { t } = useTranslation("landing-client");
  const locale = useCurrentLocale();
  const statsRef = useRef<HTMLDivElement>(null);
  const stats = t("hero.stats", { returnObjects: true }) as Array<{ num: string; label: string }>;

  useEffect(() => {
    const element = statsRef.current;
    if (!element) {
      return;
    }

    element.style.opacity = "0";
    element.style.transform = "translateY(10px)";

    const timeoutId = window.setTimeout(() => {
      element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <section
        style={{
          minHeight: "100vh",
          width: "100%",
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          backgroundColor: "#FBF0EC",
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "72px",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(250,246,240,0.88) 0%, rgba(250,246,240,0.82) 35%, rgba(250,246,240,0.50) 60%, rgba(250,246,240,0.10) 80%, rgba(250,246,240,0) 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="page-shell"
          style={{
            position: "relative",
            zIndex: 1,
            paddingTop: "60px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: "fadeUp 0.8s ease both",
          }}
        >
          <div style={{ maxWidth: "700px", width: "100%" }}>
          <AudienceTabs locale={locale} active="client" />

          <h1
            style={{
              fontFamily: "Lora, serif",
              fontSize: "clamp(36px, 4vw, 58px)",
              lineHeight: 1.08,
              fontWeight: 600,
              letterSpacing: "-0.025em",
              color: "#1E1610",
              marginBottom: "14px",
              textShadow: "0 2px 16px rgba(250,246,240,1), 0 0 40px rgba(250,246,240,0.9)",
            }}
          >
            {t("hero.titleLineOne")}
            <br />
            <em style={{ fontStyle: "italic", color: "#C4674A" }}>
              {t("hero.titleAccent")}
            </em>
          </h1>

          <p
            style={{
              fontSize: "15.5px",
              color: "#5C4E3D",
              maxWidth: "440px",
              marginBottom: "28px",
              lineHeight: 1.65,
              textAlign: "center",
              textShadow: "0 2px 12px rgba(250,246,240,1)",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {t("hero.description")}
          </p>

          <button
            onClick={onOpenQuiz}
            style={{
              background: "#C4674A",
              color: "white",
              border: "none",
              padding: "16px 32px",
              borderRadius: "100px",
              fontFamily: "Nunito, sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 5px 24px rgba(196,103,74,0.38)",
              transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = "#B05840";
              event.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = "#C4674A";
              event.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {t("hero.cta")}
          </button>

          <div
            ref={statsRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              justifyContent: "center",
              marginTop: "60px",
              width: "100%",
            }}
          >
            {stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                {index > 0 && (
                  <div
                    style={{
                      width: "1px",
                      height: "28px",
                      background: "rgba(196,103,74,0.18)",
                      flexShrink: 0,
                    }}
                  />
                )}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "Lora, serif",
                      fontSize: "26px",
                      fontWeight: 600,
                      color: "#1E1610",
                    }}
                    >
                      {stat.num}
                    </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#5C4E3D",
                      marginTop: "1px",
                      fontWeight: 500,
                    }}
                    >
                      {stat.label}
                    </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        </div>
      </section>

      <div style={{ marginTop: "-2px", lineHeight: 0, background: "#F8F2EA" }}>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "80px" }}
        >
          <path
            d="M0,40 C200,80 400,0 720,40 C1040,80 1240,10 1440,40 L1440,80 L0,80 Z"
            fill="#FAF6F0"
          />
        </svg>
      </div>
    </>
  );
};

export default HeroSection;
