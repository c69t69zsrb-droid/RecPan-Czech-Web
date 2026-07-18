import React, { useRef, useCallback } from "react";
import Navigation from "@/components/site/Navigation";
import DataFooter from "@/components/site/DataFooter";
import CareerHero from "@/components/career/CareerHero";
import WhyWorkAtRecPan from "@/components/career/WhyWorkAtRecPan";
import OpenPositions from "@/components/career/OpenPositions";
import HiringProcess from "@/components/career/HiringProcess";
import SEO, { breadcrumbData } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { buildPath } from "@/lib/i18n/routes";

export default function Career() {
  const positionsRef = useRef(null);
  const aboutRef = useRef(null);
  const { t, language } = useLanguage();

  const scrollToPositions = useCallback(() => {
    positionsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToAbout = useCallback(() => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="bg-titanium min-h-screen">
      <SEO
        title={t("seo.career.title")}
        description={t("seo.career.desc")}
        path={buildPath("career", language)}
        language={language}
        locale={language === "cs" ? "cs_CZ" : "en_US"}
        structuredData={breadcrumbData([
          { name: language === "cs" ? "Domů" : "Home", path: buildPath("home", language) },
          { name: t("career.label"), path: buildPath("career", language) },
        ])}
      />
      <Navigation />

      <CareerHero onScrollToPositions={scrollToPositions} onScrollToAbout={scrollToAbout} />
      <div ref={positionsRef}>
        <OpenPositions />
      </div>
      <div ref={aboutRef}>
        <WhyWorkAtRecPan />
      </div>
      <HiringProcess />

      <DataFooter />
    </div>
  );
}