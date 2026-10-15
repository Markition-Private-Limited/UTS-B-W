// ─────────────────────────────────────────────
//  SECTION: Navbar
//
//  Design notes (from Figma):
//  • Logo: "United Travel Services" (top-left)
//  • Nav links: Home, About Us, Our Fleet, App, Contact Us
//  • CTA button: "Book a Ride" (top-right, dark/filled)
//  • Transparent over hero, dark on scroll (sticky)
// ─────────────────────────────────────────────

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      {/* TODO: Build Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-white font-bold text-xl">United Travel Services</div>

        <ul className="hidden md:flex gap-8 text-white text-sm">
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#fleet">Our Fleet</a></li>
          <li><a href="#app">App</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>

        <button className="bg-black text-white text-sm px-5 py-2 rounded">
          Book a Ride
        </button>
      </nav>
    </header>
  );
}
