'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Search, X, ArrowUpDown } from 'lucide-react';
import { PUNE_LOCATIONS, type PuneLocation } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

interface LocationSearchProps {
  pickup: PuneLocation | null;
  drop: PuneLocation | null;
  onPickupChange: (location: PuneLocation | null) => void;
  onDropChange: (location: PuneLocation | null) => void;
}

type ActiveField = 'pickup' | 'drop' | null;

export function LocationSearch({ pickup, drop, onPickupChange, onDropChange }: LocationSearchProps) {
  const [activeField, setActiveField] = useState<ActiveField>(null);
  const [pickupQuery, setPickupQuery] = useState('');
  const [dropQuery, setDropQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<PuneLocation[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropInputRef = useRef<HTMLInputElement>(null);

  const filterLocations = (query: string): PuneLocation[] => {
    if (!query.trim()) return PUNE_LOCATIONS;
    const q = query.toLowerCase();
    return PUNE_LOCATIONS.filter(
      (l) => l.name.toLowerCase().includes(q) || l.address.toLowerCase().includes(q)
    );
  };

  useEffect(() => {
    const query = activeField === 'pickup' ? pickupQuery : dropQuery;
    setFilteredLocations(filterLocations(query));
  }, [activeField, pickupQuery, dropQuery]);

  const handlePickupFocus = () => {
    setActiveField('pickup');
    setPickupQuery('');
    setFilteredLocations(PUNE_LOCATIONS);
  };

  const handleDropFocus = () => {
    setActiveField('drop');
    setDropQuery('');
    setFilteredLocations(PUNE_LOCATIONS);
  };

  const handleSelect = (location: PuneLocation) => {
    if (activeField === 'pickup') {
      onPickupChange(location);
      setPickupQuery('');
      setActiveField(null);
      if (!drop) {
        setTimeout(() => dropInputRef.current?.focus(), 150);
      }
    } else if (activeField === 'drop') {
      onDropChange(location);
      setDropQuery('');
      setActiveField(null);
    }
  };

  const clearPickup = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPickupChange(null);
    setPickupQuery('');
    pickupInputRef.current?.focus();
  };

  const clearDrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDropChange(null);
    setDropQuery('');
    dropInputRef.current?.focus();
  };

  const swapLocations = (e: React.MouseEvent) => {
    e.stopPropagation();
    const temp = pickup;
    onPickupChange(drop);
    onDropChange(temp);
  };

  return (
    <div className={cn('relative', activeField ? 'z-50' : 'z-20')}>
      {/* Dim overlay when selecting for focused cognitive experience */}
      {activeField && (
        <div 
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] transition-all"
          onClick={() => setActiveField(null)} 
        />
      )}

      {/* Main Glassmorphic Input Container */}
      <div className="relative z-50 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-2 border-border/80 shadow-[0_8px_25px_rgba(74,28,106,0.06)] overflow-visible">
        {/* Pickup Row */}
        <div 
          onClick={handlePickupFocus}
          className="relative flex items-center gap-3.5 px-4 py-3.5 rounded-t-2xl cursor-pointer hover:bg-primary/[0.03] transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_2px_6px_rgba(16,185,129,0.15)] border border-emerald-200/80">
            <Navigation className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-widest block mb-0.5">
              Pickup Point
            </span>
            {pickup && activeField !== 'pickup' ? (
              <div className="text-left w-full">
                <p className="text-sm font-bold text-foreground truncate">{pickup.name}</p>
                <p className="text-xs text-muted-foreground truncate">{pickup.address}</p>
              </div>
            ) : (
              <input
                ref={pickupInputRef}
                value={pickupQuery}
                onChange={(e) => setPickupQuery(e.target.value)}
                onFocus={handlePickupFocus}
                placeholder="Search Pune pickup (e.g. Shivajinagar)..."
                className="w-full bg-transparent border-0 outline-none ring-0 focus:outline-none focus:ring-0 text-foreground font-semibold text-sm placeholder:text-muted-foreground/50 p-0 m-0"
              />
            )}
          </div>

          {pickup && (
            <button
              type="button"
              onClick={clearPickup}
              className="w-7 h-7 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* 3D Tactile Clay Swap Button */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-border to-transparent">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={swapLocations}
              className="pointer-events-auto w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-border shadow-[0_4px_10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_6px_14px_rgba(74,28,106,0.18)] flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200 active:scale-90"
              title="Swap pickup and destination"
              aria-label="Swap locations"
            >
              <ArrowUpDown className="h-3.5 w-3.5 text-primary" />
            </button>
          </div>
        </div>

        {/* Drop Row */}
        <div 
          onClick={handleDropFocus}
          className="relative flex items-center gap-3.5 px-4 py-3.5 rounded-b-2xl cursor-pointer hover:bg-primary/[0.03] transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center shrink-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_2px_6px_rgba(244,63,94,0.15)] border border-rose-200/80">
            <MapPin className="h-4 w-4 text-rose-500 dark:text-rose-400" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-widest block mb-0.5">
              Destination Drop
            </span>
            {drop && activeField !== 'drop' ? (
              <div className="text-left w-full">
                <p className="text-sm font-bold text-foreground truncate">{drop.name}</p>
                <p className="text-xs text-muted-foreground truncate">{drop.address}</p>
              </div>
            ) : (
              <input
                ref={dropInputRef}
                value={dropQuery}
                onChange={(e) => setDropQuery(e.target.value)}
                onFocus={handleDropFocus}
                placeholder="Where to? (e.g. Hinjewadi IT Park)..."
                className="w-full bg-transparent border-0 outline-none ring-0 focus:outline-none focus:ring-0 text-foreground font-semibold text-sm placeholder:text-muted-foreground/50 p-0 m-0"
              />
            )}
          </div>

          {drop && (
            <button
              type="button"
              onClick={clearDrop}
              className="w-7 h-7 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Floating Dropdown - Above Everything (z-50) */}
      {activeField && (
        <div
          ref={dropdownRef}
          className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white dark:bg-slate-900 rounded-2xl border-2 border-primary/20 shadow-[0_25px_60px_-10px_rgba(74,28,106,0.35)] z-50 overflow-hidden animate-fade-in divide-y divide-border/60"
        >
          <div className="px-4 py-2.5 bg-gradient-to-r from-primary/10 via-rose-500/10 to-transparent flex items-center justify-between">
            <p className="text-[11px] font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              Popular Pune Locations
            </p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
              Demo Grid
            </span>
          </div>

          {filteredLocations.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center bg-white dark:bg-slate-900">
              <Search className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-xs font-semibold text-muted-foreground">
                No locations found matching &ldquo;{activeField === 'pickup' ? pickupQuery : dropQuery}&rdquo;
              </p>
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto divide-y divide-border/40 bg-white dark:bg-slate-900">
              {filteredLocations.map((location) => (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => handleSelect(location)}
                  className="w-full flex items-center gap-3.5 px-4 py-3 text-left hover:bg-primary/5 transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                      {location.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{location.address}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
