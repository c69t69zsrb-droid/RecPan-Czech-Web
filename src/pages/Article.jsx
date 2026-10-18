import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Maximize, Download } from "lucide-react";
import { downloadImage } from "@/lib/downloadImage";
import Navigation from "@/components/site/Navigation";
import DataFooter from "@/components/site/DataFooter";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import { newsArticles } from "@/data/newsArticles";
import { useLanguage } from "@/hooks/useLanguage";
import { buildPath, translateArticleSlug } from "@/lib/i18n/routes";
import SEO, { articleData, breadcrumbData } from "@/components/SEO";

const articleDates = {
  "recpan-opens-first-plant-pribram": "2026-10-15",
  "recpan-opens-pribram-recycling-plant": "2026-07-23",
  "recpan-expanding-team-pribram": "2026-07-18",
  "recpan-at-intersolar-europe": "2026-06-17",
  "new-recycling-facility-under-development": "2025-11-20",
};

const renderFormattedText = (text, language) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-obsidian">{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, route] = linkMatch;
      return (
        <Link key={i} to={buildPath(route, language)} className="text-brand-green font-medium hover:text-obsidian transition-colors underline underline-offset-2">
          {label}
        </Link>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

export default function Article() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const enSlug = translateArticleSlug(slug, "en");
  const article = newsArticles.find((a) => a.slug === enSlug);

  if (!article) {
    return (
      <div className="bg-titanium min-h-screen flex items-center justify-center">
        <SEO title={t("article.notFound")} path={buildPath("news", language)} language={language} noindex />
        <div className="text-center">
          <h1 className="font-heading text-3xl font-semibold text-obsidian mb-4">{t("article.notFound")}</h1>
          <Link
            to={buildPath("news", language)}
            className="font-heading text-xs uppercase tracking-[0.15em] text-brand-green hover:text-obsidian transition-colors">

            {t("article.back")}
          </Link>
        </div>
      </div>);
  }

  const tr = article.translations[language];
  const relatedArticles = newsArticles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const galleryImages = (article.gallery || []).filter(Boolean);

  return (
    <div className="bg-titanium min-h-screen">
      <SEO
        title={`${tr.title} | RecPan`}
        description={tr.excerpt}
        path={buildPath("article", language, { slug: article.slug })}
        image={article.image}
        type="article"
        language={language}
        locale={language === "cs" ? "cs_CZ" : "en_US"}
        structuredData={[
          articleData({
            title: tr.title,
            description: tr.excerpt,
            image: article.image,
            path: buildPath("article", language, { slug: article.slug }),
            datePublished: articleDates[article.slug],
            dateModified: articleDates[article.slug],
            articleSection: tr.category,
          }),
          breadcrumbData([
            { name: language === "cs" ? "Domů" : "Home", path: buildPath("home", language) },
            { name: language === "cs" ? "Aktuality" : "News", path: buildPath("news", language) },
            { name: tr.title, path: buildPath("article", language, { slug: article.slug }) },
          ]),
        ]}
      />
      <Navigation />

      {/* Back button */}
      <div className="pt-[162px] pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%]">
        <Link
          to={buildPath("news", language)}
          className="font-heading text-xs uppercase tracking-[0.15em] text-obsidian/40 hover:text-brand-green transition-colors flex items-center gap-2">

          <ArrowLeft size={14} />
          {t("article.back")}
        </Link>
      </div>

      {/* Hero Image */}
      <div className="pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%] mt-8 mb-12">
        <div className="relative h-[44vh] md:h-[60vh] overflow-hidden rounded-lg bg-obsidian/5">
          {article.image ?
          <img
            src={article.image}
            alt={tr.title}
            width={1200}
            height={675}
            loading="lazy"
            style={article.imagePosition ? { objectPosition: article.imagePosition } : undefined}
            className="w-full h-full object-cover" /> :

          <div className="w-full h-full bg-obsidian/5" />
          }
        </div>
      </div>

      {/* Article Content */}
      <main className="pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%] pb-24">
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
            {tr.content.map((paragraph, i) => {
              if (paragraph && typeof paragraph === "object" && paragraph.cta) {
                return (
                  <div key={i} className="my-8">
                    <Link
                      to={paragraph.cta.hash ? `${buildPath(paragraph.cta.route, language)}#${paragraph.cta.hash}` : buildPath(paragraph.cta.route, language)}
                      className="inline-flex items-center gap-2 bg-brand-green text-white px-8 py-4 font-heading text-xs font-medium uppercase tracking-[0.15em] hover:bg-obsidian transition-colors rounded-lg">
                      {paragraph.cta.text}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                );
              }
              if (paragraph && typeof paragraph === "object" && paragraph.heading) {
                return (
                  <h2 key={i} className="font-heading text-xl md:text-2xl font-semibold tracking-[-0.02em] text-obsidian pt-6">
                    {paragraph.heading}
                  </h2>);

              }
              if (paragraph && typeof paragraph === "object" && paragraph.quote) {
                return (
                  <blockquote key={i} className="my-4 border-l-2 border-brand-green pl-6 md:pl-8">
                    <p className="font-heading text-lg md:text-2xl text-obsidian font-light leading-relaxed">
                      {paragraph.quote}
                    </p>
                    {paragraph.author &&
                    <p className="font-heading text-[11px] uppercase tracking-[0.2em] text-obsidian/40 mt-4">
                        {paragraph.author}
                      </p>
                    }
                  </blockquote>);

              }
              return (
            <React.Fragment key={i}>
                <p className="font-heading text-base md:text-lg text-obsidian/70 leading-relaxed font-light">
                  {renderFormattedText(paragraph, language)}
                </p>
                {article.contentImage && i === 3 &&
              <figure className="my-8 md:my-10">
                    <div className="relative h-[40vh] md:h-[55vh] overflow-hidden rounded-lg">
                      <img src={article.contentImage} alt={tr.title} width={1200} height={675} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  </figure>
              }
              </React.Fragment>
              );
            })}
          </div>

          {/* Key figures */}
          {article.keyFigures &&
          <div className="mt-16">
            <h2 className="font-heading text-xl md:text-2xl font-semibold tracking-[-0.02em] text-obsidian mb-6">
              {t("article.keyFigures")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {article.keyFigures.map((fig) =>
              <div key={fig.label} className="border border-obsidian/10 rounded-lg p-6">
                  <p className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-brand-green mb-2">{fig.value}</p>
                  <p className="font-heading text-xs uppercase tracking-[0.15em] text-obsidian/40">{fig.label}</p>
                </div>
              )}
            </div>
          </div>
          }

          {/* Gallery */}
          {galleryImages.length > 0 &&
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mt-12">
            {galleryImages.map((src, i) =>
            <div key={src} className="group relative h-[28vh] md:h-[38vh] overflow-hidden rounded-lg bg-obsidian/5">
                <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`${tr.title} — ${i + 1}`}
                className="absolute inset-0 w-full h-full cursor-pointer">
                  <img src={src} alt={`${tr.title} — ${i + 1}`} width={1200} height={675} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                  <span className="absolute inset-0 flex items-center justify-center bg-obsidian/0 group-hover:bg-obsidian/20 transition-colors duration-300">
                    <Maximize size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                </button>
                <button
                type="button"
                onClick={() => downloadImage(src, `${article.slug}-${i + 1}.jpg`)}
                aria-label={t("article.download")}
                title={t("article.download")}
                className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-obsidian/70 px-3 py-2 font-heading text-[10px] font-medium uppercase tracking-[0.15em] text-white transition-opacity duration-300 hover:bg-brand-green md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100">
                  <Download size={13} />
                  {t("article.download")}
                </button>
              </div>
            )}
          </div>
          }

          {/* Link to media coverage */}
          {article.mediaLink &&
          <div className="mt-12">
            <Link
              to={`${buildPath("home", language)}#media`}
              className="font-heading text-xs font-medium uppercase tracking-[0.15em] text-brand-green hover:text-obsidian transition-colors inline-flex items-center gap-2">

              {t("article.mediaLink")}
              <ArrowRight size={14} />
            </Link>
          </div>
          }

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
      </main>

      {/* Related Articles */}
      <section className="pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%] py-16 border-t border-obsidian/10">
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
              onClick={() => navigate(buildPath("article", language, { slug: rel.slug }))}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") navigate(buildPath("article", language, { slug: rel.slug })); }}
              className="group cursor-pointer">
            
              <div className="relative h-48 overflow-hidden rounded-lg mb-4 bg-obsidian/5">
                {rel.image &&
                <img src={rel.image} alt={relTr.title} width={400} height={225} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                }
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

      <GalleryLightbox
        images={galleryImages}
        index={lightboxIndex}
        alt={tr.title}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
        downloadLabel={t("article.download")}
        downloadName={article.slug} />

      <DataFooter />
    </div>);
}