// ─────────────────────────────────────────────
//  SECTION: Fleet  (Section 6)
//
//  Design notes (from Figma):
//  • White background
//  • Eyebrow label top-left
//  • Headline: "LUXURY CHAUFFEUR CARS FOR EVERY JOURNEY."
//  • Filter tabs row: All | First Class | Business | Luxury SUV
//  • 3-column car card grid (or carousel):
//      Each card has: car image (top), category badge, car name,
//      short description, "Learn more →" link
//  • Cards visible: First Class, Business, Luxury SUV
// ─────────────────────────────────────────────

import { CarCard } from "@/types";

const cars: CarCard[] = [
  {
    id: "1",
    category: "first-class",
    name: "First Class",
    description: "TODO: fill description from Figma",
    imageUrl: "/images/car-first-class.jpg",
  },
  {
    id: "2",
    category: "business",
    name: "Business",
    description: "TODO: fill description from Figma",
    imageUrl: "/images/car-business.jpg",
  },
  {
    id: "3",
    category: "luxury-suv",
    name: "Luxury SUV",
    description: "TODO: fill description from Figma",
    imageUrl: "/images/car-suv.jpg",
  },
];

export default function FleetSection() {
  return (
    <section id="fleet" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Our Fleet</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase max-w-xl leading-tight">
              Luxury Chauffeur Cars For Every Journey.
            </h2>
          </div>
        </div>

        {/* Filter Tabs */}
        {/* TODO: Add active state and filtering logic */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {["All", "First Class", "Business", "Luxury SUV"].map((tab) => (
            <button
              key={tab}
              className="border border-gray-300 text-sm px-5 py-2 rounded-full hover:bg-black hover:text-white hover:border-black transition-colors"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Car Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              {/* TODO: Replace with actual Next.js Image component */}
              <div className="h-56 bg-gray-200" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">{car.category}</p>
                <h3 className="text-xl font-bold uppercase mb-2">{car.name}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{car.description}</p>
                <a href="#" className="text-sm font-medium underline">Learn more →</a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
