import { Vehicle, ServiceType, VehicleTier } from '@/types/booking';

export const FLEET: Vehicle[] = [
  {
    id: 'business',
    name: 'Business Class',
    categoryName: 'Business Class',
    modelExample: 'Mercedes-Benz E-Class or similar',
    passengers: 3,
    luggage: 2,
    image: '/images/fleet-cards/business-class-1.webp',
    image2: '/images/fleet-cards/business-class-2.webp',
    description: 'Refined executive travel for every journey. The Business Class provides a composed, private environment with a professional chauffeur and full luggage assistance.',
    features: [
      'Complimentary Wi-Fi & chilled mineral water',
      'Rear climate control and device charging ports',
      'Immaculately maintained executive saloon',
      'Discreet and courteous professional chauffeur',
    ],
    airportRateKm: 2.28,
    dayRateHour: 40,
    hourlyRateHour: 60,
  },
  {
    id: 'first-class-van',
    name: 'First Class Van',
    categoryName: 'First Class Van',
    modelExample: 'Mercedes-Benz V-Class or similar',
    passengers: 6,
    luggage: 5,
    image: '/images/fleet-cards/first-class-van-1.webp',
    image2: '/images/fleet-cards/first-class-van-2.webp',
    description: 'Unmatched spacious luxury for groups, executive delegations, and families requiring extensive luggage capacity without compromising sophistication.',
    features: [
      'Conference-style luxury leather seating',
      'Panoramic roof and ambient cabin lighting',
      'Generous luggage compartment for up to 6 cases',
      'Privacy glass and dedicated rear passenger climate',
    ],
    airportRateKm: null,
    dayRateHour: null,
    hourlyRateHour: null,
    fixedFare: 75,
  },
  {
    id: 'first',
    name: 'First Class',
    categoryName: 'First Class',
    modelExample: 'Mercedes-Benz S-Class or similar',
    passengers: 3,
    luggage: 2,
    image: '/images/fleet-cards/first-class-1.webp',
    image2: '/images/fleet-cards/first-class-2.webp',
    description: 'The pinnacle of automotive luxury and prestige. An extraordinarily quiet cabin, acoustic glazing, and sublime ride comfort for discerning travellers.',
    features: [
      'Reclining Nappa leather executive rear seats',
      'Burmester® 3D surround sound & active noise isolation',
      'Chauffeur protocol with umbrella service',
      'Premium refreshments and hot towel service',
    ],
    airportRateKm: 2.77,
    dayRateHour: 60,
    hourlyRateHour: 60,
  },
  {
    id: 'economy',
    name: 'Economy Saloon',
    categoryName: 'Economy Saloon',
    modelExample: 'Volkswagen Passat / Kia Niro or similar',
    passengers: 3,
    luggage: 2,
    image: '/images/fleet-cards/economy-saloon-1.webp',
    image2: '/images/fleet-cards/economy-saloon-2.webp',
    description: 'Dependable, understated executive transportation offering clean comfort, punctuality, and professional chauffeur standards across London.',
    features: [
      'Comfortable modern saloon seating',
      'Air conditioning and USB charging',
      'Punctual professional driver',
      'Direct routing with luggage assistance',
    ],
    airportRateKm: 1.48,
    dayRateHour: 30,
    hourlyRateHour: 60,
  },
  {
    id: 'mpv',
    name: 'MPV',
    categoryName: 'MPV',
    modelExample: 'Volkswagen Sharan / Ford Galaxy or similar',
    passengers: 4,
    luggage: 3,
    image: '/images/fleet-cards/mpv-1.webp',
    image2: '/images/fleet-cards/mpv-2.webp',
    description: 'Versatile multi-passenger vehicle offering flexible seating configurations and elevated ride height, ideal for small groups with extra luggage.',
    features: [
      'Elevated seating position with enhanced visibility',
      'Flexible modular luggage storage space',
      'Sliding passenger side doors for easy access',
      'Professional chauffeur and route coordination',
    ],
    airportRateKm: 1.97,
    dayRateHour: 40,
    hourlyRateHour: 80,
  },
  {
    id: 'van',
    name: 'Van (8-9 Seater)',
    categoryName: 'Van',
    modelExample: 'Hyundai i800 / Volkswagen Transporter or similar',
    passengers: 8,
    luggage: 6,
    image: '/images/fleet-cards/standard-van-1.webp',
    image2: '/images/fleet-cards/standard-van-2.webp',
    description: 'High-capacity passenger vehicle suited for corporate shuttles, production crews, and extended family transfers across the UK.',
    features: [
      'Accommodates up to 8 passengers comfortably',
      'Deep rear luggage bay for oversized bags',
      'Dual-zone rear heating and cooling',
      'Professional certified commercial chauffeur',
    ],
    airportRateKm: null,
    dayRateHour: null,
    hourlyRateHour: null,
  },
  {
    id: 'standard-van',
    name: 'Standard Van',
    categoryName: 'Standard Van',
    modelExample: 'Hyundai i800 / Volkswagen Transporter or similar',
    passengers: 7,
    luggage: 5,
    image: '/images/fleet-cards/standard-van-1.webp',
    image2: '/images/fleet-cards/standard-van-2.webp',
    description: 'Practical, spacious group transfer vehicle delivering reliable group transportation with generous boot volume.',
    features: [
      'Seating for up to 7 passengers',
      'Substantial boot capacity for standard suitcases',
      'Clean, comfortable passenger cabin',
      'Experienced London chauffeur',
    ],
    airportRateKm: null,
    dayRateHour: null,
    hourlyRateHour: null,
  },
];

// Maps each vehicle class onto its luggage-photo folder in /public/luggage.
const LUGGAGE_FOLDER: Record<VehicleTier, string> = {
  economy: 'economy-saloon',
  business: 'business-class',
  first: 'first-class',
  mpv: 'mpv',
  'first-class-van': 'first-class-van',
  van: 'van',
  'standard-van': 'standard-van',
};

// Standard Van's own shoot only covers carry-on and check-in; its large.png
// borrows the Van (8-9 Seater) large-bag shot, the closest class with one.
export function getLuggageImage(vehicleId: VehicleTier, luggageType: 'carry-on' | 'check-in' | 'large'): string {
  const folder = LUGGAGE_FOLDER[vehicleId];
  return `/luggage/${folder}/${luggageType}.png`;
}

export interface PriceCalculationResult {
  baseFare: number | null;
  rateLabel: string;
  ratePerUnit: number | null;
  unitCount: number;
  unitLabel: string;
  bookingFee: number;
  total: number | null;
  isConfirmedPrice: boolean;
  notes: string[];
}

export function calculatePrice(
  service: ServiceType,
  vehicle: Vehicle,
  options: { distanceKm?: number; durationHours?: number }
): PriceCalculationResult {
  if (vehicle.fixedFare !== undefined) {
    return {
      baseFare: vehicle.fixedFare,
      rateLabel: 'Fixed fare',
      ratePerUnit: null,
      unitCount: 1,
      unitLabel: 'journey',
      bookingFee: 0,
      total: vehicle.fixedFare,
      isConfirmedPrice: true,
      notes: [`Fixed fare of £${vehicle.fixedFare} for this vehicle class.`],
    };
  }
  if (service === 'airport-transfer') {
    const distance = options.distanceKm ?? 28;
    if (vehicle.airportRateKm === null) {
      return {
        baseFare: null,
        rateLabel: 'Rate subject to confirmation',
        ratePerUnit: null,
        unitCount: distance,
        unitLabel: 'km',
        bookingFee: 0,
        total: null,
        isConfirmedPrice: false,
        notes: [
          'Pricing for this category is subject to custom fleet confirmation with UTS.',
          'No unofficial or estimated tariff has been assigned.',
        ],
      };
    }
    const baseFare = Number((distance * vehicle.airportRateKm).toFixed(2));
    return {
      baseFare,
      rateLabel: `£${vehicle.airportRateKm.toFixed(2)} per km`,
      ratePerUnit: vehicle.airportRateKm,
      unitCount: distance,
      unitLabel: 'km',
      bookingFee: 0,
      total: baseFare,
      isConfirmedPrice: true,
      notes: [
        `Calculated as ${distance} km × £${vehicle.airportRateKm.toFixed(2)}/km based on the official UTS per-kilometre tariff.`,
        'Additional charges (tolls, congestion charge, airport drop-off fees) are not configured and subject to UTS confirmation.',
      ],
    };
  }

  if (service === 'day-booking') {
    const hours = Math.max(4, options.durationHours ?? 4);
    if (vehicle.dayRateHour === null) {
      return {
        baseFare: null,
        rateLabel: 'Rate subject to confirmation',
        ratePerUnit: null,
        unitCount: hours,
        unitLabel: 'hours',
        bookingFee: 0,
        total: null,
        isConfirmedPrice: false,
        notes: [
          'Pricing for this category requires bespoke quotation from UTS dispatch.',
          'Minimum booking requirement remains 4 hours.',
        ],
      };
    }
    const baseFare = hours * vehicle.dayRateHour;
    return {
      baseFare,
      rateLabel: `£${vehicle.dayRateHour.toFixed(2)} per hour`,
      ratePerUnit: vehicle.dayRateHour,
      unitCount: hours,
      unitLabel: 'hours',
      bookingFee: 0,
      total: baseFare,
      isConfirmedPrice: true,
      notes: [
        `Calculated as ${hours} hours × £${vehicle.dayRateHour.toFixed(2)}/hour under UTS Day Booking rates (4-hour minimum).`,
        'Mileage allowances and out-of-London travel conditions must be confirmed with UTS.',
      ],
    };
  }

  if (service === 'hourly-chauffeur') {
    const hours = Math.max(4, options.durationHours ?? 4);
    if (vehicle.hourlyRateHour === null) {
      return {
        baseFare: null,
        rateLabel: 'Rate subject to confirmation',
        ratePerUnit: null,
        unitCount: hours,
        unitLabel: 'hours',
        bookingFee: 0,
        total: null,
        isConfirmedPrice: false,
        notes: [
          'Pricing for this category requires direct fleet confirmation with UTS.',
          'Minimum booking requirement remains 4 hours.',
        ],
      };
    }
    const baseFare = hours * vehicle.hourlyRateHour;
    return {
      baseFare,
      rateLabel: `£${vehicle.hourlyRateHour.toFixed(2)} per hour`,
      ratePerUnit: vehicle.hourlyRateHour,
      unitCount: hours,
      unitLabel: 'hours',
      bookingFee: 0,
      total: baseFare,
      isConfirmedPrice: true,
      notes: [
        `Calculated as ${hours} hours × £${vehicle.hourlyRateHour.toFixed(2)}/hour under UTS Hourly Chauffeur rates (4-hour minimum).`,
        'Includes flexible stops and chauffeur on standby within Greater London.',
      ],
    };
  }

  return { baseFare: 0, rateLabel: '', ratePerUnit: 0, unitCount: 0, unitLabel: '', bookingFee: 0, total: 0, isConfirmedPrice: false, notes: [] };
}
