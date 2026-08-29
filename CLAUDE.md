# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build (also runs typecheck + lint via next build)
npm run start    # serve the production build
npm run lint     # eslint (next/core-web-vitals + next/typescript)
```

There is no test suite and no separate `typecheck` script — type errors surface during `next build` (and in-editor via the `next` TS plugin). There is nothing to run for a single test.

## Architecture

This is a **single-page** Next.js 15 App Router site (one route: `app/page.tsx`) — a dental clinic marketing template. There is no backend, no database, no API routes, and no server actions; the contact form is client-only (see below).

**Content is centralized and typed, not hardcoded in components.** `lib/siteData.ts` defines the `SiteData` type (clinic info, SEO fields, nav, and per-section copy/arrays). `lib/translations.ts` provides the actual `sr` and `en` content conforming to that type via `getSiteData(locale)`. Components never hardcode copy — they read from site data. To retarget this template for a different clinic, edit `lib/translations.ts` (not the components).

**Bilingual, but client-side only.** `contexts/LanguageContext.tsx` holds the active `Locale` (`"sr" | "en"`), persisted to `localStorage` (`dental-locale`), defaulting to `"sr"`. `useSiteData()` / `useLanguage()` are the hooks components use to read the current locale's content. There is no `/en` route and no server-side locale detection — `app/layout.tsx` hardcodes `<html lang="sr">` regardless of the active client locale, so treat the language switcher as a client-rendering concern only, not a routing/SEO one, unless asked to change that.

**Page composition**: `app/page.tsx` renders sections in order (`TopBar`, `Navbar`, `Hero`, `Highlights`, `Services`, `WhyChooseUs`, `ReviewsCarousel`, `Gallery`, `Team`, `Process`, `Contact`, `MapEmbed`, `Footer`), each wrapped in `ScrollFadeSection` (except Hero/TopBar/Navbar). Below-the-fold sections (`ReviewsCarousel`, `Gallery`, `Team`, `Process`, `Contact`, `MapEmbed`) are loaded via `next/dynamic` — keep new below-the-fold sections dynamic too, and keep `Hero`/`TopBar`/`Navbar` static since they're above the fold.

**Motion system**: `lib/motion.ts` centralizes Framer Motion durations/easing/variants (`fadeUp`, `fadeIn`, `scaleIn`, `slideIn`, `staggerContainer`) and a `getVariants(reduceMotion, full, reduced)` helper. `hooks/useReducedMotion.ts` detects `prefers-reduced-motion` — every animated component branches through `getVariants()` so motion is consistently disabled/simplified, rather than each component handling reduced-motion ad hoc. Tune global timing/easing in `lib/motion.ts` rather than per-component.

**SEO**: `lib/seo.ts` builds the Next.js `Metadata` object (`buildMetadata`) and a `Dentist`/`LocalBusiness` JSON-LD payload (`buildLocalBusinessJsonLd`) from `SiteData`, consumed in `app/layout.tsx`. Canonical URL / absolute OG URLs / `metadataBase` only resolve when the `NEXT_PUBLIC_SITE_URL` env var is set — it isn't set by default, so `next build` emits a `metadataBase` warning and OG/canonical URLs are absent in local/default deploys.

**Images**: all images go through `next/image` (never plain `<img>`) — `next.config.ts` enables AVIF/WebP output and custom `deviceSizes`. Source files live in `public/images`; add new images there and reference them via `SiteData`/`translations.ts` entries (e.g. `gallery`, `team`, `services[].image`), not by hardcoding paths in components.

**Styling**: Tailwind CSS 3 utility classes throughout; the color theme is CSS custom properties (HSL vars in `app/globals.css` `:root`) mapped into `tailwind.config.ts` — change the theme by editing those CSS vars, not by hardcoding colors in components. No web fonts are loaded; `globals.css` uses a system font stack intentionally, to avoid font payload — don't add `next/font` or a Google Fonts link without discussing it first.

**Forms**: `Contact.tsx` uses `react-hook-form` + `zod` (schema in `lib/schema.ts`) but makes no network request — on submit it shows a local success state and offers `mailto:`/WhatsApp/copy-to-clipboard actions. There is no backend to wire up; if real submission is ever added, it starts here.

**Deployment**: prod target is Vercel (plain `next build`, no special config needed — see README §7). `next.config.ts` also conditionally enables `output: "export"` (+ `unoptimized` images, + `basePath`/`assetPrefix` for GitHub Pages only) when `GITHUB_PAGES` or `CF_PAGES` env vars are set, for free staging/testing deploys to GitHub Pages and Cloudflare Pages — see README §7b. These are gated so plain `npm run dev`/`npm run build` are untouched; don't remove the gating without checking both paths still build.
