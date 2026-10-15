// ─────────────────────────────────────────────
//  Shared types for UTS Homepage
//  Add new types here so both devs stay in sync
// ─────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface CarCard {
  id: string;
  category: "first-class" | "business" | "luxury-suv";
  name: string;
  description: string;
  imageUrl: string;
  priceFrom?: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  avatarUrl?: string;
}

export interface DifferencePoint {
  title: string;
  description: string;
}
