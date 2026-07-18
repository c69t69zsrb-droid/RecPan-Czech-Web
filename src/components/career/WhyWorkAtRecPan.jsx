import React from "react";
import { motion } from "framer-motion";
import { Cpu, TrendingUp, Users, Leaf, Monitor, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const icons = [Cpu, TrendingUp, Users, Leaf, Monitor, ShieldCheck];

export default function WhyWorkAtRecPan() {
  const { t } = useLanguage();

  const features = [
    { title: t("career.why1Title"), description: t("career.why1Desc") },
    { title: t("career.why2Title"), description: t("career.why2Desc") },
    { title: t("career.why3Title"), description: t("career.why3Desc") },
    { title: t("career.why4Title"), description: t("career.why4Desc") },
    { title: t("career.why5Title"), description: t("career.why5Desc") },
    { title: t("career.why6Title"), description: t("career.why6Desc") },
  ];

  return (
    <section className="px-6 md:px-[4.166%] py-16 md:py-24 border-t border-obsidian/10">
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {features.map((feature, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group border border-obsidian/10 rounded-xl p-6 md:p-8 hover:border-brand-green/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white/30"
            >
              <div className="w-11 h-11 rounded-lg bg-brand-green/10 flex items-center justify-center mb-5 group-hover:bg-brand-green/20 transition-colors">
                <Icon size={20} className="text-brand-green" />
              </div>
              <h3 className="font-heading text-base font-semibold tracking-[-0.01em] text-obsidian mb-2 leading-tight">
                {feature.title}
              </h3>
              <p className="font-heading text-sm leading-relaxed text-obsidian/50 font-light">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}