"use client";

import { useEffect, useRef, useState } from "react";
import LocationInput from "@/components/ui/LocationInput";
import PillButtonContent from "@/components/ui/PillButtonContent";
import type { Tab } from "@/components/ui/BookingTabs";

export type HeroForm = { pickup: string; destination: string; date: string; time: string };

const LABEL = "text-[13px] font-light tracking-[-0.01em]";
const INPUT =
  "w-full border-b bg-transparent py-1.5 text-sm text-white placeholder-white/50 outline-none";

const GLASS_POP =
  "absolute bottom-full left-0 z-50 mb-3 rounded-2xl border border-white/25 bg-black/75 p-2 text-white shadow-[0_16px_50px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl";

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
  return ref;
}

function Trigger({
  label,
  value,
  placeholder,
  error,
  open,
  onToggle,
  icon,
}: {
  label: string;
  value: string;
  placeholder: string;
  error?: boolean;
  open: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
}) {
  return (
    <>
      <span className={LABEL}>{label}</span>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`flex w-full items-center justify-between border-b py-1.5 text-left text-sm outline-none transition-colors ${
          error ? "border-red-400" : "border-white/25 hover:border-white/70"
        } ${value ? "text-white" : "text-white/50"}`}
      >
        <span>{value || placeholder}</span>
        <span className="text-white/60">{icon}</span>
      </button>
    </>
  );
}

const CalIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
  </svg>
);
const Chevron = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

function DateField({ label, value, onChange, error, lock }: { label: string; value: string; onChange: (v: string) => void; error: boolean; lock: (v: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const [todayIso, setTodayIso] = useState("");
  const [view, setView] = useState<{ y: number; m: number } | null>(null);

  useEffect(() => {
    const now = new Date();
    setTodayIso(iso(now.getFullYear(), now.getMonth(), now.getDate()));
    const start = value ? new Date(value + "T00:00:00") : now;
    setView({ y: start.getFullYear(), m: start.getMonth() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const vw = view ?? { y: 2000, m: 0 };
  const first = new Date(vw.y, vw.m, 1).getDay();
  const days = new Date(vw.y, vw.m + 1, 0).getDate();
  const shift = (d: number) =>
    setView((v) => {
      if (!v) return v;
      const dt = new Date(v.y, v.m + d, 1);
      return { y: dt.getFullYear(), m: dt.getMonth() };
    });

  const display = value
    ? new Date(value + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "";

  return (
    <div ref={ref} onMouseEnter={() => lock(true)} onMouseLeave={() => lock(false)} className="relative flex flex-col gap-2">
      <Trigger label={label} value={display} placeholder="Select date" error={error} open={open} onToggle={() => setOpen((o) => !o)} icon={<CalIcon />} />
      {open && (
        <div className={`${GLASS_POP} w-64`}>
          <div className="mb-2 flex items-center justify-between px-1 text-sm">
            <button type="button" onClick={() => shift(-1)} className="rounded-full px-2 py-1 hover:bg-white/10" aria-label="Previous month">‹</button>
            <span className="font-medium">{MONTHS[vw.m]} {vw.y}</span>
            <button type="button" onClick={() => shift(1)} className="rounded-full px-2 py-1 hover:bg-white/10" aria-label="Next month">›</button>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center text-[11px]">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i} className="py-1 text-white/50">{d}</span>
            ))}
            {Array.from({ length: first }).map((_, i) => <span key={"b" + i} />)}
            {Array.from({ length: days }).map((_, i) => {
              const d = i + 1;
              const v = iso(vw.y, vw.m, d);
              const past = !todayIso || v < todayIso;
              const sel = v === value;
              return (
                <button
                  key={d}
                  type="button"
                  disabled={past}
                  onClick={() => { onChange(v); setOpen(false); }}
                  className={`rounded-full py-1.5 transition-colors ${
                    sel ? "bg-white text-black font-semibold" : past ? "text-white/25" : "hover:bg-white/15"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const TIMES = Array.from({ length: 96 }, (_, i) => `${pad(Math.floor(i / 4))}:${pad((i % 4) * 15)}`);
const fmt12 = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${pad(h % 12 || 12)}:${pad(m)} ${h < 12 ? "AM" : "PM"}`;
};

function TimeField({ label, value, onChange, error, lock }: { label: string; value: string; onChange: (v: string) => void; error: boolean; lock: (v: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) listRef.current?.querySelector<HTMLElement>("[data-sel='true']")?.scrollIntoView({ block: "center" });
  }, [open]);

  return (
    <div ref={ref} onMouseEnter={() => lock(true)} onMouseLeave={() => lock(false)} className="relative flex flex-col gap-2">
      <Trigger label={label} value={value ? fmt12(value) : ""} placeholder="--:-- --" error={error} open={open} onToggle={() => setOpen((o) => !o)} icon={<ClockIcon />} />
      {open && (
        <div ref={listRef} className={`${GLASS_POP} max-h-56 w-40 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
          {TIMES.map((t) => (
            <button
              key={t}
              type="button"
              data-sel={t === value}
              onClick={() => { onChange(t); setOpen(false); }}
              className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                t === value ? "bg-white text-black font-semibold" : "hover:bg-white/15"
              }`}
            >
              {fmt12(t)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DurationField({
  label,
  options,
  value,
  onChange,
  lock,
}: {
  label: string;
  options: { value: number; label: string }[];
  value: number;
  onChange: (n: number) => void;
  lock: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const current = options.find((o) => o.value === value) ?? options[0];
  return (
    <div ref={ref} onMouseEnter={() => lock(true)} onMouseLeave={() => lock(false)} className="relative flex flex-col gap-2">
      <Trigger label={label} value={current.label} placeholder="Select" open={open} onToggle={() => setOpen((o) => !o)} icon={<Chevron />} />
      {open && (
        <div className={`${GLASS_POP} w-48`}>
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => { onChange(o.value); setOpen(false); }}
              className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                o.value === value ? "bg-white text-black font-semibold" : "hover:bg-white/15"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const DURATION_OPTIONS: Record<"Day Booking" | "Hourly Chauffeur", { value: number; label: string }[]> = {
  "Day Booking": [
    { value: 4, label: "Half Day · 4 hours" },
    { value: 8, label: "Full Day · 8 hours" },
    { value: 10, label: "Extended · 10 hours" },
    { value: 12, label: "Long Day · 12 hours" },
    { value: 24, label: "Multi-Day · 24 hours" },
  ],
  "Hourly Chauffeur": [4, 5, 6, 7, 8, 9, 10, 12].map((h) => ({ value: h, label: `${h} hours` })),
};

function PassengerField({ value, onChange, lock }: { value: number; onChange: (n: number) => void; lock: (v: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  return (
    <div ref={ref} onMouseEnter={() => lock(true)} onMouseLeave={() => lock(false)} className="relative flex flex-col gap-2">
      <Trigger label="Passenger" value={String(value)} placeholder="1" open={open} onToggle={() => setOpen((o) => !o)} icon={<Chevron />} />
      {open && (
        <div className={`${GLASS_POP} w-32`}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => { onChange(n); setOpen(false); }}
              className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                n === value ? "bg-white text-black font-semibold" : "hover:bg-white/15"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HeroBookingPanel({
  tab,
  duration,
  onDuration,
  form,
  onField,
  onValue,
  passengers,
  onPassengers,
  touched,
  onSubmit,
}: {
  tab: Tab;
  duration: number;
  onDuration: (n: number) => void;
  form: HeroForm;
  onField: (k: keyof HeroForm) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValue: (k: keyof HeroForm, v: string) => void;
  passengers: number;
  onPassengers: (n: number) => void;
  touched: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50, on: false });

  const [locked, setLocked] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ rx: 0, ry: 0, mx: px * 100, my: py * 100, on: true });
  };
  const lockOn = (v: boolean) => {
    setLocked(v);
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0, mx: 50, my: 50, on: false });

  const border = (k: keyof HeroForm) => (touched && !form[k].trim() ? "border-red-400" : "border-white/25");

  return (
    <div
      className="relative z-20 rounded-2xl border border-white/20 px-6 pb-4 pt-4 text-white backdrop-blur-xl backdrop-saturate-150 md:px-14"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        background: tilt.on ? "rgba(24,24,24,0.38)" : "rgba(20,20,20,0.35)",
        boxShadow: tilt.on
          ? "0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)"
          : "0 20px 60px rgba(0,0,0,0.35)",
        transition: "background 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Decorative layers clipped to the panel so popovers can overflow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            padding: "1px",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.15) 18%, rgba(255,255,255,0) 42%, rgba(255,255,255,0) 58%, rgba(255,255,255,0.15) 82%, rgba(255,255,255,0.9) 100%)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <div
          className="absolute -left-10 -top-10 h-28 w-28 rounded-full opacity-70"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)", filter: "blur(6px)" }}
        />
        <div
          className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)", filter: "blur(6px)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle 320px at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,${tilt.on ? 0.1 : 0}), transparent 70%)`,
            transition: "background 0.25s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>

      <form
        onSubmit={onSubmit}
        noValidate
        className="relative z-10 grid grid-cols-1 items-end gap-5 sm:grid-cols-2 lg:grid-cols-6"
      >
        <label className="flex flex-col gap-2">
          <span className={LABEL}>{tab === "Airport Transfer" ? "Pickup Location" : "Pickup Location"}</span>
          <LocationInput
            dropUp
            value={form.pickup}
            onChange={(v) => onValue("pickup", v)}
            placeholder="Street, Hotel or Airport"
            className={`${INPUT} ${border("pickup")}`}
          />
        </label>

        {tab === "Airport Transfer" ? (
          <label className="flex flex-col gap-2">
          <span className={LABEL}>Drop off Location</span>
          <LocationInput
            dropUp
            value={form.destination}
            onChange={(v) => onValue("destination", v)}
            placeholder="Destination Address"
            className={`${INPUT} ${border("destination")}`}
          />
          </label>
        ) : (
          <DurationField
            lock={lockOn}
            label={tab === "Day Booking" ? "Day Package" : "Hours Required"}
            options={DURATION_OPTIONS[tab]}
            value={duration}
            onChange={onDuration}
          />
        )}

        <DateField lock={lockOn} label={tab === "Airport Transfer" ? "Pickup Date" : "Booking Date"} value={form.date} onChange={(v) => onValue("date", v)} error={touched && !form.date} />
        <TimeField lock={lockOn} label={tab === "Airport Transfer" ? "Pickup Time" : "Start Time"} value={form.time} onChange={(v) => onValue("time", v)} error={touched && !form.time} />
        <PassengerField lock={lockOn} value={passengers} onChange={onPassengers} />

        <button
          type="submit"
          className="group relative inline-flex h-fit items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border-[1.5px] border-transparent bg-white px-6 py-[0.9rem] text-[11px] font-semibold uppercase tracking-[0.12em] text-black transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_16px_rgba(255,255,255,0.25)]"
          style={{ minWidth: "168px" }}
        >
          <PillButtonContent fill="black">Find Your Ride</PillButtonContent>
        </button>
      </form>
    </div>
  );
}
