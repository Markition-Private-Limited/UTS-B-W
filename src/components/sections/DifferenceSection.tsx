// ─────────────────────────────────────────────
//  SECTION: The Difference  (Section 7)
//
//  Design notes (from Figma):
//  • White background
//  • Two-column layout:
//      LEFT  → staggered 2×2 image mosaic (4 photos, offset heights)
//      RIGHT → content block
//        - Eyebrow: "THE ART OF PERSONAL SERVICE"
//        - Headline: "THE DIFFERENCE IS IN" / "EVERY DETAIL."
//        - Paragraph
//        - 3 checklist rows (icon + title + description), divided by hairlines
//        - CTA pill: "DISCOVER OUR STORY" (black bg, white text, arrow icon —
//          same pill format as the Final CTA / App / Hero sections)
//  • Images: /public/images/why-choose-us/*.png
//
//  All px values converted to vw against the 1920px Figma frame
//  (vw = px / 1920 * 100) so the section scales proportionally at any
//  window width instead of only matching the design at exactly 1920px.
// ─────────────────────────────────────────────

"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import ParallaxImage from "@/components/ui/ParallaxImage";
import PillButtonContent from "@/components/ui/PillButtonContent";
import { useInView } from "@/hooks/useInView";

const points = [
  {
    title: "Professional, from the first hello",
    description: "Thoughtful chauffeurs and well-presented vehicles set the tone.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 20c0-3.866 3.134-6 7-6s7 2.134 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Personal attention, all the way",
    description: "A considered experience from pickup to drop-off.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 14c2-2 4-2 6 0l1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 13l6.5-6.5a1.5 1.5 0 1 1 2 2.2L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 10.5l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 14l5 5 2-1-5.5-5.5L4 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Comfort is always the priority",
    description: "Space to relax, whether travelling for business or pleasure.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="3.5" y="12" width="17" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4.5 17v2M19.5 17v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function DifferenceSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  const mosaicRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mosaicRef, offset: ["start end", "end start"] });
  // Each tile drifts at a different rate/direction for a layered parallax feel
  const yPortrait = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const yLuggage  = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const yCabin    = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const yInterior = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="difference"
      ref={ref}
      data-navbar-theme="light"
      className="w-full bg-white pt-[28px] pb-[var(--section-spacing-y)] px-[4.1667vw]"
    >
      <div className="max-w-[1920px] mx-auto grid md:grid-cols-2 gap-[4.1667vw] items-center">

        {/* LEFT: Image mosaic — each tile rises/fades in with a stagger, and drifts with scroll */}
        <div ref={mosaicRef} className="grid grid-cols-2 gap-[1.25vw] h-[38.5417vw]">
          {/* Left column: portrait (tall) + luggage (short) */}
          <div className="flex flex-col gap-[1.25vw] h-full">
            <ParallaxImage
              src="/images/why-choose-us/Chauffeur portrait.png"
              alt="Chauffeur standing beside the vehicle"
              parallaxY={yPortrait}
              className={`rounded-[1.25vw] flex-[1.68] transition-all duration-700 ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isInView ? "0ms" : "0ms" }}
            />
            <ParallaxImage
              src="/images/why-choose-us/Luggage assistance.png"
              alt="Chauffeur assisting with luggage"
              parallaxY={yLuggage}
              className={`rounded-[1.25vw] flex-[1] transition-all duration-700 ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isInView ? "120ms" : "0ms" }}
            />
          </div>

          {/* Right column: interior seats (short) + door detail (tall) */}
          <div className="flex flex-col gap-[1.25vw] h-full">
            <ParallaxImage
              src="/images/why-choose-us/Leather passenger cabin.png"
              alt="Leather passenger cabin interior"
              parallaxY={yCabin}
              className={`rounded-[1.25vw] flex-[1] transition-all duration-700 ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isInView ? "240ms" : "0ms" }}
            />
            <ParallaxImage
              src="/images/why-choose-us/Refined interior details.png"
              alt="Refined interior leather and door details"
              parallaxY={yInterior}
              className={`rounded-[1.25vw] flex-[1.32] transition-all duration-700 ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isInView ? "360ms" : "0ms" }}
            />
          </div>
        </div>

        {/* RIGHT: Content — text block rises/fades, then checklist items stagger in */}
        <div>
          <div
            className={`transition-all duration-700 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p
              className="uppercase text-gray-500 mb-[1.0417vw]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.6771vw",
                lineHeight: "1",
                letterSpacing: "0.18em",
              }}
            >
              The Art of Personal Service
            </p>

            <h2
              className="uppercase text-black mb-[1.25vw]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 3.3333vw, 64px)",
                lineHeight: "1.06",
                letterSpacing: "-0.03em",
              }}
            >
              The Difference Is In<br />Every Detail.
            </h2>

            <p
              className="text-gray-600 mb-[1.6667vw] max-w-[40vw]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(13px, 1.0417vw, 18px)",
                lineHeight: "1.6",
                letterSpacing: "0",
              }}
            >
              From the presentation of our vehicles to the professionalism of our chauffeurs, every
              detail contributes to a more comfortable and considered travel experience.
            </p>
          </div>

          <ul className="mb-[1.6667vw]">
            {points.map((point, i) => (
              <li
                key={i}
                className={`flex items-start gap-[0.8333vw] py-[1.1458vw] border-b border-gray-200 transition-all duration-700 ease-out ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: isInView ? `${220 + i * 120}ms` : "0ms" }}
              >
                <span className="text-black shrink-0 mt-[0.1vw]">{point.icon}</span>
                <div>
                  <p
                    className="text-black mb-[0.2083vw]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.9375vw",
                      lineHeight: "1.3",
                    }}
                  >
                    {point.title}
                  </p>
                  <p
                    className="text-gray-500"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: "0.8333vw",
                      lineHeight: "1.4",
                    }}
                  >
                    {point.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#about"
            className={`group relative overflow-hidden inline-flex items-center justify-between gap-[1.25vw] bg-black text-white uppercase px-[2.0833vw] py-[1.1458vw] rounded-full border-[1.5px] border-transparent hover:border-black/30 hover:shadow-[0_0_16px_rgba(0,0,0,0.2)] ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.6771vw",
              lineHeight: "1",
              letterSpacing: "0.05em",
              transitionProperty: "opacity, transform, border-color, box-shadow",
              transitionDuration: "0.7s, 0.7s, 0.5s, 0.5s",
              transitionTimingFunction: "ease-out, ease-out, ease, ease",
              transitionDelay: isInView ? "600ms, 600ms, 0ms, 0ms" : "0ms, 0ms, 0ms, 0ms",
            }}
          >
            <PillButtonContent fill="white">Discover Our Story</PillButtonContent>
          </a>
        </div>

      </div>
    </section>
  );
}
