"use client";

// Drop-in replacement for a pill button's inner "Label + arrow" markup.
// Reproduces the flow-button hover effect: a growing circle sweeps in from
// the center and inverts the button's color, a second arrow enters from the
// left while the original exits to the right, and the text shifts to make
// room. The REST state keeps the button's own existing color untouched —
// only `fill` (the color the circle grows to, i.e. the HOVER color) needs
// to be set opposite to the button's resting background.
//
// Usage: give the outer element `group relative overflow-hidden` plus a
// thin `border-[1.5px] border-transparent` that colors in on hover (e.g.
// `hover:border-white/50`) so the inverted fill stays visible against
// whatever background sits behind the button. The pill's shape (rounded-full)
// stays constant — no shape morph on hover. Then render
// <PillButtonContent fill="white">Label</PillButtonContent> in place of the
// old "{label}<svg>...</svg>" markup. `fill="white"` for buttons that are
// black at rest (circle grows white, text/arrows turn black on hover).
// `fill="black"` for buttons that are white at rest (circle grows black,
// text/arrows turn white on hover).

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ""}`}
    >
      <path
        d="M1 11L11 1M11 1H3M11 1V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PillButtonContent({
  children,
  fill = "black",
}: {
  children: React.ReactNode;
  /** Color the circle grows to on hover — opposite of the button's resting bg. */
  fill?: "black" | "white";
}) {
  const fillBg = fill === "black" ? "bg-black" : "bg-white";
  const hoverText = fill === "black" ? "group-hover:text-white" : "group-hover:text-black";

  return (
    <>
      {/* Growing fill circle — inverts the button's color on hover */}
      <span
        aria-hidden="true"
        className={`absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${fillBg} rounded-full opacity-0 group-hover:w-[480px] group-hover:h-[480px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none`}
      />

      {/* Entering arrow — hidden off to the left at rest, slides in on hover */}
      <Arrow
        className={`absolute z-[1] left-[1.1em] opacity-0 -translate-x-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:translate-x-0 ${hoverText}`}
      />

      <span className={`relative z-[1] transition-all duration-500 ease-out group-hover:translate-x-[0.9em] ${hoverText}`}>
        {children}
      </span>

      {/* Exiting arrow — visible at rest, slides off to the right on hover */}
      <Arrow
        className={`relative z-[1] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-0 group-hover:translate-x-3 ${hoverText}`}
      />
    </>
  );
}
