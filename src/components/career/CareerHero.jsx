import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function CareerHero({ onScrollToPositions, onScrollToAbout }) {
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 px-6 md:px-[4.166%] overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[52%]"
        >
          <div className="flex items-center gap-2 mb-6">
            <MapPin size={14} className="text-brand-green" />
            <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/40">
              {t("career.heroLocation")}
            </p>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-obsidian mb-8 leading-[1.08]">
            {t("career.heroHeadline")}
            <span className="text-brand-green">.</span>
          </h1>
          <p className="font-heading text-base md:text-lg text-obsidian/50 max-w-xl font-light leading-relaxed mb-10">
            {t("career.heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onScrollToPositions}
              className="group flex items-center justify-center gap-3 bg-brand-green text-white px-8 py-4 font-heading text-xs font-medium uppercase tracking-[0.15em] hover:bg-obsidian transition-all rounded-lg hover:shadow-lg"
            >
              {t("career.heroButton")}
              <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
            </button>
            <button
              onClick={onScrollToAbout}
              className="group flex items-center justify-center gap-3 border border-obsidian/20 text-obsidian px-8 py-4 font-heading text-xs font-medium uppercase tracking-[0.15em] hover:border-obsidian hover:bg-obsidian/5 transition-all rounded-lg"
            >
              {t("career.heroSecondaryCta")}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="relative w-full lg:w-[48%] h-[40vh] lg:h-[56vh] overflow-hidden rounded-xl"
        >
          <img
            src="https://media.base44.com/images/public/6a42ca6def2b3fde835b3720/abdf0ee40_IMG_06852Large.jpg"
            alt={t("career.heroAlt")}
            width={1920}
            height={1080}
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}