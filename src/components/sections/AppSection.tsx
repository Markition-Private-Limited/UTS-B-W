// ─────────────────────────────────────────────
//  SECTION: App Download  (Section 10)
//
//  Design notes (from Figma):
//  • White / light background
//  • Two-column layout:
//      LEFT  → content block
//        - Eyebrow label
//        - Headline: "UNITED TRAVEL SERVICES, NOW IN YOUR POCKET."
//        - Short paragraph describing the app
//        - App store badges: App Store + Google Play
//      RIGHT → phone mockup image (app screenshot inside device frame)
//  • Phone mockup shows the "Plan Your Journey" app UI
// ─────────────────────────────────────────────

export default function AppSection() {
  return (
    <section id="app" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            {/* TODO: eyebrow label from Figma */}
            Mobile App
          </p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-tight mb-6">
            United Travel Services,<br />Now In Your Pocket.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
            {/* TODO: fill paragraph from Figma */}
            Placeholder paragraph — add exact copy from Figma design.
          </p>

          {/* App Store Badges */}
          {/* TODO: Replace placeholders with actual badge images / SVGs */}
          <div className="flex gap-4 flex-wrap">
            <a
              href="#"
              className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg text-sm"
            >
              {/* Apple icon placeholder */}
              <span>🍎</span>
              <span>App Store</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg text-sm"
            >
              {/* Google Play icon placeholder */}
              <span>▶</span>
              <span>Google Play</span>
            </a>
          </div>
        </div>

        {/* Right: Phone Mockup */}
        {/* TODO: Replace with actual phone mockup image */}
        <div className="flex justify-center">
          <div className="w-64 h-[520px] bg-gray-100 rounded-3xl border-4 border-gray-300 flex items-center justify-center text-gray-400 text-sm text-center px-4">
            [Phone mockup — replace with Next.js Image]
          </div>
        </div>

      </div>
    </section>
  );
}
