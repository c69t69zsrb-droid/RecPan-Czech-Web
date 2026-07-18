import React, { useRef, useCallback } from "react";
import Navigation from "@/components/site/Navigation";
import DataFooter from "@/components/site/DataFooter";
import CareerHero from "@/components/career/CareerHero";
import WhyWorkAtRecPan from "@/components/career/WhyWorkAtRecPan";
import OpenPositions from "@/components/career/OpenPositions";

export default function Career() {
  const positionsRef = useRef(null);

  const scrollToPositions = useCallback(() => {
    positionsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="bg-titanium min-h-screen">
      <Navigation />

      <CareerHero onScrollToPositions={scrollToPositions} />
      <WhyWorkAtRecPan />
      <div ref={positionsRef}>
        <OpenPositions />
      </div>

      <DataFooter />
    </div>
  );
}