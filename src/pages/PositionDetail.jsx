import React, { useRef, useCallback, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Banknote,
  Calendar,
  Check,
  Briefcase,
} from "lucide-react";
import Navigation from "@/components/site/Navigation";
import DataFooter from "@/components/site/DataFooter";
import ApplicationForm from "@/components/career/ApplicationForm";
import { useLanguage } from "@/hooks/useLanguage";
import { getPositionById } from "@/data/careerPositions";

export default function PositionDetail() {
  const { positionId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const applyRef = useRef(null);
  const [selectedPosition, setSelectedPosition] = useState("");

  const position = getPositionById(positionId);

  useEffect(() => {
    if (position) {
      setSelectedPosition(position.title[language]);
    }
  }, [position, language]);

  const scrollToForm = useCallback(() => {
    applyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (!position) {
    return (
      <div className="bg-titanium min-h-screen">
        <Navigation />
        <div className="pt-40 pb-32 px-6 md:px-[4.166%] text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-obsidian mb-4">
            {t("career.notFound")}
          </h1>
          <p className="font-heading text-sm text-obsidian/50 font-light mb-8">
            {t("career.notFoundDesc")}
          </p>
          <Link
            to="/career"
            className="group flex items-center gap-2 mx-auto font-heading text-xs font-medium uppercase tracking-[0.15em] text-obsidian hover:text-brand-green transition-colors"
          >
            <ArrowLeft size={14} />
            {t("career.backToCareer")}
          </Link>
        </div>
        <DataFooter />
      </div>
    );
  }

  const sidebarItems = [
    { icon: Banknote, label: t("career.detailSalary"), value: position.salary[language], highlight: true },
    { icon: Clock, label: t("career.detailWorkHours"), value: position.workHours[language] },
    { icon: MapPin, label: t("career.detailLocation"), value: position.location[language] },
    { icon: Briefcase, label: t("career.detailType"), value: position.type[language] },
  ];

  return (
    <div className="bg-titanium min-h-screen">
      <Navigation />

      {/* Back link */}
      <div className="pt-[162px] px-6 md:px-[4.166%]">
        <Link
          to="/career"
          className="group flex items-center gap-2 font-heading text-xs font-medium uppercase tracking-[0.15em] text-obsidian/40 hover:text-brand-green transition-colors"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {t("career.backToCareer")}
        </Link>
      </div>

      {/* Header */}
      <section className="px-6 md:px-[4.166%] pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">
            {t("career.label")}
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-obsidian mb-6 max-w-3xl">
            {position.title[language]}
          </h1>
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-2 font-heading text-sm text-obsidian/50">
              <MapPin size={15} className="text-brand-green" />
              {position.location[language]}
            </span>
            <span className="flex items-center gap-2 font-heading text-sm text-obsidian/50">
              <Briefcase size={15} className="text-brand-green" />
              {position.type[language]}
            </span>
            <span className="flex items-center gap-2 font-heading text-lg font-semibold text-brand-green">
              <Banknote size={18} />
              {position.salary[language]}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Image */}
      <section className="px-6 md:px-[4.166%] pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative w-full h-[40vh] lg:h-[50vh] overflow-hidden rounded-lg"
        >
          <img
            src={position.image}
            alt={position.title[language]}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Main content + sidebar */}
      <section className="px-6 md:px-[4.166%] pb-20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
          {/* Left: content */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-4">
                {t("career.detailDescription")}
              </h2>
              <p className="font-heading text-base md:text-lg text-obsidian/60 font-light leading-relaxed">
                {position.description[language]}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-5">
                {t("career.detailResponsibilities")}
              </h2>
              <ul className="space-y-3">
                {position.responsibilities[language].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-heading text-xs text-brand-green font-medium mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-base text-obsidian/70 font-light leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-5">
                {t("career.detailRequirements")}
              </h2>
              <ul className="space-y-3">
                {position.requirements[language].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-brand-green shrink-0 mt-0.5" />
                    <span className="font-heading text-base text-obsidian/70 font-light leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-5">
                {t("career.detailWhatWeOffer")}
              </h2>
              <ul className="space-y-3">
                {position.whatWeOffer[language].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-brand-green shrink-0 mt-0.5" />
                    <span className="font-heading text-base text-obsidian/70 font-light leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right: sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-28 border border-obsidian/10 rounded-lg p-8 space-y-6"
            >
              {sidebarItems.map((item) => (
                <div key={item.label} className="pb-5 border-b border-obsidian/5 last:border-0 last:pb-0">
                  <p className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-[0.2em] text-obsidian/30 mb-1.5">
                    <item.icon size={13} className="text-brand-green" />
                    {item.label}
                  </p>
                  <p
                    className={`font-heading font-medium ${
                      item.highlight ? "text-lg text-brand-green" : "text-base text-obsidian"
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}

              {position.positionsAvailable > 0 && (
                <div className="pb-5 border-b border-obsidian/5">
                  <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-obsidian/30 mb-1.5">
                    {t("career.positionsCount")}
                  </p>
                  <p className="font-heading text-base font-medium text-obsidian">
                    {position.positionsAvailable}
                  </p>
                </div>
              )}

              <button
                onClick={scrollToForm}
                className="group flex items-center justify-center gap-2 w-full bg-brand-green text-white px-6 py-4 font-heading text-xs font-medium uppercase tracking-[0.15em] hover:bg-obsidian transition-colors rounded-lg"
              >
                {t("career.interested")}
                <Calendar size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section ref={applyRef} className="px-6 md:px-[4.166%] py-16 md:py-20 border-t border-obsidian/10">
        <div className="max-w-3xl mx-auto w-full">
          <ApplicationForm selectedPosition={selectedPosition} />
        </div>
      </section>

      <DataFooter />
    </div>
  );
}