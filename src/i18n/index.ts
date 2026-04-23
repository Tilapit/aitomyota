import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import fi from "./fi.json";

const savedLang = localStorage.getItem("lang") || "fi";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fi: { translation: fi },
  },
  lng: savedLang,
  fallbackLng: "fi",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
});

export default i18n;
