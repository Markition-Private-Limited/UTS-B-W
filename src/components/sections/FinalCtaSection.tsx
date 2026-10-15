// ─────────────────────────────────────────────
//  SECTION: Final CTA  (Section 11)
//
//  Design notes (from Figma):
//  • Outer section: 1920×820, padding: 0 80px 80px 80px
//  • Inner rounded card: 1760×740, border-radius 32px, padding 80px
//    - Background: night driveway/house photo with dark overlay
//  • Centered content inside the card:
//      - Eyebrow: "THE NEXT JOURNEY STARTS WITH YOU"
//      - Headline: "YOUR JOURNEY." / "OUR PRIORITY."
//      - Subtext
//      - CTA pill button: "BOOK YOUR CHAUFFEUR" (white bg, black text, arrow icon)
//  • Background photo: /public/images/Cinematic photograph.png
//
//  All px values converted to vw against the 1920px Figma frame
//  (vw = px / 1920 * 100) so the card scales proportionally at any
//  window width instead of only matching the design at exactly 1920px.
// ─────────────────────────────────────────────

"use client";

import { useInView } from "@/hooks/useInView";

export default function FinalCtaSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className={`w-full bg-white px-0 md:px-[4.1667vw] pb-[4.1667vw] transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div
        className="relative w-full min-h-[480px] md:h-[38.5417vw] rounded-[1.6667vw] overflow-hidden flex items-center justify-center text-center bg-gray-800 bg-cover bg-center p-6 md:p-[4.1667vw]"
        style={{ backgroundImage: "url('/images/Cinematic photograph.png')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-3xl md:max-w-[40vw] mx-auto text-white">
          <p
            className="uppercase text-[#E3E3E3]/80 mb-[1.0417vw]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "0.6771vw",
              lineHeight: "1",
              letterSpacing: "0.18em",
              textAlign: "center",
            }}
          >
            The Next Journey Starts With You
          </p>

          <h2
            className="uppercase mb-[1.25vw]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "3.3333vw",
              lineHeight: "1.06",
              letterSpacing: "-0.04em",
              textAlign: "center",
            }}
          >
            Your Journey.<br />Our Priority.
          </h2>

          <p
            className="text-[#E3E3E3]/80 mb-[2.0833vw] max-w-xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "1.0417vw",
              lineHeight: "1.6",
              letterSpacing: "0",
              textAlign: "center",
            }}
          >
            Make your next journey more comfortable with professional chauffeur services
            tailored to your travel needs.
          </p>

          <a
            href="#hero"
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
