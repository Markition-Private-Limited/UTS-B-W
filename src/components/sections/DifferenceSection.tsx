// ─────────────────────────────────────────────
//  SECTION: The Difference  (Section 7)
//  DEV 2 — implement this component
//
//  Design notes (from Figma):
//  • White/light background
//  • Two-column layout:
//      LEFT  → image mosaic (2–3 photos: chauffeur standing, car interior, exterior)
//      RIGHT → content block
//        - Eyebrow label
//        - Headline: "THE DIFFERENCE IS IN EVERY DETAIL."
//        - Short paragraph
//        - Checklist (✓ items):
//            • Professional from the first mile
//            • Punctual, every single time
//            • Comfort is always the priority
//            • (add more from Figma)
//        - CTA button "Book a Ride"
// ─────────────────────────────────────────────

import { DifferencePoint } from "@/types";

const points: DifferencePoint[] = [
  { title: "Professional from the first mile", description: "TODO Dev 2: fill from Figma" },
  { title: "Punctual, every single time",       description: "TODO Dev 2: fill from Figma" },
  { title: "Comfort is always the priority",    description: "TODO Dev 2: fill from Figma" },
  // TODO Dev 2: Add remaining points from Figma
];

export default function DifferenceSection() {
  return (
    <section id="difference" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT: Image mosaic */}
        {/* TODO Dev 2: Replace placeholders with actual images */}
        <div className="grid grid-cols-2 gap-3 h-[520px]">
          <div className="row-span-2 bg-gray-300 rounded-xl" />
          <div className="bg-gray-200 rounded-xl" />
          <div className="bg-gray-100 rounded-xl" />
        </div>

        {/* RIGHT: Content */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-tight mb-6">
            The Difference Is In Every Detail.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            {/* TODO Dev 2: fill paragraph from Figma */}
            Placeholder paragraph — add exact copy from Figma.
          </p>

          <ul className="space-y-4 mb-10">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 text-black font-bold">✓</span>
                <div>
                  <p className="font-semibold text-sm">{point.title}</p>
                  <p className="text-gray-500 text-sm">{point.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <button className="bg-black text-white px-8 py-3 rounded text-sm">
            Book a Ride
          </button>
        </div>

      </div>
    </section>
  );
}
