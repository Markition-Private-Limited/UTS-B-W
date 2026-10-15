import type { HeroContent } from "@/types/hero";

// ─── EDIT THIS FILE TO UPDATE HERO COPY ───────────────────────────────────────
// Layout and styling live in src/components/hero/ — touch this file for text only.

export const heroContent: HeroContent = {
  badge: "Now in beta",
  headline: "Build something\ngreat together",
  subheadline: "The platform for modern teams",
  description:
    "Uts Blue helps you ship faster, collaborate better, and stay aligned — from first commit to production.",
  cta: [
    { label: "Get started", href: "/signup", variant: "primary" },
    { label: "Learn more", href: "/about", variant: "secondary" },
  ],
  image: {
    src: "/hero-placeholder.png",
    alt: "Product screenshot",
  },
};
