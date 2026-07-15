import React, { useState, useEffect } from "react";

export default function ScrollProgress({ containerRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const pct = scrollTop / (scrollHeight - clientHeight);
      setProgress(Math.min(pct * 100, 100));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  return (
    <div
      className="fixed left-[4.166%] top-0 w-[2px] bg-vitriol z-50 transition-all duration-300 ease-out"
      style={{ height: `${progress}%` }}
    />
  );
}