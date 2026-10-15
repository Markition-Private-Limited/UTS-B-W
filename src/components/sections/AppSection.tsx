// ─────────────────────────────────────────────
//  SECTION: App Download  (Section 10)
//
//  Design notes (from Figma):
//  • White background
//  • Two-column layout:
//      LEFT  → content block
//        - Eyebrow: "CONCEPTUAL BOOKING EXPERIENCE"
//        - Headline: "UNITED TRAVEL SERVICES, NOW IN YOUR POCKET."
//          Inter 700, 64px, line-height 106%, letter-spacing -4%
//        - Subtext describing the booking concept
//        - Pill CTA: "EXPLORE BOOKING OPTIONS" (black bg, white text, arrow icon)
//        - Small disclaimer caption beneath the CTA
//      RIGHT → light-gray rounded card containing the phone booking-UI mockup
//  • Mockup asset: /public/images/app-booking-mockup.png
//
//  All px values converted to vw against the 1920px Figma frame
//  (vw = px / 1920 * 100) so the section scales proportionally at any
//  window width instead of only matching the design at exactly 1920px.
// ─────────────────────────────────────────────

"use client";

import { useInView } from "@/hooks/useInView";

export default function AppSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section
      id="app"
      ref={ref}
      className={`w-full bg-white py-[6.25vw] px-[4.1667vw] transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-[1920px] mx-auto grid md:grid-cols-2 gap-[4.1667vw] items-center">

        {/* Left Content */}
        <div>
          <p
            className="uppercase text-black mb-[1.25vw]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "0.6771vw",
              lineHeight: "1",
              letterSpacing: "0.18em",
            }}
          >
            Conceptual Booking Experience
          </p>

          <h2
            className="uppercase mb-[1.25vw]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "3.3333vw",
              lineHeight: "1.06",
              letterSpacing: "-0.04em",
              color: "#121212",
            }}
          >
            United Travel Services,<br />Now In Your Pocket.
          </h2>

          <p
            className="text-gray-700 mb-[1.6667vw]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "0.9375vw",
              lineHeight: "1.6",
              letterSpacing: "0",
            }}
          >
            Keep your journey details close at hand with a streamlined chauffeur booking<br />experience.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center justify-between gap-[1.25vw] bg-black text-white uppercase px-[2.0833vw] py-[1.1458vw] rounded-full hover:bg-gray-800 transition-colors"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.6771vw",
              lineHeight: "1",
              letterSpacing: "0.05em",
            }}
          >
            Explore Booking Options
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <p
            className="text-gray-500 mt-[2.0833vw] max-w-[28vw]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "0.8333vw",
              lineHeight: "1.6",
              letterSpacing: "0",
            }}
          >
            A visual concept for a simpler booking journey. Not a live app or an app-download offer.
          </p>
        </div>

        {/* Right: Phone Mockup — gray card: 840×912, radius 32px, padding 42px */}
        <div className="flex justify-center items-center bg-[#F0F0F0] rounded-[1.6667vw] p-[2.1875vw] w-full max-w-[43.75vw] h-[47.5vw] mx-auto">
          {/* Phone frame: 402×791, radius 50px, padding 10px */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/app-booking-mockup.png"
            alt="United Travel Services booking app concept on a phone screen"
            className="box-border w-[20.9375vw] h-[41.1979vw] rounded-[2.6042vw] p-[0.5208vw] object-contain select-none pointer-events-none"
            draggable={false}
          />
        </div>

      </div>
    </section>
  );
}
