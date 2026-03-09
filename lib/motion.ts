/**
 * Centralized motion system for the dental clinic site.
 * All animations respect prefers-reduced-motion for accessibility.
 */

import type { Variants } from "framer-motion";

// --- Easing ---
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;
export const easeOutExpo = [0.19, 1, 0.22, 1] as const;

// --- Durations (seconds) ---
export const duration = {
  fast: 0.35,
  normal: 0.55,
  slow: 0.75,
  slower: 0.9
} as const;

// --- Viewport defaults ---
export const viewportDefaults = {
  once: false,
  amount: 0.2,
  margin: "0px 0px -40px 0px"
} as const;

/**
 * Returns reduced-motion variants: simple opacity fade or no animation.
 */
function reducedVariants(base: Variants): Variants {
  return {
    ...base,
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
}

/**
 * fadeUp: y offset + opacity. Used for headlines, text blocks.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeOut }
  }
};

export const fadeUpReduced: Variants = reducedVariants(fadeUp);

/**
 * fadeIn: opacity only. Minimal motion.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: easeOut }
  }
};

export const fadeInReduced: Variants = reducedVariants(fadeIn);

/**
 * scaleIn: opacity + scale + y. For cards, panels.
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easeOut }
  }
};

export const scaleInReduced: Variants = reducedVariants(scaleIn);

/**
 * slideIn: x offset + opacity. For bullets, side content.
 */
export const slideIn: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.normal, ease: easeOut }
  }
};

export const slideInReduced: Variants = reducedVariants(slideIn);

/**
 * Stagger container: delays children via staggerChildren.
 */
export const staggerContainer = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const staggerContainerReduced = (): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0
    }
  }
});

/**
 * Returns the appropriate variants based on reduced-motion preference.
 */
export function getVariants(reduceMotion: boolean, full: Variants, reduced: Variants): Variants {
  return reduceMotion ? reduced : full;
}
