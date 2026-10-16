# UTS Homepage — Sections & Structure

> Figma: https://www.figma.com/design/d1RwdsudOXmqlsdQ93rOle/UTS?node-id=145-3892&t=AZNSDdCNjTmCYf6e-0

## ⚠️ Scaling convention: use `vw`, not fixed `px`

The Figma frame is 1920px wide. If you copy Figma px values straight into Tailwind
(`text-[25px]`, `pt-[90px]`, etc.) the layout only looks right at exactly 1920px —
on a smaller browser window it looks cramped/oversized compared to Figma.

Instead, convert every Figma px value to `vw` against the 1920 baseline:

```
vw = px / 1920 * 100
```

Example: a 25px heading → `25 / 1920 * 100 = 1.3021vw` → `text-[1.3021vw]` (or
`style={{ fontSize: "1.3021vw" }}` since Tailwind arbitrary values don't always
play well with dynamic values).

Apply this to font-size, padding, margin, and gap. Things that already scale
naturally don't need conversion: `letter-spacing` in `em`, `line-height` as a
unitless ratio (e.g. `1.4` not `20px`), border widths, and small fixed icon sizes.

See `src/components/layout/Footer.tsx` and `src/components/sections/FinalCtaSection.tsx`
for reference implementations.

---

## ⚠️ One rule to avoid all merge conflicts

**`src/app/page.tsx` is frozen — do not edit it.**
It already imports and renders every section. Both developers just work inside their section files.
Two people can never conflict as long as they don't edit the same file at the same time.

---

## All sections (pick any, work freely)

| # | Section | File |
|---|---------|------|
| — | Navbar | `src/components/layout/Navbar.tsx` |
| 1 | Hero (full-viewport + booking form) | `src/components/sections/HeroSection.tsx` |
| 2 | About ("More Than a Ride") | `src/components/sections/AboutSection.tsx` |
| 3 | Airport Transfers (dark card) | `src/components/sections/AirportTransfersSection.tsx` |
| 4 | Features ("Luxury, Made Effortless") | `src/components/sections/FeaturesSection.tsx` |
| 5 | City Stats (dark fullwidth + counters) | `src/components/sections/CityStatsSection.tsx` |
| 6 | Fleet (tabs + car cards) | `src/components/sections/FleetSection.tsx` |
| 7 | The Difference (image mosaic + checklist) | `src/components/sections/DifferenceSection.tsx` |
| 8 | Testimonials (4 review cards) | `src/components/sections/TestimonialsSection.tsx` |
| 11 | Final CTA ("Your Journey. Our Priority.") | `src/components/sections/FinalCtaSection.tsx` |
| — | Footer (5-col links + watermark) | `src/components/layout/Footer.tsx` |

---

## Shared files (coordinate before editing)

| File | Purpose |
|------|---------|
| `src/types/index.ts` | Shared TypeScript interfaces |
| `src/app/globals.css` | Global styles / Tailwind base |
| `public/images/` | Images — use descriptive filenames per section |

---

## Getting started

```bash
git clone https://github.com/Markition-Private-Limited/UTS-B-W.git
cd UTS-B-W/uts-website
npm install
npm run dev
```

Open http://localhost:3000 — all placeholder sections render immediately.
Pick a section file, fill in the Figma content, push to `main`.
