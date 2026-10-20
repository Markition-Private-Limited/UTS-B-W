"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PillButtonContent from "@/components/ui/PillButtonContent";

const HERO_IMAGES = [
  { src: "/hero_img.png", alt: "Executive chauffeur service" },
  { src: "/hero_img_2.webp", alt: "Chauffeur in central London" },
  { src: "/hero_img_3.webp", alt: "Chauffeur loading luggage at the airport" },
];

const SLIDE_MS = 4000;

export default function HeroSection() {
  const imgDivRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelTilt, setPanelTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveImage((i) => (i + 1) % HERO_IMAGES.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  const handlePanelMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0 → 1
    const py = (e.clientY - rect.top) / rect.height; // 0 → 1

    // Subtle tilt — max ~4deg, inverted so the panel leans toward the cursor
    const maxTilt = 4;
    const ry = (px - 0.5) * 2 * maxTilt;
    const rx = (0.5 - py) * 2 * maxTilt;

    setPanelTilt({ rx, ry, mx: px * 100, my: py * 100 });
  };

  const handlePanelMouseLeave = () => {
    setPanelTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
  };

  useEffect(() => {
    const applyClip = () => {
      const el = imgDivRef.current;
      if (!el) return;
      const W = el.offsetWidth;
      const H = el.offsetHeight;

      // Straight-edged rectangle — no corner radius, no concave bottom dip.
      const d = [
        `M 0,0`,
        `L ${W},0`,
        `L ${W},${H}`,
        `L 0,${H}`,
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
      data-navbar-theme="dark"
      className="relative w-full bg-white flex flex-col overflow-hidden"
      style={{ height: "100svh" }}
    >
      {/* Hero photo — fills the whole section; cropped from the bottom (object-top) so it never overflows the screen */}
      <div
        ref={imgDivRef}
        className="absolute inset-0 z-0"
      >
        {HERO_IMAGES.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className="object-cover object-top"
            style={{
              opacity: i === activeImage ? 1 : 0,
              transition: "opacity 2200ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            sizes="100vw"
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 flex flex-col items-center text-center text-white px-6 pt-32">
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
            fontSize: "clamp(1.75rem, 4.5833vw, 88px)",
            lineHeight: "1.04",
            letterSpacing: "-0.04em",
            maxWidth: "83.3333vw",
            textAlign: "center",
          }}
        >
          Your Journey Deserves More Than a Ride.
        </h1>

        {/* Subtitle — Figma: 22px / 400 / line-height 150% / tracking 0% */}
        <p
          className="text-white/90 font-medium mb-10 whitespace-nowrap"
          style={{ fontSize: "clamp(0.75rem, 1.1vw, 17px)", lineHeight: "1.5" }}
        >
          Premium Chauffeur Services for Business, Airport Transfers &amp; Luxury Travel.
        </p>

        {/* Explore Fleet link */}
        <a
          href="#fleet"
          className="group inline-flex items-center gap-[0.4em] text-[11px] font-medium tracking-[0.2em] uppercase text-white underline underline-offset-4 decoration-white/50 hover:decoration-white transition-colors duration-200"
        >
          Explore Our Fleet
          <svg
            width="9"
            height="9"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* ── Booking bar — pb-24 keeps its bottom edge above the circle zone (circle: bottom 36–84px) ── */}
      <div className="relative z-10 w-full px-4 md:px-10 pb-8 mt-auto flex-shrink-0">
        {/* "PLAN YOUR NEXT JOURNEY" label above bar */}
        <div className="mx-auto mb-3" style={{ maxWidth: "91.6667vw", paddingLeft: "1.4583vw" }}>
          <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-white/60">
            Plan Your Next Journey
          </span>
        </div>

        <div
          ref={panelRef}
          onMouseMove={handlePanelMouseMove}
          onMouseLeave={handlePanelMouseLeave}
          className="relative mx-auto flex flex-col md:flex-row items-start md:items-center gap-[1.1458vw] overflow-hidden"
          style={{
            maxWidth: "91.6667vw",
            minHeight: "5.2083vw",
            borderRadius: "1.25vw",
            padding: "0.9375vw 1.4583vw",
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.4)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.1), inset 0 0 40px rgba(255,255,255,0.05)",
            transform: `perspective(1000px) rotateX(${panelTilt.rx}deg) rotateY(${panelTilt.ry}deg)`,
            transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Cursor-following glare — glass sheen */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background: `radial-gradient(circle 280px at ${panelTilt.mx}% ${panelTilt.my}%, rgba(255,255,255,0.18), transparent 70%)`,
              transition: "background 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
          />

          {/* Fields row — shifts slightly opposite the tilt for a layered parallax feel */}
          <div
            className="relative z-10 w-full flex flex-col md:flex-row md:items-center md:divide-x divide-white/20 gap-4 md:gap-0"
            style={{
              transform: `translate3d(${panelTilt.ry * 0.8}px, ${-panelTilt.rx * 0.8}px, 0)`,
              transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
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
                className="group relative overflow-hidden inline-flex items-center gap-2 text-black text-[11px] font-semibold tracking-[0.12em] uppercase px-6 py-4 rounded-full whitespace-nowrap border-[1.5px] border-transparent transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_16px_rgba(255,255,255,0.25)]"
                style={{ background: "#ffffff", minWidth: "168px" }}
              >
                <PillButtonContent fill="black">Find Your Ride</PillButtonContent>
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
      <span className="mt-1 flex-shrink-0 text-white/70">{icon}</span>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-semibold text-white/60 tracking-wide mb-0.5">
          {label}
        </span>
        <span className="text-[13px] font-medium text-white truncate">
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
