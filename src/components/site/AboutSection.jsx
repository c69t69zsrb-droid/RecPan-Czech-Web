import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

export default function AboutSection() {
  const { t } = useLanguage();

  const credentials = [
    { label: t("about.credCapacity"), value: "7 000 t" },
    { label: t("about.credRecovery"), value: "> 97 %" },
    { label: t("about.credHq"), value: t("about.credHqValue") },
    { label: t("about.credExpansion"), value: t("about.credExpansionValue") },
  ];

  const pillars = [
    { title: t("about.pillar1Title"), description: t("about.pillar1Desc") },
    { title: t("about.pillar2Title"), description: t("about.pillar2Desc") },
    { title: t("about.pillar3Title"), description: t("about.pillar3Desc") },
  ];

  return (
    <section id="about" className="snap-section relative min-h-0 flex flex-col justify-center py-6 lg:py-9">
      <div className="px-6 md:px-[4.166%]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16">
          
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">
            {t("about.label")}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian max-w-2xl">{t("about.title")}</h2>
        </motion.div>

        {/* Credentials bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-y border-obsidian/10">
          
          {credentials.map((item) =>
          <div key={item.label}>
              <p className="font-heading text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-brand-green mb-1">
                {item.value}
              </p>
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-obsidian/40">
                {item.label}
              </p>
            </div>
          )}
        </motion.div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-16 mb-20">
          {pillars.map((pillar, i) =>
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}>
            
              <p className="font-heading text-xs text-brand-green mb-3 font-medium">
                0{i + 1}
              </p>
              <h3 className="font-heading text-lg md:text-xl font-semibold tracking-[-0.01em] text-obsidian mb-3">
                {pillar.title}
              </h3>
              <p className="font-heading text-sm leading-relaxed text-obsidian/50 font-light">
                {pillar.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);
}