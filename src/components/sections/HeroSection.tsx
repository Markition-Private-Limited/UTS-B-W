"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const imgDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applyClip = () => {
      const el = imgDivRef.current;
      if (!el) return;
      const W = el.offsetWidth;
      const H = el.offsetHeight;
      const R = 44;      // concave depth — lower = shallower tip
      const cr = 40;     // bottom corner radius
      const k = 0.5523;  // bezier constant for corner quarter-circles

      // Two smooth cubics — no junction point, no dip below image edge, no visible corner.
      const d = [
        `M 0,0`,
        `L ${W},0`,
        `L ${W},${H - cr}`,
        `C ${W},${H - cr + cr * k} ${W - cr + cr * k},${H} ${W - cr},${H}`,
        `L ${W / 2 + R * 2.5},${H}`,
        `C ${W / 2 + R * 1.8},${H} ${W / 2 + R * 0.5},${H - R} ${W / 2},${H - R}`,
        `C ${W / 2 - R * 0.5},${H - R} ${W / 2 - R * 1.8},${H} ${W / 2 - R * 2.5},${H}`,
        `L ${cr},${H}`,
        `C ${cr - cr * k},${H} 0,${H - cr + cr * k} 0,${H - cr}`,
        `Z`,
      ].join(" ");

      el.style.clipPath = `path('${d}')`;
    };

    applyClip();
    window.addEventListener("resize", applyClip);
    return () => window.removeEventListener("resize", applyClip);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full bg-white flex flex-col"
      style={{ minHeight: "100svh" }}
    >
      {/* Hero photo — clip-path draws rounded corners + smooth concave at bottom center */}
      <div
        ref={imgDivRef}
        className="absolute inset-x-0 top-0 z-0"
        style={{ bottom: "44px" }}
      >
        <Image
          src="/hero_img.jpg"
          alt="Executive chauffeur service"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      </div>

      {/* Dark button: bottom:16px → bottom edge 16px from section, centre at 44px = image div bottom */}
      <div className="absolute z-20" style={{ bottom: "16px", left: "50%", transform: "translateX(-50%)" }}>
        <button
          aria-label="Scroll down"
          className="w-14 h-14 rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center text-white px-6 pt-20">
        {/* Eye-brow label */}
        <p
          className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/70 mb-8"
        >
          Executive Chauffeur Services
        </p>

        {/* Main headline — Figma: 88px / 700 / line-height 104% / tracking -4% */}
        <h1
          className="font-bold uppercase text-white mb-7"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 64px)",
            lineHeight: "1.04",
            letterSpacing: "-0.04em",
            maxWidth: "18ch",
          }}
        >
          Your Journey Deserves More Than a Ride.
        </h1>

        {/* Subtitle — Figma: 22px / 400 / line-height 150% / tracking 0% */}
        <p
          className="text-white/75 mb-10"
          style={{ fontSize: "clamp(0.875rem, 1.1vw, 17px)", lineHeight: "1.5", maxWidth: "52ch" }}
        >
          Premium Chauffeur Services for Business, Airport Transfers &amp; Luxury Travel.
        </p>

        {/* Explore Fleet link */}
        <a
          href="#fleet"
          className="text-[11px] font-medium tracking-[0.2em] uppercase text-white underline underline-offset-4 decoration-white/50 hover:decoration-white transition-colors duration-200"
        >
          Explore Our Fleet
        </a>
      </div>

      {/* ── Booking bar — pb-24 keeps its bottom edge above the circle zone (circle: bottom 36–84px) ── */}
      <div className="relative z-10 w-full px-4 md:px-10 pb-24">
        {/* "PLAN YOUR NEXT JOURNEY" label above bar */}
        <div className="mx-auto mb-3" style={{ maxWidth: "1280px" }}>
          <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-white/60">
            Plan Your Next Journey
          </span>
        </div>

        <div
          className="mx-auto bg-white rounded-3xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0"
          style={{ maxWidth: "1280px", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
        >
          {/* Fields row */}
          <div className="w-full flex flex-col md:flex-row md:items-center md:divide-x divide-gray-200 gap-4 md:gap-0">
            {/* Pickup Location */}
            <BookingField
              icon={<PickupIcon />}
              label="Pickup Location"
              placeholder="Enter pickup location"
              className="md:pl-0 md:pr-8"
            />

            {/* Destination */}
            <BookingField
              icon={<DestinationIcon />}
              label="Destination"
              placeholder="Where would you like to go?"
              className="md:px-8"
            />

            {/* Pickup Date */}
            <BookingField
              icon={<CalendarIcon />}
              label="Pickup Date"
              placeholder="Select date"
              className="md:px-8"
            />

            {/* Pickup Time */}
            <BookingField
              icon={<ClockIcon />}
              label="Pickup Time"
              placeholder="Select time"
              className="md:px-8"
            />

            {/* Service Type */}
            <BookingField
              icon={<CarIcon />}
              label="Service Type"
              placeholder="Select service"
              className="md:px-8"
            />

            {/* Find Your Ride CTA */}
            <div className="md:pl-6 flex-shrink-0">
              <button
                className="inline-flex items-center gap-2 text-white text-[11px] font-semibold tracking-[0.12em] uppercase px-6 py-4 rounded-full whitespace-nowrap hover:opacity-90 transition-opacity duration-200"
                style={{ background: "#111111", minWidth: "168px" }}
              >
                Find Your Ride
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator lives at the section boundary — implemented in the section below */}
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function BookingField({
  icon,
  label,
  placeholder,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-3 flex-1 min-w-0 ${className}`}>
      <span className="mt-1 flex-shrink-0 text-gray-400">{icon}</span>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-semibold text-gray-400 tracking-wide mb-0.5">
          {label}
        </span>
        <span className="text-[13px] font-medium text-gray-800 truncate">
          {placeholder}
        </span>
      </div>
    </div>
  );
}

function PickupIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s-8-6.5-8-12a8 8 0 1 1 16 0c0 5.5-8 12-8 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function DestinationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M15 6l6 6-6 6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3v-5l2-5h14l2 5v5h-2" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
