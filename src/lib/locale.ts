import type { Locale } from "../types/app";

export function detectPreferredLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem("preferred-locale");
  if (stored === "en" || stored === "fi") {
    return stored;
  }

  const browserLanguages = navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  const hasFinnish = browserLanguages.some((language) =>
    language.toLowerCase().startsWith("fi"),
  );

  return hasFinnish ? "fi" : "en";
}

export function persistLocale(locale: Locale) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("preferred-locale", locale);
  }
}
