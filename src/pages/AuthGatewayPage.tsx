import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/layout/LanguageSwitcher";
import Logo from "../components/layout/Logo";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import { usePageMeta } from "../hooks/usePageMeta";
import { routePaths } from "../lib/routes";

export default function AuthGatewayPage() {
  const locale = useCurrentLocale();
  const { t } = useTranslation("common");
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "signin";

  usePageMeta(
    locale === "fi" ? "Myötä | Kirjautuminen" : "Myötä | Sign in",
    locale === "fi"
      ? "Valitse jatkatko asiakkaana vai terapeuttina."
      : "Choose whether you want to continue as a client or a therapist.",
  );

  return (
    <div className="min-h-screen bg-[color:var(--cream)] px-6 py-10 sm:px-10 lg:px-[72px]">
      <div className="page-shell-tight">
        <div className="flex items-center justify-between gap-4">
          <Link to={routePaths.clientHome(locale)} className="inline-flex items-center text-[color:var(--ink)]">
            <Logo />
          </Link>
          <LanguageSwitcher locale={locale} />
        </div>

        <div className="mt-10 rounded-[32px] bg-white p-8 text-center shadow-[0_26px_80px_rgba(30,22,16,0.06)] sm:p-10">
          <div className="s-label">
            {mode === "signup" ? t("authGateway.signupEyebrow") : t("authGateway.signinEyebrow")}
          </div>
          <h1 className="max-w-full text-[clamp(30px,4vw,48px)] leading-[1.08]">
            {mode === "signup" ? t("authGateway.signupTitle") : t("authGateway.signinTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-[620px] text-[15px] leading-7 text-[color:var(--ink-mid)]">
            {t("authGateway.description")}
          </p>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full border border-[rgba(196,103,74,0.14)] bg-[rgba(255,255,255,0.78)] p-1">
              <button
                type="button"
                onClick={() => setSearchParams({})}
                className="rounded-full px-5 py-2 text-sm font-semibold"
                style={{
                  background: mode === "signin" ? "var(--ink)" : "transparent",
                  color: mode === "signin" ? "#fff" : "var(--ink-mid)",
                }}
              >
                {t("authGateway.signIn")}
              </button>
              <button
                type="button"
                onClick={() => setSearchParams({ mode: "signup" })}
                className="rounded-full px-5 py-2 text-sm font-semibold"
                style={{
                  background: mode === "signup" ? "var(--ink)" : "transparent",
                  color: mode === "signup" ? "#fff" : "var(--ink-mid)",
                }}
              >
                {t("authGateway.signUp")}
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              to={`${routePaths.clientAuth(locale)}${mode === "signup" ? "?mode=signup" : ""}`}
              className="rounded-[24px] border border-[rgba(196,103,74,0.12)] bg-[color:var(--sand-pale)] p-6 text-left no-underline transition hover:border-[rgba(196,103,74,0.24)] hover:bg-white"
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--terra)]">
                {t("audienceTabs.forClients")}
              </div>
              <div className="mt-2 font-serif text-[28px] text-[color:var(--ink)]">
                {mode === "signup" ? t("authGateway.clientSignup") : t("authGateway.clientSignin")}
              </div>
              <p className="mt-3 text-[14px] leading-7 text-[color:var(--ink-mid)]">
                {t("authGateway.clientDescription")}
              </p>
            </Link>

            <Link
              to={`${routePaths.therapistAuth(locale)}${mode === "signup" ? "?mode=signup" : ""}`}
              className="rounded-[24px] border border-[rgba(196,103,74,0.12)] bg-[color:var(--sand-pale)] p-6 text-left no-underline transition hover:border-[rgba(196,103,74,0.24)] hover:bg-white"
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--terra)]">
                {t("audienceTabs.forTherapists")}
              </div>
              <div className="mt-2 font-serif text-[28px] text-[color:var(--ink)]">
                {mode === "signup" ? t("authGateway.therapistSignup") : t("authGateway.therapistSignin")}
              </div>
              <p className="mt-3 text-[14px] leading-7 text-[color:var(--ink-mid)]">
                {t("authGateway.therapistDescription")}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
