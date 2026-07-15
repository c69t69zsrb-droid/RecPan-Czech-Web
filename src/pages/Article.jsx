import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navigation from "@/components/site/Navigation";
import DataFooter from "@/components/site/DataFooter";
import { newsArticles } from "@/data/newsArticles";
import { getPreviousPath } from "@/lib/navigationHistory";
import { useLanguage } from "@/hooks/useLanguage";

const renderFormattedText = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-obsidian">{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

export default function Article() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const article = newsArticles.find((a) => a.slug === slug);

  const handleBackToNews = () => {
    if (getPreviousPath() === "/news") {
      navigate(-1);
    } else {
      navigate("/news");
    }
  };

  if (!article) {
    return (
      <div className="bg-titanium min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-semibold text-obsidian mb-4">{t("article.notFound")}</h1>
          <button
            onClick={handleBackToNews}
            className="font-heading text-xs uppercase tracking-[0.15em] text-brand-green hover:text-obsidian transition-colors">
            
            {t("article.back")}
          </button>
        </div>
      </div>);
  }

  const tr = article.translations[language];
  const relatedArticles = newsArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="bg-titanium min-h-screen">
      <Navigation />

      {/* Back button */}
      <div className="pt-28 px-6 md:px-[4.166%]">
        <button
          onClick={handleBackToNews}
          className="font-heading text-xs uppercase tracking-[0.15em] text-obsidian/40 hover:text-brand-green transition-colors flex items-center gap-2">
          
          <ArrowLeft size={14} />
          {t("article.back")}
        </button>
      </div>

      {/* Hero Image */}
      <div className="px-6 md:px-[4.166%] mt-8 mb-12">
        <div className="relative h-[44vh] md:h-[60vh] overflow-hidden rounded-lg">
          <img src={article.image} alt={tr.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Article Content */}
      <article className="px-6 md:px-[4.166%] pb-24">
        <div className="max-w-[52rem] mx-auto">
          {/* Meta */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-brand-green font-medium">
                {tr.category}
              </span>
              <span className="font-heading text-[10px] text-obsidian/30">
                {tr.date}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-heading text-[10px] uppercase tracking-[0.15em] text-obsidian/40">
                {t("article.readTime")}
              </span>
              {tr.quote && (
                <>
                  <span className="font-heading text-[10px] text-obsidian/20">·</span>
                  <span className="font-heading text-[10px] uppercase tracking-[0.15em] text-obsidian/40">
                    {tr.quote}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian mb-6">
            {tr.title}
          </h1>

          {/* Subtitle */}
          {tr.subtitle &&
          <p className="font-heading text-xl md:text-2xl text-obsidian/70 leading-relaxed font-light mb-12">
              {tr.subtitle}
            </p>
          }

          {/* Body */}
          <div className="space-y-7">
            {tr.content.map((paragraph, i) =>
            <React.Fragment key={i}>
                <p className="font-heading text-base md:text-lg text-obsidian/70 leading-relaxed font-light">
                  {renderFormattedText(paragraph)}
                </p>
                {article.contentImage && i === 3 &&
              <figure className="my-8 md:my-10">
                    <div className="relative h-[40vh] md:h-[55vh] overflow-hidden rounded-lg">
                      <img src={article.contentImage} alt={tr.title} className="w-full h-full object-cover" />
                    </div>
                  </figure>
              }
              </React.Fragment>
            )}
          </div>

          {/* Signature */}
          {tr.quote &&
          <div className="mt-14">
            <div className="h-px bg-obsidian/10 mb-6"></div>
            <p className="font-heading text-sm font-medium tracking-[0.1em] text-obsidian/60">
              {tr.quote}
            </p>
          </div>
          }
        </div>
      </article>

      {/* Related Articles */}
      <section className="px-6 md:px-[4.166%] py-16 border-t border-obsidian/10">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-obsidian mb-10">
          {t("article.related")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {relatedArticles.map((rel, i) => {
            const relTr = rel.translations[language];
            return (
            <motion.article
              key={rel.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => navigate(`/news/${rel.slug}`)}
              className="group cursor-pointer">
            
              <div className="relative h-48 overflow-hidden rounded-lg mb-4 bg-obsidian/5">
                <img src={rel.image} alt={relTr.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-brand-green font-medium">
                  {relTr.category}
                </span>
                <span className="font-heading text-[10px] text-obsidian/30">{relTr.date}</span>
              </div>
              <h3 className="font-heading text-base md:text-lg font-semibold tracking-[-0.01em] text-obsidian group-hover:text-brand-green transition-colors duration-300">
                {relTr.title}
              </h3>
            </motion.article>
            );
          })}
        </div>
      </section>

      <DataFooter />
    </div>);
}