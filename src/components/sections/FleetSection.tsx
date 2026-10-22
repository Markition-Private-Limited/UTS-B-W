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
    id: "economy-saloon",
    category: "Economy Saloon",
    name: "VW Passat / Kia Niro or similar",
    seating: "According to model",
    image: "/images/fleet/economy-saloon-vw-passat.webp",
  },
  {
    id: "business-class",
    category: "Business Class",
    name: "Mercedes-Benz E-Class or similar",
    seating: "According to model",
    image: "/images/fleet/business-class-mercedes-e-class.webp",
  },
  {
    id: "first-class",
    category: "First Class",
    name: "Mercedes-Benz S-Class or similar",
    seating: "According to model",
    image: "/images/fleet/first-class-mercedes-s-class.webp",
  },
  {
    id: "first-class-van",
    category: "First Class Van",
    name: "Mercedes-Benz V-Class or similar",
    seating: "According to model",
    image: "/images/fleet/first-class-van-mercedes-v-class.webp",
  },
  {
    id: "van",
    category: "Van",
    name: "8/9 - Seater Van",
    seating: "8–9 passengers",
    image: "/images/fleet/van-8-9-seater.webp",
  },
  {
    id: "mpv",
    category: "MPV",
    name: "VW Sharan / Ford Galaxy or similar",
    seating: "7 passengers",
    image: "/images/fleet/mpv-vw-sharan.webp",
  },
  {
    id: "standard-van",
    category: "Standard Van",
    name: "Hyundai i800 / VW Transporter or similar",
    seating: "According to model",
    image: "/images/fleet/standard-van-hyundai-i800.webp",
  },
];

const tabs = ["All Vehicles", "Business Class", "First Class", "Economy Saloon", "First Class Van", "Van", "MPV", "Standard Van"];

export default function FleetSection() {
  const { ref, isInView } = useInView<HTMLElement>();
  const [activeTab, setActiveTab] = useState("All Vehicles");

  const visibleCars = activeTab === "All Vehicles" ? cars : cars.filter((c) => c.category === activeTab);

  return (
    <section
      id="fleet"
      ref={ref}
      data-navbar-theme="light"
      className={`w-full bg-white pt-[48px] pb-[clamp(32px,3.75vw,72px)] px-[4.1667vw] transition-all duration-700 ease-out ${
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
              fontSize: "clamp(1.75rem, 3.3333vw, 64px)",
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
              fontSize: "clamp(13px, 1.0417vw, 18px)",
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
                  className="text-black mb-[0.8333vw]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(14px, 1.15vw, 22px)",
                    lineHeight: "1.2",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {car.name}
                </h3>

                {/* Seating row */}
                <div
                  className="flex items-center justify-between bg-white rounded-[0.3125vw] px-[0.625vw] py-[0.4167vw] mb-[1.0417vw]"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(10px, 0.7292vw, 14px)" }}
                >
                  <span className="font-bold uppercase tracking-wide text-black">Seating:</span>
                  <span className="text-black font-normal">{car.seating}</span>
                </div>

                {/* Amenity icons */}
                <div className="grid grid-cols-4 gap-x-[0.4167vw] gap-y-[0.4167vw] mb-[1.0417vw]">
                  {[
                    {
                      label: "Wifi Available",
                      // eslint-disable-next-line @next/next/no-img-element
                      icon: <img src="/images/card icons/wifi-available.png" alt="Wifi Available" className="w-full h-full object-contain" draggable={false} />,
                    },
                    {
                      label: "GPS Tracking",
                      // eslint-disable-next-line @next/next/no-img-element
                      icon: <img src="/images/card icons/gps-tracking.png" alt="GPS Tracking" className="w-full h-full object-contain" draggable={false} />,
                    },
                    {
                      label: "Water Available",
                      // eslint-disable-next-line @next/next/no-img-element
                      icon: <img src="/images/card icons/water-available.png" alt="Water Available" className="w-full h-full object-contain" draggable={false} />,
                    },
                    {
                      label: "Child Seat Available",
                      // eslint-disable-next-line @next/next/no-img-element
                      icon: <img src="/images/card icons/child-seat-available.png" alt="Child Seat Available" className="w-full h-full object-contain" draggable={false} />,
                    },
                  ].map(({ label, icon }) => (
                    <div key={label} className="flex flex-col items-center gap-[0.2083vw] text-center">
                      <div className="w-[1.25vw] h-[1.25vw] min-w-[18px] min-h-[18px] text-black">{icon}</div>
                      <span
                        className="text-black leading-tight"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "clamp(8px, 0.5208vw, 10px)" }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-300 mb-[1.0417vw]" />

                <div className="flex items-center justify-between">
                  <a
                    href="/book"
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

        <DotsNav count={Math.ceil(visibleCars.length / 3)} activeIndex={0} className="mt-[2.0833vw]" />

      </div>
    </section>
  );
}
