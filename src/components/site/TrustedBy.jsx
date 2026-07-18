import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

export default function TrustedBy() {
  const { t } = useLanguage();

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
        {/* Partner logos pending — no hidden content for SEO */}
      </div>
    </section>);
}