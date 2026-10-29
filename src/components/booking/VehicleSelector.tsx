'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { User, Briefcase, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import { Vehicle, VehicleTier, ServiceType } from '@/types/booking';
import { calculatePrice } from '@/data/fleet';
function CardArrow({ className }: { className?: string }) {
  return (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`shrink-0 ${className ?? ''}`}>
      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SETTLE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const RUBBER_BAND = 0.35;
const DRAG_THRESHOLD = 5;

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedVehicleId: VehicleTier;
  onSelectVehicle: (id: VehicleTier) => void;
  serviceType: ServiceType;
  distanceKm: number;
  durationHours: number;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  serviceType,
  distanceKm,
  durationHours,
}) => {
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  // Which card the slider is currently showing (drives the dots below it).
  const [activeIndex, setActiveIndex] = useState(0);
  // Measured so exactly 3 cards fit the viewport width — the drag track needs
  // a fixed px width per card rather than a CSS percentage (percentages can't
  // resolve against a width:max-content track). Seeded with a real measurement
  // up front via useLayoutEffect, not left null, so the very first paint
  // already uses the correct width instead of falling back to a fixed 220px
  // that could leave the third card's right edge past the clipped viewport
  // boundary at in-between screen widths.
  const [cardWidth, setCardWidth] = useState<number | null>(null);
  const CARD_GAP = 16;

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0); // current translateX target (<= 0)
  const drag = useRef({
    pointerId: -1,
    down: false,
    dragging: false,
    startX: 0,
    startY: 0,
    startOffset: 0,
    startSnap: 0,
    samples: [] as { t: number; x: number }[],
    suppressClick: false,
  });

  // Track geometry: how far it can travel, and the resting offset for each card.
  const metrics = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return { max: 0, cards: [] as number[], snaps: [0] };
    const max = Math.max(0, track.offsetWidth - viewport.clientWidth);
    const cards = Array.from(track.children).map((c) => -Math.min((c as HTMLElement).offsetLeft, max));
    const snaps = Array.from(new Set(cards)).sort((a, b) => b - a);
    return { max, cards, snaps };
  }, []);

  const apply = (x: number, animate: boolean, duration = 450) => {
    const track = trackRef.current;
    if (!track) return;
    offsetRef.current = x;
    track.style.transition = animate ? `transform ${duration}ms ${SETTLE_EASE}` : 'none';
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  };

  const indexForOffset = useCallback(
    (x: number) => {
      const { max, cards } = metrics();
      if (max > 0 && -x >= max - 2) return vehicles.length - 1;
      let best = 0;
      cards.forEach((pos, i) => {
        if (Math.abs(pos - x) < Math.abs(cards[best] - x)) best = i;
      });
      return best;
    },
    [metrics, vehicles.length],
  );

  const settleTo = (x: number, duration = 450) => {
    apply(x, true, duration);
    setActiveIndex(indexForOffset(x));
  };

  // Where the track is right now, even if it's mid-animation.
  const currentX = () => {
    const track = trackRef.current;
    if (!track) return 0;
    return new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
  };

  const nearestSnapIndex = (x: number, snaps: number[]) => {
    let best = 0;
    snaps.forEach((pos, i) => {
      if (Math.abs(pos - x) < Math.abs(snaps[best] - x)) best = i;
    });
    return best;
  };

  const step = (direction: 1 | -1) => {
    const { snaps } = metrics();
    const x = currentX();
    const i = nearestSnapIndex(x, snaps);
    const atSnap = Math.abs(snaps[i] - x) < 2;
    let target = i;
    if (direction === 1) target = atSnap ? i + 1 : snaps[i] < x ? i : i + 1;
    else target = atSnap ? i - 1 : snaps[i] > x ? i : i - 1;
    settleTo(snaps[Math.max(0, Math.min(snaps.length - 1, target))]);
  };

  const goToCard = (index: number) => {
    const { cards } = metrics();
    if (cards[index] === undefined) return;
    apply(cards[index], true, 500);
    setActiveIndex(index);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const d = drag.current;
    const x = currentX();
    apply(x, false); // catch the track wherever the last animation left it
    const { snaps } = metrics();
    d.down = true;
    d.dragging = false;
    d.suppressClick = false;
    d.pointerId = e.pointerId;
    d.startX = e.clientX;
    d.startY = e.clientY;
    d.startOffset = x;
    d.startSnap = nearestSnapIndex(x, snaps);
    d.samples = [{ t: e.timeStamp, x: e.clientX }];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const viewport = viewportRef.current;
    if (!d.down || !viewport || e.pointerId !== d.pointerId) return;

    const dx = e.clientX - d.startX;
    if (!d.dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      // A mostly-vertical gesture belongs to the page, not the carousel.
      if (Math.abs(e.clientY - d.startY) > Math.abs(dx)) {
        d.down = false;
        return;
      }
      d.dragging = true;
      viewport.setPointerCapture(e.pointerId);
      viewport.style.cursor = 'grabbing';
    }

    const { max } = metrics();
    let x = d.startOffset + dx;
    // Resist, rather than stop dead, when pulled past either end.
    if (x > 0) x *= RUBBER_BAND;
    else if (x < -max) x = -max + (x + max) * RUBBER_BAND;
    apply(x, false);

    const now = e.timeStamp;
    d.samples.push({ t: now, x: e.clientX });
    while (d.samples.length > 2 && now - d.samples[0].t > 100) d.samples.shift();
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const viewport = viewportRef.current;
    if (!d.down || e.pointerId !== d.pointerId) return;
    d.down = false;
    if (!d.dragging || !viewport) return;
    d.dragging = false;
    d.suppressClick = true;
    viewport.style.cursor = '';
    if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);

    const { max, snaps } = metrics();
    const first = d.samples[0];
    const last = d.samples[d.samples.length - 1];
    const dt = Math.max(1, last.t - first.t);
    const velocity = (last.x - first.x) / dt; // px per ms, negative = dragging left

    // Where a flick would carry it, then snap to the nearest card from there.
    const x = offsetRef.current;
    const projected = Math.max(-max, Math.min(0, x + velocity * 320));
    let target = nearestSnapIndex(projected, snaps);

    // A deliberate drag always advances at least one card in the drag direction.
    const dx = e.clientX - d.startX;
    if (target === d.startSnap && Math.abs(dx) > 40) {
      target = Math.max(0, Math.min(snaps.length - 1, d.startSnap + (dx < 0 ? 1 : -1)));
    }

    const speed = Math.abs(velocity);
    settleTo(snaps[target], speed > 1 ? 650 : 480);
  };

  // A drag ends in a click on whatever's underneath — don't let it select a card.
  const handleClickCapture = (e: React.MouseEvent) => {
    if (drag.current.suppressClick) {
      e.stopPropagation();
      e.preventDefault();
      drag.current.suppressClick = false;
    }
  };

  // Measure before the first paint so the opening frame already has the
  // right width (no flash of the 220px fallback).
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const w = viewport.clientWidth;
    if (w > 0) setCardWidth(Math.max(220, Math.floor((w - CARD_GAP * 2) / 3) - 1));
  }, []);

  // Keep exactly 3 cards' worth of width visible, and the track inside its
  // bounds, as the viewport resizes.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const measure = () => {
      const w = viewport.clientWidth;
      if (w > 0) setCardWidth(Math.max(220, Math.floor((w - CARD_GAP * 2) / 3) - 1));
      const { max } = metrics();
      const x = Math.max(-max, Math.min(0, offsetRef.current));
      apply(x, false);
      setActiveIndex(indexForOffset(x));
    };
    const ro = new ResizeObserver(measure);
    window.addEventListener('resize', measure);
    ro.observe(viewport);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [metrics, indexForOffset]);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">Select Your Vehicle</h2>
        <span className="text-xs text-zinc-500 bg-zinc-100/80 px-3 py-1 rounded-full font-medium">
          Multiple vehicle classes available
        </span>
      </div>

      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={handleClickCapture}
        onDragStart={(e) => e.preventDefault()}
        style={{ touchAction: 'pan-y' }}
        className="cursor-grab select-none overflow-hidden pb-4 pt-1"
      >
        <div ref={trackRef} className="relative flex w-max gap-4 will-change-transform">
        {vehicles.map((vehicle) => {
          const isSelected = vehicle.id === selectedVehicleId;
          const priceCalc = calculatePrice(serviceType, vehicle, { distanceKm, durationHours });

          return (
            <div
              key={vehicle.id}
              onClick={() => onSelectVehicle(vehicle.id)}
              style={{ width: cardWidth ? `${cardWidth}px` : undefined }}
              className={`group shrink-0 w-[220px] rounded-xl overflow-hidden cursor-pointer bg-white transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl ${
                isSelected
                  ? 'border-[1.5px] border-zinc-950'
                  : 'border border-zinc-200/90 hover:border-zinc-400'
              }`}
            >
              <div className="relative aspect-[9/10] bg-zinc-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vehicle.image.replace('-1.webp', '-1-card.webp')}
                  alt={vehicle.name}
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-in-out group-hover:scale-105 [backface-visibility:hidden] [transform:translateZ(0)]"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              <div className="flex flex-col px-4 pt-4 pb-4">
                <h3 className="font-bold text-base text-zinc-900 tracking-tight leading-snug transition-colors duration-300 group-hover:text-zinc-600">{vehicle.name}</h3>
                <p className="text-xs text-zinc-500 mt-1 font-normal">{vehicle.modelExample}</p>

                <p className="text-sm text-zinc-500 mt-3 leading-relaxed line-clamp-2 min-h-[3em]">{vehicle.description}</p>

                {priceCalc.ratePerUnit === null && <p className="mt-4 min-h-[1.25rem]" aria-hidden="true" />}
                {priceCalc.ratePerUnit !== null && (
                  <p className="mt-4 min-h-[1.25rem] text-xs text-zinc-500">
                    £{priceCalc.ratePerUnit.toFixed(2).replace(/\.00$/, '')}/{priceCalc.unitLabel === 'hours' ? 'hour' : priceCalc.unitLabel} × {priceCalc.unitCount} {priceCalc.unitLabel}
                  </p>
                )}

                <div className="flex items-center justify-between mt-2">
                  {priceCalc.total !== null ? (
                    <span className="text-xl font-bold tracking-tight text-zinc-950">
                      £{priceCalc.total.toFixed(0)}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-zinc-700">Price to be confirmed</span>
                  )}
                  <div className="flex items-center gap-3 text-xs text-zinc-600 font-medium">
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{vehicle.passengers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{vehicle.luggage}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onSelectVehicle(vehicle.id); }}
                  className={`group/btn relative overflow-hidden w-full mt-3.5 py-2.5 px-4 rounded-full text-xs font-semibold border-[1.5px] transition-all duration-500 inline-flex items-center ${
                    isSelected
                      ? 'bg-zinc-950 text-white border-transparent hover:border-white/30'
                      : 'bg-white text-zinc-950 border-zinc-300 hover:border-zinc-950'
                  }`}
                >
                  {/* Growing fill circle */}
                  <span aria-hidden="true" className={`absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full opacity-0 group-hover/btn:w-[480px] group-hover/btn:h-[480px] group-hover/btn:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none ${isSelected ? 'bg-white' : 'bg-zinc-950'}`} />
                  {/* Entering arrow — absolute left, slides in on hover */}
                  <CardArrow className={`absolute z-[1] left-4 opacity-0 -translate-x-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/btn:opacity-100 group-hover/btn:translate-x-0 ${isSelected ? 'text-zinc-950' : 'text-white'}`} />
                  {/* Label — centered, shifts right slightly on hover */}
                  <span className={`relative z-[1] flex-1 text-center transition-all duration-500 ease-out group-hover/btn:translate-x-[0.5em] ${isSelected ? 'group-hover/btn:text-zinc-950' : 'group-hover/btn:text-white'}`}>
                    {isSelected ? 'Selected' : 'Select'}
                  </span>
                  {/* Exiting arrow — absolute right, exits right on hover */}
                  <CardArrow className={`absolute z-[1] right-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/btn:opacity-0 group-hover/btn:translate-x-3 ${isSelected ? 'group-hover/btn:text-zinc-950' : 'group-hover/btn:text-white'}`} />
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 px-1">
        <button
          onClick={() => step(-1)}
          className="w-8 h-8 rounded-full bg-zinc-900 text-white hover:bg-zinc-700 flex items-center justify-center transition-colors shadow-sm"
          aria-label="Previous vehicles"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {vehicles.map((v, i) => (
            <button
              key={v.id}
              onClick={() => {
                onSelectVehicle(v.id);
                goToCard(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? 'w-5 bg-zinc-900' : 'w-1.5 bg-zinc-300 hover:bg-zinc-400'
              }`}
              aria-label={`Go to ${v.name}`}
            />
          ))}
        </div>

        <button
          onClick={() => step(1)}
          className="w-8 h-8 rounded-full bg-zinc-900 text-white hover:bg-zinc-700 flex items-center justify-center transition-colors shadow-sm"
          aria-label="Next vehicles"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 pt-2">
        <button
          onClick={() => setDetailsExpanded(!detailsExpanded)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-800 hover:text-zinc-950 py-1"
        >
          <ChevronsUpDown className="w-3.5 h-3.5 text-zinc-500" />
          <span>
            {detailsExpanded ? `Hide ${selectedVehicle.name} details` : `Explore ${selectedVehicle.name} details`}
          </span>
        </button>

        {detailsExpanded && (
          <div className="mt-3 p-4 bg-zinc-50/80 rounded-xl border border-zinc-200/80 text-xs text-zinc-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-zinc-900 mb-1">Vehicle Specifications</h4>
                <p className="text-zinc-600 mb-2 leading-relaxed">{selectedVehicle.description}</p>
                <div className="text-[11px] text-zinc-500">
                  <span className="font-semibold text-zinc-700">Passenger Capacity:</span> Up to {selectedVehicle.passengers} guests
                  <br />
                  <span className="font-semibold text-zinc-700">Luggage Allowance:</span> Up to {selectedVehicle.luggage} standard check-in suitcases
                </div>
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 mb-1">Standard Inclusions & Comfort</h4>
                <ul className="space-y-1 text-zinc-600">
                  {selectedVehicle.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
