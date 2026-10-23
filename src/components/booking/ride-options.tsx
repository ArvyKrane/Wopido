'use client';

import React from 'react';
import { RIDE_CATEGORIES, type RideCategory } from '@/lib/demo-data';
import { calculateFareForCategory } from '@/lib/fare';
import { cn } from '@/lib/utils';
import { Clock, ShieldCheck } from 'lucide-react';

interface RideOptionsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  distanceKm: number | null;
}

export function RideOptions({
  selectedCategory,
  onSelectCategory,
  distanceKm,
}: RideOptionsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-foreground">Choose a Ride</h3>
        <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          100% Women Drivers
        </span>
      </div>

      <div className="grid gap-2.5">
        {RIDE_CATEGORIES.map((cat: RideCategory) => {
          const isSelected = selectedCategory === cat.id;
          const fareInfo = distanceKm ? calculateFareForCategory(distanceKm, cat.multiplier) : null;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                'w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
                  : 'border-border/70 bg-card hover:border-primary/40 hover:bg-muted/30'
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center text-2xl shadow-inner">
                  {cat.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground text-sm">{cat.name}</span>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {cat.eta}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
                </div>
              </div>

              <div className="text-right">
                {fareInfo ? (
                  <>
                    <span className="font-bold text-foreground text-base">₹{fareInfo.total.toFixed(0)}</span>
                    <p className="text-[11px] text-muted-foreground">₹{fareInfo.perKmRate}/km</p>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground font-medium">Select drop</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
