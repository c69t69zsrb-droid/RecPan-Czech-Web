import { useState, useEffect, useRef } from "react";
import { animate } from "framer-motion";

// ── Live counter configuration ──────────────────────────────
// Counter starts at exactly 0.0 t at START_DATE (Czech local time).
// Increases continuously at 1 tonne per hour during operating hours.
// Operating hours: Mon–Fri, 07:00–21:00 (Europe/Prague).
// Outside operating hours (nights & weekends): value stays fixed.
const START_DATE = "2026-06-29 20:30";

function parsePragueDate(str) {
  const [datePart, timePart] = str.split(" ");
  const [y, mo, d] = datePart.split("-").map(Number);
  const [h, mi] = timePart.split(":").map(Number);
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Prague", hour: "2-digit", day: "2-digit", hour12: false,
  });
  const toParts = (date) => {
    const p = {};
    fmt.formatToParts(date).forEach((x) => { if (x.type !== "literal") p[x.type] = x.value; });
    return p;
  };
  // Try CET (UTC+1)
  const cet = new Date(Date.UTC(y, mo - 1, d, h - 1, mi));
  const cp = toParts(cet);
  if (parseInt(cp.hour, 10) % 24 === h && parseInt(cp.day, 10) === d) return cet;
  // Otherwise CEST (UTC+2)
  return new Date(Date.UTC(y, mo - 1, d, h - 2, mi));
}

function getPragueParts(date) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Prague", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
  });
  const p = {};
  fmt.formatToParts(date).forEach((x) => { if (x.type !== "literal") p[x.type] = x.value; });
  return {
    weekday: p.weekday,
    hour: parseInt(p.hour, 10) % 24,
    minute: parseInt(p.minute, 10),
  };
}

function calculateTonnes() {
  const start = parsePragueDate(START_DATE).getTime();
  const now = Date.now();
  if (start > now) return 0;
  const HOUR = 3600000;
  let operatingMs = 0;
  let cursor = start;
  while (cursor < now) {
    const parts = getPragueParts(new Date(cursor));
    const isOperating = parts.weekday !== "Sat" && parts.weekday !== "Sun" && parts.hour >= 7 && parts.hour < 21;
    const msToNextHour = (60 - parts.minute) * 60000;
    if (isOperating) {
      const segmentEnd = Math.min(cursor + msToNextHour, now);
      operatingMs += segmentEnd - cursor;
      cursor = segmentEnd;
    } else {
      cursor += msToNextHour;
    }
  }
  return operatingMs / HOUR;
}

export function useTonnesCounter() {
  const [displayValue, setDisplayValue] = useState(0);
  const displayRef = useRef(0);

  useEffect(() => {
    let controls;
    let interval;
    const startContinuous = () => {
      interval = setInterval(() => {
        const val = calculateTonnes();
        displayRef.current = val;
        setDisplayValue(val);
      }, 200);
    };
    const target = calculateTonnes();
    controls = animate(0, target, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => {
        displayRef.current = v;
        setDisplayValue(v);
      },
      onComplete: startContinuous,
    });
    return () => {
      if (controls) controls.stop();
      if (interval) clearInterval(interval);
    };
  }, []);

  return displayValue;
}