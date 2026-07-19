import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import FacilityMap from "@/components/site/FacilityMap";

export default function FacilitySection() {
  const { t } = useLanguage();

  return (
    <section className="snap-section relative min-h-0 flex flex-col justify-center py-6 lg:py-9 mt-20 lg:mt-28">
      <div className="pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16">

          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">{t("facility.label")}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian max-w-2xl">{t("facility.title")}</h2>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <div className="flex items-baseline justify-between mb-6">
            <h3 className="font-heading text-xl md:text-2xl font-semibold tracking-[-0.02em] text-obsidian">{t("facility.plantName")}</h3>
            <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-obsidian/30">
              {t("facility.country")}
            </span>
          </div>
          <div className="border border-obsidian/10 overflow-hidden rounded-lg h-[400px] md:h-[500px] bg-obsidian/5">
            <FacilityMap />
          </div>
        </motion.div>
      </div>
    </section>);
}