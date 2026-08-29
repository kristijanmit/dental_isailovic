"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { useSiteData } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  fadeUp,
  fadeUpReduced,
  getVariants,
  slideIn,
  slideInReduced,
  staggerContainer,
  staggerContainerReduced,
  viewportDefaults
} from "@/lib/motion";

export function Team() {
  const siteData = useSiteData();
  const reduceMotion = useReducedMotion();
  const photoVariants = getVariants(reduceMotion, fadeUp, fadeUpReduced);
  const contentVariants = getVariants(
    reduceMotion,
    staggerContainer(0.06),
    staggerContainerReduced()
  );
  const itemVariants = getVariants(reduceMotion, slideIn, slideInReduced);
  const chipVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: reduceMotion ? 0 : 0.05 * i,
        duration: reduceMotion ? 0.01 : 0.2
      }
    })
  };

  const doctor = siteData.team[0];
  if (!doctor) return null;

  return (
    <Section id="team" title={siteData.teamSection.title} subtitle={siteData.teamSection.subtitle}>
      <div className="grid gap-8 lg:grid-cols-[minmax(260px,380px)_1fr] lg:items-center lg:gap-12">
        <motion.div
          variants={photoVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportDefaults}
          className="surface overflow-hidden"
        >
          <Image
            src={doctor.image.src}
            alt={doctor.image.alt}
            width={600}
            height={800}
            sizes="(max-width: 1024px) 100vw, 380px"
            className="aspect-[3/4] w-full object-cover object-top"
            priority={false}
          />
        </motion.div>

        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportDefaults}
        >
          <motion.h3 variants={itemVariants} className="text-2xl font-semibold">
            {doctor.name}
          </motion.h3>
          <motion.p variants={itemVariants} className="mt-1 text-sm font-medium text-accent">
            {doctor.role}
          </motion.p>
          <motion.p variants={itemVariants} className="mt-4 leading-relaxed text-muted-foreground">
            {doctor.bio}
          </motion.p>
          <motion.ul variants={itemVariants} className="mt-5 flex flex-wrap gap-2">
            {doctor.specialties.map((specialty, i) => (
              <motion.li
                key={specialty}
                custom={i}
                variants={chipVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportDefaults}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
              >
                {specialty}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={itemVariants} className="mt-7">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transition-none"
            >
              {siteData.topBarCtaLabel}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
