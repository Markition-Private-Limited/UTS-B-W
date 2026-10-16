"use client";

import { useRef, useState } from "react";
import { motion, type MotionValue } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  /** Max translate distance in px at the edge of the container. */
  strength?: number;
  /** Optional scroll-driven vertical offset — the image shifts inside its
   *  fixed-size frame as the page scrolls, clipped by the container's
   *  overflow-hidden. When provided, the image is enlarged beyond the
   *  frame so the shift never reveals empty space. */
  parallaxY?: MotionValue<string>;
}

// Shifts and slightly scales the image toward the cursor on hover, giving a
// subtle parallax feel. Resets smoothly on mouse leave. Optionally also
// drifts vertically with scroll position (parallaxY) for a scroll-parallax
// effect, independent of the hover interaction.
export default function ParallaxImage({ src, alt, className = "", style, strength = 16, parallaxY }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate(0px, 0px) scale(1)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`translate(${-x * strength}px, ${-y * strength}px) scale(1.12)`);
  };

  const handleMouseLeave = () => {
    setTransform("translate(0px, 0px) scale(1)");
  };

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-300 ease-out"
      style={{ transform }}
      draggable={false}
    />
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`overflow-hidden ${parallaxY ? "relative" : ""} ${className}`}
      style={style}
    >
      {parallaxY ? (
        <motion.div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ y: parallaxY, top: "-14%", bottom: "-14%" }}
        >
          {img}
        </motion.div>
      ) : (
        img
      )}
    </div>
  );
}
