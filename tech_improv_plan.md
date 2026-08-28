# Technical Improvement Plan

Audited 2026-08-28 against a production build (`npm run build && npm run start`) on `localhost:3000`. Lighthouse 12.8.2 was run in both mobile (default emulation/throttling) and desktop (`--preset=desktop`) modes; full-page screenshots from those runs were used to check layout at 412px and 1350px widths. Every item below traces back to a specific Lighthouse audit or a specific file.

**Status**: items 1, 4, 6, 7, 8, 9 below were implemented the same day (see "Done" notes on each). Item 2 (`NEXT_PUBLIC_SITE_URL`) is intentionally not set yet — the real production domain wasn't available at the time — so item 2, and the URL-dependent parts of items 3 and 6, remain open until that's decided. Items 5, 10, 11, 12 were deliberately deferred (reasons noted inline).

## Lighthouse scores

| Category | Mobile (before → after) | Desktop (before → after) |
|---|---|---|
| Performance | 96 → 96 | 100 → 100 |
| Accessibility | 93 → **100** | 93 → **100** |
| Best Practices | 96 → **100** | 96 → **100** |
| SEO | 100 → 100 | 100 → 100 |

Mobile total page weight: **5,323 KiB → 325 KiB** (hero video no longer loads on mobile viewports, item 1). Desktop is unaffected (video still loads there, as intended).

Core Web Vitals (mobile): LCP 2.7s (score 0.84), CLS 0, TBT 40ms, FCP 0.8s, TTI 2.8s. Desktop LCP 0.7s. Scores are already strong; the items below are the specific gaps behind the non-100 categories, plus a few things Lighthouse doesn't check (structured data completeness, i18n/SEO interplay).

## High priority

### 1. Hero video downloads 5.1MB unconditionally on every page load
`components/Hero.tsx:33-43` — the `<video autoPlay preload="auto">` has no `media`/connection-aware gating and loads for every non-reduced-motion visitor regardless of device or network. Lighthouse's `total-byte-weight` audit shows `hero.mp4` (5,120,388 bytes) as by far the largest network request on the page — roughly 96% of total page weight (5.3MB mobile / 5.5MB desktop). `scripts/compress-hero-video.sh` exists, suggesting this was already a known concern, but the file on disk today is still 4.9MB.
- **Fix**: re-run/tighten the existing compression script (target well under 1-2MB — e.g. lower bitrate, shorter loop, or serve a smaller resolution on mobile via `<source media>`), and/or skip loading the video on narrow viewports or `navigator.connection.saveData`/slow connections, falling back to the poster image.
- Effort: S–M.
- **Done**: `components/Hero.tsx` now gates the `<video>` behind a `shouldLoadHeroVideo()` check (viewport ≥768px, and not `saveData`/2G) — verified via re-run Lighthouse: mobile total page weight dropped from 5,323 KiB to 325 KiB; desktop unaffected. Compressing the source file itself is still open — `ffmpeg` isn't installed in this environment, so `scripts/compress-hero-video.sh` couldn't be run; someone with `ffmpeg` available should still shrink the 4.9MB source for the desktop/tablet audience that does load it.

### 2. `NEXT_PUBLIC_SITE_URL` is unset, so canonical/OG/Twitter URLs and `metadataBase` are all missing in the shipped build
`npm run build` prints: `metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000"`. In `lib/seo.ts:5-19`, `alternates.canonical` and `openGraph.url` are only set `if (baseUrl)` — with no env var, there is no canonical tag and OG image URLs resolve relative to whatever host serves the page (broken previews when shared on social/messaging apps).
- **Fix**: set `NEXT_PUBLIC_SITE_URL` in the Vercel project's environment variables (documented in `README.md` §7 as optional, but it shouldn't be optional for a production deploy).
- Effort: S (config only, once the real domain is known).

### 3. No `robots.txt` or `sitemap.xml`
Confirmed absent: no `public/robots.txt`, `public/sitemap.xml`, `app/robots.ts`, or `app/sitemap.ts`. Lighthouse's SEO category doesn't penalize this for a single-page site (hence the 100 score), but crawlers still benefit from an explicit sitemap/robots policy, and it costs almost nothing to add here since Next 15 supports both as simple file-based route handlers.
- **Fix**: add `app/robots.ts` and `app/sitemap.ts`, both reading `NEXT_PUBLIC_SITE_URL` (falls back gracefully once item 2 is fixed).
- Effort: S.
- **Done**: `app/robots.ts` and `app/sitemap.ts` added, both reading `NEXT_PUBLIC_SITE_URL` with a `localhost:3000` fallback consistent with `lib/seo.ts`. Verified serving correctly (`/robots.txt`, `/sitemap.xml`). URLs will automatically become correct once item 2's env var is set — no further code change needed.

### 4. Three real accessibility failures (score 93/100 on both mobile and desktop, same 3 causes) — DONE, now 100/100
All from Lighthouse's `accessibility` category, `scoreDisplayMode: FAIL` (not just an opportunity):
- **`aria-prohibited-attr`**: the reviews-carousel star rating uses `<div aria-label="5 od 5 zvezdica">` with no valid ARIA role — `aria-label` on a plain `<div>` is dropped by assistive tech. **Fix applied**: added `role="img"` to that div in `components/ReviewsCarousel.tsx`.
- **`label-content-name-mismatch`**: the "SR"/"EN" language-switch buttons (`components/LanguageSwitcher.tsx`, rendered in `TopBar`) had visible text "SR" but `aria-label="Switch to Српски"` — the accessible name didn't contain the visible label text. **Fix applied**: `aria-label` now reads `"SR — Switch to Српски"` (visible text prefixed).
- **`color-contrast`**: three separate root causes, all fixed:
  - The top-bar phone/CTA text and the selected language pill were white text on `bg-accent`, at 4.49:1 (just under the 4.5 AA threshold). **Fix**: darkened `--accent` from `193 86% 34%` to `193 86% 30%` in `app/globals.css` (verified new contrast ≈5.5:1). This is a small, sitewide brand-color shift — worth a visual sanity check by whoever owns the design.
  - The unselected "EN"/"SR" button text used `text-accent-foreground/70` (a semi-transparent white), giving only 3.06:1 against the top bar's tinted background. **Fix**: made the text fully opaque in `components/LanguageSwitcher.tsx` and switched the selected/unselected visual distinction to a background-tint hover state instead of text transparency.
  - The reviewer-quote text and the reviewer-name text (`components/ReviewsCarousel.tsx`) were failing intermittently — **not** a color-token problem. Root cause, found by inspecting live computed styles: `components/ScrollFadeSection.tsx` (which wraps nearly every section on the page — Highlights, Services, WhyChooseUs, Reviews, Gallery, Team, Process, Contact, Map, Footer) dims content down to as low as 20% opacity based on scroll position ("content in viewport center is fully visible; content above/below fades out"). At that opacity, `text-muted-foreground` (used for captions/names sitewide) drops from a safe 7.2:1 baseline contrast to as low as ~3.1:1 — a real, reproducible failure any time a wrapped section isn't scrolled to center, not a one-off Lighthouse timing artifact. **Fix**: raised the opacity floor in `ScrollFadeSection.tsx` from `0.2` to `0.85` (computed/verified: `0.85` keeps `text-muted-foreground` at ≥4.5:1 against white; lower values do not). This mutes the scroll-fade visual effect considerably — it's now a subtle 85–100% opacity swing rather than 20–100%. If the design intent for that effect is important to preserve more strongly, an alternative would be scoping the fade to decorative/background elements only rather than applying it above running text.
- Effort: S (all ended up being CSS/markup-only fixes, no structural changes), though the third one required live inspection to find the real cause rather than being a surface-level fix.

## Medium priority

### 5. `unused-javascript` — 62KB (60%) of one shared chunk is unused on this page
Lighthouse's `unused-javascript` audit flags `_next/static/chunks/558-*.js` (107KB) with 63.9KB (59.6%) unused/wasted bytes, on both mobile and desktop. Given the dependency set (`framer-motion`, `lucide-react`, `focus-trap-react`, `react-hook-form`/`zod`), this is likely an icon or motion-library chunk pulling in more than this single page uses.
- **Fix**: audit `lucide-react` imports for named vs. default/barrel imports (barrel imports can defeat tree-shaking), and confirm `framer-motion` isn't importing the full animation engine where `LazyMotion`/`m` would do. Not urgent given the page is already fast, but worth a pass since it's a repeatable savings on every load.
- Effort: M (needs a bundle-analyzer pass, e.g. `@next/bundle-analyzer`, to identify exact culprits before changing imports).

### 6. Structured data (JSON-LD) is present but incomplete
`lib/seo.ts:42-61` (`buildLocalBusinessJsonLd`) emits `@type: ["Dentist","LocalBusiness"]` with `name`, `address` (a single `streetAddress` string, no `addressLocality`/`addressCountry`/`postalCode`), `telephone`, `openingHours`, `url`, `sameAs`. It's missing `image` (Google's LocalBusiness rich-result guidelines recommend it, and `seo.ogImage` already exists in `SiteData` to supply it) and `priceRange`/geo coordinates, which are optional but commonly requested by Google's rich-result validator.
- **Fix**: split `clinic.address` into structured fields in `lib/siteData.ts`/`lib/translations.ts` (or at minimum pass `addressCountry`), and add `image: data.seo.ogImage` to the JSON-LD payload.
- Effort: S–M (touches the `ClinicInfo` type and both locale files).
- **Partially done**: `lib/seo.ts` now sets `addressCountry: "RS"` (inferred from the existing Belgrade address and `+381` phone country code — safe, doesn't need the site's own domain). `image` is wired up too, but only resolves when `NEXT_PUBLIC_SITE_URL` is set (needs an absolute URL) — it'll populate automatically once item 2 is done. Splitting `address` into full structured fields (`addressLocality`, etc.) is still open — left as-is since it'd change the `ClinicInfo` type and both locale files, and the single `streetAddress` string already covers the "Kralja Petra 12, Beograd" case adequately for a v1 fix.

### 7. No CI and no `typecheck`/test scripts
`package.json` has `dev`/`build`/`start`/`lint` only — no `typecheck`, no test runner, and there's no `.github/workflows`. `next build` does run the TypeScript compiler as part of its pipeline, so type errors aren't silently shipped, but there's no fast standalone typecheck for local iteration, and nothing blocks a broken build from being merged before someone runs `npm run build` locally.
- **Fix**: add `"typecheck": "tsc --noEmit"` to `package.json`, and a minimal GitHub Actions workflow running `npm run lint && npm run typecheck && npm run build` on PRs.
- Effort: S.
- **Done**: `typecheck` script added to `package.json`; `.github/workflows/ci.yml` added, running lint → typecheck → build on every PR and push to `main`/`master`.

### 8. Unoptimized/duplicated source images in `public/images`
19MB of source images, several 1.5–2.6MB JPEGs (`estetska.jpg` 2.6MB, `gallery5.jpg`/`gallery3.jpg` ~2.4–2.6MB, `smile.jpg` 2.2MB, `gallery8.jpg` 2.1MB, `gallery4.jpg` 1.6MB). `next/image` re-encodes these per-request at build/request time (confirmed: all `<Image>` usages, no raw `<img>`), so end users aren't served the full 2.6MB files — Lighthouse's `uses-responsive-images` audit does flag two gallery thumbnails (`gallery3.jpg`, `gallery6.jpg`) as 82.7% oversized for their rendered size (~16-30KB wasted). Confirmed separately: `hero.jpg` and `hero-poster.jpg` are byte-identical (same MD5) — one is dead weight.
- **Fix**: delete the unused duplicate of `hero.jpg`/`hero-poster.jpg` (check which filename is actually referenced before deleting), pre-compress the source JPEGs (they don't need to be full quality at rest since Next re-encodes anyway, but smaller originals mean faster builds/git operations), and double check `sizes` on the two flagged gallery images matches their actual rendered width.
- Effort: S.
- **Partially done**: `git grep` confirmed neither `hero.jpg` nor `hero-poster.jpg` is referenced anywhere in the codebase at all (the actual hero poster uses `smile.jpg`) — both were entirely dead files, not "one is a fallback for the other." Both deleted (540KB). Pre-compressing the remaining large source JPEGs is still open — that needs an image tool this environment didn't have available; the `next/image` re-encoding at request time already protects end users from the full file size in the meantime, so this is a repo-hygiene/build-speed improvement, not a live-site risk.

## Low priority / nice-to-have

### 9. `errors-in-console` — 404 on `/favicon.ico`
Lighthouse's `best-practices` category fails this audit: the browser requests `/favicon.ico` (browser default behavior) but only a Next.js `app/icon` or `public/favicon.ico` covers that path if present — currently missing, producing a console 404 on every load.
- **Fix**: add a `public/favicon.ico` (or `app/icon.png`/`app/favicon.ico` per Next 15's file-based metadata icons).
- Effort: XS.
- **Done**: added `app/icon.png` and `app/favicon.ico` — a generated placeholder monogram ("D" on the site's accent teal) since no logo asset exists in the repo. Verified both serve 200. This is a placeholder, not a real brand mark — swap it for an actual logo when one exists.

### 10. Tailwind v3 → v4
Currently on `tailwindcss ^3.4.17`; v4 exists with a simplified config (CSS-first config, no `tailwind.config.ts` needed) and performance improvements. Not broken today, no urgency — schedule opportunistically since it may require re-verifying the custom CSS-var-based theme in `app/globals.css` + `tailwind.config.ts` still forms correctly. Effort: M.

### 11. No deploy-as-code (`vercel.json`)
Deployment today relies entirely on Vercel's implicit Next.js defaults (per `README.md` §7). Fine for a template, but if this becomes a real production site, a `vercel.json` (or at least documenting the required `NEXT_PUBLIC_SITE_URL` env var as a deploy prerequisite, tying into item 2) removes a manual setup step per deploy target. Effort: XS.

### 12. Analytics/consent tooling
No analytics or tracking scripts exist anywhere in the codebase — may be intentional (privacy-first template) but flagging since most real clinic deployments will want conversion tracking on the "Zakažite pregled"/contact CTAs. **Confirm with the site owner before adding anything** — this is a product decision, not a technical gap. Effort: N/A until decided.

## Deferred (not attempted)

- **Item 5** (unused JS, 62KB): needs a bundle-analyzer pass to identify the actual culprit before touching imports — didn't want to guess-and-check on `lucide-react`/`framer-motion` imports without profiling data. Score impact is already small (doesn't move any Lighthouse category).
- **Item 10** (Tailwind v3→v4): bigger, riskier change (touches the whole CSS-variable theme system) — not something to do opportunistically alongside a batch of smaller fixes.
- **Item 11** (`vercel.json`): low value without a concrete deploy target/domain decision already made.
- **Item 12** (analytics): explicitly a product decision for the site owner, not attempted.

## Not flagged (checked, found fine)

- **Image `alt` text**: all 5 `<Image>`/`<img>`-equivalent usages (`Gallery`, `LightboxModal`, `Team`, `Services`, `Hero`) pass data-driven `alt` text from `SiteData`; `Hero`'s `alt=""` is correctly decorative (a background image behind overlaid heading text).
- **Responsive layout**: full-page screenshots at 412px (mobile) and 1350px (desktop) show no overflow, overlap, or broken grids across every section (hero, services grid, gallery grid, team grid, contact form, footer) — Tailwind breakpoint usage (`sm:`/`lg:` prefixes) in `Hero.tsx`, `Gallery.tsx`, etc. is working as intended. Interactive breakpoint testing at 375/768/1024/1440 via live browser resize was attempted but blocked by a window-resize limitation in this environment's browser automation tool; the Lighthouse-captured device-emulated renders above were used as the verification instead.
- **CLS**: 0 on both mobile and desktop — no layout-shift issues.
