"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { useSiteData } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeIn, fadeInReduced, getVariants, viewportDefaults } from "@/lib/motion";

export function MapEmbed() {
  const siteData = useSiteData();
  const reduceMotion = useReducedMotion();
  const variants = getVariants(reduceMotion, fadeIn, fadeInReduced);

  return (
    <Section id="map" title={siteData.mapSection.title} subtitle={siteData.mapSection.subtitle}>
      <motion.div
        className="surface overflow-hidden"
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefaults}
      >
        <div className="relative h-0 pb-[56.25%]">
          <iframe
            src={siteData.clinic.googleMapsUrl}
            title={siteData.mapSection.embedTitle}
            className="absolute left-0 top-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </motion.div>
    </Section>
  );
}
