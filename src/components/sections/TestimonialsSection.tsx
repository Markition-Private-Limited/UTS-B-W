// ─────────────────────────────────────────────
//  SECTION: Testimonials  (Section 8)
//
//  Design notes (from Figma):
//  • Light/off-white background
//  • Centered headline: "REAL JOURNEYS. LASTING IMPRESSIONS."
//  • Short centered subtext
//  • 4 review cards in a row:
//      Each card: avatar/photo, customer name, star rating, review text
//      Cards have subtle border, rounded corners
//  • "Approved customer review" label beneath each card (from Figma)
// ─────────────────────────────────────────────

import { Testimonial } from "@/types";

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Approved customer name to be added",
    review: "Approved customer review to be added",
    rating: 5,
  },
  {
    id: "2",
    name: "Approved customer name to be added",
    review: "Approved customer review to be added",
    rating: 5,
  },
  {
    id: "3",
    name: "Approved customer name to be added",
    review: "Approved customer review to be added",
    rating: 5,
  },
  {
    id: "4",
    name: "Approved customer name to be added",
    review: "Approved customer review to be added",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4">
            Real Journeys.<br />Lasting Impressions.
          </h2>
          <p className="text-gray-500 text-sm">
            {/* TODO: fill subtext from Figma */}
            The experiences you share matter. Here's what our clients say.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">&ldquo;{t.review}&rdquo;</p>
              <p className="text-sm font-semibold">{t.name}</p>
              {/* TODO: Add avatar image */}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
