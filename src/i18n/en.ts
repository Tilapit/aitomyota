const en = {
  nav: {
    howItWorks: "How it works",
    stories: "Stories",
    startMatching: "Start matching",
  },
  hero: {
    eyebrow: "Matching service",
    title1: "Find the right therapist",
    title2: "the first time.",
    subtitle:
      "A calmer way to find someone who fits, before the first appointment turns into guesswork.",
    cta: "Start matching →",
    stats: [
      { num: "99+", lbl: "Therapists" },
      { num: "5 min", lbl: "Detailed match path" },
      { num: "3", lbl: "Curated matches" },
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "Three clear steps",
    subtitle:
      "A short path from uncertainty to a first conversation that actually feels considered.",
    steps: [
      {
        kicker: "Step 01",
        title: "Share what feels most important",
        text: "A few questions help us understand your pace, preferences, and what kind of support would feel right.",
        pill: "About 2 to 5 minutes",
      },
      {
        kicker: "Step 02",
        title: "See three strong matches",
        text: "We narrow the field and explain why each person stands out, so you are not scanning a directory alone.",
        pill: "Reasons included",
      },
      {
        kicker: "Step 03",
        title: "Reach out when one feels right",
        text: "Watch a short intro, send a first message, or book a quick call from the recommendation itself.",
        pill: "Move only when ready",
      },
    ],
  },
  footer: {
    quote: '"The first therapy appointment should feel safe, not like a guess."',
    links: ["Privacy", "For therapists", "Contact"],
    copy: "© 2026 Myötä · Helsinki, Finland",
  },
};

export default en;
export type Translations = typeof en;