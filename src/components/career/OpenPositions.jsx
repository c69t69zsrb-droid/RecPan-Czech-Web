import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Banknote, CalendarDays, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { buildPath } from "@/lib/i18n/routes";
import { careerPositions } from "@/data/careerPositions";

export default function OpenPositions() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const openingsLabel = (count) => {
    if (language === "cs") {
      if (count === 1) return "1 otevřená pozice";
      if (count >= 2 && count <= 4) return `${count} otevřené pozice`;
      return `${count} otevřených pozic`;
    }
    return count === 1 ? "1 open position" : `${count} open positions`;
  };

  return (
    <section id="positions" className="px-6 md:px-[4.166%] py-16 md:py-24 border-t border-obsidian/10">
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
          <motion.a
            key={pos.id}
            href={buildPath("position", language, { id: pos.id })}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onClick={(e) => { e.preventDefault(); navigate(buildPath("position", language, { id: pos.id })); }}
            className="group border border-obsidian/10 rounded-xl p-8 md:p-10 hover:border-brand-green/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer bg-white/30"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="font-heading text-xl md:text-2xl font-semibold tracking-[-0.01em] text-obsidian group-hover:text-brand-green transition-colors duration-300">
                {pos.title[language]}
              </h3>
              {pos.positionsAvailable > 0 && (
                <span className="inline-flex items-center shrink-0 bg-brand-green/10 text-brand-green font-heading text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full whitespace-nowrap">
                  {openingsLabel(pos.positionsAvailable)}
                </span>
              )}
            </div>

            <p className="font-heading text-sm leading-relaxed text-obsidian/50 font-light mb-6">
              {pos.shortDescription[language]}
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-green shrink-0" />
                <span className="font-heading text-xs text-obsidian/60">{pos.location[language]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-brand-green shrink-0" />
                <span className="font-heading text-xs text-obsidian/60">{pos.type[language]}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={14} className="text-brand-green shrink-0" />
                <span className="font-heading text-xs text-obsidian/60">{pos.workHours[language]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Banknote size={14} className="text-brand-green shrink-0" />
                <span className="font-heading text-xs text-obsidian/60">{pos.salary[language]}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-obsidian/5 mt-auto">
              <span className="flex items-center gap-1.5 font-heading text-xs text-obsidian/40">
                <CalendarDays size={13} className="text-brand-green" />
                {t("career.cardStartDate")}: {pos.startDate?.[language] || t("career.cardImmediateStart")}
              </span>
              <span className="flex items-center gap-2 font-heading text-xs font-medium uppercase tracking-[0.15em] text-obsidian/40 group-hover:text-brand-green transition-colors duration-300">
                {t("career.detailButton")}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}