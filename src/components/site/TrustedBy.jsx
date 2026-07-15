import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

export default function TrustedBy() {
  const { t } = useLanguage();

  const partners = [
    "PV CYCLE",
    "WEEELABEX",
    "CTU",
    t("trusted.partner4"),
    t("trusted.partner5"),
  ];

  return (
    <section className="relative py-6 lg:py-8 border-t border-obsidian/5">
      <div className="px-6 md:px-[4.166%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12">
          
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">
            {t("trusted.label")}
          </p>
          <p className="font-heading text-sm text-obsidian/40 max-w-2xl mx-auto font-light leading-relaxed">
            {t("trusted.desc")}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
          
          {partners.map((partner) =>
          <div
            key={partner}
            className="font-heading text-base md:text-lg font-semibold tracking-[-0.01em] text-obsidian/20 hover:text-obsidian/50 transition-colors duration-300 cursor-default hidden">
            
              {partner}
            </div>
          )}
        </motion.div>
      </div>
    </section>);
}