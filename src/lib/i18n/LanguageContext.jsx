import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { translations } from "@/lib/i18n/translations";

export const LanguageContext = createContext();

const STORAGE_KEY = "recpan-language";
const DEFAULT_LANGUAGE = "cs";

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