"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, CalendarCheck, ClipboardList, Phone } from "lucide-react";
import { Section } from "@/components/Section";
import { useSiteData } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  easeOut,
  fadeUp,
  fadeUpReduced,
  getVariants,
  staggerContainer,
  staggerContainerReduced,
  viewportDefaults,
} from "@/lib/motion";

const STEP_ICONS = [Phone, ClipboardList, Activity, CalendarCheck];

export function Process() {
  const siteData = useSiteData();
  const reduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const containerVariants = getVariants(
    reduceMotion,
    staggerContainer(0.08),
    staggerContainerReduced(),
  );
  const stepVariants = getVariants(reduceMotion, fadeUp, fadeUpReduced);

  return (
    <Section
      id="process"
      title={siteData.processSection.title}
      subtitle={siteData.processSection.subtitle}
      className={`relative flex min-h-[280px] flex-col justify-center overflow-visible py-8 ${hoveredIndex !== null ? "z-[9999]" : ""}`}
    >
      {/* Section atmosphere - gradient and dot pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `linear-gradient(160deg, hsl(var(--accent) / 0.06) 0%, transparent 50%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--accent) / 0.1) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative w-full overflow-visible py-4">
        {/* Mobile: stacked cards with content always visible */}
        <motion.div
          className="flex flex-col gap-3 md:hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportDefaults}
        >
          {siteData.process.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? Activity;
            return (
              <motion.article
                key={step.title}
                variants={stepVariants}
                className="flex items-start gap-4 rounded-xl border border-white/60 bg-white p-4 shadow-[0_2px_8px_hsl(var(--accent)/0.1)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent/20 bg-white text-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Desktop: icons with line, hover tooltip */}
        <div className="relative hidden h-20 w-full items-center overflow-visible md:flex md:h-24">
          <div className="absolute left-[12.5%] right-[12.5%] top-1/2 z-0 -translate-y-1/2">
            <motion.div
              className="h-1 w-full rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent)/0.4)]"
              style={{
                transformOrigin: "center",
                animation: reduceMotion
                  ? "none"
                  : "process-line-flow 2.5s ease-in-out infinite",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportDefaults}
              transition={{
                duration: reduceMotion ? 0.01 : 1,
                ease: easeOut,
              }}
            />
          </div>

          <motion.ol
            className="relative z-10 flex h-full w-full items-center justify-between"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportDefaults}
          >
            {siteData.process.map((step, index) => {
              const Icon = STEP_ICONS[index] ?? Activity;
              const isHovered = hoveredIndex === index;
              return (
                <motion.li
                  key={step.title}
                  variants={stepVariants}
                  className={`group relative flex flex-1 basis-0 flex-col items-center ${isHovered ? "z-[100]" : "z-10"}`}
                  onMouseEnter={(e) => {
                    setHoveredIndex(index);
                    setTooltipPos({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setTooltipPos(null);
                  }}
                  onMouseMove={(e) => {
                    if (isHovered) {
                      setTooltipPos({ x: e.clientX, y: e.clientY });
                    }
                  }}
                >
                  <button
                    type="button"
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-accent/20 bg-white text-accent shadow-[0_2px_8px_hsl(var(--accent)/0.15)] transition-all duration-200 hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-[0_4px_16px_hsl(var(--accent)/0.3)]"
                    aria-label={step.title}
                    aria-describedby={isHovered ? `process-tooltip-${index}` : undefined}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </button>
                  {isHovered && tooltipPos && (
                    <div
                      id={`process-tooltip-${index}`}
                      className="pointer-events-none fixed left-0 top-0 z-[9999] w-64 overflow-visible rounded-xl border border-white/60 bg-white p-5 shadow-[0_8px_24px_-4px_hsl(var(--accent)/0.25)] backdrop-blur-md"
                      role="tooltip"
                      style={{
                        transform: `translate(${tooltipPos.x}px, ${tooltipPos.y}px) translate(-50%, -50%)`,
                        willChange: "transform",
                      }}
                    >
                      <h3 className="text-center text-base font-semibold">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  )}
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </Section>
  );
}
