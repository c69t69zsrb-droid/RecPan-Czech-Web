import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/site/Navigation";
import DataFooter from "@/components/site/DataFooter";
import { newsArticles, newsCategories } from "@/data/newsArticles";
import { useLanguage } from "@/hooks/useLanguage";

export default function News() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles =
    activeCategory === "all"
      ? newsArticles
      : newsArticles.filter((a) => a.categoryKey === activeCategory);

  return (
    <div className="bg-titanium min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 md:px-[4.166%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">
            {t("news.pageLabel")}
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-obsidian mb-6">
            {t("news.pageTitle")}
          </h1>
          <p className="font-heading text-base text-obsidian/50 max-w-2xl font-light leading-relaxed">
            {t("news.pageDesc")}
          </p>
        </motion.div>
      </section>

      {/* Category Filters */}
      <div className="px-6 md:px-[4.166%] py-8 border-t border-obsidian/10">
        <div className="flex flex-wrap gap-3">
          {newsCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`font-heading text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-full transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-brand-green text-white"
                  : "bg-obsidian/5 text-obsidian/50 hover:text-obsidian hover:bg-obsidian/10"
              }`}
            >
              {cat[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      <section className="px-6 md:px-[4.166%] pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredArticles.map((article, i) => {
            const tr = article.translations[language];
            return (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => navigate(`/news/${article.slug}`)}
              className="group cursor-pointer"
            >
              <div className="relative h-56 lg:h-64 overflow-hidden rounded-lg mb-5 bg-obsidian/5">
                <img
                  src={article.image}
                  alt={tr.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-brand-green font-medium">
                  {tr.category}
                </span>
                <span className="font-heading text-[10px] text-obsidian/30">
                  {tr.date}
                </span>
              </div>
              <h3 className="font-heading text-lg md:text-xl font-semibold tracking-[-0.01em] text-obsidian mb-2 group-hover:text-brand-green transition-colors duration-300">
                {tr.title}
              </h3>
              <p className="font-heading text-sm text-obsidian/50 font-light leading-relaxed mb-4">
                {tr.excerpt}
              </p>
              <span className="font-heading text-xs font-medium uppercase tracking-[0.15em] text-obsidian/50 group-hover:text-brand-green transition-colors duration-300 flex items-center gap-2">
                {t("news.readMore")}
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.article>
            );
          })}
        </div>
      </section>

      <DataFooter />
    </div>
  );
}