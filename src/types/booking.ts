export type ServiceType = 'airport-transfer' | 'day-booking' | 'hourly-chauffeur';

export type VehicleTier = 'economy' | 'business' | 'first' | 'mpv' | 'first-class-van' | 'van' | 'standard-van';

export interface Vehicle {
  id: VehicleTier;
  name: string;
  categoryName: string;
  modelExample: string;
  passengers: number;
  luggage: number;
  image: string;
  image2: string;
  description: string;
  features: string[];
  airportRateKm: number | null;
  dayRateHour: number | null;
  hourlyRateHour: number | null;
  fixedFare?: number;
}

export interface ItineraryStop {
  id: string;
  address: string;
  notes?: string;
  estimatedArrival?: string;
}

export interface BookingState {
  serviceType: ServiceType;
  selectedVehicleId: VehicleTier;
  transferDirection: 'departure' | 'arrival';
  sampleDistanceKm: number;
  flightNumber: string;
  airportTerminal: string;
  pickupAddress: string;
  destinationAddress: string;
  pickupDate: string;
  pickupTime: string;
  durationHours: number;
  stops: ItineraryStop[];
  passengers: number;
  luggageCount: number;
  luggageType: 'carry-on' | 'check-in' | 'large';
  specialInstructions: string;
}
