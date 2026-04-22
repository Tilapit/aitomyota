import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routePaths } from "../../lib/routes";
import type { Locale } from "../../types/app";

type AuthAudienceSwitcherProps = {
  locale: Locale;
  active: "client" | "therapist";
  mode: "signin" | "signup";
};

export default function AuthAudienceSwitcher({
  locale,
  active,
  mode,
}: AuthAudienceSwitcherProps) {
  const { t } = useTranslation("common");
  const tabs = [
    {
      id: "client" as const,
      label: t("audienceTabs.forClients"),
      href: `${routePaths.clientAuth(locale)}${mode === "signup" ? "?mode=signup" : ""}`,
    },
    {
      id: "therapist" as const,
      label: t("audienceTabs.forTherapists"),
      href: `${routePaths.therapistAuth(locale)}${mode === "signup" ? "?mode=signup" : ""}`,
    },
  ];

  return (
    <div className="mb-6 inline-flex rounded-full border border-[rgba(196,103,74,0.14)] bg-[rgba(255,255,255,0.78)] p-1 shadow-[0_12px_36px_rgba(30,22,16,0.06)] backdrop-blur-[10px]">
      {tabs.map((tab) => {
        const isActive = tab.id === active;

        return (
          <Link
            key={tab.id}
            to={tab.href}
            className="inline-flex min-w-[132px] items-center justify-center rounded-full px-4 py-2 text-sm font-semibold no-underline transition sm:px-5"
            style={{
              background: isActive ? "var(--ink)" : "transparent",
              color: isActive ? "#ffffff" : "var(--ink-mid)",
              boxShadow: isActive ? "0 10px 24px rgba(30,22,16,0.14)" : "none",
              textDecoration: "none",
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
