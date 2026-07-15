import React, { useRef, useState, useCallback } from "react";
import Navigation from "@/components/site/Navigation";
import DataFooter from "@/components/site/DataFooter";
import CareerHero from "@/components/career/CareerHero";
import WhyWorkAtRecPan from "@/components/career/WhyWorkAtRecPan";
import OpenPositions from "@/components/career/OpenPositions";
import ApplicationForm from "@/components/career/ApplicationForm";

export default function Career() {
  const positionsRef = useRef(null);
  const applyRef = useRef(null);
  const [selectedPosition, setSelectedPosition] = useState("");

  const scrollToPositions = useCallback(() => {
    positionsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleApply = useCallback((positionTitle) => {
    setSelectedPosition(positionTitle);
    applyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="bg-titanium min-h-screen">
      <Navigation />

      <CareerHero onScrollToPositions={scrollToPositions} />
      <WhyWorkAtRecPan />
      <div ref={positionsRef}>
        <OpenPositions onApply={handleApply} />
      </div>
      <div ref={applyRef}>
        <ApplicationForm selectedPosition={selectedPosition} />
      </div>

      <DataFooter />
    </div>
  );
}