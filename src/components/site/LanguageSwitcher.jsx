import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageSwitcher({ className = "" }) {
  const { language, setLanguage } = useLanguage();

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
          language === "cs" ? "text-brand-green" : "text-obsidian/30 hover:text-obsidian"
        }`}
      >
        CZ
      </button>
      <span className="text-obsidian/30" aria-hidden="true">/</span>
      <button
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        aria-label="English"
        className={`transition-colors duration-300 ${
          language === "en" ? "text-brand-green" : "text-obsidian/30 hover:text-obsidian"
        }`}
      >
        EN
      </button>
    </div>
  );
}