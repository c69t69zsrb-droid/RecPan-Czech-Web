import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const FACILITY_IMAGE = "https://media.base44.com/images/public/6a42a05b8f8b3d58dce0168f/c7f44eb4b_generated_image.png";

export default function CircularityMatrix() {
  const { t } = useLanguage();

  const stages = [
    { step: "01", title: t("process.stage1Title"), description: t("process.stage1Desc") },
    { step: "02", title: t("process.stage2Title"), description: t("process.stage2Desc") },
    { step: "03", title: t("process.stage3Title"), description: t("process.stage3Desc") },
    { step: "04", title: t("process.stage4Title"), description: t("process.stage4Desc") },
    { step: "05", title: t("process.stage5Title"), description: t("process.stage5Desc") },
  ];

  return (
    <section id="process" className="snap-section relative min-h-0">
      <div className="flex flex-col lg:flex-row min-h-0">
        {/* Left sticky image */}
        <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-auto lg:sticky lg:top-0 lg:self-start">
          <div className="h-full lg:h-screen overflow-hidden border border-obsidian/5">
            <img
              src={FACILITY_IMAGE}
              alt={t("process.alt")}
              className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent" />
            <div className="absolute bottom-8 left-6 md:left-8">
              <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">
                {t("process.label")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white">
                {t("process.title1")}
                <br />
                {t("process.title2")}
              </h2>
            </div>
          </div>
        </div>

        {/* Right scrolling stages */}
        <div className="w-full lg:w-1/2 px-6 md:px-12 lg:px-16 py-5 lg:py-9">
          <div className="max-w-lg mx-auto lg:mx-0">
            {/* Tracking line */}
            <div className="relative">
              <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-obsidian/5" />

              {stages.map((stage, i) =>
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pl-10 pb-16 last:pb-0">
                
                  {/* Dot */}
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-brand-green bg-titanium flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-brand-green" />
                  </div>

                  <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-brand-green mb-2">
                    {t("process.phase")} {stage.step}
                  </p>
                  <h3 className="font-heading text-xl md:text-2xl font-semibold tracking-[-0.01em] text-obsidian mb-3">
                    {stage.title}
                  </h3>
                  <p className="font-heading text-sm leading-relaxed text-obsidian/50 font-light">
                    {stage.description}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);
}