import React from "react";
import Logo from "./Logo";

const Footer: React.FC = () => {
  return (
    <>
      <div style={{ lineHeight: 0, background: "#2A1F18" }}>
        <svg
          viewBox="0 0 1440 70"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "70px" }}
        >
          <path
            d="M0,35 C360,70 720,0 1080,35 C1260,52 1380,25 1440,35 L1440,70 L0,70 Z"
            fill="#FAF6F0"
          />
        </svg>
      </div>

      <footer
        style={{
          background: "#2A1F18",
          padding: "60px 72px 40px",
        }}
      >
        <div className="page-shell-tight" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <a href="#" style={{ marginBottom: "20px", textDecoration: "none" }}>
            <Logo light />
          </a>

          <p className="footer-quote">
            &quot;The first therapy appointment should feel safe, not like a guess.&quot;
          </p>

          <div style={{ display: "flex", gap: "32px", marginBottom: "40px" }}>
            {["Privacy", "For therapists", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "13px",
                  color: "rgba(250,246,240,0.4)",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = "rgba(250,246,240,0.8)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "rgba(250,246,240,0.4)";
                }}
              >
                {link}
              </a>
            ))}
          </div>

          <div style={{ fontSize: "11px", color: "rgba(250,246,240,0.2)", letterSpacing: "0.05em" }}>
            © 2026 Myötä · Helsinki, Finland
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
