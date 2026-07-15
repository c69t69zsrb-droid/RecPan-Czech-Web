import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTonnesCounter } from "@/hooks/useTonnesCounter";
import { useLanguage } from "@/hooks/useLanguage";

const HERO_IMAGE = "https://media.base44.com/images/public/6a42a05b8f8b3d58dce0168f/2c1fd4474_generated_image.png";

export default function HeroSection({ onNavigate }) {
  const { t, language } = useLanguage();
  const displayValue = useTonnesCounter();
  const locale = language === "cs" ? "cs-CZ" : "en-US";

  return (
    <section id="hero" className="snap-section relative min-h-screen flex flex-col overflow-hidden">
      {/* Top: text + image */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left content */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-[42%] px-6 md:px-[4.166%] py-24 lg:py-16">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-[-0.03em] leading-[0.9] text-obsidian py-32">
            
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2")}
            <br />
            {t("hero.titleLine3")}
            <span className="text-brand-green">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-heading text-base font-medium text-obsidian/70">
            
            {t("hero.subtitle")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-heading text-sm leading-relaxed text-obsidian/50 mt-4 max-w-sm font-light">
            
            {t("hero.description")}
          </motion.p>

          {/* Live counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8">
            
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-obsidian/30 mb-1">
              {t("hero.counterLabel")}
            </p>
            <p className="font-heading text-4xl font-bold text-brand-green tracking-tight">
              {displayValue.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 2 })} t
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            onClick={() => onNavigate && onNavigate("#contact")}
            className="group flex items-center gap-3 font-heading text-xs font-medium uppercase tracking-[0.15em] text-obsidian/60 hover:text-brand-green transition-colors mt-10">
            
            {t("hero.cta")}
            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="relative w-full lg:w-[58%] h-[40vh] lg:h-auto">
          
          <div className="absolute inset-0 border border-obsidian/5">
            <img
              src={HERO_IMAGE}
              alt={t("hero.altPanel")}
              className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-titanium via-transparent to-transparent lg:opacity-100 opacity-0" />
          </div>
        </motion.div>
      </div>
    </section>);

}