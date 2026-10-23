'use client';

import React from 'react';
import type { PuneLocation } from '@/lib/demo-data';
import { MapPin, Navigation, Compass } from 'lucide-react';

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
    <div className="relative w-full h-[320px] md:h-full min-h-[320px] rounded-2xl overflow-hidden border border-border/70 bg-[#F4F1F8] dark:bg-slate-900 shadow-inner flex flex-col items-center justify-center">
      {/* Decorative Map Grid & Styling */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#4A1C6A_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Pune Landmark Badges */}
      <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/60 shadow-sm flex items-center gap-2">
        <Compass className="w-3.5 h-3.5 text-primary animate-spin" style={{ animationDuration: '8s' }} />
        <span className="text-xs font-semibold text-foreground">Pune Demo Region</span>
      </div>

      {pickup && drop && (
        <div className="absolute top-4 right-4 z-10 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          {distanceKm ? `${distanceKm.toFixed(1)} km road route` : 'Direct Path'}
        </div>
      )}

      {/* Visual Route Representation */}
      {pickup && drop ? (
        <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center max-w-sm">
          <div className="flex items-center gap-4 w-full justify-between bg-card/90 backdrop-blur-md p-4 rounded-xl border border-border/80 shadow-md">
            <div className="flex items-start gap-2 text-left">
              <span className="w-3 h-3 rounded-full bg-emerald-500 mt-1 shrink-0 ring-4 ring-emerald-500/20" />
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Pickup</p>
                <p className="text-xs font-bold text-foreground line-clamp-1">{pickup.name}</p>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-2">
              <div className="h-0.5 w-full bg-dashed border-b-2 border-primary/40 flex items-center justify-center">
                <Navigation className="w-4 h-4 text-primary rotate-90" />
              </div>
            </div>

            <div className="flex items-start gap-2 text-right">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Drop</p>
                <p className="text-xs font-bold text-foreground line-clamp-1">{drop.name}</p>
              </div>
              <span className="w-3 h-3 rounded-full bg-rose-500 mt-1 shrink-0 ring-4 ring-rose-500/20" />
            </div>
          </div>

          <div className="mt-4 p-2 bg-background/80 backdrop-blur-sm rounded-lg border text-[11px] text-muted-foreground">
            {status === 'searching' && '🔍 Searching for nearby women captains...'}
            {status === 'driver_arriving' && '🛵 Captain is heading to your pickup location'}
            {status === 'driver_arrived' && '📍 Captain is at pickup location'}
            {status === 'in_progress' && '🚀 En route to destination safely'}
            {status === 'completed' && '🎉 You have safely arrived!'}
            {status === 'idle' && 'Select pickup & drop points above to view live route preview'}
          </div>
        </div>
      ) : (
        <div className="relative z-10 text-center p-6 max-w-xs space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-md">
            <MapPin className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">Live Map Preview</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Select pickup and destination in Pune to calculate distance and preview driver routes.
            </p>
          </div>
        </div>
      )}

      {/* Bottom Google Maps fallback notice */}
      <div className="absolute bottom-3 text-[11px] text-muted-foreground/80 font-mono">
        Google Maps API: Fallback Demo Mode (Pune Grid)
      </div>
    </div>
  );
}
