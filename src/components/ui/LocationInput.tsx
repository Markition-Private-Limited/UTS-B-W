"use client";

import { useEffect, useRef, useState } from "react";
import { suggestLocations } from "@/data/locations";

export default function LocationInput({
  value,
  onChange,
  placeholder,
  className = "",
  popClassName = "",
  dropUp = false,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  popClassName?: string;
  dropUp?: boolean;
  autoFocus?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const matches = open ? suggestLocations(value) : [];

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const pick = (v: string) => {
    onChange(v);
    setOpen(false);
    setActive(-1);
  };

  return (
    <div ref={ref} className="relative w-full min-w-0">
      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        autoComplete="off"
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (!matches.length) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => (a + 1) % matches.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => (a <= 0 ? matches.length - 1 : a - 1));
          } else if (e.key === "Enter" && active >= 0) {
            e.preventDefault();
            pick(matches[active]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className={className}
      />
      {matches.length > 0 && (
        <ul
          role="listbox"
          className={`absolute left-0 z-50 max-h-60 w-[min(22rem,90vw)] overflow-y-auto rounded-2xl border border-white/25 bg-black/75 p-1.5 text-left text-white shadow-[0_16px_50px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            dropUp ? "bottom-full mb-3" : "top-full mt-2"
          } ${popClassName}`}
        >
          {matches.map((m, i) => (
            <li key={m} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(m)}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  i === active ? "bg-white/20" : "hover:bg-white/15"
                }`}
              >
                {m}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
