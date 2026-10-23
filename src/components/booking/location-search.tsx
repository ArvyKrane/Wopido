'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Search, X, ChevronDown } from 'lucide-react';
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
      // Auto-focus drop if not set
      if (!drop) {
        setTimeout(() => dropInputRef.current?.focus(), 100);
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
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-visible">
        {/* Pickup */}
        <div className="relative flex items-center gap-3 px-4 py-3.5">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <Navigation className="h-4 w-4 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-0.5">
              Pickup
            </label>
            {pickup && activeField !== 'pickup' ? (
              <button
                className="text-left w-full"
                onClick={handlePickupFocus}
              >
                <p className="text-sm font-semibold text-foreground truncate">{pickup.name}</p>
                <p className="text-xs text-muted-foreground truncate">{pickup.address}</p>
              </button>
            ) : (
              <Input
                ref={pickupInputRef}
                value={pickupQuery}
                onChange={(e) => setPickupQuery(e.target.value)}
                onFocus={handlePickupFocus}
                placeholder="Search pickup location..."
                className="border-0 p-0 h-auto text-sm font-medium placeholder:text-muted-foreground/60 focus-visible:ring-0"
              />
            )}
          </div>
          {pickup && (
            <Button variant="ghost" size="icon-sm" onClick={clearPickup} className="text-muted-foreground hover:text-foreground shrink-0">
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* Divider with swap */}
        <div className="relative flex items-center px-4">
          <div className="flex-1 h-px bg-border" />
          <button
            onClick={swapLocations}
            className="mx-3 w-7 h-7 rounded-full border border-border bg-white flex items-center justify-center hover:bg-muted transition-colors shadow-sm"
            title="Swap pickup and drop"
            aria-label="Swap locations"
          >
            <ChevronDown className="h-3 w-3 text-muted-foreground rotate-90" />
          </button>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Drop */}
        <div className="relative flex items-center gap-3 px-4 py-3.5">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <MapPin className="h-4 w-4 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-0.5">
              Drop
            </label>
            {drop && activeField !== 'drop' ? (
              <button
                className="text-left w-full"
                onClick={handleDropFocus}
              >
                <p className="text-sm font-semibold text-foreground truncate">{drop.name}</p>
                <p className="text-xs text-muted-foreground truncate">{drop.address}</p>
              </button>
            ) : (
              <Input
                ref={dropInputRef}
                value={dropQuery}
                onChange={(e) => setDropQuery(e.target.value)}
                onFocus={handleDropFocus}
                placeholder="Where to?"
                className="border-0 p-0 h-auto text-sm font-medium placeholder:text-muted-foreground/60 focus-visible:ring-0"
              />
            )}
          </div>
          {drop && (
            <Button variant="ghost" size="icon-sm" onClick={clearDrop} className="text-muted-foreground hover:text-foreground shrink-0">
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {activeField && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-border shadow-xl z-50 overflow-hidden animate-fade-in"
        >
          {filteredLocations.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <Search className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">No locations found</p>
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Pune Locations <span className="text-amber-600 ml-1">[DEMO]</span>
                </p>
              </div>
              {filteredLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleSelect(location)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors',
                    'border-b border-border/50 last:border-0'
                  )}
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{location.name}</p>
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
