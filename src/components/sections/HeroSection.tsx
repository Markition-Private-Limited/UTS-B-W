// ─────────────────────────────────────────────
//  SECTION: Hero  (Section 1)
//
//  Design notes (from Figma):
//  • Full-viewport-height dark overlay over city/car night photo
//  • Headline: "YOUR JOURNEY DESERVES MORE THAN A RIDE"
//  • Subtext: short description line beneath headline
//  • Booking search bar at the bottom of the hero:
//    fields → From, To, Date, Time, Vehicle Type + "Search" button
//  • Scroll-down indicator at very bottom center
// ─────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-white text-center bg-gray-900"
    >
      {/* TODO: Add background image with dark overlay */}

      <div className="relative z-10 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold uppercase leading-tight mb-4">
          Your Journey Deserves More Than a Ride
        </h1>
        <p className="text-lg text-gray-300 mb-12">
          {/* TODO: Add subtitle from Figma */}
          Discover a new-standard way to travel.
        </p>
      </div>

      {/* Booking Form Bar */}
      <div className="relative z-10 w-full max-w-5xl px-6">
        {/* TODO: Build booking search form with From / To / Date / Time / Vehicle Type + Search */}
        <div className="bg-white rounded-lg p-4 flex flex-wrap gap-4 items-center justify-between">
          <input className="flex-1 min-w-[120px] border rounded px-3 py-2 text-black text-sm" placeholder="From" />
          <input className="flex-1 min-w-[120px] border rounded px-3 py-2 text-black text-sm" placeholder="To" />
          <input className="flex-1 min-w-[120px] border rounded px-3 py-2 text-black text-sm" type="date" />
          <input className="flex-1 min-w-[120px] border rounded px-3 py-2 text-black text-sm" type="time" />
          <select className="flex-1 min-w-[120px] border rounded px-3 py-2 text-black text-sm">
            <option>Vehicle Type</option>
          </select>
          <button className="bg-black text-white px-6 py-2 rounded text-sm whitespace-nowrap">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
