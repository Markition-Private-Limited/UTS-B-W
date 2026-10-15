// ─────────────────────────────────────────────
//  SECTION: Luxury Chauffeur Service  (placed directly above App Section)
//
//  Design notes (from Figma):
//  • White page background, rounded dark card inset from the viewport edges
//    (same card language as the Final CTA section)
//  • Card background: luxury car photo (/public/images/bently.png) with a
//    dark overlay so the left-aligned text stays readable
//  • Left-aligned, vertically centered content:
//      - Eyebrow: "BUSINESS. AIRPORT. PRIVATE TRAVEL."
//      - Headline: "LUXURY" / "CHAUFFEUR SERVICE"
//      - Subtext: short description line
//      - CTA pill: "BOOK YOUR CHAUFFEUR" (white bg, black text, arrow icon)
//
//  All px values converted to vw against the 1920px Figma frame
//  (vw = px / 1920 * 100) so the section scales proportionally at any
//  window width instead of only matching the design at exactly 1920px.
// ─────────────────────────────────────────────

"use client";

import { useInView } from "@/hooks/useInView";

export default function LuxuryServiceSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`w-full bg-white pt-[4.1667vw] pb-[4.1667vw] px-[4.1667vw] transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div
        className="relative w-full min-h-[420px] md:h-[38.5417vw] rounded-[1.6667vw] overflow-hidden flex items-center bg-gray-800 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bently.png')" }}
      >
        {/* Dark overlay: stronger on the left where the text sits, fading toward the car */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        <div className="relative z-10 px-[4.1667vw] text-white">
          <p
            className="uppercase mb-[1.0417vw] whitespace-nowrap"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "0.6771vw",
              lineHeight: "1",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Business. Airport. Private Travel.
          </p>

          <h2
            className="uppercase mb-[1.25vw] whitespace-nowrap"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "3.3333vw",
              lineHeight: "1.05",
              letterSpacing: "-0.04em",
            }}
          >
            Luxury<br />Chauffeur Service
          </h2>

          <p
            className="mb-[1.6667vw] max-w-[26vw]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "0.9375vw",
              lineHeight: "1.6",
              letterSpacing: "0",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            A refined travel experience for business, airport transfers, and private journeys.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center justify-between gap-[1.25vw] bg-white text-black uppercase px-[2.0833vw] py-[1.1458vw] rounded-full hover:bg-gray-100 transition-colors"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.6771vw",
              lineHeight: "1",
              letterSpacing: "0.05em",
            }}
          >
            Book Your Chauffeur
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
