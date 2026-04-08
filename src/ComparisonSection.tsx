import React from "react";
import Logo from "./Logo";

const ComparisonSection: React.FC = () => {
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
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div className="s-label" style={{ justifyContent: "center" }}>
              Why Myötä
            </div>
            <h2 style={{ maxWidth: "100%", textAlign: "center" }}>
              Different from a typical directory
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div
              style={{
                background: "#F7F5F2",
                borderRadius: "24px",
                padding: "36px",
                border: "1px solid #EDE8E1",
              }}
            >
              <div className="compare-title compare-title-muted">Typical directory</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "Hundreds of profiles, but no clear place to begin",
                  "No explanation for why a certain therapist might fit you",
                  "The first appointment can feel like a costly guess",
                  "Finding the right person can take months",
                ].map((text) => (
                  <div key={text} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ color: "#C4A882", fontSize: "16px", marginTop: "1px", flexShrink: 0 }}>
                      ✕
                    </span>
                    <span className="compare-copy compare-copy-muted">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #FBF0EC 0%, #FAF6F0 100%)",
                borderRadius: "24px",
                padding: "36px",
                border: "2px solid rgba(196,103,74,0.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "120px",
                  height: "120px",
                  background: "radial-gradient(circle, rgba(196,103,74,0.08) 0%, transparent 70%)",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                <Logo width={110} height={38} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { text: "A short quiz gives you 3 personal recommendations" },
                  { text: "Every recommendation is explained: ", em: "why it suits you" },
                  { text: "The first appointment feels more intentional, less like a guess" },
                  { text: "You can begin quickly, then go deeper if you have time" },
                ].map((item, index) => (
                  <div key={index} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ color: "#C4674A", fontSize: "16px", marginTop: "1px", flexShrink: 0 }}>
                      ✓
                    </span>
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
