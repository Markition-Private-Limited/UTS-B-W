// ─────────────────────────────────────────────
//  SECTION: Testimonials  (Section 8)
//
//  Design notes:
//  • Light gray background (#ECECEC)
//  • Centered header: eyebrow "Clients" + headline "THEIR TASTE-STATEMENTS
//    MAKE US PROUD." + subtext
//  • 3-item carousel row:
//      - Left peek photo (shifted down), partially behind the center card
//      - Center card: photo (left half) + quote/review/name/stars (right half)
//      - Right peek photo (shifted up), partially behind the center card
//      - Circular prev/next arrow buttons at the outer edges
//  • Images: /public/images/testimonials/*.png
//
//  All px values converted to vw against the 1920px Figma frame
//  (vw = px / 1920 * 100) so the section scales proportionally at any
//  window width instead of only matching the design at exactly 1920px.
//
//  Only one real testimonial (quote/name/rating) exists for this project so
//  far, so all three carousel slots reuse that same text and just rotate
//  through the three client photos already placed in the design. Swap in
//  per-slide copy here once more real testimonials are supplied — nothing
//  else about the animation/layout needs to change.
// ─────────────────────────────────────────────

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    id: "mask-group",
    image: "/images/testimonials/Mask group (2).png",
    alt: "Client portrait, arms crossed",
    quote:
      "From the presentation of our vehicles to the professionalism of our chauffeurs, every detail contributes to a more comfortable and considered travel experience. From the presentation of our vehicles.",
    name: "John D.",
    rating: 5,
  },
  {
    id: "rectangle-40",
    image: "/images/testimonials/Rectangle 40.png",
    alt: "Smiling client beside his car",
    quote:
      "From the presentation of our vehicles to the professionalism of our chauffeurs, every detail contributes to a more comfortable and considered travel experience. From the presentation of our vehicles.",
    name: "John D.",
    rating: 5,
  },
  {
    id: "rectangle-42",
    image: "/images/testimonials/Rectangle 42.png",
    alt: "Smiling client driving her car",
    quote:
      "From the presentation of our vehicles to the professionalism of our chauffeurs, every detail contributes to a more comfortable and considered travel experience. From the presentation of our vehicles.",
    name: "John D.",
    rating: 5,
  },
];

const AUTOPLAY_MS = 3000;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function TestimonialsSection() {
  const { ref, isInView } = useInView<HTMLElement>();
  const prefersReducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((current) => mod(current + 1, testimonials.length));
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((current) => mod(current - 1, testimonials.length));
  }, []);

  // Autoplay — advances every 5s, pauses on hover, resets after manual nav.
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goNext, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeIndex, goNext]);

  const handlePrevClick = () => goPrev();
  const handleNextClick = () => goNext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  const active = testimonials[activeIndex];
  const prev = testimonials[mod(activeIndex - 1, testimonials.length)];
  const next = testimonials[mod(activeIndex + 1, testimonials.length)];


  const flipVariants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: (dir: number) => ({ rotateY: dir > 0 ? 90 : -90, opacity: 0 }),
        animate: { rotateY: 0, opacity: 1 },
        exit: (dir: number) => ({ rotateY: dir > 0 ? -90 : 90, opacity: 0 }),
      };

  // Peek images (prev/next) — a cinematic slide + scale + blur crossfade,
  // direction-aware so they glide the same way the carousel is moving.
  const peekVariants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: (dir: number) => ({
          opacity: 0,
          scale: 1.15,
          x: dir > 0 ? "18%" : "-18%",
          filter: "blur(10px)",
        }),
        animate: { opacity: 1, scale: 1, x: "0%", filter: "blur(0px)" },
        exit: (dir: number) => ({
          opacity: 0,
          scale: 0.88,
          x: dir > 0 ? "-18%" : "18%",
          filter: "blur(10px)",
        }),
      };

  return (
    <section
      id="testimonials"
      ref={ref}
      data-navbar-theme="light"
      className={`w-full bg-[#ECECEC] section-y px-[4.1667vw] overflow-hidden transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-[1920px] mx-auto">

        {/* Header */}
        <div className="text-center max-w-[44vw] mx-auto mb-[3.3333vw]">
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
            Clients
          </p>

          <h2
            className="uppercase text-black"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 3.3333vw, 64px)",
              lineHeight: "1.15",
              letterSpacing: "-0.03em",
              textAlign: "center",
            }}
          >
            Their Taste-Statements<br />Make Us Proud.
          </h2>
        </div>

        {/* Carousel row — three equal invisible boxes: left peek | center | right peek */}
        <div
          className="grid grid-cols-[1fr_2fr_1fr] items-stretch mx-auto"
          style={{ maxWidth: "85vw", height: "28vw" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Client testimonials carousel"
        >

          {/* Left box */}
          <div className="relative hidden md:flex flex-col justify-end">
            <button
              aria-label="Previous testimonial"
              onClick={handlePrevClick}
              className="absolute right-[2vw] top-0 z-20 w-[3.3333vw] h-[3.3333vw] rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="w-[18.2292vw] h-[14.0625vw] rounded-[1.25vw] overflow-hidden self-end mt-auto ml-auto">
              <AnimatePresence mode="wait" custom={direction}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  key={prev.id}
                  src={prev.image}
                  alt={prev.alt}
                  className="w-full h-full object-cover object-top select-none pointer-events-none"
                  draggable={false}
                  custom={direction}
                  variants={peekVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Center box */}
          <div className="flex items-center justify-center">
            <div
              className="relative z-10 w-full max-w-[40vw] h-[28vw] bg-white rounded-[1.6667vw] overflow-hidden shadow-xl"
              style={{ perspective: "1000px" }}
            >
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={active.id}
                  custom={direction}
                  variants={flipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 flex w-full h-full bg-white"
                  style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                >
                  <div className="w-1/2 h-full shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={active.image}
                      alt={active.alt}
                      className="w-full h-full object-cover object-top select-none pointer-events-none"
                      draggable={false}
                    />
                  </div>

                  <div className="w-1/2 flex flex-col justify-center px-[2.0833vw] py-[1.6667vw]">
                    <svg width="60" height="47" viewBox="0 0 48 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-[1.0417vw] text-gray-200">
                      <path
                        d="M20.2 0C9 3.6 0 13 0 24.4 0 32 5.6 38 13 38c6 0 10.6-4.6 10.6-10.4 0-5.6-4-10-9.4-10-.8 0-1.6.2-2.2.4C13 11.4 17.8 5.6 24.8 2.6L20.2 0Zm27.2 0C36.2 3.6 27.2 13 27.2 24.4 27.2 32 32.8 38 40.2 38c6 0 10.6-4.6 10.6-10.4 0-5.6-4-10-9.4-10-.8 0-1.6.2-2.2.4C40.2 11.4 45 5.6 52 2.6L47.4 0Z"
                        fill="currentColor"
                      />
                    </svg>

                    <p
                      className="text-black mb-[1.25vw]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: "0.9375vw",
                        lineHeight: "1.5",
                      }}
                    >
                      {active.quote}
                    </p>

                    <p
                      className="italic text-black mb-[0.5208vw]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.9375vw",
                        lineHeight: "1.2",
                      }}
                    >
                      {active.name}
                    </p>

                    <div className="flex gap-[0.2604vw]">
                      {Array.from({ length: active.rating }).map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F5A623" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.8 7.1-.7L12 2.5Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right box */}
          <div className="relative hidden md:flex flex-col justify-start">
            <div className="w-[18.2292vw] h-[14.0625vw] rounded-[1.25vw] overflow-hidden self-start mr-auto">
              <AnimatePresence mode="wait" custom={direction}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  key={next.id}
                  src={next.image}
                  alt={next.alt}
                  className="w-full h-full object-cover object-top select-none pointer-events-none"
                  draggable={false}
                  custom={direction}
                  variants={peekVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                />
              </AnimatePresence>
            </div>

            <button
              aria-label="Next testimonial"
              onClick={handleNextClick}
              className="absolute left-[2vw] bottom-0 z-20 w-[3.3333vw] h-[3.3333vw] rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
