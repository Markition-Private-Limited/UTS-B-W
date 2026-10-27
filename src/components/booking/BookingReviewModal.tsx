'use client';

import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { BookingState, Vehicle } from '@/types/booking';
import { calculatePrice } from '@/data/fleet';
import PillButtonContent from '@/components/ui/PillButtonContent';

interface BookingReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: BookingState;
  vehicle: Vehicle;
}

export const BookingReviewModal: React.FC<BookingReviewModalProps> = ({
  isOpen,
  onClose,
  state,
  vehicle,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const priceCalc = calculatePrice(state.serviceType, vehicle, {
    distanceKm: state.sampleDistanceKm,
    durationHours: state.durationHours,
  });

  const copySummary = () => {
    const summaryText = `UTS Booking Summary:
Service: ${state.serviceType.toUpperCase()}
Vehicle: ${vehicle.name} (${vehicle.modelExample})
Pickup: ${state.pickupAddress}
${state.serviceType === 'airport-transfer' ? `Drop-off: ${state.destinationAddress}` : `Duration: ${state.durationHours} Hours`}
Date & Time: ${state.pickupDate} at ${state.pickupTime}
Passengers: ${state.passengers}
Luggage: ${state.luggageCount}
Estimated Total: ${priceCalc.total !== null ? `£${priceCalc.total.toFixed(2)}` : 'Price to be confirmed'}
Notice: Demonstration prototype estimate only.`;
    navigator.clipboard?.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 divide-y divide-zinc-100">
        <div className="p-6 flex items-start justify-between bg-zinc-950 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-serif text-lg font-bold">U</div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block">UTS RESERVATION PREVIEW</span>
              <h3 className="text-lg font-bold">Journey Summary & Review</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 rounded-lg transition-colors" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Prototype Demonstration Only</p>
            <p className="text-amber-800 mt-0.5 leading-relaxed">
              This is an interactive design prototype. No live reservation or payment has been processed. Official pricing, vehicle allocation, and booking confirmation must be finalized directly with United Travel Services.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4 bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={vehicle.image.replace('-1.webp', '-1-thumb.webp')} alt={vehicle.name} className="w-24 rounded-lg object-cover border border-zinc-200" style={{ height: '72px' }} />
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Vehicle Allocated</span>
              <h4 className="font-bold text-base text-zinc-950">{vehicle.name}</h4>
              <p className="text-xs text-zinc-600">{vehicle.modelExample}</p>
              <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
                <span>{state.passengers} Passengers</span>
                <span>·</span>
                <span>{state.luggageCount} Luggage Bags</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 mt-1 shrink-0" />
              <div>
                <span className="font-semibold text-zinc-500 uppercase text-[10px] block">Pickup Location</span>
                <span className="font-medium text-zinc-900 text-sm">{state.pickupAddress}</span>
              </div>
            </div>

            {state.serviceType === 'airport-transfer' ? (
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-400 mt-1 shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-500 uppercase text-[10px] block">Drop-off Destination</span>
                  <span className="font-medium text-zinc-900 text-sm">{state.destinationAddress}</span>
                  {state.flightNumber && <span className="text-zinc-500 block text-xs mt-0.5">Flight: {state.flightNumber}</span>}
                </div>
              </div>
            ) : (
              <div>
                <span className="font-semibold text-zinc-500 uppercase text-[10px] block mb-1">Stops / Route Overview</span>
                {state.stops.length > 0 ? (
                  <ul className="space-y-1 pl-5 list-disc text-zinc-700">
                    {state.stops.map((s) => <li key={s.id}>{s.address}</li>)}
                  </ul>
                ) : (
                  <p className="text-zinc-600 italic">Continuous hourly standby service in London.</p>
                )}
              </div>
            )}

            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-600">
              <div>
                <span className="font-semibold text-zinc-500 uppercase text-[10px] block">Date & Local London Time</span>
                <span className="font-medium text-zinc-900">{state.pickupDate} at {state.pickupTime}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-zinc-500 uppercase text-[10px] block">Service Term</span>
                <span className="font-medium text-zinc-900">
                  {state.serviceType === 'airport-transfer' ? `${state.sampleDistanceKm} km One-Way` : `${state.durationHours} Hours Dedicated`}
                </span>
              </div>
            </div>

            {state.specialInstructions && (
              <div className="pt-2 border-t border-zinc-100">
                <span className="font-semibold text-zinc-500 uppercase text-[10px] block">Special Chauffeur Instructions</span>
                <p className="text-zinc-700 italic">{state.specialInstructions}</p>
              </div>
            )}
          </div>

          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
            <div className="flex items-center justify-between text-xs text-zinc-600 mb-1">
              <span>Tariff ({priceCalc.rateLabel}):</span>
              <span className="font-semibold text-zinc-900">
                {priceCalc.baseFare !== null ? `£${priceCalc.baseFare.toFixed(2)}` : 'To be confirmed'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-600 mb-2">
              <span>Configured Administrative Fees:</span>
              <span className="text-zinc-400 italic">£0.00 (not configured)</span>
            </div>
            <div className="border-t border-zinc-200 pt-2 flex items-baseline justify-between">
              <span className="font-bold text-sm text-zinc-950">Illustrative Estimated Total:</span>
              <span className="text-xl font-black text-zinc-950">
                {priceCalc.total !== null ? `£${priceCalc.total.toFixed(2)}` : 'Price to be confirmed'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-zinc-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button onClick={copySummary}
              className="group relative overflow-hidden px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border-[1.5px] border-zinc-300 text-zinc-800 transition-all duration-500 hover:border-black/20 flex items-center">
              <PillButtonContent fill="black">{copied ? 'Copied!' : 'Copy Summary'}</PillButtonContent>
            </button>
            <button onClick={() => window.print()}
              className="group relative overflow-hidden px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border-[1.5px] border-zinc-300 text-zinc-800 transition-all duration-500 hover:border-black/20 flex items-center">
              <PillButtonContent fill="black">Print</PillButtonContent>
            </button>
          </div>
          <button onClick={onClose} className="group relative overflow-hidden px-6 py-2.5 rounded-xl text-xs font-bold bg-zinc-950 text-white shadow border-[1.5px] border-transparent transition-all duration-500 hover:border-white/30 flex items-center">
            <PillButtonContent fill="white">Close Preview</PillButtonContent>
          </button>
        </div>
      </div>
    </div>
  );
};
