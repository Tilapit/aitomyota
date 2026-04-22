import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { persistLocale } from "./locale";
import commonEn from "../locales/en/common.json";
import landingClientEn from "../locales/en/landing-client.json";
import landingTherapistEn from "../locales/en/landing-therapist.json";
import quizClientEn from "../locales/en/quiz-client.json";
import quizTherapistEn from "../locales/en/quiz-therapist.json";
import authEn from "../locales/en/auth.json";
import dashboardTherapistEn from "../locales/en/dashboard-therapist.json";
import commonFi from "../locales/fi/common.json";
import landingClientFi from "../locales/fi/landing-client.json";
import landingTherapistFi from "../locales/fi/landing-therapist.json";
import quizClientFi from "../locales/fi/quiz-client.json";
import quizTherapistFi from "../locales/fi/quiz-therapist.json";
import authFi from "../locales/fi/auth.json";
import dashboardTherapistFi from "../locales/fi/dashboard-therapist.json";

const resources = {
  en: {
    common: commonEn,
    "landing-client": landingClientEn,
    "landing-therapist": landingTherapistEn,
    "quiz-client": quizClientEn,
    "quiz-therapist": quizTherapistEn,
    auth: authEn,
    "dashboard-therapist": dashboardTherapistEn,
  },
  fi: {
    common: commonFi,
    "landing-client": landingClientFi,
    "landing-therapist": landingTherapistFi,
    "quiz-client": quizClientFi,
    "quiz-therapist": quizTherapistFi,
    auth: authFi,
    "dashboard-therapist": dashboardTherapistFi,
  },
} as const;

if (!i18n.isInitialized) {
  void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      supportedLngs: ["en", "fi"],
      defaultNS: "common",
      ns: [
        "common",
        "landing-client",
        "landing-therapist",
        "quiz-client",
        "quiz-therapist",
        "auth",
        "dashboard-therapist",
      ],
      interpolation: { escapeValue: false },
    });

  i18n.on("languageChanged", (language) => {
    if (language === "en" || language === "fi") {
      persistLocale(language);
    }
  });
}

export default i18n;
