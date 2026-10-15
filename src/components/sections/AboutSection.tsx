// ─────────────────────────────────────────────
//  SECTION: About  (Section 2)
//
//  Design notes (from Figma):
//  • White background
//  • Eyebrow label (small caps) above headline
//  • Headline: "MORE THAN A RIDE. A BETTER WAY TO TRAVEL."
//  • Two-column body text paragraph beneath headline
//  • Image mosaic grid (4 images):
//    Row 1 → [wide landscape image] [portrait image]
//    Row 2 → [portrait image]       [wide landscape image]
//  • Subtle section label "United Travel Services" in small text top-right
// ─────────────────────────────────────────────

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Text Block */}
        <div className="max-w-3xl mb-16">
          {/* TODO: eyebrow small-caps label */}
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">About Us</p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-tight mb-6">
            More Than a Ride.<br />A Better Way to Travel.
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-600 text-sm leading-relaxed">
            <p>
              {/* TODO: fill copy from Figma */}
              Placeholder paragraph one — add exact copy from Figma design.
            </p>
            <p>
              {/* TODO: fill copy from Figma */}
              Placeholder paragraph two — add exact copy from Figma design.
            </p>
          </div>
        </div>

        {/* Image Grid */}
        {/* TODO: Replace placeholders with actual Figma images */}
        <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[480px]">
          <div className="col-span-2 bg-gray-200 rounded-lg" />
          <div className="row-span-2 bg-gray-300 rounded-lg" />
          <div className="bg-gray-200 rounded-lg" />
          <div className="bg-gray-100 rounded-lg" />
        </div>

      </div>
    </section>
  );
}
