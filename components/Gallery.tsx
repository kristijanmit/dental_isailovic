"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Section } from "@/components/Section";
import { LightboxModal } from "@/components/LightboxModal";
import { useSiteData } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  fadeIn,
  fadeInReduced,
  getVariants,
  staggerContainer,
  staggerContainerReduced,
  viewportDefaults
} from "@/lib/motion";

export function Gallery() {
  const siteData = useSiteData();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();

  const openLightbox = (index: number, element: HTMLButtonElement) => {
    triggerRef.current = element;
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % siteData.gallery.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + siteData.gallery.length) % siteData.gallery.length);
  };

  const containerVariants = getVariants(
    reduceMotion,
    staggerContainer(0.05),
    staggerContainerReduced()
  );
  const tileVariants = getVariants(reduceMotion, fadeIn, fadeInReduced);

  return (
    <Section
      id="gallery"
      title={siteData.gallerySection.title}
      subtitle={siteData.gallerySection.subtitle}
    >
      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefaults}
      >
        {siteData.gallery.map((item, index) => (
          <motion.button
            key={item.src}
            type="button"
            variants={tileVariants}
            className="surface group relative overflow-hidden"
            onClick={(event) => openLightbox(index, event.currentTarget)}
            aria-label={`${siteData.common.openGalleryImageLabelPrefix} ${index + 1}`}
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                width={600}
                height={600}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03] motion-reduce:transition-none"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none">
              <span className="text-sm font-medium text-white">View</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <LightboxModal
        isOpen={isOpen}
        activeIndex={activeIndex}
        images={siteData.gallery}
        onClose={closeLightbox}
        onNext={goNext}
        onPrev={goPrev}
      />
    </Section>
  );
}
