import React from "react";

export default function MeridianLines() {
  const positions = [
    "left-[4.166%]",
    "left-[25%]",
    "left-[50%]",
    "left-[75%]",
    "left-[95.833%]"
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {positions.map((pos, i) => (
        <div
          key={i}
          className={`absolute top-0 bottom-0 w-px bg-obsidian/[0.06] ${pos}`}
        />
      ))}
    </div>
  );
}