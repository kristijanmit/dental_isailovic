"use client";

import Image from "next/image";
import FocusTrap from "focus-trap-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSiteData } from "@/contexts/LanguageContext";
import type { GalleryItem } from "@/lib/siteData";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { duration, easeOut } from "@/lib/motion";

type LightboxModalProps = {
  isOpen: boolean;
  activeIndex: number;
  images: GalleryItem[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export function LightboxModal({
  isOpen,
  activeIndex,
  images,
  onClose,
  onNext,
  onPrev
}: LightboxModalProps) {
  const siteData = useSiteData();
  const reduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        setDirection(-1);
        onPrev();
      }
      if (event.key === "ArrowRight") {
        setDirection(1);
        onNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  const slideDuration = reduceMotion ? 0.01 : 0.45;

  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
        className="fixed inset-0 z-[60] bg-black/80 p-4"
      >
        <FocusTrap
          focusTrapOptions={{
            initialFocus: "#lightbox-close"
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            className="mx-auto flex h-full max-w-5xl flex-col"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: reduceMotion ? 0.01 : duration.normal,
                ease: easeOut
              }
            }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <div className="mb-3 flex justify-end">
              <button
                id="lightbox-close"
                type="button"
                onClick={onClose}
                className="rounded-full bg-white/20 p-2 text-white"
                aria-label={siteData.common.closeLightboxLabel}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setDirection(-1);
                  onPrev();
                }}
                className="absolute left-1 z-10 rounded-full bg-white/20 p-2 text-white"
                aria-label={siteData.common.previousImageLabel}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="relative h-[70vh] w-full overflow-hidden rounded-xl bg-black/30">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    initial={{
                      opacity: 0,
                      x: direction > 0 ? 40 : -40
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: slideDuration, ease: easeOut }
                    }}
                    exit={{
                      opacity: 0,
                      x: direction > 0 ? -40 : 40,
                      transition: { duration: slideDuration, ease: easeOut }
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[activeIndex].src}
                      alt={images[activeIndex].alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDirection(1);
                  onNext();
                }}
                className="absolute right-1 z-10 rounded-full bg-white/20 p-2 text-white"
                aria-label={siteData.common.nextImageLabel}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        </FocusTrap>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
