# UTS Homepage — Section Division

> Figma link: https://www.figma.com/design/d1RwdsudOXmqlsdQ93rOle/UTS?node-id=145-3892&t=AZNSDdCNjTmCYf6e-0

## ⚠️ Rules (read before you start)

1. **`src/app/page.tsx` is frozen.** Both devs leave it untouched — it already imports every section.
2. **Work only in your own section files** (listed below).
3. **Shared types** go in `src/types/index.ts` — add a comment above your type so the other dev knows.
4. **Images**: put your assets in `public/images/` with a filename that matches your section (e.g. `hero-bg.jpg`, `fleet-business.jpg`).
5. **globals.css**: if you need a global CSS addition, add it at the bottom of the file with a comment marking whose it is.
6. **Commit often** to your own section files — you'll never conflict with each other as long as you respect rule 1–2.

---

## Developer 1 — Sections 1–5 + Navbar

| File | Section | Notes |
|------|---------|-------|
| `src/components/layout/Navbar.tsx` | Navbar | Sticky, transparent-on-hero, dark-on-scroll |
| `src/components/sections/HeroSection.tsx` | Hero | Full-viewport, booking form at bottom |
| `src/components/sections/AboutSection.tsx` | About | "More Than a Ride" + 4-image grid |
| `src/components/sections/AirportTransfersSection.tsx` | Airport Transfers | Dark card with bg image |
| `src/components/sections/FeaturesSection.tsx` | Features | "Luxury, Made Effortless" 4-col |
| `src/components/sections/CityStatsSection.tsx` | City Stats | Dark fullwidth + 4 counters |

---

## Developer 2 — Sections 6–11 + Footer

| File | Section | Notes |
|------|---------|-------|
| `src/components/sections/FleetSection.tsx` | Fleet | Tabs + 3 car cards |
| `src/components/sections/DifferenceSection.tsx` | The Difference | Image mosaic + checklist |
| `src/components/sections/TestimonialsSection.tsx` | Testimonials | 4 review cards |
| `src/components/sections/PromoSection.tsx` | Promo CTA | Dark banner + car image |
| `src/components/sections/AppSection.tsx` | App Download | Phone mockup + badges |
| `src/components/sections/FinalCtaSection.tsx` | Final CTA | "Your Journey. Our Priority." |
| `src/components/layout/Footer.tsx` | Footer | 5-col links + watermark text |

---

## Shared Files (coordinate before editing)

| File | Purpose |
|------|---------|
| `src/types/index.ts` | Shared TypeScript interfaces |
| `src/app/globals.css` | Global styles / Tailwind config |
| `public/images/` | Images (use unique filenames per section) |

---

## Getting started

```bash
cd uts-website
npm install
npm run dev
```

Open http://localhost:3000 — all placeholder sections render immediately.
Each developer then replaces the placeholder content in their own files.
