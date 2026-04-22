import { Check, Play } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type {
  QuizAnswer,
  QuizAnswerValue,
  QuizId,
  QuizQuestion,
  Recommendation,
} from "../features/quiz/quizData";
import { matchRecommendations } from "../features/matching/matchRecommendations";
import { useQuiz } from "../features/quiz/useQuiz";
import { savePendingClientResult } from "../features/clientResults/storage";
import LanguageSwitcher from "../components/layout/LanguageSwitcher";
import Logo from "../components/layout/Logo";
import { therapistExperiences } from "../content/therapistContent";
import { routePaths } from "../lib/routes";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import { usePageMeta } from "../hooks/usePageMeta";
import { useAuth } from "../hooks/useAuth";
import { saveClientResultForUser } from "../repositories/clientResultsRepository";
import { getPublishedTherapistProfiles } from "../repositories/therapistRepository";

type RecommendationMomentName = keyof typeof therapistExperiences & string;

type ToneCopy = {
  eyebrow: string;
  title: string;
  description: string;
  switchLabel: string;
  switchCta: string;
  switchDescription: string;
};

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
  tone: ToneCopy;
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
        <p className="text-[14px] leading-6 text-[color:var(--ink-light)]">
          {quizDescription}
        </p>
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
          {quizId === "short"
            ? t("meta.gentleReminderShort")
            : t("meta.gentleReminderLong")}
        </p>
      </div>
    </aside>
  );
}

function RecommendationActions({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  const { t } = useTranslation("quiz-client");
  const [openPanel, setOpenPanel] = useState<"video" | "contact" | "call" | null>(null);
  const details = therapistExperiences[recommendation.name];
  const canShowVideo = Boolean(details || recommendation.introVideoUrl);

  return (
    <div className="space-y-4">
      {canShowVideo && (
        <button
          type="button"
          onClick={() => setOpenPanel(openPanel === "video" ? null : "video")}
          className="therapist-video w-full text-left"
          aria-expanded={openPanel === "video"}
          style={{
            backgroundImage: `url(${details?.videoPoster ?? recommendation.headshotUrl ?? details?.portrait ?? ""})`,
          }}
        >
          <div className="therapist-video-top">
            <span className="therapist-video-badge">{t("recommendations.introVideo")}</span>
            <span className="therapist-video-length">{details?.duration ?? "Preview"}</span>
          </div>
          <div className="therapist-video-center">
            <span className="therapist-play-btn" aria-hidden="true">
              <Play size={14} weight="fill" className="therapist-play-icon" />
            </span>
          </div>
          <div className="therapist-video-name">{recommendation.name}</div>
        </button>
      )}

      {openPanel === "video" && canShowVideo && (
        <div className="therapist-inline-panel">
          <div className="therapist-inline-kicker">{t("recommendations.introPreview")}</div>
          <p className="therapist-inline-copy">
            {details?.videoIntro ??
              (recommendation.introVideoUrl
                ? recommendation.introVideoUrl
                : recommendation.reason)}
          </p>
          {details?.videoPoints && (
            <div className="therapist-inline-points">
              {details.videoPoints.map((point: string) => (
                <div key={point} className="therapist-inline-point">
                  <span aria-hidden="true">•</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <p className="text-[13px] leading-6 text-[color:var(--ink-light)]">
        {details?.preview ?? recommendation.reason}
      </p>

      <div className="therapist-actions">
        <button
          type="button"
          onClick={() => setOpenPanel(openPanel === "contact" ? null : "contact")}
          className="bk-btn fill"
        >
          {t("recommendations.contactTherapist")}
        </button>
        <button
          type="button"
          onClick={() => setOpenPanel(openPanel === "call" ? null : "call")}
          className="bk-btn outline"
        >
          {t("recommendations.bookCall")}
        </button>
      </div>

      {openPanel === "contact" && (
        <div className="therapist-inline-panel therapist-inline-panel-soft">
          <div className="therapist-inline-kicker">{t("recommendations.contactTitle")}</div>
          <p className="therapist-inline-copy">
            {details?.contactCopy ??
              recommendation.contactDetail ??
              t("recommendations.callDescription")}
          </p>
          <div className="therapist-contact-actions">
            {recommendation.contactDetail && (
              <div className="therapist-contact-btn">{recommendation.contactDetail}</div>
            )}
            {recommendation.bookingUrl && (
              <a
                href={recommendation.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="therapist-contact-btn"
              >
                {t("recommendations.contactOpenings")}
              </a>
            )}
          </div>
        </div>
      )}

      {openPanel === "call" && (
        <div className="therapist-inline-panel therapist-inline-panel-soft">
          <div className="therapist-inline-kicker">{t("recommendations.callTitle")}</div>
          <p className="therapist-inline-copy">{t("recommendations.callDescription")}</p>
          <div className="therapist-contact-actions">
            {recommendation.bookingUrl ? (
              <a
                href={recommendation.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="therapist-contact-btn"
              >
                {t("recommendations.callReserve")}
              </a>
            ) : (
              <div className="therapist-contact-btn">{t("recommendations.callTimes")}</div>
            )}
            {recommendation.contactDetail && (
              <div className="therapist-contact-btn">{recommendation.contactDetail}</div>
            )}
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
  const { t } = useTranslation("quiz-client");

  return (
    <section className="rounded-[30px] bg-white px-8 py-10 shadow-[0_26px_80px_rgba(30,22,16,0.08)] sm:px-10 sm:py-12">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[color:var(--terra-wash)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--terra)]">
          {question.category}
        </span>
        <span className="text-sm text-[color:var(--ink-light)]">
          {t("meta.questionLabel", { current: currentIndex + 1, total })}
        </span>
        {question.multiSelect && (
          <span className="rounded-full bg-[color:var(--sand-pale)] px-3 py-1 text-[11px] font-medium text-[color:var(--ink-mid)]">
            {t("meta.multiSelectHint")}
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
              {t("meta.freeTextLabel")}
            </span>
            <textarea
              value={(selectedValue as string) ?? ""}
              onChange={(event) => onTextChange(event.target.value)}
              rows={8}
              className="w-full rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4 text-[15px] leading-7 text-[color:var(--ink)] outline-none transition focus:border-[color:var(--terra)] focus:bg-white"
              placeholder={t("meta.freeTextPlaceholder")}
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
                    <Check size={14} weight="bold" />
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

export default function QuizPage() {
  const locale = useCurrentLocale();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("quiz-client");
  const { user } = useAuth();
  const quizId: QuizId = location.pathname.endsWith("/long") ? "long" : "short";
  const tone = t(`tone.${quizId}`, { returnObjects: true }) as ToneCopy;
  const {
    quiz,
    currentStep,
    totalQuestions,
    answers,
    isComplete,
    questionState,
    recommendations,
    restart,
  } = useQuiz(quizId, locale);
  const [publishedRecommendations, setPublishedRecommendations] = useState<typeof recommendations | null>(null);
  const [resultsSaved, setResultsSaved] = useState(false);
  const alternateQuizId = quizId === "short" ? "long" : "short";
  usePageMeta(
    locale === "fi"
      ? `Myötä | ${quizId === "long" ? "Pidempi match-kysely" : "Match-kysely"}`
      : `Myötä | ${quizId === "long" ? "Longer match quiz" : "Match quiz"}`,
    locale === "fi"
      ? "Vastaa muutamaan kysymykseen ja näe harkitut terapeuttisuositukset ilman pitkää hakemistoselailua."
      : "Answer a few thoughtful questions and see therapist recommendations without getting lost in a long directory.",
  );

  useEffect(() => {
    if (!isComplete) {
      return;
    }

    void getPublishedTherapistProfiles().then((profiles) => {
      setPublishedRecommendations(
        profiles.length > 0
          ? matchRecommendations({
              quizId,
              answers,
              locale,
              therapists: profiles,
            })
          : recommendations,
      );
    });
  }, [answers, isComplete, locale, quizId, recommendations]);

  return (
    <div className="min-h-screen bg-[color:var(--cream)]">
      <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-[rgba(196,103,74,0.1)] bg-[rgba(250,246,240,0.88)] px-6 py-4 backdrop-blur-[16px] sm:px-10 lg:px-[60px]">
        <Link
          to={routePaths.clientHome(locale)}
          className="flex items-center text-2xl tracking-tight text-[color:var(--ink)]"
        >
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <Link
            to={routePaths.clientHome(locale)}
            className="rounded-full border border-[color:var(--cream-dark)] bg-white/60 px-4 py-2 text-sm font-medium text-[color:var(--ink-mid)] transition hover:border-[color:var(--ink-light)] hover:text-[color:var(--ink)]"
          >
            {t("meta.returnHome")}
          </Link>
        </div>
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
                  onSelectQuiz={(nextQuizId) =>
                    navigate(
                      nextQuizId === "long"
                        ? routePaths.clientQuizLong(locale)
                        : routePaths.clientQuiz(locale),
                    )
                  }
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
                    {t("meta.yourRecommendations")}
                  </div>
                  <h2 className="max-w-full text-center">{t("recommendations.title")}</h2>
                  <p className="s-sub mx-auto max-w-[620px] text-center">
                    {t("recommendations.description")}
                  </p>
                </div>

                <div className="space-y-5">
                  {(publishedRecommendations ?? recommendations).map((recommendation, index) => (
                    <article
                      key={recommendation.name}
                      className="rounded-[28px] border border-[rgba(196,103,74,0.12)] bg-white p-7 shadow-[0_24px_70px_rgba(30,22,16,0.06)]"
                    >
                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-[color:var(--terra)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                          {index === 0 ? t("meta.bestRecommendation") : t("meta.optionLabel", { index: index + 1 })}
                        </span>
                        <span className="text-[13px] text-[color:var(--ink-light)]">
                          {recommendation.availability}
                        </span>
                      </div>

                      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                        <div>
                          <div
                            className="therapist-profile-image"
                            style={{
                              backgroundImage: `url(${
                                recommendation.headshotUrl ||
                                therapistExperiences[
                                  recommendation.name as RecommendationMomentName
                                ]?.portrait ||
                                ""
                              })`,
                            }}
                            aria-hidden="true"
                          />
                          <div className="font-serif text-[32px] leading-[1.08] text-[color:var(--ink)]">
                            {recommendation.name}
                          </div>
                          <div className="mt-2 text-[14px] text-[color:var(--ink-light)]">
                            {recommendation.title}
                          </div>

                          <div className="mt-6 rounded-[16px] bg-[color:var(--sand-pale)] p-5">
                            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--terra)]">
                              {t("meta.whyThisCouldFit")}
                            </div>
                            <div className="text-[14px] leading-7 text-[color:var(--ink-mid)]">
                              {recommendation.reason}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-5">
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--terra)]">
                              {t("meta.matchNotes")}
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
                            recommendation={recommendation}
                          />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-10 rounded-[28px] border border-[rgba(196,103,74,0.12)] bg-white p-7 shadow-[0_20px_60px_rgba(30,22,16,0.05)]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--terra)]">
                    {t("actions.title")}
                  </div>
                  <p className="mt-3 max-w-[720px] text-[15px] leading-7 text-[color:var(--ink-mid)]">
                    {t("actions.description")}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <button
                      type="button"
                      onClick={async () => {
                        const resultPayload = {
                          locale,
                          quizId,
                          answers,
                          recommendations: publishedRecommendations ?? recommendations,
                        };

                        if (!user) {
                          savePendingClientResult(resultPayload);
                          navigate(`${routePaths.clientAuth(locale)}?mode=signup`);
                          return;
                        }

                        await saveClientResultForUser({
                          userId: user.id,
                          email: user.email ?? "",
                          displayName: String(user.user_metadata?.display_name ?? ""),
                          result: resultPayload,
                        });
                        setResultsSaved(true);
                      }}
                      className="inline-flex items-center justify-center rounded-full bg-[color:var(--terra)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--terra-mid)]"
                    >
                      {resultsSaved ? t("actions.saved") : t("actions.save")}
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center justify-center rounded-full border border-[rgba(196,103,74,0.18)] px-6 py-3 text-sm font-semibold text-[color:var(--terra)] transition hover:bg-[color:var(--terra-wash)]"
                    >
                      {t("actions.downloadPdf")}
                    </button>
                    <Link
                      to={routePaths.clientSavedResults(locale)}
                      className="inline-flex items-center justify-center rounded-full border border-[rgba(196,103,74,0.18)] px-6 py-3 text-sm font-semibold text-[color:var(--terra)] transition hover:bg-[color:var(--terra-wash)]"
                    >
                      {t("actions.viewSaved")}
                    </Link>
                  </div>
                </div>
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
                    onClick={() => {
                      setResultsSaved(false);
                      restart();
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-[color:var(--terra)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--terra-mid)]"
                  >
                    {t("meta.retakeQuiz")}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(routePaths.clientHome(locale))}
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
