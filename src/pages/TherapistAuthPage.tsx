import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/layout/LanguageSwitcher";
import Logo from "../components/layout/Logo";
import { routePaths } from "../lib/routes";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import { readTherapistOnboardingDraft, clearTherapistOnboardingDraft } from "../features/therapist/onboardingStorage";
import { useAuth } from "../hooks/useAuth";
import { persistTherapistOnboarding } from "../repositories/therapistRepository";

export default function TherapistAuthPage() {
  const locale = useCurrentLocale();
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const { configured, signInWithPassword, signUpWithPassword, sendMagicLink, user } = useAuth();
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [form, setForm] = useState({ email: "", password: "", displayName: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const finalizeOnboarding = async (email: string, displayName: string, userId: string) => {
    const draft = readTherapistOnboardingDraft();
    if (!draft) {
      navigate(routePaths.therapistDashboard(locale));
      return;
    }

    await persistTherapistOnboarding({
      userId,
      email,
      displayName,
      answers: draft.answers,
    });

    clearTherapistOnboardingDraft();
    navigate(routePaths.therapistDashboard(locale));
  };

  if (user) {
    void finalizeOnboarding(
      user.email ?? form.email,
      String(user.user_metadata?.display_name ?? form.displayName ?? user.email ?? ""),
      user.id,
    );
  }

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
          <div className="s-label">{mode === "signup" ? t("signUp") : t("signIn")}</div>
          <h1 className="max-w-full text-[clamp(30px,4vw,48px)] leading-[1.08]">{t("title")}</h1>
          <p className="mt-4 max-w-[620px] text-[15px] leading-7 text-[color:var(--ink-mid)]">{t("description")}</p>
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
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              placeholder={t("password")}
              className="rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4"
            />
          </div>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          {message && <p className="mt-4 text-sm text-[color:var(--terra)]">{message}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="bk-btn fill !w-auto !px-7"
              onClick={async () => {
                setError("");
                const result =
                  mode === "signup"
                    ? await signUpWithPassword(form)
                    : await signInWithPassword({ email: form.email, password: form.password });
                if (result.error) {
                  setError(result.error);
                  return;
                }
                if (mode === "signup" && configured) {
                  setMessage(t("signupHint"));
                }
              }}
            >
              {mode === "signup" ? t("signUp") : t("signIn")}
            </button>
            <button
              type="button"
              className="bk-btn outline !w-auto !px-7"
              onClick={async () => {
                setError("");
                const result = await sendMagicLink(form.email);
                if (result.error) {
                  setError(result.error);
                  return;
                }
                setMessage(t("magicLinkSent"));
              }}
            >
              {t("magicLink")}
            </button>
          </div>
          <button
            type="button"
            className="mt-6 text-sm font-semibold text-[color:var(--terra)]"
            onClick={() => setMode((current) => (current === "signup" ? "signin" : "signup"))}
          >
            {mode === "signup" ? t("switchToSignIn") : t("switchToSignUp")}
          </button>
        </div>
      </div>
    </div>
  );
}
