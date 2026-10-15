// ─────────────────────────────────────────────
//  SECTION: Promo / Dark CTA Banner  (Section 9)
//
//  Design notes (from Figma):
//  • Full-width dark background (near black)
//  • Left content:
//      - Eyebrow label (small, gray)
//      - Headline: "LUXURY CHAUFFEUR SERVICE"
//      - Short paragraph
//      - CTA button "Book a Ride" (white/outlined)
//  • Right side: large car image (Rolls-Royce / premium sedan)
//    bleeding to the right edge with no padding
//  • Overall feel: bold, premium, high-contrast
// ─────────────────────────────────────────────

export default function PromoSection() {
  return (
    <section id="promo" className="bg-gray-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
            {/* TODO: eyebrow label from Figma */}
            Premium Service
          </p>
          <h2 className="text-4xl md:text-6xl font-bold uppercase leading-tight mb-6">
            Luxury Chauffeur Service
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-sm">
            {/* TODO: fill paragraph from Figma */}
            Placeholder paragraph — add exact copy from Figma design.
          </p>
          <button className="border border-white text-white text-sm px-8 py-3 rounded hover:bg-white hover:text-black transition-colors">
            Book a Ride
          </button>
        </div>

        {/* Right: Car Image */}
        {/* TODO: Replace with actual car image from Figma / assets */}
        <div className="h-72 md:h-96 bg-gray-800 rounded-xl flex items-center justify-center text-gray-600 text-sm">
          [Car image — replace with Next.js Image]
        </div>

      </div>
    </section>
  );
}
