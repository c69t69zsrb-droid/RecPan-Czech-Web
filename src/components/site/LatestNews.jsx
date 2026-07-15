import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { newsArticles } from "@/data/newsArticles";
import { useLanguage } from "@/hooks/useLanguage";

const getPreview = (tr) => {
  const source = tr.excerpt || (tr.content && tr.content[0]) || "";
  const sentences = source.match(/[^.!?]+[.!?]*/g) || [source];
  let preview = sentences.slice(0, 2).join(" ").trim();
  const max = 140;
  if (preview.length > max) {
    const truncated = preview.slice(0, max);
    const lastSpace = truncated.lastIndexOf(" ");
    preview = (lastSpace > 60 ? truncated.slice(0, lastSpace) : truncated).trim() + "…";
  }
  return preview;
};

export default function LatestNews() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const articles = newsArticles.slice(0, 3);

  return (
    <section id="news" className="snap-section relative min-h-0 flex flex-col justify-center py-6 lg:py-9 border-t border-obsidian/10 mt-20 lg:mt-28">
      <div className="px-6 md:px-[4.166%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          
          <div>
            <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30">{t("news.latestLabel")}</p>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian py-20">{t("news.latestTitle")}</h2>
          </div>
          <button
            onClick={() => navigate("/news")}
            className="font-heading text-xs font-medium uppercase tracking-[0.15em] text-obsidian/50 hover:text-brand-green transition-colors flex items-center gap-2 group">
            
            {t("news.viewAll")}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pt-2 pr-3 pb-2 pl-2">
          {articles.map((article, i) => {
            const tr = article.translations[language];
            return (
            <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onClick={() => navigate(`/news/${article.slug}`)}
            className="group cursor-pointer border-t border-obsidian/10 hover:-translate-y-1 transition-all duration-300">
            
              <div className="flex items-center gap-3 mb-4">
                <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-brand-green font-medium">
                  {tr.category}
                </span>
                <span className="font-heading text-[10px] text-obsidian/30">
                  {tr.date}
                </span>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4 bg-obsidian/5">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={tr.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    style={article.imagePosition ? { objectPosition: article.imagePosition } : undefined}
                  />
                ) : (
                  <div className="w-full h-full bg-obsidian flex items-center justify-center">
                    <span className="font-heading text-[10px] uppercase tracking-[0.3em] text-titanium/40">RecPan</span>
                  </div>
                )}
              </div>

              <h3 className="font-heading text-lg md:text-xl font-semibold tracking-[-0.01em] text-obsidian mb-2 group-hover:text-brand-green transition-colors duration-300 line-clamp-2">
                {tr.title}
              </h3>
              <p className="font-heading text-sm text-obsidian/50 font-light leading-relaxed mb-4 line-clamp-2">
                {getPreview(tr)}
              </p>
              <span className="font-heading text-xs font-medium uppercase tracking-[0.15em] text-obsidian/50 group-hover:text-brand-green transition-colors duration-300 flex items-center gap-2">
                {t("news.readMore")}
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>);
}