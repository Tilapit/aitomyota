import React, { useEffect, useRef, useState } from "react";

type Therapist = {
  id: string;
  initials: string;
  name: string;
  role: string;
  specialty: string;
  reason: string;
  tags: string[];
  featured?: boolean;
  videoLength: string;
  videoTheme: string;
  introSummary: string;
  introPoints: string[];
};

function WaveSVG() {
  return (
    <svg
      style={{ position: "absolute", bottom: 0, right: 0, opacity: 0.08, pointerEvents: "none" }}
      width="72"
      height="36"
      viewBox="0 0 72 36"
      fill="none"
    >
      <path
        d="M2 28 C9 22,14 19,20 24 C26 30,31 31,37 26 C42 21,47 19,53 23 C57 26,60 27,64 26"
        stroke="#C4674A"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="67" cy="26" r="2.5" fill="#C4674A" />
    </svg>
  );
}

const therapists: Therapist[] = [
  {
    id: "anna",
    initials: "AM",
    name: "Anna Mäkinen",
    role: "Cognitive psychotherapist",
    specialty: "Specialises in anxiety",
    reason:
      "Anna specialises in anxiety and has worked with CBT for eight years. Her style is practical, steady, and solution-focused, exactly the kind of approach many people hope for in a first match.",
    tags: ["Anxiety", "CBT", "Remote", "Finnish / English"],
    featured: true,
    videoLength: "1:12",
    videoTheme: "linear-gradient(135deg, rgba(245,221,215,1) 0%, rgba(255,255,255,1) 100%)",
    introSummary:
      "Anna’s short introduction gives a calm sense of how she works with anxious thought loops and how she tries to make the first meeting feel structured rather than overwhelming.",
    introPoints: [
      "What a first session with her usually feels like",
      "How she uses CBT without making the conversation feel mechanical",
      "Why people looking for calm structure often respond well to her style",
    ],
  },
  {
    id: "juhani",
    initials: "JL",
    name: "Juhani Leppänen",
    role: "Psychodynamic therapist",
    specialty: "Longer-term therapy",
    reason:
      "Juhani has deep experience with longer therapeutic work, which suits situations that carry more weight and need more time. His style is warm and thoughtful.",
    tags: ["Low mood", "Psychodynamic", "In person & Remote"],
    videoLength: "0:56",
    videoTheme: "linear-gradient(135deg, rgba(240,232,218,1) 0%, rgba(255,255,255,1) 100%)",
    introSummary:
      "Juhani’s introduction is quieter and more reflective, giving a feel for the pace, depth, and patience of longer-form therapeutic work.",
    introPoints: [
      "How he approaches slower, longer therapeutic conversations",
      "What he listens for underneath the immediate problem",
      "Why depth can still feel warm rather than distant",
    ],
  },
  {
    id: "sari",
    initials: "SR",
    name: "Sari Rantanen",
    role: "Acceptance and commitment therapist",
    specialty: "Practical tools",
    reason:
      "Sari's ACT-based approach works especially well if you want practical tools to use between sessions and a sense of forward motion in daily life.",
    tags: ["ACT", "Burnout", "Remote"],
    videoLength: "1:04",
    videoTheme: "linear-gradient(135deg, rgba(251,240,236,1) 0%, rgba(255,255,255,1) 100%)",
    introSummary:
      "Sari’s introduction feels practical and encouraging, showing how she blends warmth with everyday tools that people can actually take into their week.",
    introPoints: [
      "How she turns therapeutic insight into simple daily practices",
      "Why her ACT approach suits burnout and stuckness well",
      "What makes her sessions feel active without feeling rushed",
    ],
  },
];

const ProfilesSection: React.FC = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openVideoId, setOpenVideoId] = useState<string | null>("anna");
  const [openContactId, setOpenContactId] = useState<string | null>(null);

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
    <section id="therapists" className="profiles-sec">
      <div className="s-label">Therapists</div>
      <h2>Examples of our recommendations</h2>
      <p className="s-sub">
        Each recommendation is chosen with you in mind. You can also get a first
        feel for each therapist through a short intro preview before you decide to
        reach out.
      </p>

      <div className="profiles-grid">
        {therapists.map((therapist, index) => (
          <div
            key={therapist.name}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className={`p-card${therapist.featured ? " featured" : ""}`}
            style={{ opacity: 0, transitionDelay: `${index * 0.15}s` }}
          >
            <WaveSVG />
            {therapist.featured && <div className="feat-badge">Best match</div>}

            <div
              className="therapist-video"
              style={{ background: therapist.videoTheme }}
              role="img"
              aria-label={`Intro video preview for ${therapist.name}`}
            >
              <div className="therapist-video-top">
                <span className="therapist-video-badge">Intro video</span>
                <span className="therapist-video-length">{therapist.videoLength}</span>
              </div>
              <div className="therapist-video-center">
                <button
                  type="button"
                  className="therapist-play-btn"
                  aria-label={`Play intro video for ${therapist.name}`}
                  onClick={() =>
                    setOpenVideoId((current) =>
                      current === therapist.id ? null : therapist.id,
                    )
                  }
                >
                  <span className="therapist-play-icon">▶</span>
                </button>
              </div>
              <div className="therapist-video-name">{therapist.name}</div>
            </div>

            {openVideoId === therapist.id && (
              <div className="therapist-inline-panel">
                <div className="therapist-inline-kicker">Intro video preview</div>
                <p className="therapist-inline-copy">{therapist.introSummary}</p>
                <div className="therapist-inline-points">
                  {therapist.introPoints.map((point) => (
                    <div key={point} className="therapist-inline-point">
                      <span>•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-top">
              <div
                className="p-av"
                style={{
                  background: therapist.featured
                    ? "var(--terra-pale)"
                    : index === 1
                      ? "var(--cream-dark)"
                      : "var(--terra-wash)",
                  color: therapist.featured
                    ? "var(--terra)"
                    : index === 1
                      ? "var(--ink-mid)"
                      : "var(--ink-light)",
                }}
              >
                {therapist.initials}
              </div>
              <div>
                <div className="p-name">{therapist.name}</div>
                <div className="p-role">{therapist.role}</div>
                <div className="m-pill">✦ {therapist.specialty}</div>
              </div>
            </div>

            <div className="p-why">
              <div className="p-why-lbl">Why this could suit you</div>
              <div className="p-why-txt">{therapist.reason}</div>
            </div>

            <div className="p-tags">
              {therapist.tags.map((tag) => (
                <span key={tag} className="p-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="therapist-actions">
              <button
                className={`bk-btn ${therapist.featured ? "fill" : "outline"}`}
                type="button"
                onClick={() =>
                  setOpenContactId((current) =>
                    current === therapist.id ? null : therapist.id,
                  )
                }
              >
                Contact therapist
              </button>
              <button
                className="bk-btn ghost"
                type="button"
                onClick={() =>
                  setOpenContactId((current) =>
                    current === therapist.id ? null : therapist.id,
                  )
                }
              >
                Book a call
              </button>
            </div>

            {openContactId === therapist.id && (
              <div className="therapist-inline-panel therapist-inline-panel-soft">
                <div className="therapist-inline-kicker">Next step</div>
                <div className="therapist-contact-actions">
                  <button type="button" className="therapist-contact-btn">
                    Send a message
                  </button>
                  <button type="button" className="therapist-contact-btn">
                    Request callback
                  </button>
                  <button type="button" className="therapist-contact-btn">
                    Open booking calendar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfilesSection;
