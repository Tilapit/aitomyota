import { useState } from "react";
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
    questions,
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

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  if (!question) {
    return null;
  }

  if (complete) {
    const identityAnswers =
      answers.identity && typeof answers.identity === "object" && !Array.isArray(answers.identity)
        ? (answers.identity as Record<string, string>)
        : {};
    const previewName = identityAnswers.name ?? "";
    const previewTitle = identityAnswers.title_custom || identityAnswers.title || "";
    const selectedSpecs = Array.isArray(answers.specializations)
      ? (answers.specializations as string[]).slice(0, 3)
      : [];
    const specsQuestion = questions.find((q) => q.id === "specializations");
    const specLabels = selectedSpecs.map(
      (id) => specsQuestion?.options?.find((o) => o.id === id)?.label ?? id,
    );
    const workingStyleValue = typeof answers.working_style === "number" ? answers.working_style : null;
    const hasPreview = previewName || previewTitle || specLabels.length > 0 || workingStyleValue !== null;

    return (
      <div className="min-h-screen bg-[color:var(--cream)]">
        <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-[rgba(196,103,74,0.1)] bg-[rgba(250,246,240,0.9)] px-6 py-4 backdrop-blur-[16px] sm:px-10 lg:px-[60px]">
          <Link to={routePaths.therapistLanding(locale)} className="flex items-center text-[color:var(--ink)]">
            <Logo />
          </Link>
          <LanguageSwitcher locale={locale} />
        </header>
        <main className="px-6 pt-[120px] pb-20 sm:px-10 lg:px-[72px]">
          {hasPreview && (
            <div className="page-shell-tight mb-6 rounded-[32px] bg-white p-8 shadow-[0_26px_80px_rgba(30,22,16,0.06)]">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[color:var(--terra-wash)] text-2xl font-semibold text-[color:var(--terra)]">
                  {previewName ? previewName.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  {previewName && (
                    <p className="text-lg font-semibold text-[color:var(--ink)]">{previewName}</p>
                  )}
                  {previewTitle && (
                    <p className="text-sm text-[color:var(--ink-mid)]">{previewTitle}</p>
                  )}
                </div>
              </div>
              {specLabels.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {specLabels.map((label) => (
                    <span
                      key={label}
                      className="rounded-full bg-[color:var(--terra-wash)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--terra)]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
              {workingStyleValue !== null && (
                <p className="mt-3 text-sm text-[color:var(--ink-light)]">
                  {locale === "fi" ? `Tyyli: ${workingStyleValue}/5` : `Style: ${workingStyleValue}/5`}
                </p>
              )}
            </div>
          )}
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
              {question.type === "image-upload" ? (
                <div className="grid gap-4">
                  {imagePreviewUrl && (
                    <div className="flex justify-center">
                      <img
                        src={imagePreviewUrl}
                        alt=""
                        className="h-24 w-24 rounded-full object-cover shadow-md"
                      />
                    </div>
                  )}
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[18px] border border-dashed border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-8 text-center transition hover:border-[color:var(--terra-light)] hover:bg-white">
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setImagePreviewUrl(url);
                          onTextChange(file.name);
                        }
                      }}
                    />
                    <span className="text-[15px] leading-7 text-[color:var(--ink-mid)]">
                      {imagePreviewUrl
                        ? locale === "fi"
                          ? "Vaihda kuva"
                          : "Change image"
                        : locale === "fi"
                          ? "Valitse profiilikuva"
                          : "Choose profile photo"}
                    </span>
                    <span className="text-[13px] text-[color:var(--ink-light)]">
                      {locale === "fi" ? "JPG, PNG tai WebP" : "JPG, PNG or WebP"}
                    </span>
                  </label>
                </div>
              ) : question.type === "group" ? (
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
                  {question.min !== undefined ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-4 text-sm text-[color:var(--ink-light)]">
                        <span>{question.minLabel}</span>
                        <span>{question.maxLabel}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min={question.min}
                          max={question.max ?? 40}
                          step={question.step ?? 1}
                          value={typeof selectedValue === "number" ? selectedValue : question.min}
                          onChange={(e) => onScaleSelect(Number(e.target.value))}
                          className="w-full accent-[color:var(--terra)]"
                        />
                        <span className="w-12 shrink-0 text-center text-base font-semibold text-[color:var(--ink)]">
                          {typeof selectedValue === "number" ? selectedValue : "—"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              ) : (
                <div className="grid gap-3">
                  {question.type === "multi" && question.maxSelections !== undefined && (
                    <p className="text-[13px] text-[color:var(--ink-light)]">
                      {locale === "fi"
                        ? `Valitse enintään ${question.maxSelections}`
                        : `Select up to ${question.maxSelections}`}
                    </p>
                  )}
                  {question.options?.map((option) => {
                    const isSelected = Array.isArray(selectedValue)
                      ? selectedValue.includes(option.id)
                      : selectedValue === option.id;
                    const selectionCount = Array.isArray(selectedValue) ? selectedValue.length : 0;
                    const atLimit =
                      question.type === "multi" &&
                      question.maxSelections !== undefined &&
                      selectionCount >= question.maxSelections;
                    const isDisabled = !isSelected && atLimit;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        disabled={isDisabled}
                        onClick={() =>
                          question.type === "multi"
                            ? onMultiToggle(option.id)
                            : onSingleSelect(option.id)
                        }
                        className={[
                          "group flex w-full items-start justify-between gap-4 rounded-[18px] border px-5 py-4 text-left transition duration-200",
                          isSelected
                            ? "border-[color:var(--terra)] bg-[color:var(--terra-wash)] shadow-[0_18px_40px_rgba(196,103,74,0.12)]"
                            : isDisabled
                              ? "cursor-not-allowed border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] opacity-40"
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
