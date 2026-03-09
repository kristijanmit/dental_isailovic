"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSiteData } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { duration, easeOut } from "@/lib/motion";

export function Navbar() {
  const siteData = useSiteData();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const mountedRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    if (open) {
      firstMobileLinkRef.current?.focus();
    } else {
      toggleRef.current?.focus();
    }
  }, [open]);

  const navDuration = reduceMotion ? 0.01 : duration.normal;

  return (
    <motion.header
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: navDuration,
        delay: reduceMotion ? 0 : 0.08,
        ease: easeOut
      }}
      className="sticky top-10 z-40 border-b bg-background/95 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="text-lg font-semibold tracking-tight">
          {siteData.clinic.clinicName}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {siteData.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-accent">
              {item.label}
            </Link>
          ))}
          <motion.a
            href={`tel:${siteData.clinic.phoneRaw}`}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.35 }}
          >
            {siteData.hero.callCtaLabel}
          </motion.a>
        </nav>

        <motion.button
          ref={toggleRef}
          type="button"
          className="rounded-md p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? siteData.common.closeMenuLabel : siteData.common.openMenuLabel}
          onClick={() => setOpen((prev) => !prev)}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <div
        id="mobile-menu"
        className="grid overflow-hidden border-t md:hidden"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: reduceMotion ? "none" : "grid-template-rows 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <nav aria-label="Mobile Primary" className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
            <ul className="space-y-2">
              {siteData.nav.map((item, idx) => (
                <li key={item.href}>
                  <Link
                    ref={idx === 0 ? firstMobileLinkRef : undefined}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
