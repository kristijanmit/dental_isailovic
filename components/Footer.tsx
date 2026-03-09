"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, fadeUpReduced, getVariants, viewportDefaults } from "@/lib/motion";

export function Footer() {
  const siteData = useSiteData();
  const reduceMotion = useReducedMotion();
  const variants = getVariants(reduceMotion, fadeUp, fadeUpReduced);

  return (
    <motion.footer
      className="mt-10 border-t border-white/40 bg-gradient-to-b from-background via-background to-muted/30 backdrop-blur-md"
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
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <motion.section variants={variants}>
          <h2 className="text-lg font-semibold">{siteData.footer.aboutTitle}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{siteData.footer.aboutText}</p>
        </motion.section>

        <motion.section variants={variants}>
          <h2 className="text-lg font-semibold">{siteData.footer.quickLinksTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {siteData.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section variants={variants}>
          <h2 className="text-lg font-semibold">{siteData.footer.legalTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {siteData.footer.legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-muted-foreground hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
      <motion.p
        variants={variants}
        className="border-t px-4 py-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8"
      >
        {siteData.footer.copyright}
      </motion.p>
    </motion.footer>
  );
}
