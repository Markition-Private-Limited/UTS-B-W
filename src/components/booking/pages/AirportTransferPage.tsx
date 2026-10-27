'use client';

import React from 'react';
import { BookingState, Vehicle, VehicleTier } from '@/types/booking';
import { VehicleSelector } from '@/components/booking/VehicleSelector';
import { ShowcaseCarousel } from '@/components/booking/ShowcaseCarousel';
import { WhatsIncluded } from '@/components/booking/WhatsIncluded';
import { CapacityLuggage } from '@/components/booking/CapacityLuggage';
import { PriceBreakdown } from '@/components/booking/PriceBreakdown';

interface AirportTransferPageProps {
  state: BookingState;
  fleet: Vehicle[];
  selectedVehicle: Vehicle;
  onSelectVehicle: (id: VehicleTier) => void;
  onUpdateState: (updates: Partial<BookingState>) => void;
}

export const AirportTransferPage: React.FC<AirportTransferPageProps> = ({
  state, fleet, selectedVehicle, onSelectVehicle, onUpdateState,
}) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-zinc-950 leading-tight mb-3">
          Your Airport Transfer, Elevated.
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl font-normal leading-relaxed">
          Experience a seamless airport journey with professional chauffeurs, premium vehicles, and carefully coordinated pickups across London.
        </p>
      </div>

      <VehicleSelector vehicles={fleet} selectedVehicleId={state.selectedVehicleId} onSelectVehicle={onSelectVehicle}
        serviceType="airport-transfer" distanceKm={state.sampleDistanceKm} durationHours={state.durationHours} />

      <ShowcaseCarousel serviceType="airport-transfer" selectedVehicle={selectedVehicle} />

      <WhatsIncluded serviceType="airport-transfer" />

      <CapacityLuggage selectedVehicle={selectedVehicle} currentLuggageType={state.luggageType}
        onLuggageTypeChange={(t) => onUpdateState({ luggageType: t })} />

      <PriceBreakdown serviceType="airport-transfer" selectedVehicle={selectedVehicle}
        distanceKm={state.sampleDistanceKm} durationHours={state.durationHours}
        onDistanceChange={(d) => onUpdateState({ sampleDistanceKm: d })} />
    </div>
  );
};
