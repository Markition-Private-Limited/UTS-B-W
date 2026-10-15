import type { FooterContent } from "@/types/footer";

// ─── EDIT THIS FILE TO UPDATE FOOTER COPY ─────────────────────────────────────
// Layout and styling live in src/components/footer/ — touch this file for text only.

export const footerContent: FooterContent = {
  logo: "Logo",
  description:
    "United Travel Services provides professional chauffeur and private transportation services for business and leisure travel. With a focus on comfort, punctuality and customer care, we make every journey a more comfortable experience.",
  quickLinksHeading: "Quick Links",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Our Fleets", href: "/fleets" },
    { label: "Contact Us", href: "/contact" },
  ],
  servicesHeading: "Our Services",
  services: [
    { label: "City to City", href: "/services/city-to-city" },
    { label: "Hourly Chauffeur", href: "/services/hourly-chauffeur" },
    { label: "City Trip", href: "/services/city-trip" },
    { label: "Day Service", href: "/services/day-service" },
    { label: "Airport Transfer Service", href: "/services/airport-transfer" },
  ],
  newsletter: {
    heading: "Newsletter",
    placeholder: "Enter Your E-mail",
    note: "***Subscribe to receive updates latest rental deals directly in your inbox.",
  },
  copyright: "Copyright © 2026 All Rights Reserved.",
  socials: [
    { name: "facebook", href: "https://facebook.com" },
    { name: "linkedin", href: "https://linkedin.com" },
    { name: "twitter", href: "https://twitter.com" },
    { name: "instagram", href: "https://instagram.com" },
  ],
};
