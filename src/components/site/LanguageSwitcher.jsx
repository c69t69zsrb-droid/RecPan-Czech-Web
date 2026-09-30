import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageSwitcher({ className = "", overDarkHero = false }) {
  const { language, setLanguage } = useLanguage();

  // Nad tmavou částí hero obrázku (jen na desktopu) je neaktivní jazyk bílý; na mobilu zůstává tmavý.
  const inactive = overDarkHero
    ? "text-obsidian/30 hover:text-obsidian lg:text-white/40 lg:hover:text-white"
    : "text-obsidian/30 hover:text-obsidian";
  const separator = overDarkHero ? "text-obsidian/30 lg:text-white/30" : "text-obsidian/30";

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={`flex items-center gap-1.5 font-heading text-[12px] uppercase tracking-[0.15em] ${className}`}
    >
      <button
        onClick={() => setLanguage("cs")}
        aria-pressed={language === "cs"}
        aria-label="Čeština"
        className={`transition-colors duration-300 ${
          language === "cs" ? "text-brand-green" : inactive
        }`}
      >
        CZ
      </button>
      <span className={separator} aria-hidden="true">/</span>
      <button
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        aria-label="English"
        className={`transition-colors duration-300 ${
          language === "en" ? "text-brand-green" : inactive
        }`}
      >
        EN
      </button>
    </div>
  );
}