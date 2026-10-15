// ─────────────────────────────────────────────
//  SECTION: City Stats / Banner  (Section 5)
//
//  Design notes (from Figma):
//  • Full-width dark background with city/driving photo overlay (very dark)
//  • Left side: large headline "THE CITY MOVES. YOU TRAVEL AT EASE."
//  • Right side / bottom row: 4 stat counters in a horizontal strip
//      1. "Professional Chauffeurs" — number + label
//      2. "Premium Vehicles"        — number + label
//      3. "Personalised Journey"    — number + label
//      4. "5-Star Satisfaction"     — number + label
//  • Light/white text throughout
//  • Dividers between stats
// ─────────────────────────────────────────────

import { Stat } from "@/types";

const stats: Stat[] = [
  { value: "TODO", label: "Professional Chauffeurs" },
  { value: "TODO", label: "Premium Vehicles" },
  { value: "TODO", label: "Personalised Journey" },
  { value: "TODO", label: "5-Star Satisfaction" },
];

export default function CityStatsSection() {
  return (
    <section id="city-stats" className="relative py-32 bg-gray-900 text-white overflow-hidden">

      {/* TODO: Add full-width background image with dark overlay */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-bold uppercase max-w-2xl leading-tight mb-20">
          The City Moves.<br />You Travel at Ease.
        </h2>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-white/20 pt-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`pr-8 ${i !== 0 ? "border-l border-white/20 pl-8" : ""}`}
            >
              {/* TODO: Replace "TODO" with actual numbers from Figma */}
              <p className="text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-sm text-gray-300 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
