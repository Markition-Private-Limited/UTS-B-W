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
import PillButtonContent from "@/components/ui/PillButtonContent";

export default function FinalCtaSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      data-navbar-theme="light"
      className="w-full bg-white px-0 md:px-[4.1667vw] pt-[4.1667vw] pb-[4.1667vw]"
    >
      <div
        className={`relative w-full min-h-[480px] md:h-[38.5417vw] rounded-[1.6667vw] overflow-hidden flex items-center bg-gray-800 bg-cover bg-center p-6 md:p-[4.1667vw] transition-all duration-700 ease-out ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ backgroundImage: "url('/images/Cinematic photograph.png')" }}
      >
        {/* Readability gradient: light, fading left-to-right behind the text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(235,235,235,0.6) 0%, rgba(235,235,235,0.45) 35%, rgba(235,235,235,0.15) 65%, rgba(235,235,235,0) 100%)",
          }}
        />

        <div className="relative z-10 max-w-3xl md:max-w-[40vw] text-black pl-[2.0833vw]">
          <p
            className="uppercase text-black mb-[1.0417vw]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "0.6771vw",
              lineHeight: "1",
              letterSpacing: "0.18em",
              textAlign: "left",
            }}
          >
            The Next Journey Starts With You
          </p>

          <h2
            className="uppercase mb-[1.25vw]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3.3333vw, 64px)",
              lineHeight: "1.06",
              letterSpacing: "-0.04em",
              textAlign: "left",
            }}
          >
            Your Journey.<br />Our Priority.
          </h2>

          <p
            className="text-black mb-[2.0833vw] max-w-xl"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(13px, 1.0417vw, 18px)",
              lineHeight: "1.6",
              letterSpacing: "0",
              textAlign: "left",
            }}
          >
            Make your next journey more comfortable with professional<br />chauffeur services tailored to your travel needs.
          </p>

          <a
            href="#hero"
            className="group relative overflow-hidden inline-flex items-center justify-between gap-[1.25vw] bg-black text-white uppercase px-[2.0833vw] py-[1.1458vw] rounded-full border-[1.5px] border-transparent transition-all duration-500 hover:border-black/30 hover:shadow-[0_0_16px_rgba(0,0,0,0.2)]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.6771vw",
              lineHeight: "1",
              letterSpacing: "0.05em",
            }}
          >
            <PillButtonContent fill="white">Book Your Chauffeur</PillButtonContent>
          </a>
        </div>
      </div>
    </section>
  );
}
