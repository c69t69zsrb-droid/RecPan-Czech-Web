import React from "react";
import { motion } from "framer-motion";
import { Factory, Cpu, Recycle, Globe, Handshake } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function TrustSection() {
  const { t } = useLanguage();

  const items = [
  { title: t("trust.item1Title"), description: t("trust.item1Desc"), icon: Factory },
  { title: t("trust.item2Title"), description: t("trust.item2Desc"), icon: Cpu },
  { title: t("trust.item3Title"), description: t("trust.item3Desc"), icon: Recycle },
  { title: t("trust.item4Title"), description: t("trust.item4Desc"), icon: Globe },
  { title: t("trust.item5Title"), description: t("trust.item5Desc"), icon: Handshake }];


  return (
    <section id="trust" className="snap-section relative min-h-0 flex flex-col justify-center lg:py-9 border-t border-obsidian/10 py-5 my-1">
      <div className="pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20">
          
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-4">{t("trust.label")}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian py-10">{t("trust.title")}</h2>
        </motion.div>

        {/* Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="hover:-translate-y-1 transition-all duration-300">
                
                <Icon size={28} strokeWidth={1.25} className="text-obsidian/60 mb-5" />
                <h3 className="font-heading text-sm font-semibold text-obsidian mb-2">
                  {item.title}
                </h3>
                <p className="font-heading text-xs text-obsidian/40 font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>);

          })}
        </div>
      </div>
    </section>);
}