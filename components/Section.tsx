"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, fadeUpReduced, getVariants, viewportDefaults } from "@/lib/motion";

type SectionProps = {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, title, subtitle, className, children }: SectionProps) {
  const reduceMotion = useReducedMotion();
  const variants = getVariants(reduceMotion, fadeUp, fadeUpReduced);

  return (
    <section
      id={id}
      className={cn(
        "section-anchor bg-gradient-to-b from-background via-background to-muted/30 px-4 py-14 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        {(title || subtitle) && (
          <motion.header
            className="mb-8 max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={viewportDefaults}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06, delayChildren: 0 }
              }
            }}
          >
            {title && (
              <motion.h2
                variants={variants}
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p variants={variants} className="mt-3 text-muted-foreground">
                {subtitle}
              </motion.p>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  );
}
