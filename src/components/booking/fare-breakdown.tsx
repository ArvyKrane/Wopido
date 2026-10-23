'use client';

import React from 'react';
import { calculateFareForCategory, PRICING_CONFIG } from '@/lib/fare';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info, ShieldAlert } from 'lucide-react';

interface FareBreakdownProps {
  distanceKm: number;
  category: string;
  categoryMultiplier?: number;
}

export function FareBreakdownCard({
  distanceKm,
  categoryMultiplier = 1.0,
}: FareBreakdownProps) {
  const fare = calculateFareForCategory(distanceKm, categoryMultiplier);

  return (
    <Card className="p-4 border-border/70 bg-card/60 backdrop-blur-sm space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-primary" />
          Fare Breakdown
        </h4>
        <span className="text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
          {PRICING_CONFIG.label}
        </span>
      </div>

      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between text-muted-foreground">
          <span>Base fare (first {fare.includedDistance} km)</span>
          <span className="font-medium text-foreground">₹{fare.baseFare.toFixed(2)}</span>
        </div>

        {fare.extraDistance > 0 ? (
          <div className="flex justify-between text-muted-foreground">
            <span>Extra distance ({fare.extraDistance.toFixed(2)} km @ ₹{fare.perKmRate}/km)</span>
            <span className="font-medium text-foreground">₹{fare.extraCharge.toFixed(2)}</span>
          </div>
        ) : (
          <div className="flex justify-between text-muted-foreground">
            <span>Extra distance</span>
            <span className="font-medium text-foreground">₹0.00</span>
          </div>
        )}

        <div className="flex justify-between text-muted-foreground">
          <span>Ride subtotal</span>
          <span className="font-medium text-foreground">₹{fare.subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-muted-foreground">
          <span>Platform fee ({PRICING_CONFIG.platformFeePercent}%)</span>
          <span className="font-medium text-foreground">₹{fare.platformFee.toFixed(2)}</span>
        </div>

        <Separator className="my-2" />

        <div className="flex justify-between items-center text-sm font-bold text-foreground">
          <span>Total Estimated Fare</span>
          <span className="text-base text-primary">₹{fare.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300">
        <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
        <span>Fare may vary slightly based on actual road distance and traffic conditions.</span>
      </div>
    </Card>
  );
}
