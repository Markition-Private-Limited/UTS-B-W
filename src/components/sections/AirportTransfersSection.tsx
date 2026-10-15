// ─────────────────────────────────────────────
//  SECTION: Airport Transfers  (Section 3)
//
//  Design notes (from Figma):
//  • Dark / near-black background (card-style, rounded corners)
//  • Small eyebrow label top-left
//  • Large headline: "AIRPORT TRANSFERS"
//  • Short descriptive paragraph beneath
//  • CTA button: "Go to Airport Transfers →" (outlined/white)
//  • Background: dark texture or dark photo overlay on the right side
//  • Sits between About section and Features section
// ─────────────────────────────────────────────

export default function AirportTransfersSection() {
  return (
    <section id="airport-transfers" className="py-8 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* TODO: Dark card with background image overlay */}
        <div className="bg-gray-900 text-white rounded-2xl p-12 md:p-16 relative overflow-hidden min-h-[320px] flex flex-col justify-end">

          {/* TODO: Add background image on the right half */}

          <div className="relative z-10 max-w-lg">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
              {/* TODO: eyebrow label from Figma */}
              Our Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4">
              Airport Transfers
            </h2>
            <p className="text-gray-300 text-sm mb-8 leading-relaxed">
              {/* TODO: fill copy from Figma */}
              Enjoy a seamless, elegant journey with professionally dispatched chauffeurs.
            </p>
            <button className="border border-white text-white text-sm px-6 py-3 rounded hover:bg-white hover:text-black transition-colors">
              Go to Airport Transfers →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
