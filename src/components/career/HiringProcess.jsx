import React from "react";
import { motion } from "framer-motion";
import { FileText, Phone, MapPin, UserPlus } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const icons = [FileText, Phone, MapPin, UserPlus];

export default function HiringProcess() {
  const { t } = useLanguage();

  const steps = [
    { title: t("career.hiring1Title"), description: t("career.hiring1Desc") },
    { title: t("career.hiring2Title"), description: t("career.hiring2Desc") },
    { title: t("career.hiring3Title"), description: t("career.hiring3Desc") },
    { title: t("career.hiring4Title"), description: t("career.hiring4Desc") },
  ];

  return (
    <section className="pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%] py-16 md:py-24 border-t border-obsidian/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 md:mb-16"
      >
        <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">
          {t("career.hiringLabel")}
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian">
          {t("career.hiringTitle")}
        </h2>
      </motion.div>

      <div className="relative">
        {/* Connecting line for desktop */}
        <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-obsidian/10" />

        <div className="grid md:grid-cols-4 gap-10 md:gap-6">
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                  <div className="relative w-16 h-16 rounded-full bg-titanium border border-obsidian/10 flex items-center justify-center mb-0 md:mb-5 z-10 shrink-0">
                    <Icon size={22} className="text-brand-green" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-green text-white flex items-center justify-center font-heading text-[10px] font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-base md:text-lg font-semibold tracking-[-0.01em] text-obsidian mb-2">
                      {step.title}
                    </h3>
                    <p className="font-heading text-sm leading-relaxed text-obsidian/50 font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}