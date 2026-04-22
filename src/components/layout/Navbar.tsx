import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { routePaths } from "../../lib/routes";
import type { Locale } from "../../types/app";
import { useAuth } from "../../hooks/useAuth";

interface NavbarProps {
  locale: Locale;
  audience?: "client" | "therapist";
}

const Navbar: React.FC<NavbarProps> = ({ locale, audience = "client" }) => {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation("common");
  const { user, loading, hasRole, signOut } = useAuth();
  const signInPath =
    audience === "therapist" ? routePaths.therapistAuth(locale) : routePaths.clientAuth(locale);
  const signUpPath = `${signInPath}?mode=signup`;
  const displayName = String(user?.user_metadata?.display_name ?? "").trim();
  const identityLabel = displayName || user?.email || t("nav.signedIn");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 60px",
        background: scrolled ? "rgba(250,246,240,0.95)" : "rgba(250,246,240,0.15)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(196,103,74,0.1)"
          : "1px solid rgba(250,246,240,0.2)",
        transition: "background 0.4s",
      }}
    >
      <div className="page-shell" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to={routePaths.clientHome(locale)} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Logo />
        </Link>

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "32px",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <a
              href={routePaths.clientHome(locale) + "#how"}
              style={{
                textDecoration: "none",
                color: "var(--ink)",
                fontSize: "14px",
                fontWeight: 600,
                opacity: 0.85,
                transition: "color 0.2s",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.color = "var(--terra)";
                event.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.color = "var(--ink)";
                event.currentTarget.style.opacity = "0.85";
              }}
            >
              {t("nav.howItWorks")}
            </a>
          </li>
          <li>
            <a
              href={routePaths.clientHome(locale) + "#stories"}
              style={{
                textDecoration: "none",
                color: "var(--ink)",
                fontSize: "14px",
                fontWeight: 600,
                opacity: 0.85,
                transition: "color 0.2s",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.color = "var(--terra)";
                event.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.color = "var(--ink)";
                event.currentTarget.style.opacity = "0.85";
              }}
            >
              {t("nav.stories")}
            </a>
          </li>
          {!loading && user ? (
            <>
              <li>
                <span
                  style={{
                    color: "var(--ink-light)",
                    fontSize: "13px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {identityLabel}
                </span>
              </li>
              {hasRole("client") && (
                <li>
                  <Link
                    to={routePaths.clientSavedResults(locale)}
                    style={{
                      textDecoration: "none",
                      color: "var(--ink)",
                      fontSize: "14px",
                      fontWeight: 600,
                      opacity: 0.85,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.color = "var(--terra)";
                      event.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.color = "var(--ink)";
                      event.currentTarget.style.opacity = "0.85";
                    }}
                  >
                    {t("nav.savedResults")}
                  </Link>
                </li>
              )}
              {hasRole("therapist") && (
                <li>
                  <Link
                    to={routePaths.therapistDashboard(locale)}
                    style={{
                      textDecoration: "none",
                      color: "var(--ink)",
                      fontSize: "14px",
                      fontWeight: 600,
                      opacity: 0.85,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.color = "var(--terra)";
                      event.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.color = "var(--ink)";
                      event.currentTarget.style.opacity = "0.85";
                    }}
                  >
                    {t("nav.dashboard")}
                  </Link>
                </li>
              )}
              <li>
                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "var(--ink)",
                    fontSize: "14px",
                    fontWeight: 600,
                    opacity: 0.85,
                    transition: "color 0.2s",
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "var(--terra)";
                    event.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "var(--ink)";
                    event.currentTarget.style.opacity = "0.85";
                  }}
                  onClick={() => void signOut()}
                >
                  {t("nav.logOut")}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to={signInPath}
                  style={{
                    textDecoration: "none",
                    color: "var(--ink)",
                    fontSize: "14px",
                    fontWeight: 600,
                    opacity: 0.85,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "var(--terra)";
                    event.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "var(--ink)";
                    event.currentTarget.style.opacity = "0.85";
                  }}
                >
                  {t("nav.signIn")}
                </Link>
              </li>
              <li>
                <Link
                  to={signUpPath}
                  style={{
                    textDecoration: "none",
                    color: "var(--ink)",
                    fontSize: "14px",
                    fontWeight: 600,
                    opacity: 0.85,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "var(--terra)";
                    event.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "var(--ink)";
                    event.currentTarget.style.opacity = "0.85";
                  }}
                >
                  {t("nav.signUp")}
                </Link>
              </li>
            </>
          )}
          <li>
            <LanguageSwitcher locale={locale} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
