export type QuizId = "short" | "long";
export type QuizAnswerValue = string | string[] | number;
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
  slider?: {
    min: number;
    max: number;
    labelMin: string;
    labelMax: string;
    words: string[];
  };
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
    "8 questions, about 2 minutes. A lighter first step when you simply want to get moving.",
  questions: [
    {
      id: "s1",
      number: 1,
      category: "situation",
      question: "What feels heaviest for you right now?",
      answers: [
        { id: "s1a", text: "Everyday life or work feels heavy and my energy is under strain" },
        { id: "s1b", text: "There is one specific thing on my mind that I want to talk about" },
        { id: "s1c", text: "A big life change is happening and I need support around it" },
        { id: "s1d", text: "I cannot quite name it yet, it just feels unclear and heavy" },
      ],
    },
    {
      id: "s2",
      number: 2,
      category: "goal",
      question: "What do you want most from therapy right now?",
      answers: [
        { id: "s2a", text: "To feel lighter and better in myself" },
        { id: "s2b", text: "To understand myself better" },
        { id: "s2c", text: "To work through a specific problem" },
        { id: "s2d", text: "To create real change in my life" },
      ],
    },
    {
      id: "s3",
      number: 3,
      category: "personality",
      question: "What kind of person helps you most in difficult moments?",
      answers: [
        { id: "s3a", text: "Calm and gentle" },
        { id: "s3b", text: "Honest and direct" },
        { id: "s3c", text: "Warm and encouraging" },
        { id: "s3d", text: "Analytical and structured" },
      ],
    },
    {
      id: "s4",
      number: 4,
      category: "working style",
      question: "How do you want your therapist to work with you?",
      slider: {
        min: 0,
        max: 100,
        labelMin: "Mostly listening",
        labelMax: "Actively guiding and giving direction",
        words: ["Mostly listening", "More listening", "Balanced", "More guiding", "Actively guiding"],
      },
    },
    {
      id: "s5",
      number: 5,
      category: "therapist",
      question: "Does your therapist's gender matter to you?",
      answers: [
        { id: "s5a", text: "Woman" },
        { id: "s5b", text: "Man" },
        { id: "s5c", text: "Non-binary or another identity" },
        { id: "s5d", text: "No preference" },
      ],
    },
    {
      id: "s6",
      number: 6,
      category: "therapist",
      question: "How important is it that your therapist has a lot of life experience?",
      slider: {
        min: 0,
        max: 100,
        labelMin: "Not important at all",
        labelMax: "Very important",
        words: ["Not important", "Slightly important", "Somewhat important", "Quite important", "Very important"],
      },
    },
    {
      id: "s7",
      number: 7,
      category: "practicalities",
      question: "What price range feels realistic to you per session?",
      note: "These ranges are indicative and may vary by professional.",
      answers: [
        { id: "s7a", text: "Under 80 EUR" },
        { id: "s7b", text: "80 to 120 EUR" },
        { id: "s7c", text: "120 to 160 EUR" },
        { id: "s7d", text: "Price is not the deciding factor for me" },
      ],
    },
    {
      id: "s8",
      number: 8,
      category: "practicalities",
      question: "Would you like to use Kela reimbursement if possible?",
      note: "Kela may reimburse part of psychotherapy costs under certain conditions in Finland.",
      answers: [
        { id: "s8a", text: "Yes, show only therapists who fit that path" },
        { id: "s8b", text: "It is helpful, but not essential" },
        { id: "s8c", text: "I am not sure yet, tell me more later" },
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
      question: "What feels heaviest for you right now?",
      answers: [
        { id: "l1a", text: "Everyday life or work feels heavy and my energy is under strain" },
        { id: "l1b", text: "There is one specific thing on my mind that I want to talk about" },
        { id: "l1c", text: "A big life change is happening and I need support around it" },
        { id: "l1d", text: "I cannot quite name it yet, it just feels unclear and heavy" },
      ],
    },
    {
      id: "l2",
      number: 2,
      category: "goal",
      question: "What do you want most from therapy right now?",
      answers: [
        { id: "l2a", text: "To feel lighter and better in myself" },
        { id: "l2b", text: "To understand myself better" },
        { id: "l2c", text: "To work through a specific problem" },
        { id: "l2d", text: "To create real change in my life" },
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
      category: "personality",
      question: "What kind of person helps you most in difficult moments?",
      answers: [
        { id: "l6a", text: "Calm and gentle" },
        { id: "l6b", text: "Honest and direct" },
        { id: "l6c", text: "Warm and encouraging" },
        { id: "l6d", text: "Analytical and structured" },
      ],
    },
    {
      id: "l7",
      number: 7,
      category: "working style",
      question: "How do you want your therapist to work with you?",
      slider: {
        min: 0,
        max: 100,
        labelMin: "Mostly listening",
        labelMax: "Actively guiding and giving direction",
        words: ["Mostly listening", "More listening", "Balanced", "More guiding", "Actively guiding"],
      },
    },
    {
      id: "l8",
      number: 8,
      category: "approach",
      question: "How do you usually work through difficult things?",
      answers: [
        { id: "l8a", text: "I talk to people close to me, connection helps" },
        { id: "l8b", text: "I think about things quietly on my own" },
        { id: "l8c", text: "I do something concrete, action helps" },
        { id: "l8d", text: "It depends on the situation" },
      ],
    },
    {
      id: "l9",
      number: 9,
      category: "approach",
      question: "What pace would feel right for you?",
      answers: [
        { id: "l9a", text: "Slowly and at my own pace, no rush" },
        { id: "l9b", text: "Goal-oriented, I want to feel progress" },
        { id: "l9c", text: "Either can work, I am flexible" },
      ],
    },
    {
      id: "l10",
      number: 10,
      category: "practicalities",
      question: "Would you prefer to meet remotely or in person?",
      answers: [
        { id: "l10a", text: "Remote, video sessions would work well for me" },
        { id: "l10b", text: "In person, physical presence matters to me" },
        { id: "l10c", text: "Either works" },
      ],
    },
    {
      id: "l11",
      number: 11,
      category: "practicalities",
      question: "What session frequency sounds right to you?",
      answers: [
        { id: "l11a", text: "Once a week, I want to move actively" },
        { id: "l11b", text: "A couple of times a month" },
        { id: "l11c", text: "Once a month is enough" },
        { id: "l11d", text: "I am not sure yet, I would rather try first" },
      ],
    },
    {
      id: "l12",
      number: 12,
      category: "therapist",
      question: "How important is it that your therapist has a lot of life experience?",
      slider: {
        min: 0,
        max: 100,
        labelMin: "Not important at all",
        labelMax: "Very important",
        words: ["Not important", "Slightly important", "Somewhat important", "Quite important", "Very important"],
      },
    },
    {
      id: "l13",
      number: 13,
      category: "practicalities",
      question: "What price range feels realistic to you per session?",
      answers: [
        { id: "l13a", text: "Under 80 EUR" },
        { id: "l13b", text: "80 to 120 EUR" },
        { id: "l13c", text: "120 to 160 EUR" },
        { id: "l13d", text: "Price is not the deciding factor for me" },
      ],
    },
    {
      id: "l14",
      number: 14,
      category: "practicalities",
      question: "Would you like to use Kela reimbursement if possible?",
      note: "Kela may reimburse part of psychotherapy costs under certain conditions in Finland.",
      answers: [
        { id: "l14a", text: "Yes, that matters to me" },
        { id: "l14b", text: "It is helpful, but not essential" },
        { id: "l14c", text: "I am not sure yet, I would like to hear more" },
      ],
    },
    {
      id: "l15",
      number: 15,
      category: "history",
      question: "Have you been in therapy or received similar professional support before?",
      answers: [
        { id: "l15a", text: "No, this would be my first experience" },
        { id: "l15b", text: "Yes, and it felt positive" },
        { id: "l15c", text: "Yes, but something about it did not feel right" },
        { id: "l15d", text: "I am currently in therapy and looking for something alongside it or in place of it" },
      ],
    },
    {
      id: "l16",
      number: 16,
      category: "you",
      question: "What do you hope will change in your life?",
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
    if (value !== undefined) {
      return value;
    }
  }
  return undefined;
}

function readStringAnswer(answers: QuizAnswers, ...keys: string[]): string | undefined {
  const value = readAnswer(answers, ...keys);
  return typeof value === "string" ? value : undefined;
}

function answerCopy(
  answerId: string | undefined,
  values: Record<string, string>,
  fallback: string,
) {
  if (!answerId) return fallback;
  return values[answerId] ?? fallback;
}

function sliderWord(value: QuizAnswerValue | undefined, words: string[]): string {
  if (typeof value !== "number") return words[2] ?? words[0];
  const idx = Math.min(Math.floor((value / 100) * words.length), words.length - 1);
  return words[idx];
}

export function buildRecommendations(
  quizId: QuizId,
  answers: QuizAnswers,
): Recommendation[] {
  const focus = answerCopy(
    readStringAnswer(answers, "s1", "l1"),
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

  const goal = answerCopy(
    readStringAnswer(answers, "s2", "l2"),
    {
      s2a: "feeling lighter and better in yourself",
      s2b: "understanding yourself better",
      s2c: "working through a specific problem",
      s2d: "creating real change in your life",
      l2a: "feeling lighter and better in yourself",
      l2b: "understanding yourself better",
      l2c: "working through a specific problem",
      l2d: "creating real change in your life",
    },
    "finding a way forward that feels right",
  );

  const personality = answerCopy(
    readStringAnswer(answers, "s3", "l6"),
    {
      s3a: "calm and gentle", s3b: "honest and direct",
      s3c: "warm and encouraging", s3d: "analytical and structured",
      l6a: "calm and gentle", l6b: "honest and direct",
      l6c: "warm and encouraging", l6d: "analytical and structured",
    },
    "someone who feels like a natural fit",
  );

  const workingStyleWords = ["mostly listening", "leaning toward listening", "balanced between listening and guiding", "leaning toward active guidance", "actively guiding"];
  const workingStyleValue = readAnswer(answers, "s4", "l7");
  const workingStyle = sliderWord(workingStyleValue, workingStyleWords);

  const sessionMode = answerCopy(
    readStringAnswer(answers, "l10"),
    {
      l10a: "remotely",
      l10b: "in person",
      l10c: "either remotely or in person",
    },
    "in a flexible way",
  );

  const pace = answerCopy(
    readStringAnswer(answers, "l9"),
    {
      l9a: "slowly and at your own pace",
      l9b: "with clear goals and a steady rhythm",
      l9c: "with flexibility depending on the moment",
    },
    "at a pace that feels right for you",
  );

  const kelaPreference = readStringAnswer(answers, "s8", "l14");
  const kelaTag =
    kelaPreference === "s8a" || kelaPreference === "l14a"
      ? "Kela pathway possible"
      : "Flexible way to begin";

  const depthTag =
    quizId === "long" ? "Built from the deeper quiz" : "Built from the shorter quiz";

  return [
    {
      name: "Anna Mäkinen",
      title: "Cognitive psychotherapist",
      availability: "Open times available this week",
      tags: [goal, personality, kelaTag],
      reason: `Anna rises first because your goal is ${goal} and you tend to connect best with someone ${personality}. Her approach is ${workingStyle}, which fits well when you are ${focus}. She can meet ${sessionMode} and work ${pace}.`,
    },
    {
      name: "Juhani Leppänen",
      title: "Psychodynamic therapist",
      availability: "New client openings next week",
      tags: [personality, "Longer-term work", depthTag],
      reason: `Juhani is a strong alternative when you want to pause more deeply and understand how the current strain has grown over time. He tends to work in a way that is ${workingStyle}, which suits someone looking to ${goal} through careful, unhurried reflection.`,
    },
    {
      name: "Sari Rantanen",
      title: "ACT therapist",
      availability: "Remote appointments also available in the evenings",
      tags: [sessionMode, "Everyday tools", "Low-pressure first step"],
      reason: `Sari is a good third recommendation if you hope therapy will leave you with practical tools. Her way of working leans toward being ${personality} while still offering structure. A gentle starting point, especially if you want to begin ${sessionMode}.`,
    },
  ];
}

