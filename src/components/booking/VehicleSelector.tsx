'use client';

import React, { useState, useRef } from 'react';
import { User, Briefcase, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import { Vehicle, VehicleTier, ServiceType } from '@/types/booking';
import { calculatePrice } from '@/data/fleet';
import PillButtonContent from '@/components/ui/PillButtonContent';

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
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const cardStep = () => {
    const el = containerRef.current;
    if (!el || !el.firstElementChild) return 300;
    const cardWidth = (el.firstElementChild as HTMLElement).getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(el).columnGap || '16');
    return cardWidth + gap;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const step = cardStep();
      containerRef.current.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">Select Your Vehicle</h2>
        <span className="text-xs text-zinc-500 bg-zinc-100/80 px-3 py-1 rounded-full font-medium">
          Multiple vehicle classes available
        </span>
      </div>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {vehicles.map((vehicle) => {
          const isSelected = vehicle.id === selectedVehicleId;
          const priceCalc = calculatePrice(serviceType, vehicle, { distanceKm, durationHours });

          return (
            <div
              key={vehicle.id}
              onClick={() => onSelectVehicle(vehicle.id)}
              className={`group shrink-0 w-[calc((100%-2rem)/3)] min-w-[220px] snap-start rounded-xl overflow-hidden cursor-pointer border bg-white transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl ${
                isSelected
                  ? 'border-zinc-950'
                  : 'border-zinc-200/90 hover:border-zinc-400'
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
                  className={`group relative overflow-hidden w-full mt-3.5 py-2.5 px-3 rounded-full text-xs font-semibold border-[1.5px] transition-all duration-500 justify-center inline-flex items-center ${
                    isSelected
                      ? 'bg-zinc-950 text-white border-transparent hover:border-white/30'
                      : 'bg-white text-zinc-950 border-zinc-300 hover:border-zinc-950'
                  }`}
                >
                  <PillButtonContent fill={isSelected ? 'white' : 'black'}>{isSelected ? 'Selected' : 'Select'}</PillButtonContent>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-4 px-1">
        <button
          onClick={() => scroll('left')}
          className="w-8 h-8 rounded-full bg-zinc-900 text-white hover:bg-zinc-700 flex items-center justify-center transition-colors shadow-sm"
          aria-label="Previous vehicles"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {vehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                onSelectVehicle(v.id);
                const el = containerRef.current;
                if (el) {
                  const idx = vehicles.findIndex((x) => x.id === v.id);
                  el.scrollTo({ left: idx * cardStep(), behavior: 'smooth' });
                }
              }}
              className={`h-1.5 rounded-full transition-all ${
                v.id === selectedVehicleId ? 'w-5 bg-zinc-900' : 'w-1.5 bg-zinc-300 hover:bg-zinc-400'
              }`}
              aria-label={`Go to ${v.name}`}
            />
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
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
