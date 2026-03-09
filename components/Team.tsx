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
  staggerContainer,
  staggerContainerReduced,
  viewportDefaults
} from "@/lib/motion";

export function Team() {
  const siteData = useSiteData();
  const reduceMotion = useReducedMotion();
  const containerVariants = getVariants(
    reduceMotion,
    staggerContainer(0.06),
    staggerContainerReduced()
  );
  const cardVariants = getVariants(reduceMotion, fadeUp, fadeUpReduced);
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

  return (
    <Section id="team" title={siteData.teamSection.title} subtitle={siteData.teamSection.subtitle}>
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefaults}
      >
        {siteData.team.map((member, idx) => (
          <motion.article
            key={member.name}
            variants={cardVariants}
            className="surface overflow-hidden"
            whileHover={
              reduceMotion
                ? undefined
                : { y: -4, transition: { duration: 0.35 } }
            }
          >
            <Image
              src={`/images/team${idx + 1}.jpg`}
              alt={member.name}
              width={400}
              height={533}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="aspect-[3/4] w-full object-cover object-top"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm font-medium text-accent">{member.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {member.specialties.map((specialty, i) => (
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
              </ul>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
