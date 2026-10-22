"use client";

// import Image from "next/image";
import { useRef, useEffect, useState } from "react";
// import { motion } from "framer-motion";

const STEPS = [
  {
    icon: "/icons/car-front.svg",
    step: "01",
    title: "Choose Your Car",
    desc: "Select a suitable vehicle for your journey.",
  },
  {
    icon: "/icons/map-pin.svg",
    step: "02",
    title: "Set Your Details",
    desc: "Enter your pickup location, destination, date, and preferred time.",
  },
  {
    icon: "/icons/clipboard-check.svg",
    step: "03",
    title: "Confirm Your Ride",
    desc: "Review your journey details before proceeding with your reservation.",
  },
  {
    icon: "/icons/route.svg",
    step: "04",
    title: "Enjoy the Journey",
    desc: "Travel comfortably with professional chauffeur service.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 *  ORIGINAL scroll-driven version — commented out while a new direction is
 *  explored. The background photo + dark overlay and the whole scroll/stage
 *  animation (card rise, icon morph, text reveal, step-line fill) live here.
 *  To restore: uncomment this block, remove the wave-timeline version below,
 *  and restore the `motion` import above.
 * ═══════════════════════════════════════════════════════════════════════════

// ─── Scroll timeline ───────────────────────────────────────────────────────
// Container: 700 vh → 600 vh scrollable, split into 5 discrete scroll
// stages (not a continuous scrub):
//
//   stage 0  Dead zone  — section in view, no cards, no fill, all nodes empty
//   stage 1  1st scroll into the section — node 1 fills, card 1 rises and
//            plays its rise → icon-morph → text-reveal sequence on its own,
//            with no further scrolling required
//   stage 2  next scroll — the line fills from node 1 to node 2 (bounded,
//            no overshoot), card 2 auto-plays the same sequence
//   stage 3 / 4 — same pattern for cards 3 and 4
//
// Each card's entrance animation is time-driven (fixed durations), triggered
// once by the stage change, never tied to further scroll position.
// ───────────────────────────────────────────────────────────────────────────

const DEAD = 0.20; // dead zone end
const SPAN = 0.20; // scroll span per stage
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const RISE_MS  = 600; // card rise duration
const HOLD_MS  = 350; // big icon hold before it morphs
const REVEAL_DELAY_MS = RISE_MS + HOLD_MS; // when the icon-morph/text-reveal sequence kicks off after the card becomes active

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0 },
};

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0); // 0..4
  const [revealed, setRevealed] = useState([false, false, false, false]);
  const [headerVisible, setHeaderVisible] = useState(false);

  // ── Scroll → target stage (not a continuous scrub) ──────────────────────
  // `targetStage` is wherever the scroll position says we should be.
  // `stage` (what actually renders) is held back from `targetStage` and
  // only advances one step at a time, each step waiting for the previous
  // card's entrance animation to finish — so a fast/over-scroll can't skip
  // a card mid-animation, it just queues up and plays out in order.
  const [targetStage, setTargetStage] = useState(0);

  useEffect(() => {
    const THRESHOLDS = [DEAD, DEAD + SPAN, DEAD + SPAN * 2, DEAD + SPAN * 3];

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.85) setHeaderVisible(true);

      const total = containerRef.current.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / total);

      const newStage = THRESHOLDS.filter((t) => progress >= t).length;
      setTargetStage((prev) => (prev === newStage ? prev : newStage));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Pace the display stage toward the target, one step at a time ───────
  useEffect(() => {
    if (stage === targetStage) return;

    if (stage > targetStage) {
      // Scrolled back up — drop back immediately and re-arm the cards
      // above the new stage so they replay next time they're reached.
      setStage(targetStage);
      setRevealed((prev) => prev.map((r, i) => (i < targetStage ? r : false)));
      return;
    }

    // Only step forward once the current card (if any) has finished
    // playing its own entrance animation.
    if (stage === 0 || revealed[stage - 1]) {
      setStage(stage + 1);
    }
  }, [stage, targetStage, revealed]);

  // ── Auto-play each card's entrance sequence once its stage is reached ──
  useEffect(() => {
    if (stage === 0) return;
    const idx = stage - 1;
    if (revealed[idx]) return;
    const t = setTimeout(() => {
      setRevealed((prev) => {
        if (prev[idx]) return prev;
        const next = [...prev];
        next[idx] = true;
        return next;
      });
    }, REVEAL_DELAY_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // ── Progress line fill ──────────────────────────────────────────────────
  // Bounded to exactly the target for the current stage — animates there on
  // each scroll-triggered stage change and never exceeds it.
  const lineFillTarget = stage === 0 ? 0 : Math.min((stage - 1) * 25, 75);

  return (
    <div ref={containerRef} style={{ height: "700vh" }}>
      <div
        data-navbar-theme="dark"
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center"
        style={{ padding: "56px 40px" }}
      >
        {/* Background photo + dark overlay for text contrast }
        <Image
          src="/how-it-works-bg.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-center -z-20"
        />
        <div className="absolute inset-0 -z-10" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", position: "relative" }}>

          {/* ── Header ── }
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            animate={headerVisible ? "show" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p
              className="uppercase mb-5"
              style={{
                fontFamily: "Inter, sans-serif", fontWeight: 500,
                fontSize: "13px", lineHeight: "100%",
                letterSpacing: "0.18em", textAlign: "center", color: "#ffffff",
              }}
            >
              How It Works
            </p>
            <h2
              className="uppercase mb-5"
              style={{
                fontFamily: "Inter, sans-serif", fontWeight: 700,
                fontSize: "50px", lineHeight: "106%",
                letterSpacing: "-0.04em", textAlign: "center", color: "#ffffff",
              }}
            >
              Your Journey, Simplified.
            </h2>
            <p
              className="mx-auto"
              style={{
                fontSize: "clamp(0.9rem, 1vw, 1rem)", lineHeight: "1.7",
                opacity: 0.85, color: "#ffffff", maxWidth: "600px",
              }}
            >
              From selecting your vehicle to arriving at your destination, enjoy a
              seamless booking experience with professional chauffeur service tailored
              around you.
            </p>
          </motion.div>

          {/* ── Step indicator ── }
          <div className="relative grid grid-cols-4 mb-8" style={{ gap: "24px" }}>
            {/* Translucent baseline — always visible }
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: "12.5%", right: "12.5%", height: "2px", backgroundColor: "rgba(255,255,255,0.3)" }}
            />
            {/* White fill — animates to the current stage's target, bounded, no overshoot }
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              animate={{ width: `${lineFillTarget}%` }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ left: "12.5%", height: "2px", backgroundColor: "#ffffff" }}
            />
            {/* Nodes — node i fills the instant stage i is reached (same scroll that starts card i) }
            {STEPS.map((s, i) => {
              const appeared  = stage > i;
              const completed = stage > i + 1;
              return (
                <div key={i} className="relative z-10 flex items-center justify-center" style={{ height: "48px" }}>
                  <motion.div
                    className="flex items-center justify-center rounded-full"
                    animate={{
                      backgroundColor: appeared ? "#ffffff" : "rgba(255,255,255,0.15)",
                      color:           appeared ? "#0d0d0d" : "rgba(255,255,255,0.7)",
                    }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{
                      width: "48px", height: "48px", flexShrink: 0,
                      fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "14px",
                    }}
                  >
                    {completed ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12l5 5L19 7" stroke="#0d0d0d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      s.step
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* ── Cards ── }
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ gap: "24px", overflow: "hidden" }}
          >
            {STEPS.map((s, i) => {
              const active = stage > i;     // card has risen (triggered by scroll reaching this stage)
              const shown  = revealed[i];   // icon-morph/text-reveal has auto-played

              return (
                <motion.div
                  key={i}
                  animate={{ y: active ? 0 : 500 }}
                  transition={{ duration: RISE_MS / 1000, ease: EASE }}
                  whileHover={{
                    borderColor: "rgba(255,255,255,0.85)",
                    boxShadow: "0 0 24px rgba(255,255,255,0.22), inset 0 1px 0 rgba(255,255,255,0.6)",
                    transition: { duration: 0.3, ease: EASE },
                  }}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    minHeight: "180px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Icon — one continuous morph from big-centred to small top-left,
                      auto-played on a timer once the card becomes active }
                  <motion.div
                    animate={
                      shown
                        ? { left: "20px", top: "20px", width: "20px", height: "20px" }
                        : { left: "50%", top: "50%", width: "64px", height: "64px", x: "-50%", y: "-50%" }
                    }
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{ position: "absolute" }}
                  >
                    <Image
                      src={s.icon}
                      alt={s.title}
                      width={64}
                      height={64}
                      style={{
                        width: "100%", height: "100%",
                        opacity: shown ? 0.9 : 0.8,
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </motion.div>

                  {/* Text content — fades in right after the icon settles into place }
                  <motion.div
                    className="absolute inset-0 flex flex-col"
                    style={{ padding: "20px", paddingTop: "48px" }}
                    animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 16 }}
                    transition={{ duration: 0.45, ease: EASE, delay: shown ? 0.15 : 0 }}
                  >
                    <p
                      className="font-bold uppercase mb-2"
                      style={{ fontSize: "0.78rem", letterSpacing: "0.06em", color: "#ffffff" }}
                    >
                      {s.step} — {s.title}
                    </p>
                    <p className="leading-snug" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)" }}>
                      {s.desc}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

 * ═══════════════════════════════════════════════════════════════════════════ */

// ── Scroll-filled wave timeline — no background photo ──────────────────────
// The section pins (sticky) while the page scrolls through a tall wrapper.
// Progress through that wrapper maps to 4 discrete stages, one per icon.
// Each stage is calibrated to ~2 mouse-wheel scrolls, so the wave fills to
// the next icon every 2 scrolls — 8 scrolls total — and the section unpins
// right as the 8th scroll finishes the last fill, with no extra lingering.
const STAGE_W = 1920;
const STAGE_H = 560;
const WAVE_EASE = "cubic-bezier(0.4,0,0.2,1)";
const FILL_DURATION_MS = 650; // how long each single-icon fill step takes to animate

// A single "scroll" varies a lot by device — a basic mouse wheel notch is
// ~100px, but trackpads and high-res mice commonly send 300-500px+ per
// gesture. Biased high (toward needing more physical scrolling) since
// "too fast" reads as broken, while "needs one more nudge" doesn't.
const PX_PER_WHEEL_SCROLL = 350;
const SCROLLS_PER_STAGE = 2;
// 4 icon reveals + 1 extra stage that fills the remaining tail of the
// curve (past the 4th icon, out to the right edge) on its own scroll.
const STAGE_COUNT = 5;
// Extra scroll distance (beyond the pinned 100vh) the wrapper provides —
// this is what the user scrolls through while the section stays pinned.
const EXTRA_SCROLL_PX = PX_PER_WHEEL_SCROLL * SCROLLS_PER_STAGE * STAGE_COUNT;

// Percentage of the stage's own rendered box, not the viewport. The wave SVG
// fills the stage via w-full/h-full, so its coordinate space is exactly the
// stage's actual box — but `vw` units are relative to the *true* viewport,
// which includes the scrollbar gutter. At full browser width (scrollbar
// visible) those two bases diverge by the scrollbar's width, so icons/text
// positioned in `vw` drift away from the wave line the wider the window
// gets. Percentages of the stage box can't drift: they're defined in terms
// of the exact same box the SVG is drawn into. The stage also locks its
// aspect ratio to STAGE_W/STAGE_H (instead of a vw-based height) so pctX and
// pctY stay mutually consistent regardless of actual rendered width.
const pctX = (px: number) => `${((px / STAGE_W) * 100).toFixed(4)}%`;
const pctY = (px: number) => `${((px / STAGE_H) * 100).toFixed(4)}%`;

type Layout = {
  // "numberFirst": number → dot/text → icon (top to bottom). "iconFirst": icon → number → dot/text.
  variant: "numberFirst" | "iconFirst";
  dotX: number;
  numberX: number;
  textX: number;
  iconX: number;
  number: string;
  numberW: number;
  textW: number;
};

const LAYOUT: Layout[] = [
  { variant: "numberFirst", dotX: 88,   numberX: 128,  textX: 125,  iconX: 113,  number: "/images/step-number-01.png", numberW: 135, textW: 215 },
  { variant: "iconFirst",   dotX: 575,  numberX: 615,  textX: 611,  iconX: 599,  number: "/images/step-number-02.png", numberW: 160, textW: 250 },
  { variant: "numberFirst", dotX: 1062, numberX: 1100, textX: 1098, iconX: 1086, number: "/images/step-number-03.png", numberW: 164, textW: 255 },
  { variant: "iconFirst",   dotX: 1549, numberX: 1588, textX: 1584, iconX: 1572, number: "/images/step-number-04.png", numberW: 168, textW: 215 },
];

// ── Icon tiles — inline paths so the background + icon color can crossfade
// between the "inactive" (light gray tile / dark icon) and "active" (dark
// tile / white icon) states as the wave reaches them. ─────────────────────
const ICON_PATHS: { d: string }[][] = [
  // Car
  [{ d: "M103.382 70.9024C102.845 64.8702 101.96 63.6954 101.625 63.2535C100.856 62.2325 99.6264 61.5652 98.3247 60.8651C98.2511 60.8262 98.1876 60.7707 98.1391 60.703C98.0906 60.6353 98.0585 60.5573 98.0453 60.4751C98.0322 60.3928 98.0383 60.3087 98.0632 60.2292C98.0881 60.1498 98.1311 60.0772 98.1889 60.0172C98.43 59.7728 98.6152 59.479 98.732 59.1561C98.8487 58.8332 98.8941 58.4889 98.8651 58.1468C98.809 57.5402 98.5269 56.9768 98.0748 56.5684C97.6227 56.16 97.0337 55.9364 96.4245 55.942H94.0958C93.996 55.9426 93.8963 55.9491 93.7972 55.9614C93.7292 55.9319 93.6588 55.9085 93.5868 55.8913C92.2074 52.9759 90.3191 48.9843 86.4051 47.0363C80.5998 44.1493 69.9057 44 67.8159 44C65.726 44 55.0319 44.1493 49.2341 47.0318C45.3201 48.9798 43.4317 52.9714 42.0524 55.8868L42.0405 55.9107C41.9717 55.9203 41.9041 55.9373 41.839 55.9614C41.7399 55.9491 41.6402 55.9426 41.5404 55.942H39.2072C38.598 55.9364 38.009 56.16 37.5569 56.5684C37.1048 56.9768 36.8227 57.5402 36.7666 58.1468C36.7401 58.4881 36.7876 58.8311 36.9058 59.1524C37.0241 59.4737 37.2103 59.7656 37.4518 60.0083C37.5095 60.0683 37.5526 60.1408 37.5775 60.2203C37.6024 60.2997 37.6085 60.3839 37.5954 60.4661C37.5822 60.5483 37.5501 60.6264 37.5016 60.6941C37.4531 60.7617 37.3895 60.8172 37.3159 60.8562C36.0142 61.5607 34.7782 62.228 34.0154 63.2446C33.6811 63.6924 32.7974 64.8612 32.2585 70.8934C31.9599 74.288 31.9151 77.8019 32.1495 80.0649C32.6406 84.7671 33.5617 87.6093 33.6005 87.7272C33.7418 88.1564 34.002 88.5366 34.3507 88.8238C34.6995 89.1111 35.1226 89.2934 35.5709 89.3498V89.3797C35.5709 90.0131 35.8225 90.6206 36.2704 91.0686C36.7184 91.5165 37.3259 91.7681 37.9593 91.7681H46.3187C46.9522 91.7681 47.5597 91.5165 48.0076 91.0686C48.4555 90.6206 48.7071 90.0131 48.7071 89.3797C49.9924 89.3797 50.8865 89.1498 51.8344 88.905C53.203 88.5364 54.6018 88.2911 56.0142 88.1721C60.5685 87.7377 65.0976 87.5884 67.8159 87.5884C70.4789 87.5884 75.208 87.7377 79.7698 88.1721C81.1878 88.2911 82.5921 88.5374 83.966 88.908C84.8736 89.1409 85.7349 89.3558 86.9276 89.3782C86.9276 90.0116 87.1792 90.6191 87.6271 91.0671C88.075 91.515 88.6825 91.7666 89.316 91.7666H97.6754C98.3088 91.7666 98.9163 91.515 99.3643 91.0671C99.8122 90.6191 100.064 90.0116 100.064 89.3782V89.3603C100.513 89.305 100.938 89.1231 101.287 88.8358C101.637 88.5485 101.898 88.1676 102.04 87.7377C102.079 87.6197 103 84.7775 103.491 80.0754C103.726 77.8109 103.684 74.3029 103.382 70.9024ZM46.3695 57.9289C47.5637 55.3912 48.9295 52.5191 51.3612 51.3085C54.8752 49.559 62.1583 48.7708 67.8159 48.7708C73.4734 48.7708 80.7565 49.553 84.2705 51.3085C86.7022 52.5191 88.0621 55.3927 89.2622 57.9289L89.4115 58.2528C89.4988 58.4372 89.5374 58.6409 89.5236 58.8445C89.5098 59.048 89.4441 59.2447 89.3327 59.4156C89.2214 59.5866 89.068 59.7261 88.8874 59.821C88.7068 59.9159 88.5049 59.9629 88.3009 59.9575C83.3405 59.8232 72.8912 59.3933 67.8159 59.3933C62.7405 59.3933 52.2912 59.8336 47.3233 59.968C47.1194 59.9733 46.9175 59.9263 46.7368 59.8314C46.5562 59.7366 46.4029 59.597 46.2915 59.4261C46.1802 59.2551 46.1144 59.0585 46.1006 58.8549C46.0869 58.6514 46.1254 58.4477 46.2127 58.2633C46.265 58.1528 46.3202 58.0408 46.3695 57.9289ZM48.1503 69.8157C45.5825 70.1248 42.9983 70.2773 40.4119 70.2725C38.8296 70.2725 37.198 69.8246 36.895 68.4155C36.6875 67.4676 36.7099 66.9347 36.8218 66.3988C36.9159 65.9435 37.0651 65.6121 37.8115 65.4956C39.7521 65.1971 40.8373 65.5718 44.0139 66.5077C46.1202 67.1272 47.6398 67.9527 48.5056 68.6065C48.94 68.929 48.7086 69.7709 48.1503 69.8157ZM81.1969 82.0563C79.2324 82.2802 75.3035 82.1981 67.8606 82.1981C60.4178 82.1981 56.4903 82.2802 54.5259 82.0563C52.4987 81.8308 49.9148 79.9141 51.6792 78.2064C52.854 77.0809 55.5947 76.239 59.2445 75.7658C62.8943 75.2926 64.4393 75.0493 67.8457 75.0493C71.2522 75.0493 72.6404 75.1985 76.447 75.7673C80.2535 76.336 83.13 77.1884 84.0122 78.2079C85.6214 80.0351 83.2226 81.8189 81.1969 82.0652V82.0563ZM98.7367 68.414C98.4382 69.8291 96.7962 70.271 95.2198 70.271C92.584 70.2715 89.9503 70.119 87.3321 69.8142C86.8753 69.7709 86.6634 68.9693 87.1261 68.605C87.9785 67.9348 89.5145 67.1257 91.6178 66.5062C94.7944 65.5703 96.626 65.1956 98.1994 65.5076C98.583 65.5837 98.786 65.9957 98.8099 66.254C98.9153 66.973 98.8905 67.7052 98.7367 68.4155V68.414Z" }],
  // Pin
  [
    { d: "M68.0037 35C56.4068 35 46.7344 44.3418 46.7344 56.2694C46.7344 60.8071 48.0979 64.8534 50.7148 68.645L66.376 93.0829C67.1358 94.2709 68.8732 94.2685 69.6314 93.0829L85.3606 68.5619C87.9211 64.9421 89.2731 60.6917 89.2731 56.2694C89.2731 44.5414 79.7317 35 68.0037 35ZM68.0037 65.9372C62.6731 65.9372 58.3358 61.6 58.3358 56.2694C58.3358 50.9387 62.6731 46.6015 68.0037 46.6015C73.3343 46.6015 77.6716 50.9387 77.6716 56.2694C77.6716 61.6 73.3343 65.9372 68.0037 65.9372Z" },
    { d: "M83.1196 78.9727L73.3833 94.1947C70.863 98.124 65.1302 98.1111 62.6221 94.1984L52.8699 78.9767C44.2895 80.9605 39 84.5947 39 88.9377C39 96.4737 53.9437 100.539 68.0037 100.539C82.0636 100.539 97.0073 96.4737 97.0073 88.9377C97.0073 84.5916 91.7105 80.9555 83.1196 78.9727Z" },
  ],
  // Calendar-check
  [
    { d: "M72.857 90.2838C72.857 81.3419 80.1054 74.0934 89.0474 74.0934C91.3513 74.0934 93.5386 74.5824 95.5236 75.4502V54.6649H34V90.2838C34 92.4308 34.8529 94.4899 36.371 96.008C37.8892 97.5262 39.9482 98.379 42.0952 98.379H75.0411C73.6106 95.921 72.8569 93.1278 72.857 90.2838ZM76.0951 65.1887C76.0951 64.5446 76.3509 63.9269 76.8064 63.4714C77.2618 63.016 77.8795 62.7601 78.5236 62.7601H83.3808C84.0249 62.7601 84.6426 63.016 85.098 63.4714C85.5535 63.9269 85.8093 64.5446 85.8093 65.1887V70.0458C85.8093 70.6899 85.5535 71.3076 85.098 71.7631C84.6426 72.2185 84.0249 72.4744 83.3808 72.4744H78.5236C77.8795 72.4744 77.2618 72.2185 76.8064 71.7631C76.3509 71.3076 76.0951 70.6899 76.0951 70.0458V65.1887ZM53.4285 87.8553C53.4285 88.4994 53.1726 89.1171 52.7172 89.5725C52.2617 90.028 51.644 90.2838 50.9999 90.2838H46.1428C45.4987 90.2838 44.881 90.028 44.4256 89.5725C43.9701 89.1171 43.7142 88.4994 43.7142 87.8553V82.9981C43.7142 82.3541 43.9701 81.7363 44.4256 81.2809C44.881 80.8254 45.4987 80.5696 46.1428 80.5696H50.9999C51.644 80.5696 52.2617 80.8254 52.7172 81.2809C53.1726 81.7363 53.4285 82.3541 53.4285 82.9981V87.8553ZM53.4285 70.0458C53.4285 70.6899 53.1726 71.3076 52.7172 71.7631C52.2617 72.2185 51.644 72.4744 50.9999 72.4744H46.1428C45.4987 72.4744 44.881 72.2185 44.4256 71.7631C43.9701 71.3076 43.7142 70.6899 43.7142 70.0458V65.1887C43.7142 64.5446 43.9701 63.9269 44.4256 63.4714C44.881 63.016 45.4987 62.7601 46.1428 62.7601H50.9999C51.644 62.7601 52.2617 63.016 52.7172 63.4714C53.1726 63.9269 53.4285 64.5446 53.4285 65.1887V70.0458ZM69.6189 87.8553C69.6189 88.4994 69.363 89.1171 68.9076 89.5725C68.4522 90.028 67.8344 90.2838 67.1903 90.2838H62.3332C61.6891 90.2838 61.0714 90.028 60.616 89.5725C60.1605 89.1171 59.9047 88.4994 59.9047 87.8553V82.9981C59.9047 82.3541 60.1605 81.7363 60.616 81.2809C61.0714 80.8254 61.6891 80.5696 62.3332 80.5696H67.1903C67.8344 80.5696 68.4522 80.8254 68.9076 81.2809C69.363 81.7363 69.6189 82.3541 69.6189 82.9981V87.8553ZM69.6189 70.0458C69.6189 70.6899 69.363 71.3076 68.9076 71.7631C68.4522 72.2185 67.8344 72.4744 67.1903 72.4744H62.3332C61.6891 72.4744 61.0714 72.2185 60.616 71.7631C60.1605 71.3076 59.9047 70.6899 59.9047 70.0458V65.1887C59.9047 64.5446 60.1605 63.9269 60.616 63.4714C61.0714 63.016 61.6891 62.7601 62.3332 62.7601H67.1903C67.8344 62.7601 68.4522 63.016 68.9076 63.4714C69.363 63.9269 69.6189 64.5446 69.6189 65.1887V70.0458ZM95.5236 51.4268V44.9507C95.5236 43.8876 95.3142 42.8349 94.9074 41.8528C94.5005 40.8706 93.9042 39.9782 93.1525 39.2265C92.4008 38.4748 91.5084 37.8785 90.5263 37.4717C89.5441 37.0649 88.4914 36.8555 87.4284 36.8555H85.8093V40.0936C85.8093 43.6652 82.9048 46.5697 79.3332 46.5697C75.7616 46.5697 72.857 43.6652 72.857 40.0936V36.8555H56.6666V40.0936C56.6666 43.6652 53.762 46.5697 50.1904 46.5697C46.6188 46.5697 43.7142 43.6652 43.7142 40.0936V36.8555H42.0952C39.9482 36.8555 37.8892 37.7084 36.371 39.2265C34.8529 40.7446 34 42.8037 34 44.9507V51.4268H95.5236Z" },
    { d: "M53.4293 35.2381C53.4293 33.4497 51.9796 32 50.1912 32C48.4029 32 46.9531 33.4497 46.9531 35.2381V40.0952C46.9531 41.8836 48.4029 43.3333 50.1912 43.3333C51.9796 43.3333 53.4293 41.8836 53.4293 40.0952V35.2381Z" },
    { d: "M82.5699 35.2381C82.5699 33.4497 81.1202 32 79.3318 32C77.5435 32 76.0938 33.4497 76.0938 35.2381V40.0952C76.0938 41.8836 77.5435 43.3333 79.3318 43.3333C81.1202 43.3333 82.5699 41.8836 82.5699 40.0952V35.2381Z" },
    { d: "M89.0461 77.3359C85.6109 77.3359 82.3164 78.7006 79.8874 81.1296C77.4584 83.5586 76.0938 86.8531 76.0938 90.2883C76.0938 93.7234 77.4584 97.0179 79.8874 99.4469C82.3164 101.876 85.6109 103.241 89.0461 103.241C92.4813 103.241 95.7757 101.876 98.2048 99.4469C100.634 97.0179 101.998 93.7234 101.998 90.2883C101.998 86.8531 100.634 83.5586 98.2048 81.1296C95.7757 78.7006 92.4813 77.3359 89.0461 77.3359ZM95.0479 88.1948L88.5717 94.671C88.4217 94.8219 88.2433 94.9416 88.0469 95.0233C87.8505 95.105 87.6398 95.1471 87.427 95.1471C87.2143 95.1471 87.0036 95.105 86.8072 95.0233C86.6107 94.9416 86.4324 94.8219 86.2824 94.671L83.0443 91.4329C82.7407 91.1293 82.5702 90.7176 82.5702 90.2883C82.5702 89.8589 82.7407 89.4472 83.0443 89.1436C83.3479 88.84 83.7596 88.6695 84.189 88.6695C84.6183 88.6695 85.03 88.84 85.3336 89.1436L87.427 91.237L92.7585 85.9055C92.9089 85.7552 93.0873 85.636 93.2837 85.5546C93.4801 85.4733 93.6906 85.4314 93.9032 85.4314C94.1158 85.4314 94.3263 85.4733 94.5227 85.5546C94.7191 85.636 94.8975 85.7552 95.0479 85.9055C95.1982 86.0558 95.3174 86.2343 95.3988 86.4307C95.4801 86.6271 95.522 86.8376 95.522 87.0502C95.522 87.2628 95.4801 87.4733 95.3988 87.6697C95.3174 87.8661 95.1982 88.0445 95.0479 88.1948Z" },
  ],
  // Seat
  [
    { d: "M55.3166 50.4596C58.4833 49.5279 59.7461 44.1475 58.7002 40.4528C57.6526 36.7555 54.4738 35.3477 51.307 36.278C48.1415 37.2104 46.1863 40.1288 47.2335 43.8261C48.2805 47.5214 52.1515 51.3907 55.3166 50.4596ZM54.263 52.4148C49.3766 54.2803 51.4543 60.0871 54.0745 66.6377C54.172 66.6649 54.2712 66.6866 54.372 66.6998L68.3592 68.1196C66.6295 64.8019 61.1218 53.7806 59.6331 52.7345C57.2678 51.0722 54.263 52.4148 54.263 52.4148ZM103.302 94.755L90.4974 73.1489C90.1505 72.6157 89.6864 72.1688 89.1407 71.8421C88.5949 71.5155 87.9818 71.3177 87.348 71.2638C86.112 71.1585 76.6415 70.0051 71.761 69.4077C72.7729 70.1629 73.6037 71.2098 74.1295 72.46L74.1379 72.4805L75.8409 76.674L80.8617 76.9655C82.9141 76.9864 84.7926 78.1259 85.8956 80.0231L87.9119 84.0672L97.9914 98.2145C98.5978 99.1479 99.6143 99.6551 100.65 99.6551C101.242 99.6551 101.843 99.4891 102.376 99.141C103.844 98.1865 104.258 96.2224 103.302 94.755Z" },
    { d: "M83.9768 81.4677C83.192 80.1179 81.8649 79.306 80.4431 79.306L74.2388 78.9457L72.1076 73.6974C71.3558 71.9098 69.8449 70.6928 68.1143 70.4812L53.8077 69.0289C52.194 68.8315 50.809 67.632 50.2112 65.9138L45.5237 53.5755C44.7715 51.4139 42.9365 50.0469 40.8944 50.0469H35.2594C33.462 50.0469 31.1415 52.1184 32.3207 55.8156L43.0502 89.6954C43.698 91.7469 45.6012 93.0529 47.7526 93.0529H85.39C87.5047 93.0529 88.8236 90.8227 87.7607 88.9944L83.9768 81.4677ZM50.2429 98.1235C50.2429 99.1337 51.0556 99.94 52.0656 99.94H80.8482C81.8583 99.94 82.6886 99.1336 82.6886 98.1235V95.1955H50.2429V98.1235Z" },
  ],
];

function StepIconTile({ paths, active }: { paths: { d: string }[]; active: boolean }) {
  return (
    <div className="relative" style={{ width: "100%", aspectRatio: "152 / 151" }}>
      {/* Opaque backdrop — masks the wave line behind the visible rounded-rect
          area only; the transparent SVG padding is intentionally left uncovered
          so connector lines can reach the rect's edges without a visual gap. */}
      <div
        className="absolute"
        style={{
          backgroundColor: "#fafafa",
          top: "7.9470%",
          right: "18.4211%",
          bottom: "18.5430%",
          left: "7.8947%",
        }}
      />
      <svg viewBox="0 0 152 151" className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(8px 8px 10px rgba(0,0,0,0.1))" }}>
        <rect
          x="12" y="12" width="112" height="111" rx="16"
          fill={active ? "#121212" : "#D9D9D9"}
          style={{ transition: `fill 0.5s ${WAVE_EASE}` }}
        />
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill={active ? "#ffffff" : "#121212"}
            style={{ transition: `fill 0.5s ${WAVE_EASE}` }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function FeaturesSection() {
  // Outer wrapper is tall (400vh) so the page keeps scrolling while the
  // section itself stays pinned (sticky) — the scroll is "absorbed" by this
  // wrapper's extra height instead of moving the section, until the wave
  // finishes filling (stage 3), at which point normal scroll continues.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGPathElement>(null);
  // `targetStage` is wherever the raw scroll position says we should be —
  // it can jump straight to 4 if the user scrolls far in one big gesture.
  // `stage` is what's actually displayed/revealed; it's paced to advance
  // only one icon at a time (see the effect below), so a single big scroll
  // can't make the fill skip ahead past an icon that hasn't been revealed
  // yet — it queues up and plays out one reveal at a time instead.
  const [targetStage, setTargetStage] = useState(0);
  // 0 = rest (nothing shown), 1-4 = that many icons reached, 5 = the tail
  // past the 4th icon is also filled out to the right edge.
  const [stage, setStage] = useState(0);
  // Real arc-length (in SVG user units) from the wave path's start (the very
  // left screen edge, x=0) to each icon's x-position, measured from the
  // actual curve — not assumed to be evenly spaced, since the humps make
  // some stretches longer than others.
  // [totalLength, lengthToIcon0, lengthToIcon1, lengthToIcon2, lengthToIcon3].
  const [waveLengths, setWaveLengths] = useState<number[] | null>(null);
  // Real Y (in SVG user units) of the curve at each icon's dotX, sampled
  // from the actual path rather than assumed — the hand-picked guide-line
  // lengths didn't account for the humps swinging between y=168 and y=351,
  // so icons sitting near a hump's peak (the 2nd and 3rd) had their
  // connector line stop well short of (or past) where the curve actually is.
  const [dotY, setDotY] = useState<number[] | null>(null);

  // Below `md` the 1920px-baseline wave layout (everything positioned via
  // vw() against a fixed px design) has no room to reflow — text, dots and
  // icons all keep their desktop proportions and end up overlapping or
  // hugging the screen edges instead of just scaling down. Swap to a plain
  // stacked list on small screens instead of trying to shrink the wave.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ── Scroll-lock: keep section pinned until wave fully fills ─────────────
  // Real scroll (both mouse and touchpad) drives stage advancement naturally
  // via the scroll handler below. This lock ONLY prevents the section from
  // unpinning before the last animation completes: once the user has scrolled
  // to the end of the wrapper (scrolledSoFar ≥ EXTRA_SCROLL_PX), further
  // downward scroll is blocked until stage 5's CSS transition finishes.
  // Upward scroll is always allowed through.
  const waveCompleteRef = useRef(false); // true after stage 5 + transition
  const stageRef = useRef(0);
  const isMobileRef = useRef(false);
  useEffect(() => { stageRef.current = stage; }, [stage]);
  useEffect(() => { isMobileRef.current = isMobile; }, [isMobile]);

  useEffect(() => {
    if (stage < 5) { waveCompleteRef.current = false; return; }
    const t = setTimeout(() => { waveCompleteRef.current = true; }, FILL_DURATION_MS + 50);
    return () => clearTimeout(t);
  }, [stage]);

  // Boundary lock — only blocks the very last bit of scroll (past the end of
  // the wrapper) until waveCompleteRef fires. Real scroll inside the wrapper
  // is never intercepted, so touchpad and mouse both feel natural.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (isMobileRef.current || e.deltaY <= 0 || waveCompleteRef.current) return;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const scrolledSoFar = Math.max(0, -wrapper.getBoundingClientRect().top);
      if (scrolledSoFar >= EXTRA_SCROLL_PX - 1) e.preventDefault();
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []); // stable: all mutable state via refs

  useEffect(() => {
    const path = waveRef.current;
    if (!path) return;

    // Binary-search the path for the point whose x matches targetX, and
    // return both its arc-length (for the dash-fill animation) and its
    // actual y (for positioning the connector line precisely on the curve).
    const pointAtX = (p: SVGPathElement, targetX: number) => {
      const len = p.getTotalLength();
      let lo = 0;
      let hi = len;
      for (let k = 0; k < 30; k++) {
        const mid = (lo + hi) / 2;
        if (p.getPointAtLength(mid).x < targetX) lo = mid;
        else hi = mid;
      }
      const length = (lo + hi) / 2;
      return { length, y: p.getPointAtLength(length).y };
    };

    const total = path.getTotalLength();

    // The fill should reach (and visually disappear behind) each icon
    // tile, not just its dot marker — `dotX` sits ~24-25 units to the left
    // of the icon tile's own left edge (iconX), let alone its horizontal
    // center, so filling only to dotX left a visible gray gap before the
    // icon. Measure to the icon's actual horizontal center instead (the
    // icon tile is 152 wide), matching where the curve already passes
    // through the icon vertically.
    const ICON_HALF_W = 76;
    const f0 = pointAtX(path, LAYOUT[0].iconX + ICON_HALF_W);
    const f1 = pointAtX(path, LAYOUT[1].iconX + ICON_HALF_W);
    const f2 = pointAtX(path, LAYOUT[2].iconX + ICON_HALF_W);
    const f3 = pointAtX(path, LAYOUT[3].iconX + ICON_HALF_W);
    setWaveLengths([total, f0.length, f1.length, f2.length, f3.length]);

    // dotY still describes the curve's y at the dot marker's own x (kept
    // separate from the fill-target measurement above).
    const d0 = pointAtX(path, LAYOUT[0].dotX);
    const d1 = pointAtX(path, LAYOUT[1].dotX);
    const d2 = pointAtX(path, LAYOUT[2].dotX);
    const d3 = pointAtX(path, LAYOUT[3].dotX);
    setDotY([d0.y, d1.y, d2.y, d3.y]);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / total);

      // Starts at stage 0 (nothing revealed — no numbers) and reveals one
      // icon per fifth of the wrapper's scroll budget (stages 1-4), plus a
      // 5th stage that fills the remaining tail past the last icon out to
      // the right edge — that budget calibrated (see wrapperRef's height
      // below) to ~2 wheel-scrolls per fifth, 10 total, so the section
      // unpins right as the 10th scroll finishes the tail fill instead of
      // lingering. This only sets the *target* — see the pacing effect
      // below for what's actually shown.
      const newTarget =
        progress >= 0.8 ? 5 : progress >= 0.6 ? 4 : progress >= 0.4 ? 3 : progress >= 0.2 ? 2 : progress > 0 ? 1 : 0;
      setTargetStage((prev) => (prev === newTarget ? prev : newTarget));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pace `stage` toward `targetStage` one icon at a time. A single big
  // scroll (fast trackpad, high-res mouse) can set targetStage straight to
  // 4 — without this, the fill would jump/stretch ahead of whatever icon
  // is actually revealed. Scrolling back up snaps down immediately (no
  // need to replay reveals in reverse); only forward progress is paced.
  useEffect(() => {
    if (stage === targetStage) return;
    if (stage > targetStage) {
      setStage(targetStage);
      return;
    }
    if (stage + 1 >= targetStage) {
      // Single-step advance — move immediately so the CSS transition starts
      // the moment the scroll threshold is crossed, with no extra delay.
      setStage((s) => Math.min(s + 1, targetStage));
    } else {
      // Multiple stages queued (fast scroll/trackpad) — pace them one at a
      // time so each icon still gets its own animation before the next.
      const t = setTimeout(() => setStage((s) => Math.min(s + 1, targetStage)), FILL_DURATION_MS);
      return () => clearTimeout(t);
    }
  }, [stage, targetStage]);

  // Fill length is simply the committed checkpoint for the current (paced)
  // stage — the CSS transition below (duration = FILL_DURATION_MS) is what
  // animates it smoothly from the previous checkpoint, so the line always
  // creeps continuously but never past the icon that's actually revealed.
  // Stages 1-4 map to each icon's checkpoint (waveLengths[1..4]); stage 5
  // is the extra tail-fill step, reaching the curve's full length
  // (waveLengths[0] — getTotalLength() already covers the whole path, icon
  // 4 and beyond, out to the right edge).
  const fillLength = waveLengths ? (stage === 0 ? 0 : stage >= 5 ? waveLengths[0] : waveLengths[stage]) : 0;

  return (
    <div ref={wrapperRef} style={{ height: isMobile ? "auto" : `calc(100vh + ${EXTRA_SCROLL_PX}px)` }}>
    <section
      id="features"
      data-navbar-theme="light"
      className={`w-full overflow-hidden flex flex-col justify-start ${
        isMobile ? "" : "sticky top-0 h-screen"
      }`}
      style={{ backgroundColor: "#fafafa", paddingTop: "88px", paddingBottom: "48px" }}
    >
      {/* Header */}
      <div className="text-center px-6" style={{ padding: isMobile ? "0 24px" : "0 4vw" }}>
        <p
          className="uppercase"
          style={{
            fontFamily: "Inter, sans-serif", fontWeight: 500,
            fontSize: "clamp(10px, 0.6771vw, 13px)", letterSpacing: "0.18em", color: "#121212",
            marginBottom: "1.2vw",
          }}
        >
          How It Works
        </p>
        <h2
          className="uppercase"
          style={{
            fontFamily: "Inter, sans-serif", fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.3333vw, 64px)", lineHeight: "106%",
            letterSpacing: "-0.04em", color: "#121212", marginBottom: "1.3vw",
          }}
        >
          Your Journey, Simplified.
        </h2>
        <p
          className="mx-auto"
          style={{
            fontFamily: "Inter, sans-serif", fontWeight: 400,
            fontSize: "clamp(13px, 1.0417vw, 18px)", lineHeight: "1.6", color: "#121212",
            maxWidth: isMobile ? "480px" : "50vw",
          }}
        >
          From selecting your vehicle to arriving at your destination, enjoy a
          seamless booking experience with professional chauffeur service tailored
          around you.
        </p>
      </div>

      {isMobile ? (
        /* ── Mobile fallback — plain stacked list, no scroll-jacking, no
             1920px-baseline absolute positioning. ── */
        <div className="flex flex-col px-6 mt-10">
          {STEPS.map((s, i) => (
            <div
              key={s.step}
              className="flex items-start gap-4 py-5 border-b border-gray-200 last:border-b-0"
            >
              <div className="w-12 h-12 shrink-0">
                <StepIconTile paths={ICON_PATHS[i]} active />
              </div>
              <div>
                <p
                  className="uppercase font-semibold mb-1"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: "#9ca3af" }}
                >
                  Step {s.step}
                </p>
                <h3
                  className="uppercase font-semibold mb-1"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#121212" }}
                >
                  {s.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4b5563" }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
      /* Stage — wave line + four staggered steps */
      <div className="relative w-full" style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}`, marginTop: "3.5vw" }}>
        {/* Wave line — rendered first (behind the icon tiles and connectors);
            the icon tile's backdrop + exact connector rail-end already close
            the gap, so the wave doesn't need to paint over the icons. */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 1920 ${STAGE_H}`}
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          {/* Gray track — full curve, from the very left screen edge */}
          <path
            d="M0 275 C 50 335 90 351 181 351 C 424 351 424 168 667 168 C 910 168 911 351 1154 351 C 1397 351 1397 168 1640 168 C 1760 168 1850 215 1920 255"
            stroke="#e6e6e6"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Black fill — starts empty (nothing shown at rest) and draws
              left-to-right as `stage` advances, reaching each icon in turn. */}
          <path
            ref={waveRef}
            d="M0 275 C 50 335 90 351 181 351 C 424 351 424 168 667 168 C 910 168 911 351 1154 351 C 1397 351 1397 168 1640 168 C 1760 168 1850 215 1920 255"
            stroke="#0d0d0d"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={waveLengths ? waveLengths[0] : undefined}
            strokeDashoffset={waveLengths ? waveLengths[0] - fillLength : undefined}
            style={{ transition: `stroke-dashoffset ${FILL_DURATION_MS}ms ${WAVE_EASE}`, visibility: waveLengths ? "visible" : "hidden" }}
          />
        </svg>

        {LAYOUT.map((l, i) => {
          const s = STEPS[i];
          const numberFirst = l.variant === "numberFirst";
          const dotTop = numberFirst ? 130 : 419;
          const textTop = numberFirst ? 115 : 406;
          // Connector lines run to the icon tile's visible rounded-rect edge
          // (not the curve's y, and not the tile's outer div edge) — the SVG
          // has 12px/28px of transparent padding around that rect, so ending
          // the line at the rect's actual edge is what makes it look
          // seamless instead of leaving a gap in the transparent padding.
          // numberFirst: icon top (284) + 12px top padding = 296
          // iconFirst: icon top (101) + (12 + 111)px = bottom edge at 224
          const railEnd = numberFirst ? 296 : 224;
          const reached = stage > i;
          const tone = reached ? "#121212" : "#c9c9c9";

          return (
            <div key={s.step}>
              {/* Ghosted step number — rises and fades in as the wave fill reaches it */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={l.number}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute select-none pointer-events-none"
                style={{
                  left: pctX(l.numberX),
                  top: pctY(numberFirst ? 5 : 296),
                  width: pctX(l.numberW),
                  opacity: reached ? 1 : 0,
                  transform: `translateY(${reached ? 0 : 24}px)`,
                  transition: `opacity 0.6s ${WAVE_EASE}, transform 0.6s ${WAVE_EASE}`,
                }}
              />

              {/* Vertical guide + dot */}
              <div
                className="absolute"
                style={{
                  left: pctX(l.dotX + 7),
                  top: pctY(numberFirst ? dotTop : railEnd),
                  width: "2px",
                  height: pctY(numberFirst ? railEnd - dotTop : dotTop - railEnd),
                  background: tone,
                  transition: `background 0.5s ${WAVE_EASE}`,
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  left: pctX(l.dotX),
                  top: pctY(dotTop - 8),
                  width: pctX(16),
                  height: pctY(16),
                  backgroundColor: tone,
                  opacity: reached ? 1 : 0,
                  transform: `translateY(${reached ? 0 : 24}px)`,
                  transition: `background-color 0.5s ${WAVE_EASE}, opacity 0.6s ${WAVE_EASE}, transform 0.6s ${WAVE_EASE}`,
                }}
              />

              {/* Title + description — rises and fades in with the number/dot */}
              <div
                className="absolute"
                style={{
                  left: pctX(l.textX),
                  top: pctY(textTop),
                  width: pctX(l.textW),
                  opacity: reached ? 1 : 0,
                  transform: `translateY(${reached ? 0 : 24}px)`,
                  transition: `opacity 0.6s ${WAVE_EASE}, transform 0.6s ${WAVE_EASE}`,
                }}
              >
                <h3
                  className="uppercase"
                  style={{
                    fontFamily: "Inter, sans-serif", fontWeight: 600,
                    fontSize: "1.25vw", lineHeight: "1.2", letterSpacing: "-0.01em", color: "#121212",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif", fontWeight: 600,
                    fontSize: "0.9375vw", lineHeight: "1.6", color: "#121212", marginTop: "0.7vw",
                  }}
                >
                  {s.desc}
                </p>
              </div>

              {/* Icon tile — crossfades gray→black as the wave reaches it */}
              <div
                className="absolute"
                style={{ left: pctX(l.iconX), top: pctY(numberFirst ? 284 : 101), width: pctX(152) }}
              >
                <StepIconTile paths={ICON_PATHS[i]} active={reached} />
              </div>
            </div>
          );
        })}
      </div>
      )}
    </section>
    </div>
  );
}
