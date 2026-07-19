import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function MaterialLedger() {
  const { t } = useLanguage();
  const scrollRef = useRef(null);

  const materials = [
    {
      name: t("materials.glassName"),
      code: "GL-001",
      purity: "99,2 %",
      recovery: "96 %",
      application: t("materials.glassApp"),
      image: "https://media.base44.com/images/public/6a42a05b8f8b3d58dce0168f/73bf61076_ChatGPT_Image_Jun_29__2026__07_53_55_PM.png",
      alt: t("materials.glassAlt"),
    },
    {
      name: t("materials.siliconName"),
      code: "SI-002",
      purity: "98,5–99,5 %",
      recovery: "94 %",
      application: t("materials.siliconApp"),
      image: "https://media.base44.com/images/public/6a42a05b8f8b3d58dce0168f/74bbdb719_ChatGPT_Image_Jun_29__2026__08_07_34_PM.png",
      alt: t("materials.siliconAlt"),
    },
    {
      name: t("materials.aluminumName"),
      code: "AL-003",
      purity: "98,5–99 %",
      recovery: "100 %",
      application: t("materials.aluminumApp"),
      image: "https://media.base44.com/images/public/6a42a05b8f8b3d58dce0168f/c9786e553_ChatGPT_Image_Jun_29__2026__08_01_14_PM.png",
      alt: t("materials.aluminumAlt"),
    },
    {
      name: t("materials.metalsName"),
      code: "CU-004",
      purity: "99 %+",
      recovery: "99 %",
      application: t("materials.metalsApp"),
      image: "https://media.base44.com/images/public/6a42a05b8f8b3d58dce0168f/1ed86a912_generated_image.png",
      alt: t("materials.metalsAlt"),
    },
  ];

  return (
    <section id="materials" className="snap-section relative min-h-0 flex flex-col justify-center py-6 lg:py-0 mt-20 lg:mt-28">
      {/* Header */}
      <div className="pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%] mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30">{t("materials.label")}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian py-24">{t("materials.title")}</h2>
        </motion.div>
      </div>

      {/* Horizontal scroll cards */}
      <div
        ref={scrollRef}
        className="horizontal-scroll flex gap-6 overflow-x-auto pl-10 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%]">
        
        {materials.map((mat, i) =>
        <motion.div
          key={mat.code}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[28vw] group">
          
            <div className="border border-obsidian/10 bg-titanium overflow-hidden rounded-lg hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              {/* Image */}
              <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden bg-obsidian/5">
                <img
                src={mat.image}
                alt={mat.alt}
                width={800}
                height={600}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              
                <div className="absolute top-4 left-4 font-heading text-[10px] uppercase tracking-[0.2em] text-obsidian/40">
                  {mat.code}
                </div>
              </div>

              {/* Specs */}
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold tracking-[-0.01em] text-obsidian mb-4">
                  {mat.name}
                </h3>
                <div className="space-y-2">
                  {[
                [t("materials.purity"), mat.purity],
                [t("materials.recovery"), mat.recovery],
                [t("materials.application"), mat.application]].
                map(([label, value]) =>
                <div key={label} className="flex justify-between items-baseline border-b border-obsidian/5 pb-2">
                      <span className="font-heading text-[10px] uppercase tracking-[0.15em] text-obsidian/30">
                        {label}
                      </span>
                      <span className="font-heading text-xs text-obsidian font-medium text-right">
                        {value}
                      </span>
                    </div>
                )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scroll hint */}
        <div className="flex-shrink-0 w-[20vw] md:w-[10vw] flex items-center justify-center">
          <ArrowRight size={20} className="text-obsidian/10" />
        </div>
      </div>
    </section>);
}