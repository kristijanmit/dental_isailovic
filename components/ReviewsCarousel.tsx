"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState, type PointerEvent } from "react";
import { Section } from "@/components/Section";
import { useSiteData } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportDefaults } from "@/lib/motion";

export function ReviewsCarousel() {
  const siteData = useSiteData();
  const [index, setIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const reviews = siteData.reviews;
  const reduceMotion = useReducedMotion();
  const slideDuration = reduceMotion ? 0.01 : 0.45;

  const prev = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };
  const next = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setDragStart(event.clientX);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart === null) {
      return;
    }

    const delta = event.clientX - dragStart;
    if (delta > 50) {
      prev();
    } else if (delta < -50) {
      next();
    }
    setDragStart(null);
  };

  return (
    <Section
      id="reviews"
      title={siteData.reviewsSection.title}
      subtitle={siteData.reviewsSection.subtitle}
      className="[&_header]:mb-4"
    >
      <motion.div
        className="relative"
        tabIndex={0}
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefaults}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0 }
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") prev();
          if (event.key === "ArrowRight") next();
        }}
      >
        <div
          className="rounded-xl border border-border/50 bg-white px-5 py-6 sm:px-8 sm:py-8"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => setDragStart(null)}
        >
          <div className="min-h-0">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                className="relative"
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 20 : -20
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: slideDuration,
                    ease: easeOut
                  }
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -20 : 20,
                  transition: {
                    duration: slideDuration,
                    ease: easeOut
                  }
                }}
              >
                <div
                  className="mb-3 flex items-center gap-0.5"
                  aria-label={`${reviews[index].rating} ${siteData.common.starsOutOfFiveSuffix}`}
                >
                  {Array.from({ length: reviews[index].rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-muted-foreground/60 text-muted-foreground/60"
                    />
                  ))}
                </div>
                <blockquote className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
                  &ldquo;{reviews[index].text}&rdquo;
                </blockquote>
                <p className="mt-4 text-sm text-muted-foreground">
                  {reviews[index].name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-5">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prev}
                className="rounded-md p-1.5 text-muted-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label={siteData.common.previousReviewLabel}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-md p-1.5 text-muted-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label={siteData.common.nextReviewLabel}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div
              className="flex items-center gap-2"
              aria-label={siteData.common.reviewPaginationLabel}
            >
              {reviews.map((review, dotIndex) => (
                <motion.button
                  key={review.name}
                  type="button"
                  onClick={() => {
                    setDirection(dotIndex > index ? 1 : -1);
                    setIndex(dotIndex);
                  }}
                  className={`rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    dotIndex === index
                      ? "h-1.5 w-1.5 bg-foreground/60"
                      : "h-1.5 w-1.5 bg-muted-foreground/25 hover:bg-muted-foreground/40"
                  }`}
                  aria-label={`Go to review ${dotIndex + 1}`}
                  aria-current={dotIndex === index}
                  animate={{
                    opacity: dotIndex === index ? 1 : 0.7
                  }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
