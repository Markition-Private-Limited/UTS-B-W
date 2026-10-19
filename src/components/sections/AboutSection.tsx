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
import { useInView as useScrollReveal } from "@/hooks/useInView";

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
  const { ref: headerRef, isInView: headerInView } = useScrollReveal<HTMLDivElement>();
  const [arrangement, setArrangement] = useState(INITIAL);
  const [inGallery, setInGallery]     = useState(false);
  const [flyCard,   setFlyCard]       = useState<FlyCard | null>(null);

  // Mirror arrangement in a ref so async callbacks always see the latest value
  const arrangementRef = useRef(INITIAL);
  useEffect(() => { arrangementRef.current = arrangement; }, [arrangement]);

  const cursorRef  = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const centerRef  = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLElement>(null);
  const mousePos = useRef({ x: -1, y: -1 });
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

  const isInView = useInView(gallerySectionRef, { once: false, amount: 0.6 });
  const hasEnteredRef = useRef(false);

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

  // ── Auto-swap: only while section is visible ─────────────────────────────
  // triggerAutoSwap / restartInterval are useCallback with stable deps — they
  // never change identity, so listing them here is safe and keeps hook counts constant.
  useEffect(() => {
    if (!isInView) {
      if (intervalId.current) { clearInterval(intervalId.current); intervalId.current = null; }
      return;
    }

    if (!hasEnteredRef.current) {
      hasEnteredRef.current = true;
      let t2: ReturnType<typeof setTimeout>;
      const t1 = setTimeout(() => {
        triggerAutoSwap(0);
        t2 = setTimeout(() => restartInterval(), 700);
      }, 700);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        if (intervalId.current) clearInterval(intervalId.current);
      };
    }

    restartInterval();
    return () => { if (intervalId.current) clearInterval(intervalId.current); };
  }, [isInView, triggerAutoSwap, restartInterval]);

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
    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("mousemove", onMove); };
  }, []);

  // ── Correct `inGallery` on scroll ───────────────────────────────────────────
  // onMouseEnter/Leave only fire on actual pointer movement, so scrolling the
  // page under a stationary cursor (mouse wheel) never fires them — the
  // gallery section can scroll out from under the pointer while `inGallery`
  // stays stuck true, leaving the circle cursor floating over an unrelated
  // section. Re-validate against the real cursor position on every scroll.
  useEffect(() => {
    const onScroll = () => {
      const el = gallerySectionRef.current;
      if (!el) return;
      const { x, y } = mousePos.current;
      const rect = el.getBoundingClientRect();
      const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      setInGallery(inside);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const centerImgIdx = arrangement[2];

  return (
    <>
      {/* ── Custom cursor ──────────────────────────────────────────────────── */}
      <div ref={cursorRef} className="pointer-events-none fixed z-[9999]"
        style={{ transform: "translate(-50%, -50%)", opacity: inGallery ? 1 : 0, transition: "opacity 0.2s ease" }}>
        <svg width="72" height="72" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r="42" fill="#0d0d0d" />
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

      {/* ── Text header section ──────────────────────────────────────────────── */}
      <section id="about" data-navbar-theme="light" className="w-full bg-white px-6 md:px-14">
        <div className="w-full pt-[96px] pb-14">
          <div
            ref={headerRef}
            className={`mx-auto text-center transition-all duration-700 ease-out ${
              headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ maxWidth: "1280px" }}
          >
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-black mb-3">
              The United Travel Services Experience
            </p>
            <h2
              className="uppercase text-gray-900 mb-3 mx-auto"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "46px",
                lineHeight: "106%",
                letterSpacing: "-0.04em",
                textAlign: "center",
              }}
            >
              More Than a Ride.<br />A Better Way to Travel.
            </h2>
            <p className="text-black mx-auto whitespace-nowrap" style={{ fontSize: "14px", lineHeight: "170%" }}>
              Discover a more refined way to travel with professional chauffeurs, premium vehicles, and thoughtfully
              coordinated journeys.
            </p>
            <p
              className="text-black mx-auto mt-0"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "170%",
                letterSpacing: "normal",
                textAlign: "center",
                maxWidth: "980px",
              }}
            >
              Every journey should feel effortless. From everyday business travel to special occasions and airport transfers, United<br />
              Travel Services brings together comfort, reliability and personal service to make every mile count.
            </p>
          </div>
        </div>
      </section>

      {/* ── Gallery section ───────────────────────────────────────────────────── */}
      <section
        ref={gallerySectionRef}
        id="about-gallery"
        data-navbar-theme="light"
        className="w-full bg-white flex flex-col px-6 md:px-14"
        style={{ height: "58svh", cursor: inGallery ? "none" : "auto" }}
        onMouseEnter={() => setInGallery(true)}
        onMouseLeave={() => setInGallery(false)}
      >
        <div className="flex-1 min-h-0 flex flex-col pb-[48px]" style={{ maxWidth: "1280px", width: "100%", margin: "0 auto" }}>
          <div ref={galleryRef} className="flex gap-3 flex-1 min-h-0">

            {/* Left */}
            <div className="flex flex-col gap-3" style={{ width: "20%" }}>
              <GallerySlot slot={0} imgIdx={arrangement[0]} onSwap={swapWithCenter} onDragStart={restartInterval} parallaxY={yLeft} outerRef={setSlotRef(0)} />
              <GallerySlot slot={1} imgIdx={arrangement[1]} onSwap={swapWithCenter} onDragStart={restartInterval} parallaxY={yLeft} outerRef={setSlotRef(1)} />
            </div>

            {/* Center — taller than the stacked side columns, bleeding past the row's top/bottom edge */}
            <div ref={centerRef} className="relative flex-1 z-10" style={{ marginTop: "-28px", marginBottom: "-36px" }}>
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
            <div className="flex flex-col gap-3" style={{ width: "20%" }}>
              <GallerySlot slot={3} imgIdx={arrangement[3]} onSwap={swapWithCenter} onDragStart={restartInterval} parallaxY={yRight} outerRef={setSlotRef(3)} />
              <GallerySlot slot={4} imgIdx={arrangement[4]} onSwap={swapWithCenter} onDragStart={restartInterval} parallaxY={yRight} outerRef={setSlotRef(4)} />
            </div>

          </div>

          <div className="flex justify-between items-center mt-10 shrink-0" style={{ transform: "translateY(0px)" }}>
            <p className="text-[10px] font-bold tracking-[0.03em] uppercase text-black" style={{ wordSpacing: "normal" }}>
              A considered experience. From the first moment.
            </p>
            <p className="text-[11px] tracking-[0.03em] text-black font-bold italic" style={{ wordSpacing: "normal" }}>
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
