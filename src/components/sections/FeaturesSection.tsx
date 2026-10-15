// ─────────────────────────────────────────────
//  SECTION: Features / USP  (Section 4)
//  DEV 1 — implement this component
//
//  Design notes (from Figma):
//  • White background
//  • Centered headline: "LUXURY, MADE EFFORTLESS."
//  • Short centered subtext beneath headline
//  • 4-column feature grid (single row):
//      1. "24/7 Online Flat Car"     — icon + title + short desc
//      2. "24/7 Availability"        — icon + title + short desc
//      3. "3+ Comfort Vehicles"      — icon + title + short desc  (middle, highlighted/bordered)
//      4. "We Value the Client"      — icon + title + short desc
//  • CTA button below grid: "Book a Ride" (dark)
// ─────────────────────────────────────────────

import { Feature } from "@/types";

const features: Feature[] = [
  {
    icon: "🚗",
    title: "24/7 Online Flat Car",
    description: "TODO Dev 1: fill description from Figma",
  },
  {
    icon: "🕐",
    title: "24/7 Availability",
    description: "TODO Dev 1: fill description from Figma",
  },
  {
    icon: "🚙",
    title: "3+ Comfort Vehicles",
    description: "TODO Dev 1: fill description from Figma",
  },
  {
    icon: "⭐",
    title: "We Value the Client",
    description: "TODO Dev 1: fill description from Figma",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4">
          Luxury, Made Effortless.
        </h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto mb-16">
          {/* TODO Dev 1: fill subtext from Figma */}
          A seamless chauffeur experience built around you. Designed to be simple.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`p-8 rounded-xl text-left ${
                i === 2
                  ? "border-2 border-black"   // highlighted card
                  : "bg-gray-50"
              }`}
            >
              {/* TODO Dev 1: Replace emoji with proper SVG icons from Figma */}
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <button className="bg-black text-white px-8 py-3 rounded text-sm">
          Book a Ride
        </button>

      </div>
    </section>
  );
}
