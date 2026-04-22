import { Check } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/layout/LanguageSwitcher";
import Logo from "../components/layout/Logo";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import { usePageMeta } from "../hooks/usePageMeta";
import { useTherapistQuiz } from "../features/therapist/useTherapistQuiz";
import { routePaths } from "../lib/routes";
import { saveTherapistOnboardingDraft } from "../features/therapist/onboardingStorage";

export default function TherapistQuizPage() {
  const locale = useCurrentLocale();
  const navigate = useNavigate();
  const { t } = useTranslation("quiz-therapist");
  usePageMeta(
    locale === "fi" ? "Myötä | Terapeutin onboarding" : "Myötä | Therapist onboarding",
    locale === "fi"
      ? "Vastaa onboarding-kysymyksiin ja rakenna terapeuttiprofiili, joka tuntuu hyödylliseltä jo ennen ensimmäistä yhteydenottoa."
      : "Answer the onboarding questions and build a therapist profile that feels useful before the first client reaches out.",
  );
  const {
    question,
    currentStep,
    totalQuestions,
    selectedValue,
    isFirst,
    isLast,
    canProceed,
    complete,
    answers,
    onSingleSelect,
    onMultiToggle,
    onTextChange,
    onNumberChange,
    onScaleSelect,
    onGroupFieldChange,
    onBack,
    onNext,
  } = useTherapistQuiz(locale);

  if (!question) {
    return null;
  }

  if (complete) {
    return (
      <div className="min-h-screen bg-[color:var(--cream)]">
        <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-[rgba(196,103,74,0.1)] bg-[rgba(250,246,240,0.9)] px-6 py-4 backdrop-blur-[16px] sm:px-10 lg:px-[60px]">
          <Link to={routePaths.therapistLanding(locale)} className="flex items-center text-[color:var(--ink)]">
            <Logo />
          </Link>
          <LanguageSwitcher locale={locale} />
        </header>
        <main className="px-6 pt-[120px] pb-20 sm:px-10 lg:px-[72px]">
          <div className="page-shell-tight rounded-[32px] bg-white p-10 text-center shadow-[0_26px_80px_rgba(30,22,16,0.06)]">
            <div className="s-label justify-center">{t("meta.eyebrow")}</div>
            <h1 className="mx-auto max-w-[680px] text-[clamp(34px,4vw,52px)] leading-[1.08] text-[color:var(--ink)]">
              {t("meta.completeTitle")}
            </h1>
            <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-8 text-[color:var(--ink-mid)]">
              {t("meta.completeDescription")}
            </p>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                className="bk-btn fill !w-auto !px-8"
                onClick={() => {
                  saveTherapistOnboardingDraft({
                    locale,
                    answers,
                    completedAt: new Date().toISOString(),
                  });
                  navigate(`${routePaths.therapistAuth(locale)}?mode=signup`);
                }}
              >
                {t("meta.authCta")}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--cream)]">
      <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-[rgba(196,103,74,0.1)] bg-[rgba(250,246,240,0.9)] px-6 py-4 backdrop-blur-[16px] sm:px-10 lg:px-[60px]">
        <Link to={routePaths.therapistLanding(locale)} className="flex items-center text-[color:var(--ink)]">
          <Logo />
        </Link>
        <LanguageSwitcher locale={locale} />
      </header>
      <main className="px-6 pt-[120px] pb-20 sm:px-10 lg:px-[72px]">
        <div className="page-shell-tight">
          <div className="mb-10 text-center">
            <div className="s-label justify-center">{t("meta.eyebrow")}</div>
            <h1 className="mx-auto max-w-[760px] text-[clamp(34px,4vw,54px)] leading-[1.06] text-[color:var(--ink)]">
              {t("meta.title")}
            </h1>
            <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-8 text-[color:var(--ink-mid)]">
              {t("meta.description")}
            </p>
          </div>
          <section className="rounded-[30px] bg-white px-8 py-10 shadow-[0_26px_80px_rgba(30,22,16,0.08)] sm:px-10 sm:py-12">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[color:var(--terra-wash)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--terra)]">
                {question.category}
              </span>
              <span className="text-sm text-[color:var(--ink-light)]">
                {currentStep + 1} / {totalQuestions}
              </span>
            </div>
            <h2 className="max-w-full text-[clamp(28px,4vw,44px)] leading-[1.1]">{question.prompt}</h2>
            {question.description && (
              <p className="mt-4 text-[15px] leading-7 text-[color:var(--ink-mid)]">{question.description}</p>
            )}
            {question.note && <p className="mt-4 text-[14px] leading-7 text-[color:var(--ink-light)]">{question.note}</p>}
            <div className="mt-8">
              {question.type === "group" ? (
                <div className="grid gap-4">
                  {(question.fields ?? []).map((field) => {
                    const value =
                      selectedValue && typeof selectedValue === "object" && !Array.isArray(selectedValue)
                        ? String(selectedValue[field.id] ?? "")
                        : "";
                    const parentValue =
                      selectedValue && typeof selectedValue === "object" && !Array.isArray(selectedValue) && field.showWhen
                        ? String(selectedValue[field.showWhen.fieldId] ?? "")
                        : "";
                    const isVisible = field.showWhen ? field.showWhen.values.includes(parentValue) : true;

                    if (!isVisible) {
                      return null;
                    }

                    return (
                      <label key={field.id} className="grid gap-2">
                        <span className="text-sm font-medium text-[color:var(--ink-mid)]">
                          {field.label}
                          {field.required ? "*" : ""}
                        </span>
                        {field.description && (
                          <span className="text-[13px] leading-6 text-[color:var(--ink-light)]">{field.description}</span>
                        )}
                        {field.type === "select" ? (
                          <select
                            value={value}
                            onChange={(event) => onGroupFieldChange(field.id, event.target.value)}
                            className="w-full rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4 text-[15px] leading-7 text-[color:var(--ink)] outline-none transition focus:border-[color:var(--terra)] focus:bg-white"
                          >
                            <option value="">{locale === "fi" ? "Valitse titteli" : "Select a title"}</option>
                            {field.options?.map((option) => (
                              <option key={option.id} value={option.label}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type === "email" ? "email" : field.type === "url" ? "url" : "text"}
                            value={value}
                            onChange={(event) => onGroupFieldChange(field.id, event.target.value)}
                            className="w-full rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4 text-[15px] leading-7 text-[color:var(--ink)] outline-none transition focus:border-[color:var(--terra)] focus:bg-white"
                          />
                        )}
                      </label>
                    );
                  })}
                </div>
              ) : question.type === "text" ? (
                <textarea
                  value={typeof selectedValue === "string" ? selectedValue : ""}
                  onChange={(event) => onTextChange(event.target.value)}
                  rows={7}
                  className="w-full rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4 text-[15px] leading-7 text-[color:var(--ink)] outline-none transition focus:border-[color:var(--terra)] focus:bg-white"
                />
              ) : question.type === "number" ? (
                <input
                  type="number"
                  value={typeof selectedValue === "string" || typeof selectedValue === "number" ? String(selectedValue) : ""}
                  onChange={(event) => onNumberChange(event.target.value)}
                  className="w-full rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4 text-[15px] leading-7 text-[color:var(--ink)] outline-none transition focus:border-[color:var(--terra)] focus:bg-white"
                />
              ) : question.type === "scale" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 text-sm text-[color:var(--ink-light)]">
                    <span>{question.minLabel}</span>
                    <span>{question.maxLabel}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-3">
                    {[1, 2, 3, 4, 5].map((value) => {
                      const isSelected = selectedValue === value;

                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => onScaleSelect(value)}
                          className={[
                            "flex h-14 items-center justify-center rounded-[18px] border text-base font-semibold transition",
                            isSelected
                              ? "border-[color:var(--terra)] bg-[color:var(--terra)] text-white shadow-[0_18px_40px_rgba(196,103,74,0.18)]"
                              : "border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] text-[color:var(--ink)] hover:border-[color:var(--terra-light)] hover:bg-white",
                          ].join(" ")}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  {question.options?.map((option) => {
                    const isSelected = Array.isArray(selectedValue)
                      ? selectedValue.includes(option.id)
                      : selectedValue === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          question.type === "multi"
                            ? onMultiToggle(option.id)
                            : onSingleSelect(option.id)
                        }
                        className={[
                          "group flex w-full items-start justify-between gap-4 rounded-[18px] border px-5 py-4 text-left transition duration-200",
                          isSelected
                            ? "border-[color:var(--terra)] bg-[color:var(--terra-wash)] shadow-[0_18px_40px_rgba(196,103,74,0.12)]"
                            : "border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] hover:border-[color:var(--terra-light)] hover:bg-white",
                        ].join(" ")}
                      >
                        <span className="text-[15px] leading-7 text-[color:var(--ink)]">{option.label}</span>
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
                          {isSelected ? <Check size={14} weight="bold" /> : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="mt-10 flex flex-col gap-3 border-t border-[rgba(196,103,74,0.08)] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={onBack} disabled={isFirst} className="bk-btn outline !w-auto">
                {t("meta.back")}
              </button>
              <button type="button" onClick={onNext} disabled={!canProceed} className="bk-btn fill !w-auto">
                {isLast ? t("meta.finish") : t("meta.next")}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
