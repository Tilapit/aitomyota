export type QuizId = "short" | "long";
export type QuizAnswerValue = string | string[];
export type QuizAnswers = Record<string, QuizAnswerValue>;

export type QuizAnswer = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  number: number;
  category: string;
  question: string;
  multiSelect?: boolean;
  openText?: boolean;
  answers?: QuizAnswer[];
  note?: string;
};

export type Quiz = {
  id: QuizId;
  title: string;
  description: string;
  questions: QuizQuestion[];
};

export type Recommendation = {
  name: string;
  title: string;
  reason: string;
  availability: string;
  tags: string[];
};

const shortQuiz: Quiz = {
  id: "short",
  title: "Short introduction",
  description:
    "7 questions, about 2 minutes. A lighter first step when you simply want to get moving.",
  questions: [
    {
      id: "s1",
      number: 1,
      category: "situation",
      question: "What best describes what feels heaviest for you right now?",
      answers: [
        { id: "s1a", text: "Daily life or work feels heavy and my energy is under strain" },
        { id: "s1b", text: "There is one specific thing on my mind that I want to talk about" },
        { id: "s1c", text: "A big life change is happening and I need support around it" },
        { id: "s1d", text: "I cannot quite name it yet, it just feels unclear and heavy" },
      ],
    },
    {
      id: "s2",
      number: 2,
      category: "language",
      question: "What language would you like to use with the professional?",
      answers: [
        { id: "s2a", text: "Finnish" },
        { id: "s2b", text: "Swedish" },
        { id: "s2c", text: "English" },
      ],
    },
    {
      id: "s3",
      number: 3,
      category: "support style",
      question: "What kind of support feels most important right now?",
      answers: [
        { id: "s3a", text: "A safe space to unpack what is going on without pressure" },
        { id: "s3b", text: "Concrete tools I can try in everyday life" },
        { id: "s3c", text: "Help understanding why I react the way I do" },
        { id: "s3d", text: "A clearer direction, I want movement and change" },
      ],
    },
    {
      id: "s4",
      number: 4,
      category: "therapist",
      question: "Does the therapist's gender matter to you?",
      answers: [
        { id: "s4a", text: "Woman" },
        { id: "s4b", text: "Man" },
        { id: "s4c", text: "Non-binary or another identity" },
        { id: "s4d", text: "No preference" },
      ],
    },
    {
      id: "s5",
      number: 5,
      category: "therapist",
      question: "Does the therapist's age matter to you?",
      answers: [
        { id: "s5a", text: "Younger, under 40" },
        { id: "s5b", text: "More experienced, over 45" },
        { id: "s5c", text: "No preference" },
      ],
    },
    {
      id: "s6",
      number: 6,
      category: "practicalities",
      question: "What price range feels realistic to you per session?",
      note: "These ranges are indicative and may vary by professional.",
      answers: [
        { id: "s6a", text: "Under 80 EUR" },
        { id: "s6b", text: "80 to 120 EUR" },
        { id: "s6c", text: "120 to 160 EUR" },
        { id: "s6d", text: "Price is not the deciding factor for me" },
      ],
    },
    {
      id: "s7",
      number: 7,
      category: "practicalities",
      question: "Would you like to use Kela reimbursement if possible?",
      note: "Kela may reimburse part of psychotherapy costs under certain conditions in Finland.",
      answers: [
        { id: "s7a", text: "Yes, show only therapists who fit that path" },
        { id: "s7b", text: "It is helpful, but not essential" },
        { id: "s7c", text: "I am not sure yet, tell me more later" },
      ],
    },
  ],
};

const longQuiz: Quiz = {
  id: "long",
  title: "Deeper introduction",
  description:
    "16 questions, about 5 minutes. More nuance, more detail, and a softer path toward a more precise match.",
  questions: [
    {
      id: "l1",
      number: 1,
      category: "situation",
      question: "What best describes what feels heaviest for you right now?",
      answers: [
        { id: "l1a", text: "Daily life or work feels heavy and my energy is under strain" },
        { id: "l1b", text: "There is one specific thing on my mind that I want to talk about" },
        { id: "l1c", text: "A big life change is happening and I need support around it" },
        { id: "l1d", text: "I cannot quite name it yet, it just feels unclear and heavy" },
      ],
    },
    {
      id: "l2",
      number: 2,
      category: "language",
      question: "What language would you like to use with the professional?",
      answers: [
        { id: "l2a", text: "Finnish" },
        { id: "l2b", text: "Swedish" },
        { id: "l2c", text: "English" },
      ],
    },
    {
      id: "l3",
      number: 3,
      category: "situation",
      question: "How long has this been weighing on you?",
      answers: [
        { id: "l3a", text: "Quite recently, it still feels new" },
        { id: "l3b", text: "For a few months" },
        { id: "l3c", text: "For a longer time, more than a year" },
        { id: "l3d", text: "For as long as I can remember, it has always been there in some way" },
      ],
    },
    {
      id: "l4",
      number: 4,
      category: "situation",
      question: "What area of life would you most want to talk about? You can choose more than one.",
      multiSelect: true,
      answers: [
        { id: "l4a", text: "Work, career, or studies" },
        { id: "l4b", text: "Relationships, partnership, or family" },
        { id: "l4c", text: "Identity or life direction" },
        { id: "l4d", text: "Mood, anxiety, or burnout" },
        { id: "l4e", text: "Something else, I can explain it in my own words later" },
      ],
    },
    {
      id: "l5",
      number: 5,
      category: "situation",
      question: "How disruptive does this feel in your everyday life right now?",
      note: "If you feel in crisis, the fastest available support is always the most important next step.",
      answers: [
        { id: "l5a", text: "I am coping, but I wanted to seek support early" },
        { id: "l5b", text: "Daily life still works somehow, but my energy is running low" },
        { id: "l5c", text: "It feels quite heavy and I need help now" },
        { id: "l5d", text: "It feels overwhelming" },
      ],
    },
    {
      id: "l6",
      number: 6,
      category: "approach",
      question: "How do you usually work through difficult things?",
      answers: [
        { id: "l6a", text: "I talk to people close to me, connection helps" },
        { id: "l6b", text: "I think about things quietly on my own" },
        { id: "l6c", text: "I do something concrete, action helps" },
        { id: "l6d", text: "It depends on the situation" },
      ],
    },
    {
      id: "l7",
      number: 7,
      category: "approach",
      question: "What kind of professional would feel most natural to you?",
      answers: [
        { id: "l7a", text: "Warm and empathetic, I mainly want to feel heard" },
        { id: "l7b", text: "Knowledgeable and structured, I want to understand what is happening" },
        { id: "l7c", text: "Direct, I can appreciate challenging observations too" },
        { id: "l7d", text: "I am not sure yet, I would rather discover it as I go" },
      ],
    },
    {
      id: "l8",
      number: 8,
      category: "approach",
      question: "What pace would feel right for you?",
      answers: [
        { id: "l8a", text: "Slowly and at my own pace, no rush" },
        { id: "l8b", text: "Goal-oriented, I want to feel progress" },
        { id: "l8c", text: "Either can work, I am flexible" },
      ],
    },
    {
      id: "l9",
      number: 9,
      category: "practicalities",
      question: "Would you prefer to meet remotely or in person?",
      answers: [
        { id: "l9a", text: "Remote, video sessions would work well for me" },
        { id: "l9b", text: "In person, physical presence matters to me" },
        { id: "l9c", text: "Either works" },
      ],
    },
    {
      id: "l10",
      number: 10,
      category: "practicalities",
      question: "What session frequency sounds right to you?",
      answers: [
        { id: "l10a", text: "Once a week, I want to move actively" },
        { id: "l10b", text: "A couple of times a month" },
        { id: "l10c", text: "Once a month is enough" },
        { id: "l10d", text: "I am not sure yet, I would rather try first" },
      ],
    },
    {
      id: "l11",
      number: 11,
      category: "practicalities",
      question: "What price range feels realistic to you per session?",
      answers: [
        { id: "l11a", text: "Under 80 EUR" },
        { id: "l11b", text: "80 to 120 EUR" },
        { id: "l11c", text: "120 to 160 EUR" },
        { id: "l11d", text: "Price is not the deciding factor for me" },
      ],
    },
    {
      id: "l12",
      number: 12,
      category: "practicalities",
      question: "Would you like to use Kela reimbursement if possible?",
      note: "Kela may reimburse part of psychotherapy costs under certain conditions in Finland.",
      answers: [
        { id: "l12a", text: "Yes, that matters to me" },
        { id: "l12b", text: "It is helpful, but not essential" },
        { id: "l12c", text: "I am not sure yet, I would like to hear more" },
      ],
    },
    {
      id: "l13",
      number: 13,
      category: "history",
      question: "Have you been in therapy or received similar professional support before?",
      answers: [
        { id: "l13a", text: "No, this would be my first experience" },
        { id: "l13b", text: "Yes, and it felt positive" },
        { id: "l13c", text: "Yes, but something about it did not feel right" },
        { id: "l13d", text: "I am currently in therapy and looking for something alongside it or in place of it" },
      ],
    },
    {
      id: "l14",
      number: 14,
      category: "history",
      question: "If you have been before, what felt good or what felt missing?",
      answers: [
        { id: "l14a", text: "I felt heard, but concrete tools were missing" },
        { id: "l14b", text: "There was a lot of theory, but the human connection felt distant" },
        { id: "l14c", text: "It worked well, I am looking for something similar" },
        { id: "l14d", text: "I do not have earlier experience, I will skip this" },
      ],
    },
    {
      id: "l15",
      number: 15,
      category: "you",
      question: "How would you describe your relationship to your own emotions?",
      answers: [
        { id: "l15a", text: "They feel very present, sometimes almost too much" },
        { id: "l15b", text: "They feel distant, it is hard to tell what I feel" },
        { id: "l15c", text: "I can function with them, but something still feels stuck" },
        { id: "l15d", text: "I have not really thought about that before" },
      ],
    },
    {
      id: "l16",
      number: 16,
      category: "you",
      question: "Is there anything else you would want a therapist to know before a first appointment?",
      openText: true,
      note: "Write as little or as much as you want. This helps add nuance to the match.",
    },
  ],
};

export const quizzes: Record<QuizId, Quiz> = {
  short: shortQuiz,
  long: longQuiz,
};

export function getQuiz(quizId: QuizId): Quiz {
  return quizzes[quizId];
}

function readAnswer(answers: QuizAnswers, ...keys: string[]) {
  for (const key of keys) {
    const value = answers[key];
    if (typeof value === "string") {
      return value;
    }
  }

  return undefined;
}

function answerCopy(answerId: string | undefined, values: Record<string, string>, fallback: string) {
  if (!answerId) {
    return fallback;
  }

  return values[answerId] ?? fallback;
}

export function buildRecommendations(
  quizId: QuizId,
  answers: QuizAnswers,
): Recommendation[] {
  const language = answerCopy(
    readAnswer(answers, "s2", "l2"),
    {
      s2a: "in Finnish",
      s2b: "in Swedish",
      s2c: "in English",
      l2a: "in Finnish",
      l2b: "in Swedish",
      l2c: "in English",
    },
    "in the language that feels natural to you",
  );

  const supportNeed = answerCopy(
    readAnswer(answers, "s3", "l7"),
    {
      s3a: "a safe and pressure-free space to unpack what is going on",
      s3b: "practical tools that can help in everyday life",
      s3c: "help understanding the roots of your reactions",
      s3d: "clearer direction and movement forward",
      l7a: "a warm and empathetic encounter",
      l7b: "a structured and thoughtful working style",
      l7c: "honest, even slightly challenging reflection",
      l7d: "space to discover the right fit without forcing it",
    },
    "a way of being met that does not ask too much of you at once",
  );

  const sessionMode = answerCopy(
    readAnswer(answers, "l9"),
    {
      l9a: "remotely",
      l9b: "in person",
      l9c: "either remotely or in person",
    },
    "in a flexible way",
  );

  const pace = answerCopy(
    readAnswer(answers, "l8"),
    {
      l8a: "slowly and at your own pace",
      l8b: "with clear goals and a steady rhythm",
      l8c: "with flexibility depending on the moment",
    },
    "at a pace that feels right for you",
  );

  const focus = answerCopy(
    readAnswer(answers, "s1", "l1"),
    {
      s1a: "carrying strain around energy, work, or everyday life",
      s1b: "holding one particular issue heavily in your mind",
      s1c: "moving through a major life change",
      s1d: "trying to name something that still feels vague",
      l1a: "carrying strain around energy, work, or everyday life",
      l1b: "holding one particular issue heavily in your mind",
      l1c: "moving through a major life change",
      l1d: "trying to name something that still feels vague",
    },
    "whatever in life feels most alive for you right now",
  );

  const kelaPreference = readAnswer(answers, "s7", "l12");
  const kelaTag =
    kelaPreference === "s7a" || kelaPreference === "l12a"
      ? "Kela pathway possible"
      : "Flexible way to begin";

  const depthTag =
    quizId === "long" ? "Built from the deeper quiz" : "Built from the shorter quiz";

  return [
    {
      name: "Anna Mäkinen",
      title: "Cognitive psychotherapist",
      availability: "Open times available this week",
      tags: [supportNeed, language, kelaTag],
      reason: `Anna rises first because you described needing ${supportNeed}. Her way of working is clear, warm, and practical, which often feels especially supportive when you are ${focus}. She can meet ${sessionMode} and shape a first appointment ${pace}.`,
    },
    {
      name: "Juhani Leppänen",
      title: "Psychodynamic therapist",
      availability: "New client openings next week",
      tags: [language, "Longer-term work", depthTag],
      reason: `Juhani is a strong alternative when you want to pause more deeply and understand how the current strain has grown over time. He can be a particularly good fit when there are layers beneath the surface, but you still want a calm rhythm and room to think aloud ${language}.`,
    },
    {
      name: "Sari Rantanen",
      title: "ACT therapist",
      availability: "Remote appointments also available in the evenings",
      tags: [sessionMode, "Everyday tools", "Low-pressure first step"],
      reason: `Sari is a good third recommendation if you hope therapy will leave you with practical tools to carry into daily life. Her approach often helps when you want both compassion and a little concrete forward movement. This option works especially well if you want to begin ${sessionMode} and keep the threshold as gentle as possible.`,
    },
  ];
}
