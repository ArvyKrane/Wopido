'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Search, X, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

  const clearPickup = () => {
    onPickupChange(null);
    setPickupQuery('');
    pickupInputRef.current?.focus();
  };

  const clearDrop = () => {
    onDropChange(null);
    setDropQuery('');
    dropInputRef.current?.focus();
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setActiveField(null);
    }
  };

  const swapLocations = () => {
    const temp = pickup;
    onPickupChange(drop);
    onDropChange(temp);
  };

  return (
    <div className="relative" onClick={handleOutsideClick}>
      <div className="bg-card rounded-2xl border-2 border-border shadow-md overflow-visible divide-y divide-border">
        {/* Pickup Row */}
        <div className="relative flex items-center gap-3.5 px-4 py-3.5 bg-card hover:bg-muted/20 transition-colors">
          <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
            <Navigation className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">
              Pickup Point
            </label>
            {pickup && activeField !== 'pickup' ? (
              <button
                type="button"
                className="text-left w-full focus:outline-none"
                onClick={handlePickupFocus}
              >
                <p className="text-sm font-bold text-foreground truncate">{pickup.name}</p>
                <p className="text-xs text-muted-foreground truncate">{pickup.address}</p>
              </button>
            ) : (
              <Input
                ref={pickupInputRef}
                value={pickupQuery}
                onChange={(e) => setPickupQuery(e.target.value)}
                onFocus={handlePickupFocus}
                placeholder="Search Pune pickup point (e.g. Shivajinagar)..."
                className="border-0 p-0 h-8 text-sm font-semibold text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 shadow-none bg-transparent"
              />
            )}
          </div>
          {pickup && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={clearPickup}
              className="text-muted-foreground hover:text-foreground shrink-0 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Swap Bar */}
        <div className="relative flex items-center justify-center -my-3 z-10 pointer-events-none">
          <button
            type="button"
            onClick={swapLocations}
            className="pointer-events-auto w-8 h-8 rounded-full border-2 border-border bg-card hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-all shadow-sm active:scale-95"
            title="Swap pickup and drop"
            aria-label="Swap locations"
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Drop Row */}
        <div className="relative flex items-center gap-3.5 px-4 py-3.5 bg-card hover:bg-muted/20 transition-colors">
          <div className="w-9 h-9 rounded-full bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center shrink-0 border border-rose-200 dark:border-rose-800">
            <MapPin className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="flex-1 min-w-0">
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">
              Destination Drop
            </label>
            {drop && activeField !== 'drop' ? (
              <button
                type="button"
                className="text-left w-full focus:outline-none"
                onClick={handleDropFocus}
              >
                <p className="text-sm font-bold text-foreground truncate">{drop.name}</p>
                <p className="text-xs text-muted-foreground truncate">{drop.address}</p>
              </button>
            ) : (
              <Input
                ref={dropInputRef}
                value={dropQuery}
                onChange={(e) => setDropQuery(e.target.value)}
                onFocus={handleDropFocus}
                placeholder="Where do you want to go (e.g. Hinjewadi)..."
                className="border-0 p-0 h-8 text-sm font-semibold text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 shadow-none bg-transparent"
              />
            )}
          </div>
          {drop && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={clearDrop}
              className="text-muted-foreground hover:text-foreground shrink-0 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Dropdown Options */}
      {activeField && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl border-2 border-border shadow-2xl z-50 overflow-hidden animate-fade-in divide-y divide-border"
        >
          <div className="px-4 py-2.5 bg-muted/50 flex items-center justify-between">
            <p className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              Suggested Pune Locations
            </p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              Demo Grid
            </span>
          </div>

          {filteredLocations.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center bg-card">
              <Search className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm font-semibold text-muted-foreground">
                No locations matching &ldquo;{activeField === 'pickup' ? pickupQuery : dropQuery}&rdquo;
              </p>
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto divide-y divide-border/60">
              {filteredLocations.map((location) => (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => handleSelect(location)}
                  className="w-full flex items-center gap-3.5 px-4 py-3 text-left hover:bg-primary/5 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
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
