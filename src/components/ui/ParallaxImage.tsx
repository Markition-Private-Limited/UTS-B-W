"use client";

import { useRef, useState } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Max translate distance in px at the edge of the container. */
  strength?: number;
}

// Shifts and slightly scales the image toward the cursor on hover, giving a
// subtle parallax feel. Resets smoothly on mouse leave.
export default function ParallaxImage({ src, alt, className = "", strength = 16 }: ParallaxImageProps) {
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

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`overflow-hidden ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform }}
        draggable={false}
      />
    </div>
  );
}
