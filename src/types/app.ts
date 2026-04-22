export const SUPPORTED_LOCALES = ["en", "fi"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "fi";
}
