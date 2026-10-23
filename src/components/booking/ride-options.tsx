'use client';

import React from 'react';
import { RIDE_CATEGORIES, type RideCategory } from '@/lib/demo-data';
import { calculateFareForCategory } from '@/lib/fare';
import { cn } from '@/lib/utils';
import { Clock, ShieldCheck, MapPin, Sparkles, Zap } from 'lucide-react';

interface RideOptionsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  distanceKm: number | null;
}

const CATEGORY_PROXIMITY: Record<string, { arrivalEta: string; distanceAway: string; fastest?: boolean }> = {
  bike: {
    arrivalEta: '2-3 min',
    distanceAway: '350m away',
    fastest: true,
  },
  auto: {
    arrivalEta: '3-4 min',
    distanceAway: '550m away',
  },
  cab: {
    arrivalEta: '6-8 min',
    distanceAway: '1.2 km away',
  },
};

export function RideOptions({
  selectedCategory,
  onSelectCategory,
  distanceKm,
}: RideOptionsProps) {
  // Estimated in-vehicle travel time
  const travelDurationMins = distanceKm ? Math.max(5, Math.round(distanceKm * 2.1 + 3)) : null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Choose Vehicle Option
        </h3>
        <span className="text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200/80 flex items-center gap-1 font-semibold">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          100% Women Captains
        </span>
      </div>

      <div className="grid gap-2.5">
        {RIDE_CATEGORIES.map((cat: RideCategory) => {
          const isSelected = selectedCategory === cat.id;
          const fareInfo = distanceKm ? calculateFareForCategory(distanceKm, cat.multiplier) : null;
          const proximity = CATEGORY_PROXIMITY[cat.id] || { arrivalEta: cat.eta, distanceAway: 'Nearby' };

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                'w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all duration-200 relative overflow-hidden',
                isSelected
                  ? 'bg-amber-50/50 border-2 border-amber-500 shadow-sm'
                  : 'bg-white hover:bg-slate-50 border-2 border-slate-200 shadow-2xs'
              )}
            >
              <div className="flex items-center gap-3.5">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-colors',
                  isSelected 
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-bold' 
                    : 'bg-slate-100 text-slate-800'
                )}>
                  {cat.icon}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-sm">{cat.name}</span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      Arrives in {proximity.arrivalEta}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-0.5 font-medium flex items-center gap-2">
                    <span>{cat.description}</span>
                    <span>•</span>
                    <span className="text-[11px] font-semibold text-foreground/80">
                      {proximity.distanceAway}
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                {fareInfo ? (
                  <div className="space-y-0.5">
                    <span className="font-black text-foreground text-base tracking-tight">
                      ₹{fareInfo.total.toFixed(0)}
                    </span>
                    {travelDurationMins && (
                      <p className="text-[10px] text-muted-foreground font-semibold">
                        ~{travelDurationMins} min ride
                      </p>
                    )}
                  </div>
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
