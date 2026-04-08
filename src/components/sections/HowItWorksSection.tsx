import React, { useEffect, useRef } from "react";

const HowItWorksSection: React.FC = () => {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

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
              How it works
            </div>
            <h2 style={{ maxWidth: "100%", textAlign: "center" }}>
              Three clear steps
            </h2>
            <p
              className="s-sub"
              style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}
            >
              A short path from uncertainty to a first conversation that actually feels considered.
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
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M5 6C5 4.9 5.9 4 7 4H25C26.1 4 27 4.9 27 6V20C27 21.1 26.1 22 25 22H18L13 28V22H7C5.9 22 5 21.1 5 20V6Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M10 13 C12 10, 14 16, 16 13 C18 10, 20 16, 22 13"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div style={{ paddingTop: "12px" }}>
                <div className="step-kicker">Step 01</div>
                <div className="step-title">Share what feels most important</div>
                <p className="step-text">
                  A few questions help us understand your pace, preferences, and what kind of support would feel right.
                </p>
                <div className="step-pill">About 2 to 5 minutes</div>
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
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="10" r="4" stroke="#C4674A" strokeWidth="1.8" fill="none" />
                  <path
                    d="M8 27C8 22.6 11.6 19 16 19C20.4 19 24 22.6 24 27"
                    stroke="#C4674A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M23 5 L23.6 7 L25.6 7 L24 8.2 L24.6 10.2 L23 9 L21.4 10.2 L22 8.2 L20.4 7 L22.4 7 Z"
                    fill="#C4674A"
                  />
                  <path
                    d="M9 5 L9.5 6.6 L11 6.6 L9.8 7.5 L10.2 9.1 L9 8.2 L7.8 9.1 L8.2 7.5 L7 6.6 L8.5 6.6 Z"
                    fill="#C4674A"
                    opacity="0.45"
                  />
                </svg>
              </div>
              <div style={{ paddingTop: "12px" }}>
                <div className="step-kicker">Step 02</div>
                <div className="step-title">See three strong matches</div>
                <p className="step-text">
                  We narrow the field and explain why each person stands out, so you are not scanning a directory alone.
                </p>
                <div className="step-pill">Reasons included</div>
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
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="6" width="24" height="22" rx="4" stroke="#C4674A" strokeWidth="1.8" fill="none" />
                  <path d="M4 12H28" stroke="#C4674A" strokeWidth="1.8" />
                  <line x1="10" y1="4" x2="10" y2="9" stroke="#C4674A" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="22" y1="4" x2="22" y2="9" stroke="#C4674A" strokeWidth="1.8" strokeLinecap="round" />
                  <path
                    d="M13 21 L19 21 M16 18 L19 21 L16 24"
                    stroke="#C4674A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div style={{ paddingTop: "12px" }}>
                <div className="step-kicker">Step 03</div>
                <div className="step-title">Reach out when one feels right</div>
                <p className="step-text">
                  Watch a short intro, send a first message, or book a quick call from the recommendation itself.
                </p>
                <div className="step-pill">Move only when ready</div>
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
