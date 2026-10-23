export const PRICING_CONFIG = {
  baseFare: 40,
  includedDistance: 2,
  perKmRate: 12,
  platformFeePercent: 3,
  currency: 'INR',
  label: 'Demo Rate (configured)',
};

export interface FareBreakdown {
  baseFare: number;
  includedDistance: number;
  extraDistance: number;
  extraCharge: number;
  subtotal: number;
  platformFee: number;
  total: number;
  perKmRate: number;
  currency: string;
}

export function calculateFare(
  distanceKm: number,
  config = PRICING_CONFIG
): FareBreakdown {
  const extraDistance = Math.max(0, distanceKm - config.includedDistance);
  const extraCharge = extraDistance * config.perKmRate;
  const subtotal = config.baseFare + extraCharge;
  const platformFee = Math.round(subtotal * config.platformFeePercent) / 100;
  const total = subtotal + platformFee;

  return {
    baseFare: config.baseFare,
    includedDistance: config.includedDistance,
    extraDistance: parseFloat(extraDistance.toFixed(2)),
    extraCharge: parseFloat(extraCharge.toFixed(2)),
    subtotal: parseFloat(subtotal.toFixed(2)),
    platformFee: parseFloat(platformFee.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    perKmRate: config.perKmRate,
    currency: config.currency,
  };
}

export function calculateFareForCategory(
  distanceKm: number,
  multiplier: number,
  config = PRICING_CONFIG
): FareBreakdown {
  const adjusted = {
    ...config,
    baseFare: Math.round(config.baseFare * multiplier),
    perKmRate: parseFloat((config.perKmRate * multiplier).toFixed(2)),
  };
  return calculateFare(distanceKm, adjusted);
}
