import { createContext, useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { translations } from "@/lib/i18n/translations";
import { getLanguageFromPath, getTranslatedPath } from "@/lib/i18n/routes";

export const LanguageContext = createContext();

const STORAGE_KEY = "recpan-language";

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const language = useMemo(
    () => getLanguageFromPath(location.pathname),
    [location.pathname]
  );

  const setLanguage = useCallback((lang) => {
    const translatedPath = getTranslatedPath(location.pathname, lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
    navigate(translatedPath);
  }, [location.pathname, navigate]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
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