import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Logo from "../components/layout/Logo";
import { routePaths } from "../lib/routes";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import heroBg from "../assets/hero-bg.webp";

export default function TherapistLandingPage() {
  const locale = useCurrentLocale();
  const navigate = useNavigate();
  const { t } = useTranslation("landing-therapist");
  const { t: tc } = useTranslation("common");
  const statsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState(0);

  const stats = t("hero.stats", { returnObjects: true }) as Array<{ num: string; label: string }>;
  const howSteps = t("how.steps", {
    returnObjects: true,
  }) as Array<{ kicker: string; title: string; text: string; pill: string }>;
  const directoryPoints = t("content.directoryPoints", { returnObjects: true }) as string[];
  const myotaPoints = t("content.myotaPoints", { returnObjects: true }) as string[];
  const testimonials = t("content.testimonials", {
    returnObjects: true,
  }) as Array<{ quote: string; name: string; context: string }>;
  const faqs = t("content.faqs", {
    returnObjects: true,
  }) as Array<{ question: string; answer: string }>;

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

    cardRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar locale={locale} />
      <main className="bg-[color:var(--cream)] pt-[88px]">
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
                "linear-gradient(to bottom, rgba(250,246,240,0.9) 0%, rgba(250,246,240,0.82) 35%, rgba(250,246,240,0.54) 60%, rgba(250,246,240,0.12) 80%, rgba(250,246,240,0) 100%)",
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
            <div style={{ maxWidth: "760px", width: "100%" }}>
              <Link
                to={routePaths.clientHome(locale)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "28px",
                  padding: "9px 20px",
                  borderRadius: "100px",
                  border: "1px solid rgba(30,22,16,0.18)",
                  background: "rgba(250,246,240,0.7)",
                  color: "var(--ink-mid)",
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  backdropFilter: "blur(4px)",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(196,103,74,0.4)";
                  e.currentTarget.style.color = "var(--terra)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(30,22,16,0.18)";
                  e.currentTarget.style.color = "var(--ink-mid)";
                }}
              >
                ← {tc("audienceTabs.forClients")}
              </Link>

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
                <em style={{ fontStyle: "italic", color: "#C4674A" }}>{t("hero.titleAccent")}</em>
              </h1>

              <p
                style={{
                  fontSize: "15.5px",
                  color: "#5C4E3D",
                  maxWidth: "520px",
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
                onClick={() => navigate(routePaths.therapistQuiz(locale))}
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
                }}
              >
                {t("hero.cta")} →
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
                  flexWrap: "wrap",
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
                      <div style={{ fontFamily: "Lora, serif", fontSize: "26px", fontWeight: 600, color: "#1E1610" }}>
                        {stat.num}
                      </div>
                      <div style={{ fontSize: "12px", color: "#5C4E3D", marginTop: "1px", fontWeight: 500 }}>
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
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
            <path d="M0,40 C200,80 400,0 720,40 C1040,80 1240,10 1440,40 L1440,80 L0,80 Z" fill="#FAF6F0" />
          </svg>
        </div>

        <section id="how" style={{ padding: "80px 72px 100px", background: "var(--sand-pale)" }}>
          <div className="page-shell">
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div className="s-label" style={{ justifyContent: "center" }}>{t("how.eyebrow")}</div>
              <h2 style={{ maxWidth: "100%", textAlign: "center" }}>{t("how.title")}</h2>
              <p className="s-sub" style={{ maxWidth: "540px", margin: "0 auto", textAlign: "center" }}>
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
              {howSteps.map((step, index) => (
                <div
                  key={step.kicker}
                  className="tl-step"
                  style={{
                    display: "flex",
                    gap: "40px",
                    alignItems: "flex-start",
                    marginBottom: index === howSteps.length - 1 ? "0" : "56px",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: index === 0 ? "var(--terra)" : "var(--cream)",
                      border: index === 0 ? "none" : "2px solid var(--terra-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: index === 0 ? "0 8px 24px rgba(196,103,74,0.3)" : "none",
                      position: "relative",
                      zIndex: 1,
                      color: index === 0 ? "white" : "var(--terra)",
                      fontFamily: "Lora, serif",
                      fontSize: "24px",
                      fontWeight: 600,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ paddingTop: "12px" }}>
                    <div className="step-kicker">{step.kicker}</div>
                    <div className="step-title">{step.title}</div>
                    <p className="step-text">{step.text}</p>
                    <div className="step-pill">{step.pill}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ lineHeight: 0, background: "white" }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="#F8F2EA" />
          </svg>
        </div>

        <section style={{ padding: "80px 72px 100px", background: "white" }}>
          <div className="page-shell-tight">
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <div className="s-label" style={{ justifyContent: "center" }}>{t("comparison.eyebrow")}</div>
              <h2 style={{ maxWidth: "100%", textAlign: "center" }}>{t("comparison.title")}</h2>
            </div>

            <div className="comparison-layout">
              <div className="comparison-side">
                <div className="compare-title compare-title-muted">{t("comparison.directoryTitle")}</div>
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
                  {myotaPoints.map((text) => (
                    <div key={text} className="comparison-row">
                      <span className="comparison-mark">✓</span>
                      <span className="compare-copy compare-copy-strong">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="stories" className="profiles-sec">
          <div className="page-shell">
            <div className="testimonial-heading">
              <div>
                <div className="s-label">{t("testimonials.eyebrow")}</div>
                <h2>{t("testimonials.title")}</h2>
              </div>
              <p className="s-sub testimonial-intro">{t("testimonials.description")}</p>
            </div>

            <div className="testimonial-layout">
              {testimonials.map((item, index) => (
                <article
                  key={item.name}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className={`testimonial-entry${index === 0 ? " is-featured" : ""}`}
                  style={{ opacity: 0, transitionDelay: `${index * 0.15}s` }}
                >
                  <div
                    className="testimonial-image"
                    style={{
                      backgroundImage: `linear-gradient(rgba(30,22,16,0.14), rgba(30,22,16,0.14)), url(/images/pexels-polina-zimmerman-3958407.jpg)`,
                    }}
                    aria-hidden="true"
                  />
                  <div className="testimonial-mark">“</div>
                  <div className="testimonial-quote">{item.quote}</div>
                  <div className="testimonial-meta">
                    <div className="testimonial-name">{item.name}</div>
                    <div className="testimonial-context">{item.context}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

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
              <p className="teaser-secondary-text">{t("faq.ctaDescription")}</p>
              <div className="faq-actions">
                <button onClick={() => navigate(routePaths.therapistQuiz(locale))} className="teaser-secondary-btn">
                  {t("faq.ctaShort")}
                </button>
                <button onClick={() => navigate(routePaths.therapistDashboard(locale))} className="teaser-secondary-btn">
                  {t("faq.ctaLong")}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
