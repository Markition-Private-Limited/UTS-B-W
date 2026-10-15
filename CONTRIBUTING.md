# Contributing to uts-blue

## Hero page — who owns what

| File | Owner | What to change |
|------|-------|----------------|
| `src/content/hero.content.ts` | Either | Copy, headlines, CTA labels, badge text |
| `src/components/hero/HeroSection.tsx` | Layout dev | Two-column layout, spacing, section wrapper |
| `src/components/hero/HeroHeadline.tsx` | Either | Headline typography and structure |
| `src/components/hero/HeroCTA.tsx` | Either | Button styles and link behaviour |
| `src/components/hero/HeroBadge.tsx` | Either | Badge pill appearance |
| `src/components/hero/HeroImage.tsx` | Either | Image treatment, aspect ratio, border radius |
| `src/types/hero.ts` | Either | Add/change content shape (coordinate first) |

## Ground rules to avoid merge conflicts

1. **Content lives in `hero.content.ts`** — never hardcode strings in components.
2. **One component per PR** when making visual changes to avoid overlapping diffs.
3. **Format before committing** — `npm run format` auto-sorts Tailwind classes so diffs stay clean.
4. Discuss type changes in `hero.ts` before touching them — both files import from there.

## Scripts

```bash
npm run dev       # start dev server on :3000
npm run build     # production build
npm run lint      # ESLint
npm run format    # Prettier (add to package.json scripts below)
```
