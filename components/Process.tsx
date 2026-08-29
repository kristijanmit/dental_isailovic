"use client";

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
      className="relative flex min-h-[280px] flex-col justify-center overflow-visible py-8"
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

        {/* Desktop: icons with line, caption under each icon */}
        <div className="relative hidden w-full overflow-visible md:block">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-14">
            <div className="absolute left-[12.5%] right-[12.5%] top-1/2 -translate-y-1/2">
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
          </div>

          <motion.ol
            className="relative z-10 flex w-full items-start justify-between"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportDefaults}
          >
            {siteData.process.map((step, index) => {
              const Icon = STEP_ICONS[index] ?? Activity;
              return (
                <motion.li
                  key={step.title}
                  variants={stepVariants}
                  className="flex flex-1 basis-0 flex-col items-center px-2 text-center"
                >
                  <div
                    aria-hidden="true"
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-accent/20 bg-white text-accent shadow-[0_2px_8px_hsl(var(--accent)/0.15)]"
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </Section>
  );
}
