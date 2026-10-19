import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { mediaArticles } from "@/data/mediaArticles";
import { useLanguage } from "@/hooks/useLanguage";

export default function MediaCoverage() {
  const { t, language } = useLanguage();
  const locale = language === "cs" ? "cs-CZ" : "en-US";

  const articles = [...mediaArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (value) =>
    new Date(value).toLocaleDateString(locale, { day: "numeric", month: "numeric", year: "numeric" });

  return (
    <section
      id="media"
      className="snap-section relative min-h-0 flex flex-col justify-center py-6 lg:py-9 border-t border-obsidian/10 mt-20 lg:mt-28"
    >
      <div className="pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">
            {t("media.label")}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian max-w-2xl my-16">
            {t("media.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col overflow-hidden border border-obsidian/10 rounded-lg hover:border-brand-green/50 hover:-translate-y-1 transition-all duration-300"
            >
              {article.image && (
                <div className="relative h-36 md:h-44 overflow-hidden bg-obsidian/5">
                  <img
                    src={article.image}
                    alt={article.title}
                    width={800}
                    height={450}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              )}

              <div className="flex flex-col flex-1 p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5">
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-green">
                    {article.medium}
                  </span>
                  <span className="font-heading text-[10px] text-obsidian/30">
                    {formatDate(article.date)}
                  </span>
                </div>

                <h3 className="font-heading text-xl md:text-2xl font-semibold tracking-[-0.02em] leading-snug text-obsidian mb-3 group-hover:text-brand-green transition-colors duration-300">
                  {article.title}
                </h3>

                <p className="font-heading text-sm font-light leading-relaxed text-obsidian/50 line-clamp-2 mb-6">
                  {article.perex}
                </p>

                <span className="mt-auto font-heading text-xs font-medium uppercase tracking-[0.15em] text-obsidian/50 group-hover:text-brand-green transition-colors duration-300 flex items-center gap-2">
                  {t("media.readMore")}
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}