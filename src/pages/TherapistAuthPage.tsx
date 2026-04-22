import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/layout/LanguageSwitcher";
import Logo from "../components/layout/Logo";
import { routePaths } from "../lib/routes";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import { usePageMeta } from "../hooks/usePageMeta";
import { readTherapistOnboardingDraft, clearTherapistOnboardingDraft } from "../features/therapist/onboardingStorage";
import { useAuth } from "../hooks/useAuth";
import { persistTherapistOnboarding } from "../repositories/therapistRepository";

export default function TherapistAuthPage() {
  const locale = useCurrentLocale();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation("auth");
  usePageMeta(
    locale === "fi" ? "Myötä | Terapeutin kirjautuminen" : "Myötä | Therapist sign in",
    locale === "fi"
      ? "Kirjaudu sisään terapeuttitilillesi tai luo tili tallentaaksesi onboarding-vastaukset ja julkaistaksesi profiilisi."
      : "Sign in to your therapist account or create one to store your onboarding answers and publish your profile.",
  );
  const { configured, signUpWithPassword, sendMagicLink, user, hasRole, refreshRoles, loading } = useAuth();
  const requestedMode = searchParams.get("mode");
  const [mode, setMode] = useState<"signup" | "signin">(requestedMode === "signup" ? "signup" : "signin");
  const [form, setForm] = useState(() => {
    const draft = readTherapistOnboardingDraft();
    const identity =
      draft?.answers.identity && typeof draft.answers.identity === "object" && !Array.isArray(draft.answers.identity)
        ? (draft.answers.identity as Record<string, string>)
        : {};

    return {
      email: identity.email ?? "",
      password: "",
      displayName: identity.name ?? "",
    };
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const authRedirectTo = `${window.location.origin}${routePaths.therapistAuth(locale)}`;

  const finalizeOnboarding = useCallback(
    async (email: string, displayName: string, userId: string) => {
      const draft = readTherapistOnboardingDraft();
      if (!draft) {
        if (hasRole("therapist")) {
          navigate(routePaths.therapistDashboard(locale), { replace: true });
        } else {
          navigate(routePaths.therapistQuiz(locale), { replace: true });
        }
        return;
      }

      await persistTherapistOnboarding({
        userId,
        email,
        displayName,
        answers: draft.answers,
      });

      clearTherapistOnboardingDraft();
      await refreshRoles();
      navigate(routePaths.therapistDashboard(locale), { replace: true });
    },
    [hasRole, locale, navigate, refreshRoles],
  );

  useEffect(() => {
    if (!user || loading) {
      return;
    }

    void finalizeOnboarding(
      user.email ?? form.email,
      String(user.user_metadata?.display_name ?? form.displayName ?? user.email ?? ""),
      user.id,
    );
  }, [finalizeOnboarding, form.displayName, form.email, loading, user]);

  return (
    <div className="min-h-screen bg-[color:var(--cream)] px-6 py-10 sm:px-10 lg:px-[72px]">
      <div className="page-shell-tight">
        <div className="flex items-center justify-between gap-4">
          <Link to={routePaths.therapistLanding(locale)} className="inline-flex items-center text-[color:var(--ink)]">
            <Logo />
          </Link>
          <LanguageSwitcher locale={locale} />
        </div>
        <div className="mt-10 rounded-[32px] bg-white p-8 shadow-[0_26px_80px_rgba(30,22,16,0.06)] sm:p-10">
          <div className="s-label">{mode === "signup" ? t("signupEyebrow") : t("signinEyebrow")}</div>
          <h1 className="max-w-full text-[clamp(30px,4vw,48px)] leading-[1.08]">
            {mode === "signup" ? t("signupTitle") : t("signinTitle")}
          </h1>
          <p className="mt-4 max-w-[620px] text-[15px] leading-7 text-[color:var(--ink-mid)]">
            {mode === "signup" ? t("signupDescription") : t("signinDescription")}
          </p>
          {!configured && <p className="mt-4 text-sm text-[color:var(--terra)]">{t("supabaseMissing")}</p>}
          <div className="mt-8 grid gap-4">
            {mode === "signup" && (
              <input
                value={form.displayName}
                onChange={(event) => setForm((current) => ({ ...current, displayName: event.target.value }))}
                placeholder={t("displayName")}
                className="rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4"
              />
            )}
            <input
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder={t("email")}
              className="rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4"
            />
            {mode === "signup" && (
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                placeholder={t("password")}
                className="rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4"
              />
            )}
          </div>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          {message && <p className="mt-4 text-sm text-[color:var(--terra)]">{message}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            {mode === "signup" ? (
              <button
                type="button"
                className="bk-btn fill !w-auto !px-7"
                onClick={async () => {
                  setError("");
                  const result = await signUpWithPassword({
                    ...form,
                    emailRedirectTo: authRedirectTo,
                  });
                  if (result.error) {
                    setError(result.error);
                    return;
                  }
                  if (configured) {
                    setMessage(t("signupHint"));
                  }
                }}
              >
                {t("signUp")}
              </button>
            ) : (
              <button
                type="button"
                className="bk-btn fill !w-auto !px-7"
                onClick={async () => {
                  setError("");
                  const result = await sendMagicLink(form.email, false, authRedirectTo);
                  if (result.error) {
                    setError(result.error);
                    return;
                  }
                  setMessage(t("magicLinkSent"));
                }}
              >
                {t("magicLink")}
              </button>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-center text-center">
          <button
            type="button"
            className="text-sm font-semibold text-[color:var(--terra)]"
            onClick={() => {
              setMode((current) => {
                const nextMode = current === "signup" ? "signin" : "signup";
                setSearchParams(nextMode === "signup" ? { mode: "signup" } : {});
                return nextMode;
              });
            }}
          >
            {mode === "signup" ? t("switchToSignIn") : t("switchToSignUp")}
          </button>
        </div>
      </div>
    </div>
  );
}
