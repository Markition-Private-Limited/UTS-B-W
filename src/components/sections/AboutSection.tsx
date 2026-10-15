"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import type { PanInfo, MotionValue } from "framer-motion";

// ── Images + per-image overlay text ──────────────────────────────────────────
const IMAGES = [
  { src: "/gallery/g1.jpg", alt: "Chauffeur opening car door at estate" },
  { src: "/gallery/g2.jpg", alt: "Chauffeur loading luggage" },
  { src: "/gallery/g3.jpg", alt: "Passenger relaxing in luxury vehicle" },
  { src: "/gallery/g4.jpg", alt: "Chauffeur standing by open door" },
  { src: "/gallery/g5.jpg", alt: "Luxury vehicle at hotel entrance" },
];

const IMAGE_TEXT = [
  { title: "Opening Doors to Excellence.",  sub: "A welcome befitting your arrival." },
  { title: "Every Detail, Handled.",         sub: "Luggage, logistics — all taken care of." },
  { title: "Refined by Experience.",         sub: "Every detail considered. Every journey perfected." },
  { title: "Presence You Can Count On.",     sub: "Your chauffeur, always ready when you are." },
  { title: "Arrive in Style.",               sub: "The entrance you deserve, every time." },
];

const INITIAL: [number, number, number, number, number] = [0, 1, 2, 3, 4];
// slot indices for cycling: 0=top-left, 1=bottom-left, 3=top-right, 4=bottom-right
const SIDE_SLOTS = [0, 1, 3, 4];

type FlyCard = {
  from: { left: number; top: number; width: number; height: number };
  to:   { left: number; top: number; width: number; height: number };
  imgIdx: number;
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AboutSection() {
  const [arrangement, setArrangement] = useState(INITIAL);
  const [inGallery, setInGallery]     = useState(false);
  const [flyCard,   setFlyCard]       = useState<FlyCard | null>(null);

  // Mirror arrangement in a ref so async callbacks always see the latest value
  const arrangementRef = useRef(INITIAL);
  useEffect(() => { arrangementRef.current = arrangement; }, [arrangement]);

  const cursorRef  = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const centerRef  = useRef<HTMLDivElement>(null);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoIdxRef = useRef(1);
  const flyInProgress = useRef(false);

  // One ref per side slot so we can read their bounding rects
  const slotRefs = useRef<Record<number, HTMLDivElement | null>>({ 0: null, 1: null, 3: null, 4: null });
  const setSlotRef = useCallback((slot: number) => (el: HTMLDivElement | null) => {
    slotRefs.current[slot] = el;
  }, []);

  // Parallax
  const { scrollYProgress } = useScroll({ target: galleryRef, offset: ["start end", "end start"] });
  const yLeft   = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const yCenter = useTransform(scrollYProgress, [0, 1], ["16%", "-16%"]);
  const yRight  = useTransform(scrollYProgress, [0, 1], ["6%",  "-6%"]);

  const isInView = useInView(galleryRef, { once: true, margin: "-15% 0px" });

  const swapWithCenter = useCallback((slot: number) => {
    setArrangement(prev => {
      const next = [...prev] as typeof prev;
      [next[2], next[slot]] = [next[slot], next[2]];
      return next;
    });
  }, []);

  // Flying-card swap — same animation for every auto-swap
  const triggerAutoSwap = useCallback((slot: number) => {
    if (flyInProgress.current) return;
    const slotEl   = slotRefs.current[slot];
    const centerEl = centerRef.current;

    if (!slotEl || !centerEl) {
      swapWithCenter(slot);
      return;
    }

    flyInProgress.current = true;
    const from   = slotEl.getBoundingClientRect();
    const to     = centerEl.getBoundingClientRect();
    const imgIdx = arrangementRef.current[slot];

    setFlyCard({
      from: { left: from.left, top: from.top, width: from.width, height: from.height },
      to:   { left: to.left,   top: to.top,   width: to.width,   height: to.height },
      imgIdx,
    });

    setTimeout(() => {
      swapWithCenter(slot);
      setFlyCard(null);
      flyInProgress.current = false;
    }, 680);
  }, [swapWithCenter]);

  // Reset + restart the interval (called on manual drag start)
  const restartInterval = useCallback(() => {
    if (intervalId.current) clearInterval(intervalId.current);
    intervalId.current = setInterval(() => {
      const slot = SIDE_SLOTS[autoIdxRef.current % SIDE_SLOTS.length];
      autoIdxRef.current++;
      triggerAutoSwap(slot);
    }, 2400);
  }, [triggerAutoSwap]);

  // ── Auto-swap on section enter ────────────────────────────────────────────
  useEffect(() => {
    if (!isInView) return;

    const t1 = setTimeout(() => {
      triggerAutoSwap(0);

      const t2 = setTimeout(() => {
        restartInterval();
      }, 700); // start cycle after first swap lands

      return () => clearTimeout(t2);
    }, 700);

    return () => {
      clearTimeout(t1);
      if (intervalId.current) clearInterval(intervalId.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  // ── Smooth cursor lag ─────────────────────────────────────────────────────
  useEffect(() => {
    let rafId: number;
    let tx = -200, ty = -200, cx = -200, cy = -200;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      cx = lerp(cx, tx, 0.1); cy = lerp(cy, ty, 0.1);
      if (cursorRef.current) { cursorRef.current.style.left = `${cx}px`; cursorRef.current.style.top = `${cy}px`; }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("mousemove", onMove); };
  }, []);

  const centerImgIdx = arrangement[2];

  return (
    <>
      {/* ── Custom cursor ──────────────────────────────────────────────────── */}
      <div ref={cursorRef} className="pointer-events-none fixed z-[9999]"
        style={{ transform: "translate(-50%, -50%)", opacity: inGallery ? 1 : 0, transition: "opacity 0.2s ease" }}>
        <svg width="72" height="72" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r="42" fill="#7C5C3E" />
          <defs><path id="ctp" d="M 44,44 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0" /></defs>
          <text fill="white" fontSize="7.5" letterSpacing="3.4" fontFamily="Inter, sans-serif" fontWeight="500">
            <textPath href="#ctp">SELECT · SELECT · SELECT · SELECT ·</textPath>
            <animateTransform attributeName="transform" type="rotate" from="0 44 44" to="360 44 44" dur="6s" repeatCount="indefinite" />
          </text>
        </svg>
      </div>

      {/* ── Flying card ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {flyCard && (
          <motion.div key={`fly-${flyCard.imgIdx}-${flyCard.from.left}`}
            className="fixed rounded-2xl overflow-hidden pointer-events-none"
            style={{ zIndex: 9998 }}
            initial={{
              left: flyCard.from.left, top: flyCard.from.top,
              width: flyCard.from.width, height: flyCard.from.height,
              scale: 1, boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            }}
            animate={{
              left: flyCard.to.left, top: flyCard.to.top,
              width: flyCard.to.width, height: flyCard.to.height,
              scale: 1.04, boxShadow: "0 28px 70px rgba(0,0,0,0.28)",
            }}
            exit={{ opacity: 0, scale: 1, transition: { duration: 0.18 } }}
            transition={{ duration: 0.62, ease: [0.4, 0, 0.15, 1] }}>
            <Image src={IMAGES[flyCard.imgIdx].src} alt="" fill className="object-cover object-center" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Single viewport section: text header + gallery ─────────────────── */}
      <section
        id="about"
        className="w-full bg-white flex flex-col px-6 md:px-14"
        style={{ height: "100svh", cursor: inGallery ? "none" : "auto" }}
        onMouseEnter={() => setInGallery(true)}
        onMouseLeave={() => setInGallery(false)}
      >
        {/* Text header */}
        <div className="w-full pt-16 pb-8 shrink-0">
          <div className="mx-auto text-center" style={{ maxWidth: "1280px" }}>
            <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-gray-400 mb-6">
              The United Travel Services Experience
            </p>
            <h2
              className="font-bold uppercase text-gray-900 mb-6 mx-auto"
              style={{
                fontSize: "clamp(2.4rem, 5.5vw, 80px)",
                lineHeight: "1.06",
                letterSpacing: "-0.03em",
                maxWidth: "22ch",
              }}
            >
              More Than a Ride.<br />A Better Way to Travel.
            </h2>
            <p className="text-gray-500 mx-auto" style={{ fontSize: "clamp(0.9rem, 1.05vw, 15px)", lineHeight: "1.8", maxWidth: "64ch" }}>
              Discover a more refined way to travel with professional chauffeurs, premium vehicles,
              and thoughtfully coordinated journeys.
            </p>
          </div>
        </div>

        {/* Gallery — fills remaining height */}
        <div className="flex-1 min-h-0 flex flex-col pb-8" style={{ maxWidth: "1280px", width: "100%", margin: "0 auto" }}>
          <div ref={galleryRef} className="flex gap-3 flex-1 min-h-0">

            {/* Left */}
            <div className="flex flex-col gap-3" style={{ width: "25%" }}>
              <GallerySlot slot={0} imgIdx={arrangement[0]} onSwap={swapWithCenter} onDragStart={restartInterval} parallaxY={yLeft} outerRef={setSlotRef(0)} />
              <GallerySlot slot={1} imgIdx={arrangement[1]} onSwap={swapWithCenter} onDragStart={restartInterval} parallaxY={yLeft} outerRef={setSlotRef(1)} />
            </div>

            {/* Center */}
            <div ref={centerRef} className="relative flex-1">
              <AnimatePresence mode="sync">
                <motion.div key={centerImgIdx} className="absolute inset-0 rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}>
                  <motion.div className="absolute left-0 right-0 pointer-events-none"
                    style={{ y: yCenter, top: "-18%", bottom: "-18%" }}>
                    <Image src={IMAGES[centerImgIdx].src} alt={IMAGES[centerImgIdx].alt} fill className="object-cover object-center" priority />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Gradient + animated text */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none" style={{ zIndex: 10 }}>
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 45%, transparent 70%)" }} />
                <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
                  <AnimatePresence mode="wait">
                    <motion.div key={centerImgIdx}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}>
                      <h3 className="text-white font-semibold mb-2"
                        style={{ fontSize: "1.3rem", letterSpacing: "-0.025em", lineHeight: 1.3 }}>
                        {IMAGE_TEXT[centerImgIdx].title}
                      </h3>
                      <p className="text-white/65 font-light" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
                        {IMAGE_TEXT[centerImgIdx].sub}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-3" style={{ width: "25%" }}>
              <GallerySlot slot={3} imgIdx={arrangement[3]} onSwap={swapWithCenter} onDragStart={restartInterval} parallaxY={yRight} outerRef={setSlotRef(3)} />
              <GallerySlot slot={4} imgIdx={arrangement[4]} onSwap={swapWithCenter} onDragStart={restartInterval} parallaxY={yRight} outerRef={setSlotRef(4)} />
            </div>

          </div>

          <div className="flex justify-between items-center mt-5 shrink-0">
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gray-400">
              A considered experience. From the first moment.
            </p>
            <p className="text-[11px] text-gray-400 font-light italic">
              People. Presence. Personal attention.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// ── GallerySlot ───────────────────────────────────────────────────────────────
function GallerySlot({
  slot, imgIdx, onSwap, onDragStart, parallaxY, outerRef,
}: {
  slot: number;
  imgIdx: number;
  onSwap: (slot: number) => void;
  onDragStart: () => void;
  parallaxY: MotionValue<string>;
  outerRef?: (el: HTMLDivElement | null) => void;
}) {
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (Math.hypot(info.offset.x, info.offset.y) > 55) onSwap(slot);
    },
    [slot, onSwap]
  );

  return (
    <div ref={outerRef} className="relative flex-1 min-h-0">
      <AnimatePresence mode="sync">
        <motion.div key={imgIdx} className="absolute inset-0 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          drag dragElastic={0.16} dragMomentum={false}
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          onDragStart={onDragStart}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.05, zIndex: 50, boxShadow: "0 24px 64px rgba(0,0,0,0.22)" }}>
          <motion.div className="absolute left-0 right-0 pointer-events-none"
            style={{ y: parallaxY, top: "-15%", bottom: "-15%" }}>
            <Image src={IMAGES[imgIdx].src} alt={IMAGES[imgIdx].alt} fill
              className="object-cover object-center" draggable={false} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
