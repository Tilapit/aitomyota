import React, { useEffect, useRef } from "react";
import { CalendarCheck, ChatCenteredDots, Sparkle } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation("landing-client");
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const steps = t("how.steps", {
    returnObjects: true,
  }) as Array<{ kicker: string; title: string; text: string; pill: string }>;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animation = "fadeUp 0.6s ease forwards";
            (entry.target as HTMLElement).style.opacity = "1";
          }
        });
      },
      { threshold: 0.15 },
    );

    stepRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="how"
        style={{ padding: "80px 72px 100px", background: "var(--sand-pale)" }}
      >
        <div className="page-shell">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="s-label" style={{ justifyContent: "center" }}>
              {t("how.eyebrow")}
            </div>
            <h2 style={{ maxWidth: "100%", textAlign: "center" }}>
              {t("how.title")}
            </h2>
            <p
              className="s-sub"
              style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}
            >
              {t("how.description")}
            </p>
          </div>

          <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto" }}>
            <div
              style={{
                position: "absolute",
                left: "35px",
                top: "50px",
                bottom: "50px",
                width: "2px",
                background: "linear-gradient(to bottom, #C4674A, rgba(196,103,74,0.1))",
              }}
            />

            <div
              ref={(element) => {
                stepRefs.current[0] = element;
              }}
              className="tl-step"
              style={{
                display: "flex",
                gap: "40px",
                alignItems: "flex-start",
                marginBottom: "56px",
                opacity: 0,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "var(--terra)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(196,103,74,0.3)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <ChatCenteredDots size={32} color="white" weight="regular" />
              </div>
              <div style={{ paddingTop: "12px" }}>
                <div className="step-kicker">{steps[0].kicker}</div>
                <div className="step-title">{steps[0].title}</div>
                <p className="step-text">{steps[0].text}</p>
                <div className="step-pill">{steps[0].pill}</div>
              </div>
            </div>

            <div
              ref={(element) => {
                stepRefs.current[1] = element;
              }}
              className="tl-step"
              style={{
                display: "flex",
                gap: "40px",
                alignItems: "flex-start",
                marginBottom: "56px",
                opacity: 0,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "var(--cream)",
                  border: "2px solid var(--terra-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Sparkle size={32} color="#C4674A" weight="regular" />
              </div>
              <div style={{ paddingTop: "12px" }}>
                <div className="step-kicker">{steps[1].kicker}</div>
                <div className="step-title">{steps[1].title}</div>
                <p className="step-text">{steps[1].text}</p>
                <div className="step-pill">{steps[1].pill}</div>
              </div>
            </div>

            <div
              ref={(element) => {
                stepRefs.current[2] = element;
              }}
              className="tl-step"
              style={{
                display: "flex",
                gap: "40px",
                alignItems: "flex-start",
                opacity: 0,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "var(--cream)",
                  border: "2px solid var(--terra-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <CalendarCheck size={32} color="#C4674A" weight="regular" />
              </div>
              <div style={{ paddingTop: "12px" }}>
                <div className="step-kicker">{steps[2].kicker}</div>
                <div className="step-title">{steps[2].title}</div>
                <p className="step-text">{steps[2].text}</p>
                <div className="step-pill">{steps[2].pill}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ lineHeight: 0, background: "white" }}>
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "60px" }}
        >
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z"
            fill="#F8F2EA"
          />
        </svg>
      </div>
    </>
  );
};

export default HowItWorksSection;
