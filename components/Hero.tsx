"use client";

import Image from "next/image";
import { Calendar, Phone, ShieldCheck } from "lucide-react";
import { useSiteData } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const siteData = useSiteData();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="section-anchor relative min-h-[520px] overflow-hidden sm:min-h-[600px] lg:min-h-[680px]"
    >
      <div className="absolute inset-0">
        <Image
          src={siteData.hero.image.src}
          alt=""
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay for text contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
        aria-hidden
      />

      {/* Content layer - conversion-optimized hierarchy */}
      <div className="relative z-10 flex min-h-[520px] items-center sm:min-h-[600px] lg:min-h-[680px]">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="hero-animate max-w-2xl space-y-0 text-white">
            <p className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/95 backdrop-blur-sm">
              {siteData.clinic.clinicName}
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {siteData.hero.headline}
            </h1>
            <p className="mt-4 text-lg font-medium text-white/95 sm:text-xl">
              {siteData.hero.subheadline}
            </p>

            {/* Trust badges above CTA - reduces anxiety before action */}
            <ul className="hero-trust-badges mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/90 sm:gap-x-6">
              {siteData.hero.trustBadges.map((badge) => (
                <li key={badge} className="flex items-center gap-2">
                  <ShieldCheck
                    className="h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span>{badge}</span>
                </li>
              ))}
            </ul>

            {/* Primary conversion block - CTAs with clear hierarchy */}
            <div className="!mt-10 !mb-8">
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-foreground shadow-lg shadow-black/30 transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 active:scale-[0.98] motion-reduce:transition-none"
                >
                  {!reduceMotion && (
                    <span
                      className="hero-cta-shine pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      aria-hidden
                    />
                  )}
                  <Calendar
                    className="h-5 w-5 shrink-0 relative"
                    aria-hidden="true"
                  />
                  <span className="relative">
                    {siteData.hero.requestCtaLabel}
                  </span>
                </a>
                <a
                  href={`tel:${siteData.clinic.phoneRaw}`}
                  className="flex items-center gap-2 rounded-full border-2 border-white/50 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 motion-reduce:transition-none hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {siteData.hero.callCtaLabel}
                </a>
              </div>
              <p className="mt-3 text-sm text-white/80">
                {siteData.hero.ctaReassurance}
              </p>
            </div>

            <p className="mt-6 max-w-xl leading-relaxed text-white/80">
              {siteData.hero.supportingText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
