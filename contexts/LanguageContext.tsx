"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import { getSiteData } from "@/lib/translations";
import type { Locale } from "@/lib/translations";
import type { SiteData } from "@/lib/siteData";

const STORAGE_KEY = "dental-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  siteData: SiteData;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "sr" || stored === "en") return stored;
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getInitialLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale === "sr" ? "sr" : "en";
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.lang = locale === "sr" ? "sr" : "en";
    }
  }, [mounted, locale]);

  const siteData = getSiteData(locale);

  const value: LanguageContextValue = {
    locale,
    setLocale,
    siteData
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

export function useSiteData() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useSiteData must be used within LanguageProvider");
  }
  return ctx.siteData;
}
