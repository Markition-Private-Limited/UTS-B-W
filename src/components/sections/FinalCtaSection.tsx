// ─────────────────────────────────────────────
//  SECTION: Final CTA  (Section 11)
//  DEV 2 — implement this component
//
//  Design notes (from Figma):
//  • Full-width dark background with subtle background image / texture
//  • Centered content:
//      - Headline: "YOUR JOURNEY. OUR PRIORITY."
//      - Short subtext
//      - CTA button: "Book a Ride" or "Get a Quote" (light/white outlined)
//  • This is the last content section before the footer
// ─────────────────────────────────────────────

export default function FinalCtaSection() {
  return (
    <section id="contact" className="relative py-32 bg-gray-900 text-white text-center overflow-hidden">

      {/* TODO Dev 2: Optional background image / texture overlay */}

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-bold uppercase leading-tight mb-6">
          Your Journey.<br />Our Priority.
        </h2>
        <p className="text-gray-300 text-sm mb-10">
          {/* TODO Dev 2: fill subtext from Figma */}
          Placeholder subtext — add exact copy from Figma design.
        </p>
        <button className="border border-white text-white text-sm px-8 py-3 rounded hover:bg-white hover:text-black transition-colors">
          Book a Ride
        </button>
      </div>

    </section>
  );
}
