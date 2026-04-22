import type { Locale } from "../types/app";

export const routePaths = {
  clientHome: (locale: Locale) => `/${locale}`,
  clientQuiz: (locale: Locale) => `/${locale}/quiz`,
  clientQuizLong: (locale: Locale) => `/${locale}/quiz/long`,
  clientSavedResults: (locale: Locale) => `/${locale}/results`,
  clientAuth: (locale: Locale) => `/${locale}/client/auth`,
  authGateway: (locale: Locale) => `/${locale}/auth`,
  therapistLanding: (locale: Locale) => `/${locale}/for-therapists`,
  therapistQuiz: (locale: Locale) => `/${locale}/for-therapists/quiz`,
  therapistAuth: (locale: Locale) => `/${locale}/therapist/auth`,
  therapistDashboard: (locale: Locale) => `/${locale}/therapist/dashboard`,
} as const;

export function swapLocaleInPathname(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${locale}`;
  }

  segments[0] = locale;
  return `/${segments.join("/")}`;
}
