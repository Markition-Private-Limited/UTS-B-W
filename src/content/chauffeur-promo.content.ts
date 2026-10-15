import type { ChauffeurPromoContent } from "@/types/chauffeur-promo";

// ─── EDIT THIS FILE TO UPDATE CHAUFFEUR PROMO COPY ────────────────────────────
// Layout and styling live in src/components/chauffeur-promo/ — touch this file for text only.

export const chauffeurPromoContent: ChauffeurPromoContent = {
  headline: {
    line1: "Luxury",
    line2: "Chauffeur",
    highlight: "Service",
  },
  car: {
    src: "/chauffeur-car.png",
    alt: "Black luxury BMW chauffeur sedan",
  },
  cta: {
    label: "Book Your Journey",
    href: "/booking",
  },
  background: {
    src: "/chauffeur-bg.webp",
    alt: "London skyline over a stylised city map",
  },
};
