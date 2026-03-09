"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Section } from "@/components/Section";
import { useSiteData } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  duration,
  easeOut,
  getVariants,
  scaleIn,
  scaleInReduced,
  staggerContainer,
  staggerContainerReduced,
  viewportDefaults
} from "@/lib/motion";

export function Services() {
  const siteData = useSiteData();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();
  const containerVariants = getVariants(
    reduceMotion,
    staggerContainer(0.06),
    staggerContainerReduced()
  );
  const cardVariants = getVariants(reduceMotion, scaleIn, scaleInReduced);

  return (
    <Section
      id="services"
      title={siteData.servicesSection.title}
      subtitle={siteData.servicesSection.subtitle}
    >
      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefaults}
      >
        {siteData.services.map((service) => {
          const isExpanded = Boolean(expanded[service.id]);
          const contentId = `service-content-${service.id}`;

          return (
            <motion.article
              key={service.id}
              variants={cardVariants}
              className="surface overflow-hidden p-0"
            >
              {service.image && (
                <div className="relative aspect-[3/1] w-full overflow-hidden">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    width={600}
                    height={200}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-muted-foreground">{service.short}</p>

              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={contentId}
                className="mt-4 inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold text-accent"
                onClick={() =>
                  setExpanded((prev) => ({
                    ...prev,
                    [service.id]: !prev[service.id]
                  }))
                }
              >
                {isExpanded
                  ? siteData.servicesSection.showLessLabel
                  : siteData.servicesSection.learnMoreLabel}
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{
                    duration: reduceMotion ? 0.01 : duration.normal,
                    ease: easeOut
                  }}
                >
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </motion.span>
              </button>

              <ExpandableContent
                contentId={contentId}
                content={service.long}
                isExpanded={isExpanded}
                reduceMotion={reduceMotion}
              />
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </Section>
  );
}

function ExpandableContent({
  contentId,
  content,
  isExpanded,
  reduceMotion
}: {
  contentId: string;
  content: string;
  isExpanded: boolean;
  reduceMotion: boolean;
}) {
  const transition = reduceMotion ? "none" : "grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <div
      id={contentId}
      className="grid overflow-hidden"
      style={{
        gridTemplateRows: isExpanded ? "1fr" : "0fr",
        transition,
      }}
    >
      <div className="min-h-0">
        <p className="pt-3 text-sm text-muted-foreground">{content}</p>
      </div>
    </div>
  );
}
