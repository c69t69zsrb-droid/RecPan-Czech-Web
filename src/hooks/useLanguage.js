import { useContext } from "react";
import { LanguageContext } from "@/lib/i18n/LanguageContext";

export function useLanguage() {
  return useContext(LanguageContext);
}