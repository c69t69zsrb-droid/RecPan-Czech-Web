import React, { useRef, useCallback } from "react";
import MeridianLines from "@/components/site/MeridianLines";
import ScrollProgress from "@/components/site/ScrollProgress";
import Navigation from "@/components/site/Navigation";
import HeroSection from "@/components/site/HeroSection";
import TrustedBy from "@/components/site/TrustedBy";
import MaterialLedger from "@/components/site/MaterialLedger";
import CircularityMatrix from "@/components/site/CircularityMatrix";
import AboutSection from "@/components/site/AboutSection";
import WhyRecPan from "@/components/site/WhyRecPan";
import ExpansionSection from "@/components/site/ExpansionSection";
import TrustSection from "@/components/site/TrustSection";
import LatestNews from "@/components/site/LatestNews";
import LogisticsNexus from "@/components/site/LogisticsNexus";
import DataFooter from "@/components/site/DataFooter";
import FacilitySection from "@/components/site/FacilitySection";
import SEO, { ORGANIZATION_DATA, WEBSITE_DATA, LOCAL_BUSINESS_DATA } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";

export default function Home() {
  const containerRef = useRef(null);
  const { t, language } = useLanguage();

  const scrollTo = useCallback((href) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el && containerRef.current) {
      const container = containerRef.current;
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      container.scrollTo({
        top: container.scrollTop + elRect.top - containerRect.top,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="snap-container relative bg-titanium">
      <SEO
        title={t("seo.home.title")}
        description={t("seo.home.desc")}
        path="/"
        locale={language === "cs" ? "cs_CZ" : "en_US"}
        structuredData={[ORGANIZATION_DATA, WEBSITE_DATA, LOCAL_BUSINESS_DATA]}
      />
      <MeridianLines />
      <ScrollProgress containerRef={containerRef} />
      <Navigation onNavigate={scrollTo} />

      <HeroSection onNavigate={scrollTo} />
      <AboutSection />
      <WhyRecPan />
      <TrustedBy />
      <CircularityMatrix />
      <MaterialLedger />
      <LatestNews />
      <TrustSection />
      <ExpansionSection />
      <FacilitySection />
      <LogisticsNexus />
      <DataFooter onNavigate={scrollTo} />
    </div>
  );
}