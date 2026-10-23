'use client';

import React from 'react';
import { RIDE_CATEGORIES, type RideCategory } from '@/lib/demo-data';
import { calculateFareForCategory } from '@/lib/fare';
import { cn } from '@/lib/utils';
import { Clock, ShieldCheck, Sparkles } from 'lucide-react';

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
        <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Select Ride Option
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

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                'w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all duration-300 relative overflow-hidden',
                isSelected
                  ? 'bg-gradient-to-r from-primary/10 via-primary/5 to-rose-500/10 border-2 border-primary shadow-[0_8px_20px_rgba(74,28,106,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)] scale-[1.01]'
                  : 'bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 border-2 border-border/80 hover:border-primary/40 shadow-sm'
              )}
            >
              {/* Selected subtle indicator */}
              {isSelected && (
                <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-bl-lg bg-primary" />
              )}

              <div className="flex items-center gap-3.5">
                <div className={cn(
                  'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300',
                  isSelected 
                    ? 'bg-primary text-white shadow-[0_4px_12px_rgba(74,28,106,0.3)] scale-105' 
                    : 'bg-muted/80 text-foreground shadow-inner'
                )}>
                  {cat.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-sm">{cat.name}</span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      <Clock className="w-2.5 h-2.5" />
                      {cat.eta}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">{cat.description}</p>
                </div>
              </div>

              <div className="text-right">
                {fareInfo ? (
                  <div className="space-y-0.5">
                    <span className="font-black text-foreground text-base tracking-tight">
                      ₹{fareInfo.total.toFixed(0)}
                    </span>
                    <p className="text-[10px] text-muted-foreground font-semibold">
                      ₹{fareInfo.perKmRate}/km
                    </p>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground/80 font-medium">Select drop</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
