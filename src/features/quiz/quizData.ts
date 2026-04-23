import type { Locale } from "../../types/app";

export type QuizId = "short" | "long";
export type QuizAnswerValue = string | string[];
export type QuizAnswers = Record<string, QuizAnswerValue>;

export type QuizAnswer = {
  id: string;
  isOther?: boolean;
};

export type QuizQuestion = {
  id: string;
  type: "single" | "multi" | "slider" | "text";
  optional?: boolean;
  answers?: QuizAnswer[];
  sliderDefault?: number;
  conditionalOn?: { questionId: string; answerId: string };
  quizIds: QuizId[];
};

export type Quiz = {
  id: QuizId;
  questions: QuizQuestion[];
};

export type Recommendation = {
  name: string;
  title: string;
  reason: string;
  availability: string;
  tags: string[];
};

/**
 * All questions in display order.
 * Short quiz: questions with quizIds including "short"
 * Long quiz:  all questions (quizIds including "long")
 * Conditional questions are filtered dynamically by useQuiz based on current answers.
 */
const ALL_QUESTIONS: QuizQuestion[] = [
  // ── Situation ──────────────────────────────────────────────────────────────
  {
    id: "q1",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
    quizIds: ["short", "long"],
  },
  // Long-only: how long has this been going on (inserted right after q1)
  {
    id: "pq1",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
    quizIds: ["long"],
  },
  // Conditional: shown only if q1 = "b" ("one specific thing")
  {
    id: "q1b",
    type: "single",
    conditionalOn: { questionId: "q1", answerId: "b" },
    answers: [
      { id: "a" },
      { id: "b" },
      { id: "c" },
      { id: "d" },
      { id: "e", isOther: true },
    ],
    quizIds: ["short", "long"],
  },
  // Conditional + optional: shown only if q1 = "d" ("can't name it yet")
  {
    id: "q1c",
    type: "single",
    optional: true,
    conditionalOn: { questionId: "q1", answerId: "d" },
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
    quizIds: ["short", "long"],
  },
  // Long-only: life area (multi-select)
  {
    id: "pq2",
    type: "multi",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }, { id: "e" }],
    quizIds: ["long"],
  },
  // Long-only: how disruptive
  {
    id: "pq3",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
    quizIds: ["long"],
  },

  // ── What you want ──────────────────────────────────────────────────────────
  {
    id: "q2",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
    quizIds: ["short", "long"],
  },
  {
    id: "q3",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
    quizIds: ["short", "long"],
  },
  // Slider: listens ↔ actively guides (1–5, default 3)
  {
    id: "q4",
    type: "slider",
    sliderDefault: 3,
    quizIds: ["short", "long"],
  },
  {
    id: "q5",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }],
    quizIds: ["short", "long"],
  },
  // Long-only: how you process difficult things
  {
    id: "pq4",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
    quizIds: ["long"],
  },
  // Long-only: pace
  {
    id: "pq5",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }],
    quizIds: ["long"],
  },

  // ── Practicalities ─────────────────────────────────────────────────────────
  {
    id: "q6",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
    quizIds: ["short", "long"],
  },
  {
    id: "q7",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
    quizIds: ["short", "long"],
  },
  {
    id: "q8",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
    quizIds: ["short", "long"],
  },
  {
    id: "q9",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }],
    quizIds: ["short", "long"],
  },
  // Long-only: session frequency
  {
    id: "pq6",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
    quizIds: ["long"],
  },
  {
    id: "q10",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }],
    quizIds: ["short", "long"],
  },
  // Conditional + optional: city, shown only if q10 = "b" (in person)
  {
    id: "q10b",
    type: "text",
    optional: true,
    conditionalOn: { questionId: "q10", answerId: "b" },
    quizIds: ["short", "long"],
  },

  // ── History (long only) ────────────────────────────────────────────────────
  {
    id: "pq7",
    type: "single",
    answers: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
    quizIds: ["long"],
  },
  // Optional free-text wish
  {
    id: "pq8",
    type: "text",
    optional: true,
    quizIds: ["long"],
  },
];

export function getQuiz(quizId: QuizId): Quiz {
  return {
    id: quizId,
    questions: ALL_QUESTIONS.filter((q) => q.quizIds.includes(quizId)),
  };
}

// ── Recommendation helpers ──────────────────────────────────────────────────

function readAnswer(answers: QuizAnswers, ...keys: string[]): string | undefined {
  for (const key of keys) {
    const v = answers[key];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return undefined;
}

function answerCopy(
  id: string | undefined,
  map: Record<string, string>,
  fallback: string,
): string {
  if (!id) return fallback;
  return map[id] ?? fallback;
}

export function buildRecommendations(
  quizId: QuizId,
  answers: QuizAnswers,
  locale: Locale,
): Recommendation[] {
  if (locale === "fi") {
    const focus = answerCopy(readAnswer(answers, "q1"), {
      a: "kannattelet kuormitusta energian, työn tai arjen ympärillä",
      b: "yksi tietty asia painaa mielessäsi vahvasti",
      c: "olet keskellä suurta elämänmuutosta",
      d: "yrität nimetä jotakin, joka tuntuu vielä epämääräiseltä",
    }, "sen äärellä, mikä tuntuu juuri nyt elämässäsi voimakkaimmalta");

    const want = answerCopy(readAnswer(answers, "q2"), {
      a: "kevyempää oloa",
      b: "syvempää itsetuntemusta",
      c: "tietyn ongelman ratkaisua",
      d: "todellista muutosta elämässä",
    }, "sitä, mikä tuntuu sinulle tärkeimmältä");

    const style = answerCopy(readAnswer(answers, "q3"), {
      a: "rauhallista ja lempeää lähestymistapaa",
      b: "rehellistä ja suoraa kohtaamista",
      c: "lämmintä ja rohkaisevaa tukea",
      d: "strukturoitua ja tavoitteellista työskentelyä",
    }, "sinulle sopivaa työskentelytapaa");

    const sessionMode = answerCopy(readAnswer(answers, "q10"), {
      a: "etänä",
      b: "kasvotusten",
      c: "joustavasti etänä tai kasvotusten",
    }, "joustavasti");

    const pace = answerCopy(readAnswer(answers, "pq5"), {
      a: "rauhallisesti omaan tahtiin",
      b: "tavoitteellisesti selkeällä rytmillä",
      c: "joustavasti tilanteen mukaan",
    }, "sinulle sopivassa tahdissa");

    const kelaTag =
      readAnswer(answers, "q9") === "a" ? "Kela-polku mahdollinen" : "Joustava tapa aloittaa";
    const depthTag =
      quizId === "long"
        ? "Rakennettu pidemmän kyselyn pohjalta"
        : "Rakennettu lyhyen kyselyn pohjalta";

    return [
      {
        name: "Anna Mäkinen",
        title: "Kognitiivinen psykoterapeutti",
        availability: "Aikoja vapaana jo tällä viikolla",
        tags: [style, kelaTag],
        reason: `Anna nousee ensimmäiseksi, koska kuvasit toivovasi ${want}. Hänen työskentelytapansa tarjoaa ${style}, mikä tuntuu usein erityisen kannattelevalta silloin kun ${focus}. Hän voi tavata ${sessionMode} ja rakentaa ensimmäisen tapaamisen ${pace}.`,
      },
      {
        name: "Juhani Leppänen",
        title: "Psykodynaaminen terapeutti",
        availability: "Uusia asiakaspaikkoja ensi viikolla",
        tags: [focus, "Pidempikestoinen työskentely", depthTag],
        reason: `Juhani on vahva vaihtoehto, kun haluat pysähtyä syvemmin ja ymmärtää, miten nykyinen kuormitus on rakentunut ajan myötä. Hän sopii erityisesti tilanteisiin, joissa on useita kerroksia, ja työskentelee ${pace}.`,
      },
      {
        name: "Sari Rantanen",
        title: "ACT-terapeutti",
        availability: "Etävastaanottoja myös iltaisin",
        tags: [sessionMode, "Arjen työkalut", "Matala kynnys aloittaa"],
        reason: `Sari on hyvä kolmas suositus, jos toivot ${want}. Hänen lähestymistapansa yhdistää myötätunnon käytännölliseen etenemiseen. Tämä vaihtoehto toimii erityisen hyvin, jos haluat aloittaa ${sessionMode}.`,
      },
    ];
  }

  // English
  const focus = answerCopy(readAnswer(answers, "q1"), {
    a: "carrying strain around energy, work, or everyday life",
    b: "holding one particular issue heavily in your mind",
    c: "moving through a major life change",
    d: "trying to name something that still feels vague",
  }, "whatever in life feels most alive for you right now");

  const want = answerCopy(readAnswer(answers, "q2"), {
    a: "feeling lighter",
    b: "understanding yourself better",
    c: "solving a specific problem",
    d: "creating real change",
  }, "what matters most to you");

  const style = answerCopy(readAnswer(answers, "q3"), {
    a: "a calm and gentle approach",
    b: "an honest and direct encounter",
    c: "warm and encouraging support",
    d: "structured and goal-oriented work",
  }, "a working style that suits you");

  const sessionMode = answerCopy(readAnswer(answers, "q10"), {
    a: "remotely",
    b: "in person",
    c: "flexibly, either remotely or in person",
  }, "in a flexible way");

  const pace = answerCopy(readAnswer(answers, "pq5"), {
    a: "slowly at your own pace",
    b: "with clear goals and a steady rhythm",
    c: "flexibly depending on the moment",
  }, "at a pace that feels right for you");

  const kelaTag =
    readAnswer(answers, "q9") === "a" ? "Kela pathway possible" : "Flexible way to begin";
  const depthTag =
    quizId === "long" ? "Built from the deeper quiz" : "Built from the shorter quiz";

  return [
    {
      name: "Anna Mäkinen",
      title: "Cognitive psychotherapist",
      availability: "Open times available this week",
      tags: [style, kelaTag],
      reason: `Anna rises first because you described hoping for ${want}. Her way of working offers ${style}, which often feels especially supportive when you are ${focus}. She can meet ${sessionMode} and shape a first appointment ${pace}.`,
    },
    {
      name: "Juhani Leppänen",
      title: "Psychodynamic therapist",
      availability: "New client openings next week",
      tags: [focus, "Longer-term work", depthTag],
      reason: `Juhani is a strong alternative when you want to pause more deeply and understand how the current strain has grown over time. He is a particularly good fit when there are layers beneath the surface, and works ${pace}.`,
    },
    {
      name: "Sari Rantanen",
      title: "ACT therapist",
      availability: "Remote appointments also available in the evenings",
      tags: [sessionMode, "Everyday tools", "Low-pressure first step"],
      reason: `Sari is a good third recommendation if you hope for ${want}. Her approach combines compassion with concrete forward movement. This option works especially well if you want to begin ${sessionMode}.`,
    },
  ];
}
