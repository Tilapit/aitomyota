import React, { createContext, useContext, useState } from "react";
import en from "../i18n/en";
import fi from "../i18n/fi";
import type { Translations } from "../i18n/en";

type Language = "en" | "fi";

type LanguageContextType = {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "fi",
  t: fi,
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fi");

  const toggleLanguage = () => {
    setLanguage((current) => (current === "fi" ? "en" : "fi"));
  };

  const t = language === "fi" ? fi : en;

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
