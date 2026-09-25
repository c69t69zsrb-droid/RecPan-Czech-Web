import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function PanelHandover({ onNavigate }) {
  const { t } = useLanguage();

  const steps = [
    { title: t("handover.step1Title"), description: t("handover.step1Desc") },
    { title: t("handover.step2Title"), description: t("handover.step2Desc") },
    { title: t("handover.step3Title"), description: t("handover.step3Desc") },
    { title: t("handover.step4Title"), description: t("handover.step4Desc") },
  ];

  return (
    <section id="handover" className="snap-section relative min-h-0 flex flex-col justify-center py-6 lg:py-9 border-t border-obsidian/10 mt-20 lg:mt-28">
      <div className="pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12">
          
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">{t("handover.label")}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian py-12">{t("handover.title")}</h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 md:gap-6 mb-12">
          {steps.map((step, i) =>
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="border-t border-obsidian/10 pt-6">
            
              <p className="font-heading text-xs text-brand-green mb-3 font-medium">0{i + 1}</p>
              <h3 className="font-heading text-lg font-semibold tracking-[-0.01em] text-obsidian mb-3">{step.title}</h3>
              <p className="font-heading text-sm leading-relaxed text-obsidian/50 font-light">{step.description}</p>
            </motion.div>
          )}
        </div>

        <button
          onClick={() => onNavigate && onNavigate("#contact", "takeback")}
          className="group inline-flex items-center gap-3 bg-brand-green text-white px-8 py-4 font-heading text-xs font-medium uppercase tracking-[0.15em] hover:bg-obsidian transition-colors rounded-lg">
          
          {t("handover.cta")}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>);

}