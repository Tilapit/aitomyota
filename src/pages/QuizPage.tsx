import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type {
  QuizAnswer,
  QuizAnswerValue,
  QuizAnswers,
  QuizId,
  QuizQuestion,
} from "../features/quiz/quizData";
import { useQuiz } from "../features/quiz/useQuiz";
import LanguageSwitcher from "../components/layout/LanguageSwitcher";
import Logo from "../components/layout/Logo";
import { routePaths } from "../lib/routes";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import { matchTherapists, mapQuizToMatchingInput } from "../lib/matching";
import type { MatchResult } from "../lib/matching";
import { generateWhyMatch } from "../lib/whyMatch";

// ── Sub-components ───────────────────────────────────────────────────────────

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

function SliderInput({
  value,
  onChange,
  labelMin,
  labelMax,
  words,
}: {
  value: number;
  onChange: (v: number) => void;
  labelMin: string;
  labelMax: string;
  words: string[];
}) {
  const idx = Math.max(0, Math.min(value - 1, words.length - 1));
  const pct = ((value - 1) / 4) * 100;

  return (
    <div className="mt-2">
      <div className="mb-4 flex justify-between">
        <span className="max-w-[44%] text-[13px] leading-5 text-[color:var(--ink-light)]">
          {labelMin}
        </span>
        <span className="max-w-[44%] text-right text-[13px] leading-5 text-[color:var(--ink-light)]">
          {labelMax}
        </span>
      </div>

      <div className="relative px-1">
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-input w-full"
          style={{
            WebkitAppearance: "none",
            appearance: "none",
            height: "4px",
            borderRadius: "2px",
            outline: "none",
            cursor: "pointer",
            background: `linear-gradient(to right, var(--terra) ${pct}%, rgba(196,103,74,0.18) ${pct}%)`,
          }}
        />
      </div>

      <div className="mt-5 text-center">
        <span className="inline-block rounded-full bg-[color:var(--terra-wash)] px-4 py-1.5 font-serif text-[15px] italic text-[color:var(--terra)]">
          {words[idx]}
        </span>
      </div>

      <style>{`
        .slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--terra);
          border: 3px solid white;
          box-shadow: 0 0 0 1.5px var(--terra);
          cursor: pointer;
        }
        .slider-input::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--terra);
          border: 3px solid white;
          box-shadow: 0 0 0 1.5px var(--terra);
          cursor: pointer;
        }
      `}</style>
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
  tone: { eyebrow: string; title: string; description: string; switchLabel: string; switchCta: string; switchDescription: string };
  alternateQuizId: QuizId;
  onSelectQuiz: (quizId: QuizId) => void;
  quizId: QuizId;
}) {
  const { t } = useTranslation("quiz-client");

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
        <p className="text-[14px] leading-6 text-[color:var(--ink-light)]">{quizDescription}</p>
        <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--terra)]">
          {t("meta.questionsCount", { count: totalQuestions })}
        </div>
        {!isComplete && (
          <>
            <ProgressBar current={currentStep + 1} total={totalQuestions} />
            <div className="text-[13px] text-[color:var(--ink-light)]">
              {t("meta.completed", { current: currentStep + 1, total: totalQuestions })}
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
          {t("meta.gentleReminderTitle")}
        </div>
        <p className="text-[14px] leading-6 text-[color:var(--ink-mid)]">
          {t("meta.gentleReminderBody")}
        </p>
        <p className="text-[12px] text-[color:var(--ink-light)]">
          {quizId === "short" ? t("meta.gentleReminderShort") : t("meta.gentleReminderLong")}
        </p>
      </div>
    </aside>
  );
}

// ── QuestionCard ─────────────────────────────────────────────────────────────

type QuestionCardProps = {
  question: QuizQuestion;
  currentIndex: number;
  total: number;
  selectedValue: QuizAnswerValue | undefined;
  answers: QuizAnswers;
  onSingleSelect: (answerId: string) => void;
  onMultiToggle: (answerId: string) => void;
  onTextChange: (value: string, subKey?: string) => void;
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
  answers,
  onSingleSelect,
  onMultiToggle,
  onTextChange,
  onBack,
  onNext,
  canProceed,
  isFirst,
  isLast,
}: QuestionCardProps) {
  const { t, i18n } = useTranslation("quiz-client");

  const qKey = `questions.${question.id}`;
  const categoryText = t(`${qKey}.category`);
  const questionText = t(`${qKey}.text`);
  const noteText = i18n.exists(`${qKey}.note`, { ns: "quiz-client" })
    ? t(`${qKey}.note`)
    : "";
  const infoText = i18n.exists(`${qKey}.infoText`, { ns: "quiz-client" })
    ? t(`${qKey}.infoText`)
    : "";

  const isMulti = question.type === "multi";
  const isSlider = question.type === "slider";
  const isText = question.type === "text";
  const sliderValue =
    typeof selectedValue === "string" && selectedValue.length > 0
      ? Number(selectedValue)
      : question.sliderDefault ?? 3;

  const sliderWords = i18n.exists(`${qKey}.sliderWords`, { ns: "quiz-client" })
    ? (t(`${qKey}.sliderWords`, { returnObjects: true }) as string[])
    : ["1", "2", "3", "4", "5"];

  // Which answer (if any) has isOther = true and is currently selected
  const selectedOtherAnswer = question.answers?.find(
    (a: QuizAnswer) => a.isOther && a.id === selectedValue,
  );
  const otherTextValue = (answers[`${question.id}_other`] as string) ?? "";

  const textPlaceholder = i18n.exists(`${qKey}.placeholder`, { ns: "quiz-client" })
    ? t(`${qKey}.placeholder`)
    : t("meta.freeTextPlaceholder");

  return (
    <section className="rounded-[30px] bg-white px-8 py-10 shadow-[0_26px_80px_rgba(30,22,16,0.08)] sm:px-10 sm:py-12">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[color:var(--terra-wash)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--terra)]">
          {categoryText}
        </span>
        <span className="text-sm text-[color:var(--ink-light)]">
          {t("meta.questionLabel", { current: currentIndex + 1, total })}
        </span>
        {isMulti && (
          <span className="rounded-full bg-[color:var(--sand-pale)] px-3 py-1 text-[11px] font-medium text-[color:var(--ink-mid)]">
            {t("meta.multiSelectHint")}
          </span>
        )}
        {question.optional && (
          <span className="rounded-full bg-[color:var(--sand-pale)] px-3 py-1 text-[11px] font-medium text-[color:var(--ink-light)]">
            {t("meta.skip")}
          </span>
        )}
      </div>

      {/* Question text */}
      <h1 className="max-w-3xl text-balance font-serif text-[clamp(30px,4vw,48px)] leading-[1.08] text-[color:var(--ink)]">
        {questionText}
      </h1>

      {/* Optional info text (e.g. Q1C, PQ2, PQ3 note) */}
      {infoText && (
        <p className="mt-4 max-w-2xl text-[13px] leading-6 text-[color:var(--ink-light)] italic">
          {infoText}
        </p>
      )}

      {/* Note text */}
      {noteText && (
        <p className="mt-4 max-w-2xl rounded-[12px] bg-[color:var(--sand-pale)] px-4 py-3 text-[13px] leading-6 text-[color:var(--ink-mid)]">
          {noteText}
        </p>
      )}

      {/* Answer area */}
      <div className="mt-8">
        {isText ? (
          <label className="block">
            <span className="mb-3 block text-sm font-medium text-[color:var(--ink-mid)]">
              {t("meta.freeTextLabel")}
            </span>
            <textarea
              value={(selectedValue as string) ?? ""}
              onChange={(e) => onTextChange(e.target.value)}
              rows={question.id === "q10b" ? 2 : 6}
              className="w-full rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4 text-[15px] leading-7 text-[color:var(--ink)] outline-none transition focus:border-[color:var(--terra)] focus:bg-white"
              placeholder={textPlaceholder}
            />
          </label>
        ) : isSlider ? (
          <SliderInput
            value={sliderValue}
            onChange={(v) => onSingleSelect(String(v))}
            labelMin={t(`${qKey}.sliderMin`)}
            labelMax={t(`${qKey}.sliderMax`)}
            words={sliderWords}
          />
        ) : (
          <div className="grid gap-3">
            {question.answers?.map((answer: QuizAnswer) => {
              const isSelected = isMulti
                ? Array.isArray(selectedValue) && selectedValue.includes(answer.id)
                : selectedValue === answer.id;
              const answerText = t(`${qKey}.answers.${answer.id}`);

              return (
                <button
                  key={answer.id}
                  type="button"
                  onClick={() => (isMulti ? onMultiToggle(answer.id) : onSingleSelect(answer.id))}
                  className={[
                    "group flex w-full items-start justify-between gap-4 rounded-[18px] border px-5 py-4 text-left transition duration-200",
                    isSelected
                      ? "border-[color:var(--terra)] bg-[color:var(--terra-wash)] shadow-[0_18px_40px_rgba(196,103,74,0.12)]"
                      : "border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] hover:border-[color:var(--terra-light)] hover:bg-white",
                  ].join(" ")}
                >
                  <span className="text-[15px] leading-7 text-[color:var(--ink)]">
                    {answerText}
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

            {/* "Other" text input — shown when an isOther answer is selected */}
            {selectedOtherAnswer && (
              <div className="mt-2">
                <span className="mb-2 block text-[13px] font-medium text-[color:var(--ink-mid)]">
                  {t("meta.otherTextLabel")}
                </span>
                <textarea
                  value={otherTextValue}
                  onChange={(e) => onTextChange(e.target.value, "other")}
                  rows={3}
                  className="w-full rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4 text-[15px] leading-7 text-[color:var(--ink)] outline-none transition focus:border-[color:var(--terra)] focus:bg-white"
                  placeholder={
                    i18n.exists(`${qKey}.otherPlaceholder`, { ns: "quiz-client" })
                      ? t(`${qKey}.otherPlaceholder`)
                      : t("meta.freeTextPlaceholder")
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-10 flex flex-col gap-3 border-t border-[rgba(196,103,74,0.08)] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isFirst}
          className="inline-flex items-center justify-center rounded-full border border-[color:var(--cream-dark)] px-5 py-3 text-sm font-medium text-[color:var(--ink-mid)] transition hover:border-[color:var(--ink-light)] hover:text-[color:var(--ink)] disabled:pointer-events-none disabled:opacity-40"
        >
          {t("meta.back")}
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--terra)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(196,103,74,0.25)] transition hover:bg-[color:var(--terra-mid)] disabled:cursor-not-allowed disabled:bg-[color:var(--cream-dark)] disabled:text-[color:var(--ink-light)]"
        >
          {isLast ? t("meta.showRecommendations") : t("meta.nextQuestion")}
        </button>
      </div>
    </section>
  );
}

function MatchedTherapistCard({
  match,
  index,
  whyMatchLoading,
}: {
  match: MatchResult;
  index: number;
  whyMatchLoading: boolean;
}) {
  const { t } = useTranslation("quiz-client");
  const [bioExpanded, setBioExpanded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const BIO_LIMIT = 300;
  const bioIsLong = match.bio.length > BIO_LIMIT;
  const displayedBio =
    bioIsLong && !bioExpanded ? `${match.bio.slice(0, BIO_LIMIT)}...` : match.bio;

  const specLabels: string[] = [];
  if (match.spec_stress) specLabels.push(t("matching.specs.stress"));
  if (match.spec_anxiety) specLabels.push(t("matching.specs.anxiety"));
  if (match.spec_depression) specLabels.push(t("matching.specs.depression"));
  if (match.spec_selfesteem) specLabels.push(t("matching.specs.selfesteem"));
  if (match.spec_relationships) specLabels.push(t("matching.specs.relationships"));
  if (match.spec_crisis) specLabels.push(t("matching.specs.crisis"));
  if (match.spec_performance) specLabels.push(t("matching.specs.performance"));
  if (match.spec_neuro) specLabels.push(t("matching.specs.neuro"));
  if (match.spec_parenting) specLabels.push(t("matching.specs.parenting"));

  return (
    <article className="rounded-[28px] border border-[rgba(196,103,74,0.12)] bg-white px-8 py-9 shadow-[0_24px_70px_rgba(30,22,16,0.06)] sm:px-10 sm:py-11">
      {/* Badges */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[color:var(--terra)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
          {index === 0
            ? t("recommendations.bestLabel")
            : t("meta.optionLabel", { index: index + 1 })}
        </span>
        <span className="rounded-full bg-[color:var(--terra-wash)] px-3 py-1 text-[11px] font-semibold text-[color:var(--terra)]">
          {t("matching.scoreLabel")}: {match.score}
        </span>
      </div>

      {/* Name */}
      <div className="font-serif text-[32px] leading-[1.08] text-[color:var(--ink)]">
        {match.name}
      </div>

      {/* Why match */}
      {(match.whyMatch || whyMatchLoading) && (
        <p
          className="mt-3 text-[14px] italic text-[color:var(--terra)]"
          style={{ lineHeight: 1.6 }}
        >
          {whyMatchLoading ? t("matching.analysing") : match.whyMatch}
        </p>
      )}

      {/* Bio + meta grid */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          {displayedBio && (
            <>
              <p
                className="text-[15px] text-[color:var(--ink-mid)]"
                style={{ lineHeight: 1.6, marginBottom: 0 }}
              >
                {displayedBio}
              </p>
              {bioIsLong && (
                <button
                  type="button"
                  onClick={() => setBioExpanded((v) => !v)}
                  className="mt-3 text-[13px] font-semibold text-[color:var(--terra)] hover:underline"
                >
                  {bioExpanded ? t("matching.showLess") : t("matching.readMore")}
                </button>
              )}
            </>
          )}
        </div>

        <div className="space-y-3">
          {match.location && (
            <div className="flex items-baseline gap-2">
              <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--terra)]">
                {t("matching.locationLabel")}
              </span>
              <span className="text-[14px] text-[color:var(--ink-mid)]">{match.location}</span>
            </div>
          )}
          <div className="flex items-baseline gap-2">
            <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--terra)]">
              {t("matching.priceLabel")}
            </span>
            <span className="text-[14px] text-[color:var(--ink-mid)]">
              {match.price_min}–{match.price_max} {t("matching.priceUnit")}
            </span>
          </div>
          {match.session_format && (
            <div className="flex items-baseline gap-2">
              <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--terra)]">
                {t("matching.formatLabel")}
              </span>
              <span className="text-[14px] text-[color:var(--ink-mid)]">{match.session_format}</span>
            </div>
          )}
        </div>
      </div>

      {/* Expandable details */}
      <div className="mt-7 border-t border-[rgba(196,103,74,0.1)] pt-5">
        <button
          type="button"
          onClick={() => setDetailsOpen((v) => !v)}
          className="flex items-center gap-2 text-[13px] font-semibold text-[color:var(--terra)] hover:underline"
        >
          <span>{detailsOpen ? t("matching.hideDetails") : t("matching.showDetails")}</span>
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              transform: detailsOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            ▾
          </span>
        </button>

        {detailsOpen && (
          <div className="mt-6 space-y-6">
            {/* Education */}
            {match.education && (
              <div>
                <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--terra)]">
                  {t("matching.educationLabel")}
                </div>
                <p className="text-[14px] leading-6 text-[color:var(--ink-mid)]">
                  {match.education}
                </p>
              </div>
            )}

            {/* Years of experience */}
            {match.years_experience > 0 && (
              <div>
                <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--terra)]">
                  {t("matching.experienceLabel")}
                </div>
                <p className="text-[14px] text-[color:var(--ink-mid)]">
                  {t("matching.experienceYears", { count: match.years_experience })}
                </p>
              </div>
            )}

            {/* Specializations */}
            {specLabels.length > 0 && (
              <div>
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--terra)]">
                  {t("matching.specializationsLabel")}
                </div>
                <div className="flex flex-wrap gap-2">
                  {specLabels.map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-[rgba(196,103,74,0.2)] bg-[color:var(--terra-wash)] px-3 py-1 text-[12px] font-medium text-[color:var(--terra)]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Work focus */}
            {match.work_focus && (
              <div>
                <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--terra)]">
                  {t("matching.workFocusLabel")}
                </div>
                <p className="text-[14px] leading-6 text-[color:var(--ink-mid)]">
                  {match.work_focus}
                </p>
              </div>
            )}

            {/* Score breakdown */}
            <div>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--terra)]">
                {t("matching.scoreBreakdownLabel")}
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-[color:var(--ink-light)]">
                <span>Erikoistumiset: {match.scoreBreakdown.specializations}</span>
                <span>Kohtaaminen: {match.scoreBreakdown.approach}</span>
                <span>Työskentelyote: {match.scoreBreakdown.workStyle}</span>
                <span>Tahti: {match.scoreBreakdown.pace}</span>
                <span>Hinta: {match.scoreBreakdown.price}</span>
                <span>Tapaamistapa: {match.scoreBreakdown.format}</span>
                <span>Tiheys: {match.scoreBreakdown.frequency}</span>
                <span>Kokemus: {match.scoreBreakdown.negativeExperience}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function QuizPage() {
  const locale = useCurrentLocale();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("quiz-client");

  const quizId: QuizId = location.pathname.endsWith("/long") ? "long" : "short";
  const alternateQuizId: QuizId = quizId === "short" ? "long" : "short";

  const tone = t(`tone.${quizId}`, { returnObjects: true }) as {
    eyebrow: string;
    title: string;
    description: string;
    switchLabel: string;
    switchCta: string;
    switchDescription: string;
  };

  const {
    currentStep,
    totalQuestions,
    isComplete,
    questionState,
    answers,
    restart,
  } = useQuiz(quizId, locale);

  type MatchState = "idle" | "loading" | "done";
  const [matchState, setMatchState] = useState<MatchState>("idle");
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [whyMatchLoading, setWhyMatchLoading] = useState(false);

  useEffect(() => {
    if (!isComplete) {
      setMatchState("idle");
      setMatchResults([]);
      setWhyMatchLoading(false);
      return;
    }

    let cancelled = false;
    setMatchState("loading");
    const input = mapQuizToMatchingInput(answers);

    matchTherapists(input).then(async (results) => {
      if (cancelled) return;
      setMatchResults(results);
      setMatchState("done");

      if (results.length > 0) {
        setWhyMatchLoading(true);
        const rawAnswers: Record<string, string> = {};
        for (const [k, v] of Object.entries(answers)) {
          if (typeof v === "string") rawAnswers[k] = v;
        }
        try {
          const whyTexts = await Promise.all(
            results.map((r) =>
              generateWhyMatch(r, rawAnswers, locale as "fi" | "en"),
            ),
          );
          if (!cancelled) {
            setMatchResults(
              results.map((r, i) => ({ ...r, whyMatch: whyTexts[i] ?? r.whyMatch })),
            );
          }
        } finally {
          if (!cancelled) setWhyMatchLoading(false);
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  const quizTitle = t(`quizInfo.${quizId}.title`);
  const quizDescription = t(`quizInfo.${quizId}.description`);

  const onGoHome = () => navigate(routePaths.clientHome(locale));
  const onSelectQuiz = (nextId: QuizId) =>
    navigate(
      nextId === "long"
        ? routePaths.clientQuizLong(locale)
        : routePaths.clientQuiz(locale),
    );

  return (
    <div className="min-h-screen bg-[color:var(--cream)]">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-[rgba(196,103,74,0.1)] bg-[rgba(250,246,240,0.88)] px-6 py-4 backdrop-blur-[16px] sm:px-10 lg:px-[60px]">
        <Link
          to={routePaths.clientHome(locale)}
          className="flex items-center text-2xl tracking-tight text-[color:var(--ink)]"
        >
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            onClick={onGoHome}
            className="rounded-full border border-[color:var(--cream-dark)] bg-white/60 px-4 py-2 text-sm font-medium text-[color:var(--ink-mid)] transition hover:border-[color:var(--ink-light)] hover:text-[color:var(--ink)]"
          >
            {t("meta.returnHome")}
          </button>
        </div>
      </header>

      <main className="pt-[74px]">
        {/* Quiz section */}
        {!isComplete && (
          <section className="bg-[color:var(--sand-pale)] px-6 py-16 sm:px-10 lg:px-[72px] lg:py-20">
            <div className="page-shell-tight">
              <div className="mb-14 text-center">
                <div className="s-label justify-center">{tone.eyebrow}</div>
                <h2 className="max-w-full text-center">{tone.title}</h2>
                <p className="s-sub mx-auto max-w-[560px] text-center">{tone.description}</p>
              </div>

              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
                <div>{questionState && <QuestionCard {...questionState} />}</div>
                <QuizAside
                  quizTitle={quizTitle}
                  quizDescription={quizDescription}
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

        {/* Recommendations section */}
        {isComplete && (
          <>
            <section className="bg-[color:var(--sand-pale)] px-6 py-16 sm:px-10 lg:px-[72px] lg:py-20">
              <div className="page-shell-tight">
                <div className="mb-14 flex flex-col items-center text-center">
                  <div className="s-label justify-center">{t("recommendations.eyebrow")}</div>
                  <h2 style={{ maxWidth: "600px", textAlign: "center", margin: "0 auto" }}>
                    {t("recommendations.title")}
                  </h2>
                  <p className="s-sub" style={{ maxWidth: "600px", textAlign: "center", margin: "0 auto" }}>
                    {t("recommendations.description")}
                  </p>
                </div>

                {matchState === "loading" && (
                  <div className="flex flex-col items-center gap-4 py-16">
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "3px solid rgba(196,103,74,0.2)",
                        borderTopColor: "var(--terra)",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    <p className="text-[15px] text-[color:var(--ink-light)]">
                      {t("matching.loading")}
                    </p>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                )}

                {matchState === "done" && matchResults.length === 0 && (
                  <div className="rounded-[20px] bg-white px-8 py-12 text-center shadow-[0_16px_48px_rgba(30,22,16,0.06)]">
                    <p className="text-[16px] leading-7 text-[color:var(--ink-mid)]">
                      {t("matching.noResults")}
                    </p>
                  </div>
                )}

                {matchState === "done" && matchResults.length > 0 && (
                  <div className="space-y-5">
                    {matchResults.map((match, index) => (
                      <MatchedTherapistCard
                        key={match.id}
                        match={match}
                        index={index}
                        whyMatchLoading={whyMatchLoading}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            <WaveDivider fill="#2A1F18" />

            <section className="bg-[#2A1F18] px-6 py-14 sm:px-10 lg:px-[72px] lg:py-20">
              <div className="page-shell-tight rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-8 text-center">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--terra-light)]">
                  {t("meta.continueFromHere")}
                </div>
                <div className="mt-4 font-serif text-[clamp(30px,4vw,46px)] leading-[1.1] text-[color:var(--cream)]">
                  {t("meta.continueTitle")}
                </div>
                <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-7 text-white/72">
                  {t("meta.continueDescription")}
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center justify-center rounded-full bg-[color:var(--terra)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--terra-mid)]"
                  >
                    {t("meta.retakeQuiz")}
                  </button>
                  <button
                    type="button"
                    onClick={onGoHome}
                    className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/12"
                  >
                    {t("meta.returnHome")}
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
