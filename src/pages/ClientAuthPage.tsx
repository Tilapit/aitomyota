import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/layout/LanguageSwitcher";
import Logo from "../components/layout/Logo";
import { routePaths } from "../lib/routes";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import { usePageMeta } from "../hooks/usePageMeta";
import { useAuth } from "../hooks/useAuth";
import { syncPendingClientResult } from "../repositories/clientResultsRepository";

export default function ClientAuthPage() {
  const locale = useCurrentLocale();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation("auth");
  const { configured, signUpWithPassword, sendMagicLink, user, loading, refreshRoles } = useAuth();
  const requestedMode = searchParams.get("mode");
  const [mode, setMode] = useState<"signup" | "signin">(requestedMode === "signup" ? "signup" : "signin");
  const [form, setForm] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const authRedirectTo = `${window.location.origin}${routePaths.clientAuth(locale)}`;

  usePageMeta(
    locale === "fi" ? "Myötä | Tallenna suosituksesi" : "Myötä | Save your recommendations",
    locale === "fi"
      ? "Luo asiakastili tai kirjaudu sisään tallentaaksesi suosituksesi ja palataksesi niihin myöhemmin."
      : "Create a client account or sign in to save your recommendations and return to them later.",
  );

  useEffect(() => {
    if (!user || loading) {
      return;
    }

    void syncPendingClientResult({
      userId: user.id,
      email: user.email ?? form.email,
      displayName: String(user.user_metadata?.display_name ?? form.displayName ?? ""),
    })
      .then(() => refreshRoles())
      .finally(() => {
      navigate(routePaths.clientSavedResults(locale), { replace: true });
      });
  }, [form.displayName, form.email, loading, locale, navigate, refreshRoles, user]);

  return (
    <div className="min-h-screen bg-[color:var(--cream)] px-6 py-10 sm:px-10 lg:px-[72px]">
      <div className="page-shell-tight">
        <div className="flex items-center justify-between gap-4">
          <Link to={routePaths.clientHome(locale)} className="inline-flex items-center text-[color:var(--ink)]">
            <Logo />
          </Link>
          <LanguageSwitcher locale={locale} />
        </div>
        <div className="mt-10 rounded-[32px] bg-white p-8 shadow-[0_26px_80px_rgba(30,22,16,0.06)] sm:p-10">
          <div className="s-label">{mode === "signup" ? t("client.signupEyebrow") : t("client.signinEyebrow")}</div>
          <h1 className="max-w-full text-[clamp(30px,4vw,48px)] leading-[1.08]">
            {mode === "signup" ? t("client.signupTitle") : t("client.signinTitle")}
          </h1>
          <p className="mt-4 max-w-[620px] text-[15px] leading-7 text-[color:var(--ink-mid)]">
            {mode === "signup" ? t("client.signupDescription") : t("client.signinDescription")}
          </p>
          {!configured && <p className="mt-4 text-sm text-[color:var(--terra)]">{t("client.supabaseMissing")}</p>}
          <div className="mt-8 grid gap-4">
            {mode === "signup" && (
              <>
                <input
                  value={form.displayName}
                  onChange={(event) => setForm((current) => ({ ...current, displayName: event.target.value }))}
                  placeholder={t("client.displayName")}
                  className="rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4"
                />
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  placeholder={t("client.password")}
                  className="rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4"
                />
              </>
            )}
            <input
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder={t("client.email")}
              className="rounded-[18px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-5 py-4"
            />
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
                    setMessage(t("client.signupHint"));
                  }
                }}
              >
                {t("client.signUp")}
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
                  setMessage(t("client.magicLinkSent"));
                }}
              >
                {t("client.magicLink")}
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
            {mode === "signup" ? t("client.switchToSignIn") : t("client.switchToSignUp")}
          </button>
        </div>
      </div>
    </div>
  );
}
