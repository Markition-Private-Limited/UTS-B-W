// ─────────────────────────────────────────────
//  SECTION: Testimonials  (Section 8)
//
//  Design notes (from Figma):
//  • Light off-white background (#F8F8F8)
//  • Centered header:
//      - Eyebrow: "JOURNEYS WORTH REMEMBERING"
//      - Headline: "REAL JOURNEYS." / "LASTING IMPRESSIONS." (bold, uppercase)
//      - Subtext (two lines, centered)
//  • 4 testimonial placeholder cards in a row, each:
//      - Quote icon + "EDITABLE TESTIMONIAL PLACEHOLDER" label
//      - "Approved customer review to be added" (bold, two lines)
//      - Divider
//      - "Customer name pending approval"
//      - Category label (uppercase, small)
//
//  All px values converted to vw against the 1920px Figma frame
//  (vw = px / 1920 * 100) so the section scales proportionally at any
//  window width instead of only matching the design at exactly 1920px.
// ─────────────────────────────────────────────

"use client";

import { useInView } from "@/hooks/useInView";

const testimonials = [
  { id: "1", category: "Business Travel" },
  { id: "2", category: "Airport Transfers" },
  { id: "3", category: "Private Journeys" },
  { id: "4", category: "Special Occasions" },
];

export default function TestimonialsSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section
      id="testimonials"
      ref={ref}
      className={`w-full bg-[#FFFFFF] py-[6.25vw] px-[4.1667vw] transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-[1920px] mx-auto">

        {/* Header */}
        <div className="text-center mx-auto mb-[3.3333vw]">
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
            Journeys Worth Remembering
          </p>

          <h2
            className="uppercase text-black mb-[1.25vw]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "3.3333vw",
              lineHeight: "1.1",
              letterSpacing: "-0.03em",
            }}
          >
            Real Journeys.<br />Lasting Impressions.
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "0.9375vw",
              lineHeight: "1.6",
              letterSpacing: "0",
              color: "rgba(0,0,0,0.9)",
            }}
          >
            The best journeys are remembered for how they make you feel. We aim to deliver a professional, comfortable and<br />dependable experience every time you travel with us.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-[1.25vw]">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between bg-white rounded-[1.25vw] p-[1.6667vw] w-full max-w-[21.9792vw] h-[17.1875vw] mx-auto"
              style={{ border: "1px solid #E3E3E3" }}
            >
              <div>
                {/* Icon + label */}
                <div className="flex items-center gap-[0.4167vw] mb-[1.25vw]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400 shrink-0"
                  >
                    <path
                      d="M2 2.5h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6.5L3 14.5V11.5H2a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p
                    className="uppercase text-gray-400"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.5208vw",
                      lineHeight: "1",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Editable Testimonial Placeholder
                  </p>
                </div>

                {/* Review text */}
                <p
                  className="text-black"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "1.0417vw",
                    lineHeight: "1.3",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Approved customer review to be added
                </p>
              </div>

              <div>
                {/* Divider */}
                <div className="border-t border-gray-200 mb-[1.0417vw]" />

                <p
                  className="text-gray-700 mb-[0.4167vw]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.7292vw",
                    lineHeight: "1.4",
                  }}
                >
                  Customer name pending approval
                </p>
                <p
                  className="uppercase text-gray-400"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.5729vw",
                    lineHeight: "1.4",
                    letterSpacing: "0.08em",
                  }}
                >
                  {t.category}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
