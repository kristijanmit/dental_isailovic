"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Lightweight scroll-linked opacity using Intersection Observer.
 * Content in viewport center is fully visible; content above/below fades out.
 * Uses IO instead of scroll listeners for better performance (no framer-motion).
 */
export function ScrollFadeSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (reduceMotion || !ref.current) return;

    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setOpacity(e.intersectionRatio);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div ref={ref}>
      <div
        style={reduceMotion ? undefined : { opacity: Math.max(0.85, opacity) }}
      >
        {children}
      </div>
    </div>
  );
}
