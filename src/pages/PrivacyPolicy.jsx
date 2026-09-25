import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/site/Navigation";
import DataFooter from "@/components/site/DataFooter";
import { useLanguage } from "@/hooks/useLanguage";
import { buildPath } from "@/lib/i18n/routes";
import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  const { t, language } = useLanguage();
  const paragraphs = t("privacy.content");

  return (
    <div className="bg-titanium min-h-screen">
      <SEO
        title={t("seo.privacy.title")}
        description={t("seo.privacy.desc")}
        path={buildPath("privacy", language)}
        language={language}
        locale={language === "cs" ? "cs_CZ" : "en_US"}
      />
      <Navigation />

      <main className="pt-40 md:pt-48 pb-24 pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%]">
        <div className="max-w-[52rem] mx-auto">
          <Link
            to={buildPath("home", language)}
            className="font-heading text-xs uppercase tracking-[0.15em] text-obsidian/40 hover:text-brand-green transition-colors flex items-center gap-2 mb-10">
            
            <ArrowLeft size={14} />
            {t("privacy.back")}
          </Link>

          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">{t("privacy.label")}</p>
          <h1 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian mb-12">{t("privacy.title")}</h1>

          <div className="space-y-6">
            {paragraphs.map((paragraph, i) =>
            <p key={i} className="font-heading text-base text-obsidian/70 leading-relaxed font-light">
                {paragraph}
              </p>
            )}
          </div>
        </div>
      </main>

      <DataFooter />
    </div>);

}