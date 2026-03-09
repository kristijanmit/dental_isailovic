"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { useSiteData } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut } from "@/lib/motion";

export function TopBar() {
  const siteData = useSiteData();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: -8 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduceMotion ? 0.01 : 0.35,
            ease: easeOut
          }
        }
      }}
      className="sticky top-0 z-50 border-b bg-accent text-accent-foreground"
    >
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8 sm:text-sm">
        <div className="flex min-w-0 items-center gap-4">
          <a href={`tel:${siteData.clinic.phoneRaw}`} className="flex items-center gap-1 hover:underline">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{siteData.clinic.phoneDisplay}</span>
          </a>
          <p className="hidden items-center gap-1 truncate md:flex">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="truncate">{siteData.clinic.address}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher className="border-accent-foreground/30 bg-accent-foreground/10" />
          <Link href="#contact" className="font-medium hover:underline">
            {siteData.topBarCtaLabel}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
