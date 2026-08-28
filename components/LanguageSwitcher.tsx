"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { locales, localeLabels } from "@/lib/translations";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn("flex items-center gap-1 rounded-md border bg-muted/50 p-0.5", className)}
    >
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setLocale(loc)}
          className={cn(
            "rounded px-2 py-1 text-xs font-medium transition-colors sm:text-sm",
            locale === loc
              ? "bg-accent text-accent-foreground"
              : "text-accent-foreground hover:bg-accent-foreground/10"
          )}
          aria-pressed={locale === loc}
          aria-label={`${loc.toUpperCase()} — Switch to ${localeLabels[loc]}`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
