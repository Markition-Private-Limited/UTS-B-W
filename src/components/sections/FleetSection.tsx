// ─────────────────────────────────────────────
//  SECTION: Fleet  (Section 6)
//
//  Design notes (from Figma):
//  • White background, fully centered header
//  • Eyebrow: "OUR FLEET"
//  • Headline: "LUXURY CHAUFFEUR CARS" / "FOR EVERY JOURNEY."
//    Inter 700, 64px, line-height 106%, letter-spacing -4%, centered
//  • Subtext centered
//  • Filter pill row: All Vehicles | First Class | Business | Luxury SUV
//    (active = black bg / white text, inactive = white bg / gray border)
//  • 3-column car card grid: image (top) + light-gray content block
//    (category + name, description, divider, "Book This Class" pill +
//    "Make An Enquiry" text link)
//  • Images: /public/images/fleet/*.png
//
//  All px values converted to vw against the 1920px Figma frame
//  (vw = px / 1920 * 100) so the section scales proportionally at any
//  window width instead of only matching the design at exactly 1920px.
// ─────────────────────────────────────────────

"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import PillButtonContent from "@/components/ui/PillButtonContent";
import DotsNav from "@/components/ui/DotsNav";

const cars = [
  {
    id: "first-class",
    category: "First Class",
    name: "First Class",
    description: "An elevated setting for special arrivals and unhurried private journeys.",
    image: "/images/fleet/first class.png",
  },
  {
    id: "business",
    category: "Business",
    name: "Business",
    description: "Refined comfort for focused days, business travel and airport transfers.",
    image: "/images/fleet/business.png",
  },
  {
    id: "luxury-suv",
    category: "Luxury SUV",
    name: "Luxury SUV",
    description: "A confident presence with a spacious feel for considered, comfortable travel.",
    image: "/images/fleet/luxury SUV.png",
  },
];

const tabs = ["All Vehicles", "First Class", "Business", "Luxury SUV"];

export default function FleetSection() {
  const { ref, isInView } = useInView<HTMLElement>();
  const [activeTab, setActiveTab] = useState("All Vehicles");

  const visibleCars = activeTab === "All Vehicles" ? cars : cars.filter((c) => c.category === activeTab);

  return (
    <section
      id="fleet"
      ref={ref}
      data-navbar-theme="light"
      className={`w-full bg-white pt-[48px] pb-[var(--section-spacing-y)] px-[4.1667vw] transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-[1920px] mx-auto">

        {/* Header */}
        <div className="text-center max-w-[44vw] mx-auto mb-[2.0833vw]">
          <p
            className="uppercase text-gray-500 mb-[0.8333vw]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "0.6771vw",
              lineHeight: "1",
              letterSpacing: "0.18em",
            }}
          >
            Our Fleet
          </p>

          <h2
            className="uppercase text-black mb-[1.25vw]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "3.3333vw",
              lineHeight: "1.06",
              letterSpacing: "-0.04em",
              textAlign: "center",
            }}
          >
            Luxury Chauffeur Cars<br />For Every Journey.
          </h2>

          <p
            className="text-gray-500"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "0.9375vw",
              lineHeight: "1.6",
              letterSpacing: "0",
            }}
          >
            Explore a refined fleet for executive travel, airport transfers, and private journeys.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-[0.5208vw] mb-[2.0833vw] flex-wrap">
          {tabs.map((tab) => {
            const active = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-[1.25vw] py-[0.5729vw] transition-colors ${
                  active
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300 hover:border-black"
                }`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.7292vw",
                  lineHeight: "1",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Car Cards Grid — each card rises/fades in with a stagger */}
        <div className="grid md:grid-cols-3 gap-[1.25vw]">
          {visibleCars.map((car, i) => (
            <div
              key={car.id}
              className={`rounded-[1.25vw] overflow-hidden transition-all duration-700 ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isInView ? `${i * 130}ms` : "0ms" }}
            >
              <div className="h-[16.25vw] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </div>
              <div className="bg-[#EFEFEF] p-[1.6667vw]">
                <h3
                  className="uppercase text-black mb-[0.8333vw]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.25vw",
                    lineHeight: "1.2",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {car.name}
                </h3>
                <p
                  className="text-gray-600 mb-[1.25vw]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.8333vw",
                    lineHeight: "1.5",
                  }}
                >
                  {car.description}
                </p>

                <div className="border-t border-gray-300 mb-[1.0417vw]" />

                <div className="flex items-center justify-between">
                  <a
                    href="#contact"
                    className="group relative overflow-hidden inline-flex items-center gap-[0.3125vw] bg-black text-white uppercase px-[1.0417vw] py-[0.5729vw] rounded-full border-[1.5px] border-transparent transition-all duration-500 hover:border-black/30 hover:shadow-[0_0_16px_rgba(0,0,0,0.2)]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.5729vw",
                      lineHeight: "1",
                      letterSpacing: "0.05em",
                    }}
                  >
                    <PillButtonContent fill="white">Book This Class</PillButtonContent>
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-[0.2604vw] text-black uppercase hover:text-gray-600 transition-colors"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.5729vw",
                      lineHeight: "1",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Make An Enquiry
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DotsNav count={visibleCars.length} activeIndex={0} className="mt-[2.0833vw]" />

      </div>
    </section>
  );
}
