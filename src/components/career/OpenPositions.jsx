import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { careerPositions } from "@/data/careerPositions";

export default function OpenPositions({ onApply }) {
  const { t, language } = useLanguage();

  return (
    <section id="positions" className="px-6 md:px-[4.166%] py-16 md:py-20 border-t border-obsidian/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 md:mb-16"
      >
        <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">
          {t("career.positionsLabel")}
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian">
          {t("career.positionsTitle")}
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {careerPositions.map((pos, i) => (
          <motion.div
            key={pos.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="border border-obsidian/10 rounded-lg p-8 md:p-10 hover:shadow-md transition-all duration-300 flex flex-col"
          >
            <h3 className="font-heading text-xl md:text-2xl font-semibold tracking-[-0.01em] text-obsidian mb-4">
              {pos.title[language]}
            </h3>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="flex items-center gap-1.5 font-heading text-xs text-obsidian/50">
                <MapPin size={13} className="text-brand-green" />
                {pos.location[language]}
              </span>
              <span className="flex items-center gap-1.5 font-heading text-xs text-obsidian/50">
                <Clock size={13} className="text-brand-green" />
                {pos.type[language]}
              </span>
            </div>

            <p className="font-heading text-sm leading-relaxed text-obsidian/50 font-light mb-6 flex-1">
              {pos.description[language]}
            </p>

            <button
              onClick={() => onApply(pos.title[language])}
              className="group flex items-center gap-2 font-heading text-xs font-medium uppercase tracking-[0.15em] text-obsidian hover:text-brand-green transition-colors mt-auto"
            >
              {t("career.moreInfo")}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}