// ─────────────────────────────────────────────
//  SECTION: Footer  (Section 12)
//
//  Design notes (from Figma):
//  • Dark background (near-black)
//  • Top area: 4–5 column link grid
//      Col 1 → Logo + short tagline + social icons
//      Col 2 → "Services" links
//      Col 3 → "Company" links
//      Col 4 → "Quick Links" / Legal
//      Col 5 → "A trip. Inspiration for your next journey" + newsletter or label
//  • Bottom bar: copyright line (left) + small nav links (right)
//  • Very large "UNITED TRAVEL SERVICES" watermark text at the very bottom
//    (low opacity, purely decorative)
// ─────────────────────────────────────────────

const YEAR = 2025;

export default function Footer() {
  const year = YEAR;

  return (
    <footer className="bg-gray-950 text-gray-400 pt-20 pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-16 border-b border-gray-800">

          {/* Col 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-white font-bold text-lg mb-3">United Travel Services</p>
            <p className="text-sm leading-relaxed mb-6">
              {/* TODO: tagline from Figma */}
              Placeholder tagline.
            </p>
            {/* TODO: Social icons */}
            <div className="flex gap-4 text-gray-500 text-sm">
              <a href="#">FB</a>
              <a href="#">IG</a>
              <a href="#">TW</a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              {/* TODO: fill links from Figma */}
              <li><a href="#" className="hover:text-white transition-colors">Airport Transfers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">City Rides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corporate Travel</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              {/* TODO: fill links from Figma */}
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Fleet</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 4: Legal / Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {/* TODO: fill links from Figma */}
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Col 5: Journey Inspiration */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              A trip. Inspiration for your next journey.
            </h4>
            {/* TODO: fill content from Figma — newsletter input or descriptive text */}
            <p className="text-sm">Placeholder — add content from Figma.</p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {year} United Travel Services. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookies</a>
          </div>
        </div>

      </div>

      {/* Large Watermark Text */}
      <div className="mt-8 overflow-hidden select-none pointer-events-none">
        <p className="text-[80px] md:text-[140px] font-black uppercase text-white/[0.03] whitespace-nowrap leading-none text-center">
          United Travel Services
        </p>
      </div>

    </footer>
  );
}
