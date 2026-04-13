import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { swapLocaleInPathname } from "../../lib/routes";
import type { Locale } from "../../types/app";

type LanguageSwitcherProps = {
  locale: Locale;
};

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("common");

  const nextLocale: Locale = locale === "en" ? "fi" : "en";

  return (
    <button
      type="button"
      onClick={() => navigate(swapLocaleInPathname(location.pathname, nextLocale))}
      className="rounded-full border border-[rgba(196,103,74,0.16)] bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-mid)] transition hover:border-[color:var(--terra-light)] hover:text-[color:var(--terra)]"
      aria-label={t("languageSwitcher.ariaLabel")}
    >
      {locale === "en" ? t("languageSwitcher.toFinnish") : t("languageSwitcher.toEnglish")}
    </button>
  );
}
