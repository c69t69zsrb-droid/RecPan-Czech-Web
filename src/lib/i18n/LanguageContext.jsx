import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { translations } from "@/lib/i18n/translations";

export const LanguageContext = createContext();

const STORAGE_KEY = "recpan-language";
const DEFAULT_LANGUAGE = "cs";

const metaTitles = {
  cs: "RecPan – Recyklace solárních panelů",
  en: "RecPan – Solar Panel Recycling",
};

const metaDescriptions = {
  cs: "RecPan spojuje technologii a udržitelnost pro zodpovědnou recyklaci solárních panelů. Přístup uzavřeného cyklu pro lepší budoucnost.",
  en: "RecPan combines technology and sustainability for responsible solar panel recycling. A closed-loop approach for a better future.",
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "cs" || saved === "en" ? saved : DEFAULT_LANGUAGE;
  });

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;

    const titleEl = document.querySelector("title");
    if (titleEl) titleEl.textContent = metaTitles[language];

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", metaDescriptions[language]);
  }, [language]);

  const t = useCallback(
    (key) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[language] ?? entry.cs ?? key;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}