import { useState } from "react";
import type {
  QuizAnswer,
  QuizAnswerValue,
  QuizId,
  QuizQuestion,
} from "../features/quiz/quizData";
import { useQuiz } from "../features/quiz/useQuiz";
import Logo from "../components/layout/Logo";

type QuizPageProps = {
  quizId: QuizId;
  onGoHome: () => void;
  onSelectQuiz: (quizId: QuizId) => void;
};

const recommendationMoments = {
  "Anna Mäkinen": {
    duration: "1:34",
    preview: "A calm first meeting focused on practical relief and emotional clarity.",
    videoIntro:
      "Anna opens with a grounded introduction to how she works: warm, clear, and gently practical. Her short intro is a good fit if you want to feel understood quickly without losing structure.",
    videoPoints: [
      "How she helps people who feel overloaded by daily life",
      "What a first session looks like in practice",
      "Why clarity and warmth can coexist",
    ],
    contactCopy:
      "If Anna feels like the right first direction, the next step is simply a brief message. You do not need to explain everything yet.",
  },
  "Juhani Leppänen": {
    duration: "1:48",
    preview: "A slower, more reflective introduction for people who want more depth.",
    videoIntro:
      "Juhani's introduction is thoughtful and unhurried. He speaks about long-form work, reflective conversations, and how therapy can help when something deeper has been building for a while.",
    videoPoints: [
      "What deeper therapeutic work can feel like at the beginning",
      "How he creates room for reflection without pressure",
      "Why longer patterns sometimes need a slower rhythm",
    ],
    contactCopy:
      "A first message to Juhani can be short and simple. It is enough to say what has been feeling heavy and that you are looking for an opening.",
  },
  "Sari Rantanen": {
    duration: "1:22",
    preview: "A gentle, practical style with tools you can carry into daily life.",
    videoIntro:
      "Sari's intro feels light, reassuring, and practical. She explains how she helps people begin with a low threshold while still building movement and confidence over time.",
    videoPoints: [
      "How practical tools are introduced without overwhelm",
      "Why remote appointments can still feel personal",
      "What a low-pressure first step can look like",
    ],
    contactCopy:
      "If Sari seems like a strong fit, you can begin with a short note or book a brief call to see how the first session might feel.",
  },
} satisfies Record<
  string,
  {
    duration: string;
    preview: string;
    videoIntro: string;
    videoPoints: string[];
    contactCopy: string;
  }
>;

type RecommendationMomentName = keyof typeof recommendationMoments;

const quizTone = {
  short: {
    eyebrow: "Start here",
    title: "A short match, then a clearer next step.",
    description:
      "This version keeps things light and gets you to a thoughtful recommendation quickly.",
    switchLabel: "Want more context?",
    switchCta: "Take the longer version",
    switchDescription:
      "The longer path adds more detail about pace, preferences, and how you want the work to feel.",
  },
  long: {
    eyebrow: "Longer version",
    title: "A fuller picture for a more precise match.",
    description:
      "This version asks a little more so the recommendation can be more specific.",
    switchLabel: "Prefer the shorter path?",
    switchCta: "Go back to the short version",
    switchDescription:
      "You can always return to the shorter version if you want to move faster.",
  },
} satisfies Record<
  QuizId,
  {
    eyebrow: string;
    title: string;
    description: string;
    switchLabel: string;
    switchCta: string;
    switchDescription: string;
  }
>;

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.max(8, Math.round((current / total) * 100));

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(196,103,74,0.12)]">
      <div
        className="h-full rounded-full bg-[color:var(--terra)] transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function QuizAside({
  quizTitle,
  quizDescription,
  totalQuestions,
  currentStep,
  isComplete,
  tone,
  alternateQuizId,
  onSelectQuiz,
  quizId,
}: {
  quizTitle: string;
  quizDescription: string;
  totalQuestions: number;
  currentStep: number;
  isComplete: boolean;
  tone: (typeof quizTone)[QuizId];
  alternateQuizId: QuizId;
  onSelectQuiz: (quizId: QuizId) => void;
  quizId: QuizId;
}) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <div>
        <div className="s-label">{tone.eyebrow}</div>
        <div className="font-serif text-[28px] leading-[1.18] text-[color:var(--ink)]">
          {tone.title}
        </div>
        <p className="mt-4 text-[15px] leading-7 text-[color:var(--ink-mid)]">
          {tone.description}
        </p>
      </div>

      <div className="space-y-3 border-t border-[rgba(196,103,74,0.12)] pt-5">
        <div className="font-serif text-[22px] text-[color:var(--ink)]">{quizTitle}</div>
        <p className="text-[14px] leading-6 text-[color:var(--ink-light)]">
          {quizDescription}
        </p>
        <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--terra)]">
          {totalQuestions} questions
        </div>
        {!isComplete && (
          <>
            <ProgressBar current={currentStep + 1} total={totalQuestions} />
            <div className="text-[13px] text-[color:var(--ink-light)]">
              {currentStep + 1} / {totalQuestions} completed
            </div>
          </>
        )}
      </div>

      <div className="space-y-3 border-t border-[rgba(196,103,74,0.12)] pt-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--terra)]">
          {tone.switchLabel}
        </div>
        <p className="text-[14px] leading-6 text-[color:var(--ink-mid)]">
          {tone.switchDescription}
        </p>
        <button
          type="button"
          onClick={() => onSelectQuiz(alternateQuizId)}
          className="inline-flex items-center justify-center rounded-full border border-[rgba(196,103,74,0.18)] px-4 py-2 text-sm font-semibold text-[color:var(--terra)] transition hover:bg-[color:var(--terra-wash)]"
        >
          {tone.switchCta}
        </button>
      </div>

      <div className="space-y-3 border-t border-[rgba(196,103,74,0.12)] pt-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--terra)]">
          A gentle reminder
        </div>
        <p className="text-[14px] leading-6 text-[color:var(--ink-mid)]">
          You do not need perfect words to continue. A good match often begins with
          a few honest signals, not a complete explanation.
        </p>
        <p className="text-[12px] text-[color:var(--ink-light)]">
          {quizId === "short"
            ? "You can always add more detail later."
            : "You can always switch back to the shorter path."}
        </p>
      </div>
    </aside>
  );
}

function RecommendationActions({
  name,
}: {
  name: RecommendationMomentName;
}) {
  const [openPanel, setOpenPanel] = useState<"video" | "contact" | "call" | null>(null);
  const details = recommendationMoments[name];

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setOpenPanel(openPanel === "video" ? null : "video")}
        className="therapist-video w-full text-left"
        aria-expanded={openPanel === "video"}
      >
        <div className="therapist-video-top">
          <span className="therapist-video-badge">Intro video</span>
          <span className="therapist-video-length">{details.duration}</span>
        </div>
        <div className="therapist-video-center">
          <span className="therapist-play-btn" aria-hidden="true">
            <span className="therapist-play-icon">▶</span>
          </span>
        </div>
        <div className="therapist-video-name">{name}</div>
      </button>

      {openPanel === "video" && (
        <div className="therapist-inline-panel">
          <div className="therapist-inline-kicker">Intro preview</div>
          <p className="therapist-inline-copy">{details.videoIntro}</p>
          <div className="therapist-inline-points">
            {details.videoPoints.map((point: string) => (
              <div key={point} className="therapist-inline-point">
                <span aria-hidden="true">•</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-[13px] leading-6 text-[color:var(--ink-light)]">{details.preview}</p>

      <div className="therapist-actions">
        <button
          type="button"
          onClick={() => setOpenPanel(openPanel === "contact" ? null : "contact")}
          className="bk-btn fill"
        >
          Contact therapist
        </button>
        <button
          type="button"
          onClick={() => setOpenPanel(openPanel === "call" ? null : "call")}
          className="bk-btn outline"
        >
          Book a call
        </button>
      </div>

      {openPanel === "contact" && (
        <div className="therapist-inline-panel therapist-inline-panel-soft">
          <div className="therapist-inline-kicker">Contact therapist</div>
          <p className="therapist-inline-copy">{details.contactCopy}</p>
          <div className="therapist-contact-actions">
            <button type="button" className="therapist-contact-btn">
              Write a short introduction
            </button>
            <button type="button" className="therapist-contact-btn">
              Ask about the next opening
            </button>
          </div>
        </div>
      )}

      {openPanel === "call" && (
        <div className="therapist-inline-panel therapist-inline-panel-soft">
          <div className="therapist-inline-kicker">Book a call</div>
          <p className="therapist-inline-copy">
            A short first call can help you hear their tone, ask about availability,
            and decide whether the first session feels right.
          </p>
          <div className="therapist-contact-actions">
            <button type="button" className="therapist-contact-btn">
              Reserve a short intro call
            </button>
            <button type="button" className="therapist-contact-btn">
              See available times
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

type QuestionCardProps = {
  question: QuizQuestion;
  currentIndex: number;
  total: number;
  selectedValue: QuizAnswerValue | undefined;
  onSingleSelect: (answerId: string) => void;
  onMultiToggle: (answerId: string) => void;
  onTextChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
  isFirst: boolean;
  isLast: boolean;
};

function QuestionCard({
  question,
  currentIndex,
  total,
  selectedValue,
  onSingleSelect,
  onMultiToggle,
  onTextChange,
  onBack,
  onNext,
  canProceed,
  isFirst,
  isLast,
}: QuestionCardProps) {
  return (
    <section className="rounded-[30px] bg-white px-8 py-10 shadow-[0_26px_80px_rgba(30,22,16,0.08)] sm:px-10 sm:py-12">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[color:var(--terra-wash)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--terra)]">
          {question.category}
        </span>
        <span className="text-sm text-[color:var(--ink-light)]">
          Question {currentIndex + 1} / {total}
        </span>
        {question.multiSelect && (
          <span className="rounded-full bg-[color:var(--sand-pale)] px-3 py-1 text-[11px] font-medium text-[color:var(--ink-mid)]">
            Choose more than one if needed
          </span>
        )}
      </div>

      <h1 className="max-w-3xl text-balance font-serif text-[clamp(30px,4vw,48px)] leading-[1.08] text-[color:var(--ink)]">
        {question.question}
      </h1>

      {question.note && (
        <p className="mt-5 max-w-2xl text-[14px] leading-7 text-[color:var(--ink-light)]">
          {question.note}
        </p>
      )}

      <div className="mt-8">
        {question.openText ? (
          <label className="block">
            <span className="mb-3 block text-sm font-medium text-[color:var(--ink-mid)]">
              In your own words
            </span>
            <textarea
              value={(selectedValue as string) ?? ""}
              onChange={(event) => onTextChange(event.target.value)}
              rows={8}
              className="w-full rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4 text-[15px] leading-7 text-[color:var(--ink)] outline-none transition focus:border-[color:var(--terra)] focus:bg-white"
              placeholder="Write as much or as little as you want."
            />
          </label>
        ) : (
          <div className="grid gap-3">
            {question.answers?.map((answer: QuizAnswer) => {
              const isSelected = question.multiSelect
                ? Array.isArray(selectedValue) && selectedValue.includes(answer.id)
                : selectedValue === answer.id;

              return (
                <button
                  key={answer.id}
                  type="button"
                  onClick={() =>
                    question.multiSelect
                      ? onMultiToggle(answer.id)
                      : onSingleSelect(answer.id)
                  }
                  className={[
                    "group flex w-full items-start justify-between gap-4 rounded-[18px] border px-5 py-4 text-left transition duration-200",
                    isSelected
                      ? "border-[color:var(--terra)] bg-[color:var(--terra-wash)] shadow-[0_18px_40px_rgba(196,103,74,0.12)]"
                      : "border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] hover:border-[color:var(--terra-light)] hover:bg-white",
                  ].join(" ")}
                >
                  <span className="text-[15px] leading-7 text-[color:var(--ink)]">
                    {answer.text}
                  </span>
                  <span
                    aria-hidden="true"
                    className={[
                      "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition",
                      isSelected
                        ? "border-[color:var(--terra)] bg-[color:var(--terra)] text-white"
                        : "border-[color:var(--cream-dark)] text-transparent group-hover:border-[color:var(--terra-light)]",
                    ].join(" ")}
                  >
                    ✓
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-[rgba(196,103,74,0.08)] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isFirst}
          className="inline-flex items-center justify-center rounded-full border border-[color:var(--cream-dark)] px-5 py-3 text-sm font-medium text-[color:var(--ink-mid)] transition hover:border-[color:var(--ink-light)] hover:text-[color:var(--ink)] disabled:pointer-events-none disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--terra)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(196,103,74,0.25)] transition hover:bg-[color:var(--terra-mid)] disabled:cursor-not-allowed disabled:bg-[color:var(--cream-dark)] disabled:text-[color:var(--ink-light)]"
        >
          {isLast ? "Show recommendations" : "Next question"}
        </button>
      </div>
    </section>
  );
}

function WaveDivider({ fill }: { fill: string }) {
  return (
    <div style={{ lineHeight: 0, background: fill }}>
      <svg
        viewBox="0 0 1440 70"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "70px" }}
      >
        <path
          d="M0,35 C220,78 420,4 720,38 C1020,72 1230,10 1440,35 L1440,70 L0,70 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export default function QuizPage({
  quizId,
  onGoHome,
  onSelectQuiz,
}: QuizPageProps) {
  const {
    quiz,
    currentStep,
    totalQuestions,
    isComplete,
    questionState,
    recommendations,
    restart,
  } = useQuiz(quizId);

  const tone = quizTone[quizId];
  const alternateQuizId = quizId === "short" ? "long" : "short";

  return (
    <div className="min-h-screen bg-[color:var(--cream)]">
      <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-[rgba(196,103,74,0.1)] bg-[rgba(250,246,240,0.88)] px-6 py-4 backdrop-blur-[16px] sm:px-10 lg:px-[60px]">
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center text-2xl tracking-tight text-[color:var(--ink)]"
        >
          <Logo />
        </button>
        <button
          type="button"
          onClick={onGoHome}
          className="rounded-full border border-[color:var(--cream-dark)] bg-white/60 px-4 py-2 text-sm font-medium text-[color:var(--ink-mid)] transition hover:border-[color:var(--ink-light)] hover:text-[color:var(--ink)]"
        >
          Back to home
        </button>
      </header>

      <main className="pt-[74px]">

        {!isComplete && (
          <section className="bg-[color:var(--sand-pale)] px-6 py-16 sm:px-10 lg:px-[72px] lg:py-20">
            <div className="page-shell-tight">
              <div className="mb-14 text-center">
                <div className="s-label justify-center">
                  {tone.eyebrow}
                </div>
                <h2 className="max-w-full text-center">{tone.title}</h2>
                <p className="s-sub mx-auto max-w-[560px] text-center">{tone.description}</p>
              </div>

              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
                <div>{questionState && <QuestionCard {...questionState} />}</div>
                <QuizAside
                  quizTitle={quiz.title}
                  quizDescription={quiz.description}
                  totalQuestions={totalQuestions}
                  currentStep={currentStep}
                  isComplete={isComplete}
                  tone={tone}
                  alternateQuizId={alternateQuizId}
                  onSelectQuiz={onSelectQuiz}
                  quizId={quizId}
                />
              </div>
            </div>
          </section>
        )}

        {isComplete && (
          <>
            <section className="bg-[color:var(--sand-pale)] px-6 py-16 sm:px-10 lg:px-[72px] lg:py-20">
              <div className="page-shell-tight">
                <div className="mb-14 text-center">
                  <div className="s-label justify-center">
                    Your recommendations
                  </div>
                  <h2 className="max-w-full text-center">Three professionals worth beginning with</h2>
                  <p className="s-sub mx-auto max-w-[620px] text-center">
                    These are not random names from a directory. Each recommendation is
                    tied to the kind of support, pace, and first impression you told us
                    you were hoping for.
                  </p>
                </div>

                <div className="space-y-5">
                  {recommendations.map((recommendation, index) => (
                    <article
                      key={recommendation.name}
                      className="rounded-[28px] border border-[rgba(196,103,74,0.12)] bg-white p-7 shadow-[0_24px_70px_rgba(30,22,16,0.06)]"
                    >
                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-[color:var(--terra)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                          {index === 0 ? "Best first recommendation" : `Option ${index + 1}`}
                        </span>
                        <span className="text-[13px] text-[color:var(--ink-light)]">
                          {recommendation.availability}
                        </span>
                      </div>

                      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                        <div>
                          <div className="font-serif text-[32px] leading-[1.08] text-[color:var(--ink)]">
                            {recommendation.name}
                          </div>
                          <div className="mt-2 text-[14px] text-[color:var(--ink-light)]">
                            {recommendation.title}
                          </div>

                          <div className="mt-6 rounded-[16px] bg-[color:var(--sand-pale)] p-5">
                            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--terra)]">
                              Why this could fit
                            </div>
                            <div className="text-[14px] leading-7 text-[color:var(--ink-mid)]">
                              {recommendation.reason}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-5">
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--terra)]">
                              Match notes
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {recommendation.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-[color:var(--cream-dark)] bg-white px-3 py-1 text-[12px] font-medium text-[color:var(--ink-mid)]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <RecommendationActions
                            name={recommendation.name as RecommendationMomentName}
                          />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <WaveDivider fill="#2A1F18" />

            <section className="bg-[#2A1F18] px-6 py-14 sm:px-10 lg:px-[72px] lg:py-20">
              <div className="page-shell-tight rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-8 text-center">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--terra-light)]">
                  Continue from here
                </div>
                <div className="mt-4 font-serif text-[clamp(30px,4vw,46px)] leading-[1.1] text-[color:var(--cream)]">
                  A good first step should feel more grounded than random.
                </div>
                <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-7 text-white/72">
                  You can take the quiz again, compare your recommendations once more, or
                  head back to the homepage and continue from there when it feels right.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center justify-center rounded-full bg-[color:var(--terra)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--terra-mid)]"
                  >
                    Take the quiz again
                  </button>
                  <button
                    type="button"
                    onClick={onGoHome}
                    className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/12"
                  >
                    Return home
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
