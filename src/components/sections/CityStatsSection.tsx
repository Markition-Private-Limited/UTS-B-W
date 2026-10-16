// ─────────────────────────────────────────────
//  SECTION: City Stats  (Section 5)
//
//  Design: one big container split into two halves.
//  TOP  → white bg, left heading + right 2×2 stats grid + "U" watermark
//  BOTTOM → full-width cinematic driving photo
//
//  All px values converted to vw against 1920px Figma frame.
// ─────────────────────────────────────────────

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import PillButtonContent from "@/components/ui/PillButtonContent";

const stats = [
  { value: "50K+", label: "Successfully\nCompleted Rides" },
  { value: "500+", label: "Elite\nChauffeurs" },
  { value: "99%",  label: "On-Time\nRating" },
  { value: "24/7", label: "Dedicated\nSupport" },
];

// Counts 0 → target whenever `active` turns true; resets when it turns false,
// so the effect replays every time the stats re-enter the viewport.
function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let start: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

// Splits "50K+" → (50, "K+"), "24/7" → (24, "/7"), etc. and counts up the
// leading number while the suffix stays static.
function StatCounter({ value, active }: { value: string; active: boolean }) {
  const match = value.match(/^([\d,]+)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
  const suffix = match ? match[2] : "";
  const count = useCountUp(target, active);
  return <>{count}{suffix}</>;
}

export default function CityStatsSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  // Separate, re-triggering observer just for the stats grid — the shared
  // useInView hook only fires once, but the counters should replay every
  // time the stats scroll back into view.
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStatsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="city-stats"
      ref={ref}
      className={`w-full overflow-hidden transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >

      {/* ── TOP: white bg, heading left + stats right ── */}
      <div
        data-navbar-theme="light"
        className="relative w-full bg-white overflow-hidden"
        style={{ padding: "4.1667vw 4.1667vw" }}
      >

        {/* Watermark logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/6f215cf1-6331-4613-927d-f39a37dc39d0 1.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[calc(26%-22px)] top-[calc(50%+6%+52px)] -translate-y-1/2 select-none pointer-events-none"
          style={{ width: "30vw", opacity: 1 }}
          draggable={false}
        />

        {/* Content: heading left / stats right */}
        <div
          className="relative z-10 max-w-[1920px] mx-auto grid md:grid-cols-2 items-center"
          style={{ gap: "4.1667vw" }}
        >

          {/* Left: heading + description */}
          <div>
            <p
              className="uppercase text-gray-500 mb-[0.8333vw]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.6771vw",
                lineHeight: 1,
                letterSpacing: "0.18em",
              }}
            >
              A simple path to a better journey
            </p>
            <h2
              className="uppercase text-black mb-[1.25vw] whitespace-nowrap"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "3.3333vw",
                lineHeight: 1.06,
                letterSpacing: "-0.04em",
              }}
            >
              Luxury, Made Effortless.
            </h2>
            <p
              className="text-gray-500 whitespace-nowrap"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "0.9375vw",
                lineHeight: 1.6,
              }}
            >
              A straightforward booking experience designed to make premium travel feel simple.
            </p>

            <a
              href="#fleet"
              className="group relative overflow-hidden inline-flex items-center justify-between gap-[1.25vw] bg-black text-white uppercase mt-[2.0833vw] px-[2.0833vw] py-[1.1458vw] rounded-full border-[1.5px] border-transparent transition-all duration-500 hover:border-black/30 hover:shadow-[0_0_16px_rgba(0,0,0,0.2)]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.6771vw",
                lineHeight: 1,
                letterSpacing: "0.05em",
              }}
            >
              <PillButtonContent fill="white">Explore Our Fleet</PillButtonContent>
            </a>
          </div>

          {/* Right: 2×2 stats grid — rises/fades and counts up every time it enters view */}
          <div
            ref={statsRef}
            className="relative grid grid-cols-2 w-fit mx-auto translate-x-[90px]"
            style={{ gap: "1.5625vw 3.125vw" }}
          >
            {/* Thin grey plus dividing the grid into quadrants */}
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 bg-gray-200" style={{ width: "1px" }} />
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 bg-gray-200" style={{ height: "1px" }} />

            {stats.map((stat, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ease-out ${
                  statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: statsInView ? `${150 + i * 120}ms` : "0ms" }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: "2.9167vw",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    color: "#0d0d0d",
                  }}
                >
                  <StatCounter value={stat.value} active={statsInView} />
                </p>
                <p
                  className="text-gray-500 mt-[0.3125vw]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.7292vw",
                    lineHeight: 1.4,
                    whiteSpace: "pre-line",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── BOTTOM: cinematic driving image ── */}
      <div
        data-navbar-theme="dark"
        className={`relative w-full overflow-hidden transition-all duration-700 ease-out ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ height: "29.6875vw", transitionDelay: isInView ? "300ms" : "0ms" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/Chauffeur driving through the city.png"
          alt="Chauffeur driving through the city"
          className="w-full h-full object-cover select-none"
          draggable={false}
        />

        {/* Top-to-bottom gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.38) 100%)",
          }}
        />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[4.1667vw] h-[4.1667vw] rounded-full bg-white/90 flex items-center justify-center shadow-lg"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-black"
              style={{ width: "1.5625vw", height: "1.5625vw", marginLeft: "0.2vw" }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

    </section>
  );
}
