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
          if (!drop) {
            setTimeout(() => {
              setActiveField('drop');
              dropInputRef.current?.focus();
            }, 150);
          }
        },
        () => {
          onPickupChange({
            id: 'default-hub',
            name: 'Current Location',
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
    setTimeout(() => pickupInputRef.current?.focus(), 60);
  };

  const handleDropFocus = () => {
    setActiveField('drop');
    setDropQuery('');
    setFilteredLocations(ROURKELA_LOCATIONS);
    setTimeout(() => dropInputRef.current?.focus(), 60);
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
      {/* Backdrop overlay when search is active */}
      {activeField && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
          onClick={() => setActiveField(null)} 
        />
      )}

      {/* Main Container - Zero clipping, clean alignment */}
      <div className="relative z-50 rounded-2xl bg-white border border-slate-200 shadow-sm p-4 space-y-3">
        {/* Inner Dual Track */}
        <div className="flex items-stretch gap-3">
          {/* Left Column: Clean Dot -> Line -> Pin Indicator */}
          <div className="flex flex-col items-center justify-between py-2 shrink-0 w-5">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
            <div className="w-0.5 flex-1 bg-slate-200 my-1 min-h-[28px]" />
            <div className="w-3.5 h-3.5 rounded-sm bg-amber-500 ring-4 ring-amber-100" />
          </div>

          {/* Right Column: Two distinct input rows */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* 1. Pickup Input Row */}
            <div 
              onClick={handlePickupFocus}
              className="group cursor-pointer rounded-xl p-2 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pickup Location
                </span>
                {pickup && (
                  <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded">
                    Live GPS
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-2">
                {pickup && activeField !== 'pickup' ? (
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate">{pickup.name}</p>
                    <p className="text-xs text-slate-500 truncate">{pickup.address}</p>
                  </div>
                ) : (
                  <input
                    ref={pickupInputRef}
                    value={pickupQuery}
                    onChange={(e) => setPickupQuery(e.target.value)}
                    onFocus={() => setActiveField('pickup')}
                    placeholder="Search pickup point in Rourkela..."
                    className="w-full bg-transparent border-0 outline-none text-slate-900 font-semibold text-sm placeholder:text-slate-400 p-0"
                  />
                )}

                {pickup && activeField !== 'pickup' ? (
                  <button
                    type="button"
                    onClick={handlePickupFocus}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg shrink-0 transition-colors"
                  >
                    Change
                  </button>
                ) : pickup && (
                  <button
                    type="button"
                    onClick={clearPickup}
                    className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 shrink-0"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Separator with Swap Button */}
            <div className="relative flex items-center justify-between border-t border-slate-200 pt-1">
              <span className="text-[10px] text-slate-400 font-semibold">Where to?</span>
              <button
                type="button"
                onClick={swapLocations}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-800 border border-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                title="Swap pickup and destination"
              >
                <ArrowUpDown className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* 2. Destination Drop Row */}
            <div 
              onClick={handleDropFocus}
              className="group cursor-pointer rounded-xl p-2 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                  Destination Drop
                </span>
                {!drop && (
                  <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded">
                    Required
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-2">
                {drop && activeField !== 'drop' ? (
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate">{drop.name}</p>
                    <p className="text-xs text-slate-500 truncate">{drop.address}</p>
                  </div>
                ) : (
                  <input
                    ref={dropInputRef}
                    value={dropQuery}
                    onChange={(e) => setDropQuery(e.target.value)}
                    onFocus={() => setActiveField('drop')}
                    placeholder="Where to? (e.g. NIT Rourkela, RSP Gate, Airport)..."
                    className="w-full bg-transparent border-0 outline-none text-slate-900 font-semibold text-sm placeholder:text-slate-400 p-0"
                  />
                )}

                {drop && (
                  <button
                    type="button"
                    onClick={clearDrop}
                    className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 shrink-0"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Suggestion Chips for Fast Destination Selection */}
      {!activeField && !drop && (
        <div className="mt-2 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0 mr-1">
            Popular:
          </span>
          {ROURKELA_LOCATIONS.slice(1, 5).map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => onDropChange(loc)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 border border-slate-200 shrink-0 transition-colors shadow-2xs"
            >
              {loc.name}
            </button>
          ))}
        </div>
      )}

      {/* Floating Dropdown */}
      {activeField && (
        <div
          ref={dropdownRef}
          className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden divide-y divide-slate-100"
        >
          {/* Header */}
          <div className="px-4 py-2.5 bg-slate-50 flex items-center justify-between">
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              {activeField === 'pickup' ? 'Choose Pickup Point' : 'Choose Destination in Rourkela'}
            </p>

            <button
              type="button"
              onClick={handleDetectLiveLocation}
              disabled={isDetectingGps}
              className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <LocateFixed className={cn("w-3.5 h-3.5 text-emerald-600", isDetectingGps && "animate-spin")} />
              <span>{isDetectingGps ? 'Locating...' : 'Use Live GPS'}</span>
            </button>
          </div>

          {/* List */}
          {filteredLocations.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center bg-white">
              <Search className="h-8 w-8 text-slate-300" />
              <p className="text-xs font-semibold text-slate-500">
                No locations found matching &ldquo;{activeField === 'pickup' ? pickupQuery : dropQuery}&rdquo;
              </p>
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 bg-white">
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
                      "w-full flex items-center gap-3.5 px-4 py-3 text-left hover:bg-slate-50 transition-colors group",
                      isSelected && "bg-amber-50/50"
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-slate-600 group-hover:text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate group-hover:text-amber-600">
                        {location.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{location.address}</p>
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
