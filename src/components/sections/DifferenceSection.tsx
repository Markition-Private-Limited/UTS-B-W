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

import ParallaxImage from "@/components/ui/ParallaxImage";
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

  return (
    <section
      id="difference"
      ref={ref}
      className={`w-full bg-white py-[6.25vw] px-[4.1667vw] transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-[1920px] mx-auto grid md:grid-cols-2 gap-[4.1667vw] items-center">

        {/* LEFT: Image mosaic */}
        <div className="grid grid-cols-2 gap-[1.25vw] h-[38.5417vw]">
          {/* Left column: portrait (tall) + luggage (short) */}
          <div className="flex flex-col gap-[1.25vw] h-full">
            <ParallaxImage
              src="/images/why-choose-us/Chauffeur portrait.png"
              alt="Chauffeur standing beside the vehicle"
              className="rounded-[1.25vw] flex-[1.68]"
            />
            <ParallaxImage
              src="/images/why-choose-us/Luggage assistance.png"
              alt="Chauffeur assisting with luggage"
              className="rounded-[1.25vw] flex-[1]"
            />
          </div>

          {/* Right column: interior seats (short) + door detail (tall) */}
          <div className="flex flex-col gap-[1.25vw] h-full">
            <ParallaxImage
              src="/images/why-choose-us/Leather passenger cabin.png"
              alt="Leather passenger cabin interior"
              className="rounded-[1.25vw] flex-[1]"
            />
            <ParallaxImage
              src="/images/why-choose-us/Refined interior details.png"
              alt="Refined interior leather and door details"
              className="rounded-[1.25vw] flex-[1.32]"
            />
          </div>
        </div>

        {/* RIGHT: Content */}
        <div>
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
              fontSize: "3.3333vw",
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
              fontSize: "0.9375vw",
              lineHeight: "1.6",
              letterSpacing: "0",
            }}
          >
            From the presentation of our vehicles to the professionalism of our chauffeurs, every
            detail contributes to a more comfortable and considered travel experience.
          </p>

          <ul className="mb-[1.6667vw]">
            {points.map((point, i) => (
              <li
                key={i}
                className={`flex items-start gap-[0.8333vw] py-[1.1458vw] ${i !== points.length - 1 ? "border-b border-gray-200" : "border-b border-gray-200"}`}
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
            className="inline-flex items-center justify-between gap-[1.25vw] bg-black text-white uppercase px-[2.0833vw] py-[1.1458vw] rounded-full hover:bg-gray-800 transition-colors"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.6771vw",
              lineHeight: "1",
              letterSpacing: "0.05em",
            }}
          >
            Discover Our Story
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
