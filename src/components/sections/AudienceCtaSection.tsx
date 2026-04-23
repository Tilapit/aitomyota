import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routePaths } from "../../lib/routes";
import { useCurrentLocale } from "../../hooks/useCurrentLocale";

interface AudienceCtaSectionProps {
  onOpenQuiz: () => void;
}

export default function AudienceCtaSection({ onOpenQuiz }: AudienceCtaSectionProps) {
  const { t } = useTranslation("landing-client");
  const locale = useCurrentLocale();

  return (
    <section style={{ background: "var(--cream)", padding: "96px 72px 80px" }}>
      <div className="page-shell-tight">

        {/* Primary: Client CTA */}
        <div
          style={{
            background: "white",
            borderRadius: "28px",
            padding: "64px 72px",
            boxShadow: "0 20px 64px rgba(30,22,16,0.06)",
            border: "1px solid rgba(196,103,74,0.08)",
            marginBottom: "24px",
          }}
          className="audience-cta-primary"
        >
          <div
            style={{
              fontSize: "10.5px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--terra)",
              marginBottom: "20px",
            }}
          >
            {t("audienceCta.client.eyebrow")}
          </div>

          <h2
            style={{
              fontFamily: "Lora, serif",
              fontSize: "clamp(32px, 3.5vw, 48px)",
              lineHeight: 1.08,
              fontWeight: 600,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              marginBottom: "18px",
              maxWidth: "520px",
            }}
          >
            {t("audienceCta.client.title")}
          </h2>

          <p
            style={{
              fontSize: "15.5px",
              lineHeight: 1.7,
              color: "var(--ink-mid)",
              marginBottom: "40px",
              maxWidth: "480px",
            }}
          >
            {t("audienceCta.client.description")}
          </p>

          <button
            onClick={onOpenQuiz}
            style={{
              background: "var(--terra)",
              color: "white",
              border: "none",
              borderRadius: "100px",
              padding: "16px 34px",
              fontFamily: "Nunito, sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 5px 22px rgba(196,103,74,0.34)",
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#B05840";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--terra)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {t("audienceCta.client.cta")} →
          </button>
        </div>

        {/* Secondary: Therapist bridge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            padding: "24px 32px",
            borderRadius: "16px",
            border: "1px solid rgba(196,103,74,0.10)",
            background: "rgba(250,246,240,0.6)",
          }}
          className="audience-cta-secondary"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--ink)",
                lineHeight: 1.4,
              }}
            >
              {t("audienceCta.therapist.title")}
            </span>
            <span
              style={{
                fontSize: "13px",
                color: "var(--ink-light)",
                lineHeight: 1.5,
              }}
            >
              {t("audienceCta.therapist.description")}
            </span>
          </div>

          <Link
            to={routePaths.therapistLanding(locale)}
            style={{
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "transparent",
              color: "var(--ink-mid)",
              border: "1px solid rgba(30,22,16,0.14)",
              borderRadius: "100px",
              padding: "10px 22px",
              fontFamily: "Nunito, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(196,103,74,0.4)";
              e.currentTarget.style.color = "var(--terra)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(30,22,16,0.14)";
              e.currentTarget.style.color = "var(--ink-mid)";
            }}
          >
            {t("audienceCta.therapist.cta")} →
          </Link>
        </div>

      </div>

      <style>{`
        @media (max-width: 680px) {
          .audience-cta-primary {
            padding: 40px 28px !important;
          }
          .audience-cta-secondary {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
