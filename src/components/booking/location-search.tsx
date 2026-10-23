'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Search, X, ArrowUpDown, LocateFixed, Check } from 'lucide-react';
import { ROURKELA_LOCATIONS, type CityLocation } from '@/lib/demo-data';
import { cn, calculateDistance } from '@/lib/utils';

interface LocationSearchProps {
  pickup: CityLocation | null;
  drop: CityLocation | null;
  onPickupChange: (location: CityLocation | null) => void;
  onDropChange: (location: CityLocation | null) => void;
}

type ActiveField = 'pickup' | 'drop' | null;

export function LocationSearch({ pickup, drop, onPickupChange, onDropChange }: LocationSearchProps) {
  const [activeField, setActiveField] = useState<ActiveField>(null);
  const [pickupQuery, setPickupQuery] = useState('');
  const [dropQuery, setDropQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<CityLocation[]>(ROURKELA_LOCATIONS);
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropInputRef = useRef<HTMLInputElement>(null);

  const filterLocations = (query: string): CityLocation[] => {
    if (!query.trim()) return ROURKELA_LOCATIONS;
    const q = query.toLowerCase();
    return ROURKELA_LOCATIONS.filter(
      (l) => l.name.toLowerCase().includes(q) || l.address.toLowerCase().includes(q)
    );
  };

  useEffect(() => {
    const query = activeField === 'pickup' ? pickupQuery : dropQuery;
    setFilteredLocations(filterLocations(query));
  }, [activeField, pickupQuery, dropQuery]);

  // Handle GPS detection
  const handleDetectLiveLocation = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsDetectingGps(true);

    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          let nearest = ROURKELA_LOCATIONS[0];
          let minDist = Infinity;
          for (const loc of ROURKELA_LOCATIONS) {
            const dist = calculateDistance(latitude, longitude, loc.lat, loc.lng);
            if (dist < minDist) {
              minDist = dist;
              nearest = loc;
            }
          }

          onPickupChange({
            id: 'gps-live-loc',
            name: 'Current Location (GPS)',
            address: minDist < 20 ? `Near ${nearest.name}, Rourkela` : `GPS (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
            lat: latitude,
            lng: longitude,
          });

          setIsDetectingGps(false);
          setActiveField(null);
          // If drop is empty, focus drop next
          if (!drop) {
            setTimeout(() => dropInputRef.current?.focus(), 150);
          }
        },
        () => {
          // Fallback to station hub
          onPickupChange({
            id: 'default-hub',
            name: 'Current Location (Hub)',
            address: `${ROURKELA_LOCATIONS[0].name}, Rourkela`,
            lat: ROURKELA_LOCATIONS[0].lat,
            lng: ROURKELA_LOCATIONS[0].lng,
          });
          setIsDetectingGps(false);
          setActiveField(null);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setIsDetectingGps(false);
    }
  };

  const handlePickupFocus = () => {
    setActiveField('pickup');
    setPickupQuery('');
    setFilteredLocations(ROURKELA_LOCATIONS);
    setTimeout(() => pickupInputRef.current?.focus(), 50);
  };

  const handleDropFocus = () => {
    setActiveField('drop');
    setDropQuery('');
    setFilteredLocations(ROURKELA_LOCATIONS);
    setTimeout(() => dropInputRef.current?.focus(), 50);
  };

  const handleSelect = (location: CityLocation) => {
    if (activeField === 'pickup') {
      onPickupChange(location);
      setPickupQuery('');
      setActiveField(null);
      if (!drop) {
        setTimeout(() => {
          setActiveField('drop');
          dropInputRef.current?.focus();
        }, 150);
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
    handlePickupFocus();
  };

  const clearDrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDropChange(null);
    setDropQuery('');
    handleDropFocus();
  };

  const swapLocations = (e: React.MouseEvent) => {
    e.stopPropagation();
    const temp = pickup;
    onPickupChange(drop);
    onDropChange(temp);
  };

  return (
    <div className={cn('relative', activeField ? 'z-50' : 'z-20')}>
      {/* Dim overlay when selecting */}
      {activeField && (
        <div 
          className="fixed inset-0 z-40 bg-black/15 transition-opacity"
          onClick={() => setActiveField(null)} 
        />
      )}

      {/* Main Container */}
      <div className="relative z-50 rounded-2xl bg-white dark:bg-slate-900 border-2 border-border shadow-sm overflow-visible">
        {/* Pickup Row (Default: Live Current Location) */}
        <div 
          onClick={handlePickupFocus}
          className="relative flex items-center gap-3.5 px-4 py-3.5 rounded-t-2xl cursor-pointer hover:bg-muted/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 border border-emerald-200">
            <Navigation className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Starting Pickup
              </span>
              <span className="text-[9px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 px-1.5 py-0.2 rounded-full">
                Live Location
              </span>
            </div>

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
                onFocus={() => setActiveField('pickup')}
                placeholder="Search pickup point in Rourkela..."
                className="w-full bg-transparent border-0 outline-none ring-0 text-foreground font-semibold text-sm placeholder:text-muted-foreground/60 p-0 m-0"
              />
            )}
          </div>

          {pickup && activeField !== 'pickup' ? (
            <span className="text-[11px] font-bold text-primary hover:underline px-2 py-1 rounded-md bg-primary/5 shrink-0">
              Change
            </span>
          ) : pickup && (
            <button
              type="button"
              onClick={clearPickup}
              className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Divider with Swap Button */}
        <div className="relative h-px bg-border">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={swapLocations}
              className="pointer-events-auto w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-all active:scale-95"
              title="Swap pickup and destination"
              aria-label="Swap locations"
            >
              <ArrowUpDown className="h-3.5 w-3.5 text-primary" />
            </button>
          </div>
        </div>

        {/* Drop Row (Primary question: "Where to?") */}
        <div 
          onClick={handleDropFocus}
          className="relative flex items-center gap-3.5 px-4 py-3.5 rounded-b-2xl cursor-pointer hover:bg-muted/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center shrink-0 border border-rose-200">
            <MapPin className="h-4 w-4 text-rose-500" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">
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
                onFocus={() => setActiveField('drop')}
                placeholder="Where to? (e.g. NIT Rourkela, RSP Gate)..."
                className="w-full bg-transparent border-0 outline-none ring-0 text-foreground font-semibold text-sm placeholder:text-muted-foreground/60 p-0 m-0"
              />
            )}
          </div>

          {drop && (
            <button
              type="button"
              onClick={clearDrop}
              className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Suggestion Chips for Fast 1-Tap Destination */}
      {!activeField && !drop && (
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-bold text-muted-foreground uppercase shrink-0 mr-1">
            Quick Drop:
          </span>
          {ROURKELA_LOCATIONS.slice(1, 5).map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => onDropChange(loc)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border/80 shrink-0 transition-colors"
            >
              {loc.name}
            </button>
          ))}
        </div>
      )}

      {/* Floating Dropdown - Above Everything (z-50) */}
      {activeField && (
        <div
          ref={dropdownRef}
          className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white dark:bg-slate-900 rounded-2xl border-2 border-border shadow-xl z-50 overflow-hidden divide-y divide-border/60"
        >
          {/* Header with GPS detection option */}
          <div className="px-4 py-2.5 bg-muted/30 flex items-center justify-between">
            <p className="text-[11px] font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              {activeField === 'pickup' ? 'Select Starting Location' : 'Select Destination in Rourkela'}
            </p>

            <button
              type="button"
              onClick={handleDetectLiveLocation}
              disabled={isDetectingGps}
              className="text-[11px] font-bold text-primary flex items-center gap-1 hover:underline disabled:opacity-50"
            >
              <LocateFixed className={cn("w-3.5 h-3.5 text-emerald-600", isDetectingGps && "animate-spin")} />
              <span>{isDetectingGps ? 'Locating...' : 'Use Live GPS'}</span>
            </button>
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
              {filteredLocations.map((location) => {
                const isSelected = activeField === 'pickup' 
                  ? pickup?.id === location.id 
                  : drop?.id === location.id;

                return (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => handleSelect(location)}
                    className={cn(
                      "w-full flex items-center gap-3.5 px-4 py-3 text-left hover:bg-primary/5 transition-colors group",
                      isSelected && "bg-primary/5"
                    )}
                  >
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {location.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{location.address}</p>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
