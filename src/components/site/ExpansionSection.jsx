import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

export default function ExpansionSection() {
  const { t } = useLanguage();

  const locations = [
    { statusKey: "current", country: t("expansion.czechia"), date: null },
    { statusKey: "expansion", country: t("expansion.spain"), date: "7 / 2027" },
    { statusKey: "expansion", country: t("expansion.italy"), date: "8 / 2027" },
    { statusKey: "expansion", country: t("expansion.australia"), date: "10 / 2027" },
  ];

  return (
    <section id="expansion" className="snap-section relative min-h-0 flex flex-col justify-center py-8 lg:py-12">
      <div className="pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24">
          
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 pb-12">{t("expansion.label")}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian mb-6 py-12">{t("expansion.title")}</h2>
          <p className="font-heading text-sm md:text-base text-obsidian/50 max-w-xl font-light leading-relaxed">
            {t("expansion.desc")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line (desktop) */}
          <div className="hidden md:block absolute top-[9px] left-0 right-0 h-[2px] bg-obsidian/10" />
          {/* Vertical line (mobile) */}
          <div className="md:hidden absolute top-0 bottom-0 left-[9px] w-[2px] bg-obsidian/10" />

          <div className="grid md:grid-cols-4 gap-16 md:gap-12">
            {locations.map((location, i) =>
            <motion.div
              key={location.country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative">
              
                <div className="flex items-center mb-8">
                  <div
                  className={`w-[18px] h-[18px] rounded-full z-10 ${
                  location.statusKey === "current" ?
                  "bg-brand-green ring-4 ring-brand-green/15" :
                  "border-2 border-obsidian/25 bg-titanium"}`
                  } />
                
                </div>
                <p
                className={`font-heading text-[11px] uppercase tracking-[0.25em] mb-3 font-medium ${
                location.statusKey === "current" ? "text-brand-green" : "text-obsidian/40"}`
                }>
                
                  {location.statusKey === "current" ? t("expansion.statusCurrent") : t("expansion.statusExpansion")}
                </p>
                <h3 className="font-heading text-2xl md:text-3xl font-semibold tracking-[-0.01em] text-obsidian">
                  {location.country}
                </h3>
                {location.date &&
                <p className="font-heading text-sm text-obsidian/40 mt-2 font-light">
                  {location.date}
                </p>
                }
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>);
}