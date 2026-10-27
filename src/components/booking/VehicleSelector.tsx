'use client';

import React, { useState, useRef } from 'react';
import { User, Briefcase, ChevronLeft, ChevronRight, ChevronsUpDown, Check } from 'lucide-react';
import { Vehicle, VehicleTier, ServiceType } from '@/types/booking';
import { calculatePrice } from '@/data/fleet';

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

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' });
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
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {vehicles.map((vehicle) => {
          const isSelected = vehicle.id === selectedVehicleId;
          const priceCalc = calculatePrice(serviceType, vehicle, { distanceKm, durationHours });

          return (
            <div
              key={vehicle.id}
              onClick={() => onSelectVehicle(vehicle.id)}
              className={`shrink-0 w-[280px] sm:w-[310px] snap-start rounded-2xl p-3 sm:p-3.5 transition-all cursor-pointer flex flex-col justify-between border bg-white ${
                isSelected
                  ? 'border-zinc-950 shadow-md ring-1 ring-zinc-950/10'
                  : 'border-zinc-200/90 hover:border-zinc-400 hover:shadow-sm'
              }`}
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 mb-3 border border-zinc-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  loading="lazy"
                />
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 bg-zinc-950 text-white rounded-full p-1 shadow">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <h3 className="font-bold text-base text-zinc-900 tracking-tight leading-snug">{vehicle.name}</h3>
                <p className="text-xs text-zinc-500 truncate mt-0.5 font-normal">{vehicle.modelExample}</p>
              </div>

              <div className="flex items-center justify-between mb-4 border-t border-zinc-100 pt-3">
                <div className="flex flex-col">
                  {priceCalc.total !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950">
                        £{priceCalc.total.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-normal">est.</span>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-zinc-700">Price to be confirmed</span>
                  )}
                  <span className="text-[10px] text-zinc-400">{priceCalc.rateLabel}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{vehicle.passengers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{vehicle.luggage}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onSelectVehicle(vehicle.id); }}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow hover:bg-zinc-800'
                    : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                }`}
              >
                {isSelected ? `Selected: ${vehicle.name}` : `Select ${vehicle.name}`}
              </button>
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
                  el.scrollTo({ left: idx * 320, behavior: 'smooth' });
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
