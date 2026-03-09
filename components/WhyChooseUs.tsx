"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CalendarDays, Users, Star } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/Section";
import { useSiteData } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCountUp } from "@/hooks/useCountUp";
import {
  getVariants,
  slideIn,
  slideInReduced,
  staggerContainer,
  staggerContainerReduced,
  viewportDefaults
} from "@/lib/motion";

const STAT_ICONS = [CalendarDays, Users, Star] as const;

export function WhyChooseUs() {
  const siteData = useSiteData();
  const reduceMotion = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const containerVariants = getVariants(
    reduceMotion,
    staggerContainer(0.05),
    staggerContainerReduced()
  );
  const itemVariants = getVariants(reduceMotion, slideIn, slideInReduced);

  return (
    <Section
      id="why-choose-us"
      title={siteData.whyChooseUs.title}
      subtitle={siteData.whyChooseUs.subtitle}
      className="relative overflow-hidden"
    >
      {/* Soft gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `linear-gradient(160deg, hsl(var(--accent) / 0.06) 0%, transparent 50%)`
        }}
      />
      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--accent) / 0.12) 1px, transparent 0)`,
          backgroundSize: "20px 20px"
        }}
      />

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[minmax(260px,300px)_1fr] lg:gap-10 lg:items-stretch">
        {/* Stats column - left */}
        <motion.div
          ref={statsRef}
          className="flex flex-col gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportDefaults}
        >
          {siteData.whyChooseUs.stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={STAT_ICONS[index]}
              inView={statsInView}
              reduceMotion={reduceMotion}
              variants={itemVariants}
            />
          ))}
        </motion.div>

        {/* Benefits grid - right */}
        <motion.ul
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportDefaults}
        >
          {siteData.whyChooseUs.bullets.map((bullet) => (
            <motion.li
              key={bullet}
              variants={itemVariants}
              className="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-white bg-white/95 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-accent/20 hover:shadow-[0_4px_12px_hsl(var(--accent)/0.12)]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 pt-0.5 text-sm leading-relaxed text-foreground/85 transition-colors group-hover:text-foreground">
                {bullet}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  inView,
  variants
}: {
  label: string;
  value: string;
  icon: typeof CalendarDays;
  inView: boolean;
  reduceMotion: boolean;
  variants: ReturnType<typeof getVariants>;
}) {
  const displayValue = useCountUp(value, inView);

  return (
    <motion.article
      variants={variants}
      className="relative flex items-center gap-3 overflow-hidden rounded-xl border border-white bg-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-accent/20 hover:shadow-[0_2px_8px_hsl(var(--accent)/0.1)]"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-1 items-baseline gap-2">
        <span className="text-base font-bold tracking-tight text-accent sm:text-lg">
          {displayValue}
        </span>
        <span className="truncate text-xs font-medium text-muted-foreground">
          {label}
        </span>
      </div>
    </motion.article>
  );
}
