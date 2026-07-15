import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function CareerHero({ onScrollToPositions }) {
  const { t } = useLanguage();

  return (
    <section className="pt-32 pb-16 px-6 md:px-[4.166%]">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[42%]"
        >
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">
            {t("career.label")}
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-obsidian mb-6 max-w-4xl">
            {t("career.heroTitle")}
            <span className="text-brand-green">.</span>
          </h1>
          <p className="font-heading text-base md:text-lg text-obsidian/50 max-w-2xl font-light leading-relaxed mb-10">
            {t("career.heroSubtitle")}
          </p>
          <button
            onClick={onScrollToPositions}
            className="group flex items-center gap-3 bg-brand-green text-white px-8 py-4 font-heading text-xs font-medium uppercase tracking-[0.15em] hover:bg-obsidian transition-colors rounded-lg"
          >
            {t("career.heroButton")}
            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="relative w-full lg:w-[58%] h-[44vh] lg:h-[60vh] overflow-hidden rounded-lg"
        >
          <img
            src="https://media.base44.com/images/public/6a42ca6def2b3fde835b3720/abdf0ee40_IMG_06852Large.jpg"
            alt={t("career.heroAlt")}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}