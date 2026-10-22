"use client";

import { useEffect } from "react";
import { BookingWidget } from "./BookingWidget";

export default function BookingModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-center overflow-y-auto overscroll-contain bg-black/70 px-4 py-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Book your chauffeur"
    >
      <div className="relative my-auto w-full max-w-3xl">
        <button
          type="button"
          aria-label="Close booking form"
          onClick={onClose}
          className="absolute -top-1 right-0 z-10 flex h-8 w-8 -translate-y-full items-center justify-center rounded-full bg-white text-lg leading-none text-black transition hover:bg-white/80"
        >
          ×
        </button>
        <BookingWidget />
      </div>
    </div>
  );
}
