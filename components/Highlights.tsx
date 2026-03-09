"use client";

import { motion } from "framer-motion";
import { Clock3, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Section } from "@/components/Section";
import { useSiteData } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  getVariants,
  scaleIn,
  scaleInReduced,
  staggerContainer,
  staggerContainerReduced,
  viewportDefaults
} from "@/lib/motion";

const iconMap = {
  shield: ShieldCheck,
  clock: Clock3,
  sparkles: Sparkles,
  heart: HeartHandshake
};

export function Highlights() {
  const siteData = useSiteData();
  const reduceMotion = useReducedMotion();
  const containerVariants = getVariants(
    reduceMotion,
    staggerContainer(0.06),
    staggerContainerReduced()
  );
  const cardVariants = getVariants(reduceMotion, scaleIn, scaleInReduced);

  return (
    <Section id="highlights" title={siteData.highlights.title}>
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefaults}
      >
        {siteData.highlights.items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <motion.article
              key={item.title}
              variants={cardVariants}
              className="surface p-5"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                      scale: 1.01,
                      transition: { duration: 0.35 }
                    }
                  }
              style={{ transition: "none" }}
            >
              <motion.span
                className="inline-block"
                whileHover={
                  reduceMotion
                    ? undefined
                    : { rotate: 3, scale: 1.06, transition: { duration: 0.35 } }
                }
              >
                <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
              </motion.span>
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </Section>
  );
}
