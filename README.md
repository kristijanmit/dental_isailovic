# Dental Clinic Landing Template (Next.js App Router)

A production-ready, mobile-first single-page dental clinic website template optimized for **Vercel Free** deployment.

## 1) Quickstart

Prerequisite: **Node.js 18.18+** (or Node 20+ recommended).

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production commands:

```bash
npm run lint
npm run build
npm run start
```

## 2) File Structure Overview

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  TopBar.tsx
  Navbar.tsx
  Hero.tsx
  Highlights.tsx
  Services.tsx
  WhyChooseUs.tsx
  ReviewsCarousel.tsx
  Gallery.tsx
  LightboxModal.tsx
  Team.tsx
  Process.tsx
  Contact.tsx
  MapEmbed.tsx
  Footer.tsx
  Section.tsx
hooks/
  useReducedMotion.ts
  useCountUp.ts
lib/
  siteData.ts
  motion.ts
  schema.ts
  seo.ts
  utils.ts
public/
  images/
    smile.jpg
    gallery1.jpg ... gallery8.jpg
    team1.jpg ... team4.jpg
```

## 3) Customization (`lib/siteData.ts`)

All clinic-specific content is centralized in `lib/siteData.ts`.

Edit these keys to reuse for a different clinic:

- `clinic`: name, phone, WhatsApp, address, email, opening hours, maps URL, socials.
- `seo`: title, description, OG image.
- `nav`: anchor links.
- Section copy: hero, highlights, services, why-choose-us, reviews, gallery, team, process, contact, map, footer.
- Arrays: `services`, `reviews`, `gallery`, `team`, `process`.

No backend values are required.

## 4) Functionality A–H (Technical)

### A) Sticky header + anchor navigation + scroll behavior

- **What**: sticky top bar + sticky navbar with in-page anchor navigation.
- **Where**: `components/TopBar.tsx`, `components/Navbar.tsx`, `components/Section.tsx`, `app/globals.css`.
- **How**:
  - `TopBar` uses `sticky top-0`.
  - `Navbar` uses `sticky top-10`.
  - Each section uses `.section-anchor` (`scroll-margin-top`) to offset anchors under sticky headers.
  - Mobile menu supports toggle, close on link click, close on ESC.
  - Focus handling: moves into first mobile link when opened, returns to toggle when closed.
- **A11y**:
  - `aria-expanded`, `aria-controls`, `aria-label` on menu button.
- **Modify**:
  - Update links in `siteData.nav`.
  - Change offset in `.section-anchor` in `app/globals.css`.

### B) Services expand/collapse

- **What**: accessible “Learn more / Show less” details per service card.
- **Where**: `components/Services.tsx`.
- **How**:
  - Per-card state map keyed by `service.id`.
  - Toggle button controls panel via `aria-controls` and `aria-expanded`.
  - Animated open/close using CSS grid row transition.
- **A11y**:
  - Real `<button>` controls + linked content region IDs.
  - Motion disabled with `motion-reduce` classes + global reduced-motion CSS.
- **Modify**:
  - Edit service list and labels in `siteData.services` and `siteData.servicesSection`.

### C) Reviews carousel (no library)

- **What**: manual carousel with arrows, dots, keyboard support, and swipe.
- **Where**: `components/ReviewsCarousel.tsx`.
- **How**:
  - State index with `prev/next` wrapping.
  - Dots jump to exact review.
  - `onPointerDown`/`onPointerUp` threshold for swipe.
  - `onKeyDown` handles ArrowLeft/ArrowRight when container is focused.
  - No auto-advance.
  - `min-h` avoids layout jumping.
- **A11y**:
  - Focusable carousel container (`tabIndex={0}`) and labeled controls.
- **Modify**:
  - Update reviews in `siteData.reviews`.

### D) Gallery grid + lightbox modal

- **What**: responsive gallery with modal lightbox.
- **Where**: `components/Gallery.tsx`, `components/LightboxModal.tsx`.
- **How**:
  - Grid thumbnails with `next/image` and lazy loading.
  - Modal with `focus-trap-react`, close/prev/next controls.
  - ESC + arrow keys supported.
  - Body scroll locked while open.
  - Focus restores to opening thumbnail on close.
- **A11y**:
  - `role="dialog"`, `aria-modal="true"`, close button label, trapped focus.
- **Modify**:
  - Replace gallery entries in `siteData.gallery`; replace actual files in `public/images`.

### E) Appointment booking (Google Calendar embed, falls back to contact form)

- **What**: when configured, an inline Google Calendar "Appointment schedule" booking page — visitors pick a slot and book directly into the clinic's real Google Calendar, without leaving the page. No backend, no third-party account beyond Google. When not configured, falls back to the original validated contact form (client-only, no network request).
- **Where**: `components/Contact.tsx` (a plain `<iframe>` for booking; `lib/schema.ts` + `react-hook-form` for the fallback form).
- **How**:
  - Reads `NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL` at build time and, if set, renders it as an iframe. It's a static Google-hosted page — no JS SDK, fully compatible with `output: "export"` (Cloudflare Pages, see §7b).
  - If the env var is missing, renders the contact form instead, so the site is still fully usable before Google Calendar is configured.
  - Contact form: `react-hook-form` + `zod` via `zodResolver`, inline errors, local success summary (no API request), `Copy message` via Clipboard API, `Send via Email` generates a prefilled `mailto:`.
  - Quick actions column unchanged either way: `tel:` and `https://wa.me/<number>`, plus address/hours.
  - Google Calendar's own UI language follows the visitor's browser language (not configurable from our side) — same caveat applies to any third-party embed.
- **Setup** (one-time, free on a personal Google account):
  1. In Google Calendar, click **Create → Appointment schedule**, set duration/availability.
  2. In **Share your booking page → Website embed**, copy the iframe `src` URL (looks like `https://calendar.google.com/calendar/appointments/schedules/<SCHEDULE_ID>?gv=true`).
  3. Set `NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL` to that URL in your deployment env (see §7).
- **Modify**:
  - Edit copy in `siteData.contactSection`.
  - Iframe height/sizing: `components/Contact.tsx`.
  - Form validation rules: `lib/schema.ts`.

### F) Performance (Vercel/CDN friendly)

- **What**: lightweight bundle and static-friendly structure.
- **Where**: whole project.
- **How**:
  - Local images with `next/image` from `/public/images`.
  - No backend APIs, no DB, no server actions.
  - Minimal dependency set (no heavy UI kits).
  - System font stack to avoid extra font payload.
- **Modify**:
  - Keep interactive logic isolated to components that need `"use client"`.

### G) SEO + metadata + social preview

- **What**: metadata + OG/Twitter + JSON-LD LocalBusiness/Dentist.
- **Where**: `lib/seo.ts`, `app/layout.tsx`, `lib/siteData.ts`.
- **How**:
  - Metadata API from `buildMetadata(siteData)`.
  - Canonical only when `NEXT_PUBLIC_SITE_URL` exists.
  - JSON-LD script injected in layout using values from `siteData`.
- **A11y/SEO**:
  - Single `<h1>` in `Hero`, semantic heading progression elsewhere.
- **Modify**:
  - Update `siteData.seo` and `siteData.clinic` fields.

### H) Motion & animations (Framer Motion)

- **What**: Premium, clinical animations across all sections. Respects `prefers-reduced-motion`.
- **Where**: `lib/motion.ts`, `hooks/useReducedMotion.ts`, `hooks/useCountUp.ts`, all section components.
- **How**:
  - **Tuning**: Edit `lib/motion.ts` for durations (`duration.fast`, `duration.normal`, etc.), easing (`easeOut`, `easeInOut`), and viewport thresholds (`viewportDefaults.amount`, `viewportDefaults.margin`).
  - **Reduced motion**: `useReducedMotion()` detects `prefers-reduced-motion: reduce`. When true, animations are replaced with simple opacity fades or disabled (parallax, count-up, shake).
  - **Variants**: Reusable `fadeUp`, `fadeIn`, `scaleIn`, `slideIn`, `staggerContainer` in `lib/motion.ts`. Use `getVariants(reduceMotion, full, reduced)` to switch automatically.
- **Modify**:
  - Adjust `duration` and `easeOut` in `lib/motion.ts` for global timing.
  - Change `viewportDefaults.amount` (0–1) to trigger animations earlier/later on scroll.

### I) Accessibility baseline

- **What**: baseline a11y across navigation, forms, modal, and interactions.
- **Where**: `app/globals.css` + interactive components.
- **How**:
  - Visible focus outlines via `:focus-visible`.
  - Proper labels, ARIA attributes, keyboard support.
  - Reduced-motion support in global CSS and component transitions.
  - Modal focus trapping and focus restoration.
- **Modify**:
  - Tune focus styling in `app/globals.css` and component class names.

## 5) Motion System Details

### What was added

- **framer-motion** for component-level animations.
- **lib/motion.ts**: Central easing, durations, variants (`fadeUp`, `fadeIn`, `scaleIn`, `slideIn`, `staggerContainer`), and `getVariants()` for reduced-motion switching.
- **hooks/useReducedMotion.ts**: Detects `prefers-reduced-motion: reduce` for accessibility.
- **hooks/useCountUp.ts**: Lightweight count-up for stats (e.g. "7000+"), disabled when reduced-motion is set.
- Section-specific animations: TopBar/Navbar entrance, Hero sequence + parallax + CTA shine, Highlights/Services/WhyChooseUs viewport stagger, Reviews carousel transitions, Gallery grid + lightbox, Team/Process/Contact/Map/Footer entrance and micro-interactions.

### How to tune motion

- **Durations**: In `lib/motion.ts`, adjust `duration.fast` (0.2s), `duration.normal` (0.35s), `duration.slow` (0.5s).
- **Easing**: Change `easeOut`, `easeInOut`, or `easeOutExpo` for different feels.
- **Viewport triggers**: `viewportDefaults.amount` (0.2 = 20% visible) and `viewportDefaults.margin` control when `whileInView` fires.

### How reduced-motion works

- `useReducedMotion()` reads `window.matchMedia("(prefers-reduced-motion: reduce)")`.
- When true: parallax off, count-up off, all motion replaced with opacity fades or no animation.
- Each component uses `getVariants(reduceMotion, fullVariants, reducedVariants)` to pick the right behavior.

## 6) Performance Notes (Why Vercel-Friendly)

- Uses standard `next build` output; no custom server.
- All critical content is static or client-rendered locally.
- No runtime filesystem access.
- No long-running/server-side background tasks.
- Uses only `/public/images` assets and optimized `next/image` rendering.

## 7) Vercel Free Deployment Notes

1. Push repository to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. Keep default Next.js settings.
4. Deploy.

Optional env vars:

- `NEXT_PUBLIC_SITE_URL=https://your-domain.com` — enables canonical/absolute metadata URL behavior.
- `NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL=https://calendar.google.com/calendar/appointments/schedules/your-schedule-id?gv=true` — enables the Google Calendar booking widget (see §4E). Without it, the Contact section falls back to the contact form.

The project works without these; each just enables its respective feature.

## 7b) Free Staging/Testing Deployments (not prod)

For sharing a preview link without a Vercel deploy, the app also builds as a static export:

**Cloudflare Pages** (manual deploy, live at https://dental-isailovic.pages.dev):

```bash
CF_PAGES=1 npm run build
npx wrangler pages deploy out --project-name dental-isailovic --branch main
```

This is gated behind the `CF_PAGES` env var in `next.config.ts`, so local `npm run dev`/`npm run build` are unaffected. Static export disables `next/image` optimization (`unoptimized: true`) since there's no image server on this host.

## 8) Official Sources / Docs

- Next.js App Router docs: https://nextjs.org/docs/app
- App Router routing fundamentals: https://nextjs.org/docs/app/building-your-application/routing
- Metadata API: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- `next/image`: https://nextjs.org/docs/app/building-your-application/optimizing/images
- Deployment on Vercel: https://nextjs.org/docs/app/building-your-application/deploying
- Vercel Next.js deployment: https://vercel.com/docs/frameworks/nextjs
- Tailwind Next.js guide: https://tailwindcss.com/docs/guides/nextjs
- react-hook-form: https://react-hook-form.com/get-started
- zod: https://zod.dev/
- @hookform/resolvers: https://github.com/react-hook-form/resolvers
- focus-trap-react: https://github.com/focus-trap/focus-trap-react
- lucide-react: https://lucide.dev/guide/packages/lucide-react
- framer-motion: https://www.framer.com/motion/
