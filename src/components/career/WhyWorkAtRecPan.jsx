import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

export default function WhyWorkAtRecPan() {
  const { t } = useLanguage();

  const features = [
    { title: t("career.why1Title"), description: t("career.why1Desc") },
    { title: t("career.why2Title"), description: t("career.why2Desc") },
    { title: t("career.why3Title"), description: t("career.why3Desc") },
    { title: t("career.why4Title"), description: t("career.why4Desc") },
  ];

  return (
    <section className="px-6 md:px-[4.166%] py-16 md:py-20 border-t border-obsidian/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 md:mb-16"
      >
        <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">
          {t("career.whyLabel")}
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian">
          {t("career.whyTitle")}
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="border border-obsidian/10 lg:p-10 rounded-lg hover:-translate-y-1 hover:shadow-md transition-all duration-300 px-4 py-6"
          >
            <p className="font-heading text-xs text-brand-green mb-6 font-medium">
              0{i + 1}
            </p>
            <h3 className="font-heading text-lg font-semibold tracking-[-0.01em] text-obsidian mb-3">
              {feature.title}
            </h3>
            <p className="font-heading text-sm leading-relaxed text-obsidian/50 font-light">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}