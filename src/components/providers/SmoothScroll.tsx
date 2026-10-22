"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Re-measure when the page height changes in place (e.g. the multi-step
    // booking form), otherwise Lenis keeps the old, shorter scroll limit.
    const ro = new ResizeObserver(() => lenis.resize());
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
