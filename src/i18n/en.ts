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
  comparison: {
    eyebrow: "Why Myötä",
    title: "Less searching, more direction",
    directoryLabel: "Typical directory",
    directoryPoints: [
      "Hundreds of profiles, but no clear place to begin",
      "No explanation for why a certain therapist might fit you",
      "The first appointment can feel like a costly guess",
      "Momentum gets lost before you even start",
    ],
    myotaPoints: [
      { text: "A short match flow narrows the field quickly" },
      { text: "Every recommendation comes with a reason: ", em: "why it fits" },
      { text: "You can watch an intro or reach out directly from the result" },
      { text: "The first session feels chosen, not random" },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What people say after they finally start",
    subtitle: "A few voices from people who moved from browsing to a more considered first step.",
    featuredBadge: "Most loved",
    items: [
      {
        quote:
          "I expected another long directory and more uncertainty. Instead, I got three thoughtful recommendations and understood why each one could work for me.",
        name: "Emilia, 31",
        context: "Started with the shorter quiz",
      },
      {
        quote:
          "The deeper version helped me notice what kind of therapist I actually needed, not just what topic I wanted to talk about. That changed everything.",
        name: "Jonas, 42",
        context: "Chose the deeper quiz",
      },
      {
        quote:
          "What I appreciated most was that the first step felt gentle. I did not need perfect words, and I still felt understood.",
        name: "Mira, 27",
        context: "Booked after her first recommendation",
      },
    ],
  },
  faq: {
    eyebrow: "FAQs",
    title: "Questions that usually come up",
    subtitle: "The practical details, without repeating the whole pitch.",
    items: [
      {
        question: "How long does this take?",
        answer:
          "Most people can finish the main flow in about two minutes. There is also a longer version if you want to give the match more context.",
      },
      {
        question: "Do I need to know exactly what is wrong before I start?",
        answer:
          "No. Many people begin when they can only describe a feeling, not a clear label. The questions are designed to work with that uncertainty rather than against it.",
      },
      {
        question: "Will I only see one recommendation?",
        answer:
          "No. You receive three recommendations, along with a short explanation of why each one could be a good fit for you.",
      },
      {
        question: "Can I start with the short quiz and go deeper later?",
        answer:
          "Yes. You can begin with the shorter path and switch to the longer version later if you want a fuller recommendation.",
      },
    ],
    secondaryText:
      "Start with the standard match flow, or choose the longer version if you want to give the recommendation more detail.",
    shortQuizBtn: "Start the short quiz",
    longQuizBtn: "Take the deeper quiz",
  },
  footer: {
    quote: '"The first therapy appointment should feel safe, not like a guess."',
    links: ["Privacy", "For therapists", "Contact"],
    copy: "© 2026 Myötä · Helsinki, Finland",
  },
};

export default en;
export type Translations = typeof en;