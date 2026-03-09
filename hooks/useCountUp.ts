"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Parses a stat value like "8,000+" or "12+" into { numeric, suffix }.
 * Returns null if the value is not a simple count-up format (e.g. "4.9/5").
 */
function parseStatValue(value: string): { numeric: number; suffix: string } | null {
  const cleaned = value.replace(/,/g, "").trim();
  const match = cleaned.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const num = parseFloat(match[1]);
  if (Number.isNaN(num)) return null;
  return { numeric: num, suffix: match[2] || "" };
}

/**
 * Lightweight count-up animation using requestAnimationFrame.
 * Disabled when prefers-reduced-motion is set.
 * Starts when inView becomes true (only once).
 */
export function useCountUp(value: string, inView: boolean = true): string {
  const [display, setDisplay] = useState(value);
  const reduced = useReducedMotion();
  const hasAnimated = useRef(false);
  const parsed = parseStatValue(value);

  useEffect(() => {
    if (!inView) {
      hasAnimated.current = false;
      setDisplay(value);
      return;
    }
    if (reduced || !parsed || hasAnimated.current) return;

    hasAnimated.current = true;
    const target = parsed.numeric;
    const suffix = parsed.suffix;
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      const current = Math.round(target * eased);
      const formatted = target >= 1000 ? current.toLocaleString() : String(current);
      setDisplay(formatted + suffix);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    requestAnimationFrame(tick);
  }, [inView, value, reduced]);

  return reduced || !parsed ? value : display;
}
