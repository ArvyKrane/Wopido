'use client';

import React from 'react';
import type { PuneLocation } from '@/lib/demo-data';
import { MapPin, Navigation, Compass, ShieldCheck } from 'lucide-react';

interface MapViewProps {
  pickup: PuneLocation | null;
  drop: PuneLocation | null;
  status: string;
  distanceKm: number | null;
}

export function MapView({
  pickup,
  drop,
  status,
  distanceKm,
}: MapViewProps) {
  return (
    <div className="relative w-full h-full min-h-[380px] rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 bg-gradient-to-br from-[#F8F5FC] via-[#F2EEF8] to-[#EBE4F4] dark:from-slate-900 dark:to-slate-950 shadow-[0_20px_50px_rgba(74,28,106,0.08)] flex flex-col items-center justify-center">
      {/* Decorative Grid Texture */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#4A1C6A_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      {/* Floating Glass Badges */}
      <div className="absolute top-5 left-5 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/60 dark:border-white/10 shadow-sm flex items-center gap-2">
        <Compass className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '10s' }} />
        <span className="text-xs font-bold text-foreground">Pune Demo Region</span>
      </div>

      {pickup && drop && (
        <div className="absolute top-5 right-5 z-10 bg-primary text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-[0_4px_14px_rgba(74,28,106,0.35)] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{distanceKm ? `${distanceKm.toFixed(1)} km road route` : 'Direct Path'}</span>
        </div>
      )}

      {/* Visual Route Representation */}
      {pickup && drop ? (
        <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center max-w-md w-full">
          {/* Glass Card Route Summary */}
          <div className="w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl p-5 rounded-2xl border border-white/80 dark:border-white/10 shadow-[0_15px_30px_rgba(74,28,106,0.1)] space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-start gap-2.5 text-left">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 mt-1 shrink-0 ring-4 ring-emerald-500/20 shadow-sm" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Pickup</p>
                  <p className="text-xs font-bold text-foreground line-clamp-1">{pickup.name}</p>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center px-2">
                <div className="h-0.5 w-full bg-dashed border-b-2 border-primary/40 flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-primary rotate-90" />
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-right">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Drop</p>
                  <p className="text-xs font-bold text-foreground line-clamp-1">{drop.name}</p>
                </div>
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500 mt-1 shrink-0 ring-4 ring-rose-500/20 shadow-sm" />
              </div>
            </div>

            {/* Simulated Live Route Progress */}
            <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-xs font-semibold text-primary flex items-center justify-center gap-2">
              {status === 'searching' && '🔍 Searching for nearby women captains in Pune...'}
              {status === 'driver_arriving' && '🛵 Captain is en route to your pickup point'}
              {status === 'driver_arrived' && '📍 Captain is waiting at pickup location'}
              {status === 'in_progress' && '🚀 Trip in progress safely towards destination'}
              {status === 'completed' && '🎉 You have safely arrived at your destination!'}
              {status === 'idle' && '⚡ Route calculated — ready for instant booking'}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 text-center p-8 max-w-xs space-y-4">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl text-primary flex items-center justify-center shadow-[0_10px_25px_rgba(74,28,106,0.15),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-white/60">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm text-foreground">Interactive Route Preview</h3>
            <p className="text-xs font-medium text-muted-foreground leading-relaxed">
              Select pickup and destination in Pune above to calculate distance, preview ride fares, and track captain arrival.
            </p>
          </div>
        </div>
      )}

      {/* Subtle Bottom Fallback Notice */}
      <div className="absolute bottom-4 text-[11px] text-muted-foreground/70 font-mono flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
        <span>Pune Live Demo Grid (No Google API keys required)</span>
      </div>
    </div>
  );
}
