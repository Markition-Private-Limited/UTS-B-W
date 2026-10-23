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

  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  // The video stays paused behind a thumbnail + play button until the viewer
  // clicks — calling .play() synchronously inside that click handler (not
  // from an effect) is what lets the browser allow sound right away, since
  // it still sees the call as part of the user's gesture.
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlay() {
    const v = videoRef.current;
    setIsPlaying(true);
    setMuted(false);
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.play().catch(() => {
      // Sound blocked for some reason — fall back to a muted autoplay
      // rather than leaving the video stuck on the thumbnail.
      v.muted = true;
      v.volume = 0;
      setMuted(true);
      v.play().catch(() => {});
    });
  }

  function handlePause() {
    videoRef.current?.pause();
    setIsPlaying(false);
  }

  function toggleMute() {
    const v = videoRef.current;
    const next = !muted;
    setMuted(next);
    if (!v) return;
    v.muted = next;
    v.volume = next ? 0 : 1;
    if (!next) v.play().catch(() => {});
  }

  return (
    <section
      id="city-stats"
      ref={ref}
      className={`w-full overflow-hidden transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ paddingBottom: "96px" }}
    >

      {/* ── TOP: white bg, heading left + stats right ── */}
      <div
        data-navbar-theme="light"
        className="relative w-full bg-white overflow-hidden"
        style={{ paddingTop: "48px", paddingBottom: "4.1667vw", paddingLeft: "4.1667vw", paddingRight: "4.1667vw" }}
      >

        {/* Watermark logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/6f215cf1-6331-4613-927d-f39a37dc39d0 1.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[calc(26%-22px)] top-[calc(50%+6%+52px)] -translate-y-1/2 select-none pointer-events-none"
          style={{ width: "15vw", opacity: 1 }}
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
                fontSize: "clamp(1.75rem, 3.3333vw, 64px)",
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
                fontSize: "clamp(13px, 1.0417vw, 18px)",
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
        style={{ height: "38vw", transitionDelay: isInView ? "300ms" : "0ms", backgroundColor: "#000" }}
      >
        {/* object-cover + object-position: center fills this frame edge to
            edge on the width (the source's ~2.6:1 aspect ratio is narrower
            than this ~3.37:1 strip), cropping symmetrically off the top and
            bottom only — the sides are never cropped. This is a display-only
            scale, not a re-encode, so it doesn't reduce source quality. */}
        <video
          ref={videoRef}
          src="/stats-video/UTS-video.mp4"
          muted={muted}
          loop
          playsInline
          className="w-full h-full object-cover select-none"
          style={{ objectPosition: "center center", filter: "saturate(1.25)" }}
        />

        {/* Top-to-bottom gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.38) 100%)",
          }}
        />

        {/* Slight overall dark tint so the video sits a touch quieter behind the stats above it */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />

        {/* Thumbnail + play button — covers the (paused) video until clicked.
            The black overlay is applied live via CSS, not baked into the
            image file, which is what cuts the thumbnail's color down. */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/city-stats-thumbnail.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover select-none"
            style={{ objectPosition: "center center" }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.55)" }} />

          <button
            type="button"
            onClick={handlePlay}
            aria-label="Play video"
            className="absolute inset-0 flex items-center justify-center group"
          >
            {/* Frosted glass ring — translucent + blurred, picks up the
                thumbnail's colors behind it — wrapping the solid white core. */}
            <span
              className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 group-active:scale-100"
              style={{
                width: "clamp(84px, 7.5vw, 140px)",
                height: "clamp(84px, 7.5vw, 140px)",
                background: "rgba(255,255,255,0.16)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              <span
                className="flex items-center justify-center rounded-full bg-white shadow-xl"
                style={{ width: "62%", height: "62%" }}
              >
                <svg
                  width="38%"
                  height="38%"
                  viewBox="0 0 24 24"
                  fill="#121212"
                  style={{ marginLeft: "4%" }}
                >
                  <polygon points="5 3 21 12 5 21" />
                </svg>
              </span>
            </span>
          </button>
        </div>

        {/* Click the playing video to pause — brings the thumbnail + play
            button back. Sits below the mute button so that still works. */}
        {isPlaying && (
          <button
            type="button"
            onClick={handlePause}
            aria-label="Pause video"
            className="absolute inset-0"
          />
        )}

        {/* Mute / unmute — only once the video is actually playing */}
        {isPlaying && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-110 active:scale-100"
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
              {muted ? (
                <>
                  <line x1="22" y1="9" x2="16" y2="15" />
                  <line x1="16" y1="9" x2="22" y2="15" />
                </>
              ) : (
                <>
                  <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                  <path d="M19 5a10 10 0 0 1 0 14" />
                </>
              )}
            </svg>
          </button>
        )}

      </div>

    </section>
  );
}
