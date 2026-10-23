'use client';

import React from 'react';
import { LocationSearch } from '@/components/booking/location-search';
import { RideOptions } from '@/components/booking/ride-options';
import { FareBreakdownCard } from '@/components/booking/fare-breakdown';
import { DriverCard } from '@/components/booking/driver-card';
import { MapView } from '@/components/booking/map-view';
import { BookingStatus } from '@/components/booking/booking-status';
import { useBooking } from '@/hooks/use-booking';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { RIDE_CATEGORIES } from '@/lib/demo-data';

export default function HomePage() {
  const {
    pickup,
    drop,
    category,
    status,
    driver,
    eta,
    computedDistance,
    isLoading,
    error,
    setPickup,
    setDrop,
    setCategory,
    bookRide,
    cancelRide,
    resetBooking,
    isDemoMode,
  } = useBooking();

  const selectedCategoryObj = RIDE_CATEGORIES.find((c) => c.id === category) || RIDE_CATEGORIES[0];
  const isBookingActive = status !== 'idle' && status !== 'completed' && status !== 'cancelled';

  return (
    <div className="space-y-6">
      {/* Brand Hero & Women-first Promise */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 rounded-2xl border border-primary/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-primary tracking-tight">Wopido</h1>
            <Badge variant="outline" className="border-primary/30 text-primary text-[10px] font-bold">
              For Women, By Women
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Safe, verified, dedicated women-driver rides across Pune.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isDemoMode && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-medium text-amber-700 dark:text-amber-300">
              <AlertCircle className="w-3.5 h-3.5" />
              Demo Mode Active
            </div>
          )}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            100% Verified Captains
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Booking Controls */}
        <div className="lg:col-span-6 space-y-5">
          {/* Active Status Display if booked */}
          {status === 'searching' && (
            <BookingStatus
              status={status}
              rideId="wop-demo-ride"
              onCancel={cancelRide}
              onNewBooking={resetBooking}
            />
          )}

          {(status === 'driver_arriving' ||
            status === 'driver_arrived' ||
            status === 'in_progress') &&
            driver && (
              <DriverCard
                driver={driver}
                eta={eta}
                status={status}
                onCall={() => alert(`Calling ${driver.name} (Simulated Demo Call)`)}
                onChat={() => alert(`Opening chat with ${driver.name} (Simulated Demo Chat)`)}
                onCancel={cancelRide}
              />
            )}

          {(status === 'completed' || status === 'cancelled') && (
            <BookingStatus
              status={status}
              rideId="wop-demo-ride"
              onCancel={cancelRide}
              onNewBooking={resetBooking}
            />
          )}

          {/* Location Inputs (Always accessible or locked during trip) */}
          {!isBookingActive && (
            <div className="bg-card p-5 rounded-2xl border border-border/70 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Where are you heading?
              </h2>

              <LocationSearch
                pickup={pickup}
                drop={drop}
                onPickupChange={setPickup}
                onDropChange={setDrop}
              />

              {error && (
                <div className="p-3 bg-destructive/10 text-destructive text-xs rounded-xl border border-destructive/20">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Ride Options & Pricing */}
          {!isBookingActive && pickup && drop && (
            <div className="bg-card p-5 rounded-2xl border border-border/70 shadow-sm space-y-4">
              <RideOptions
                selectedCategory={category}
                onSelectCategory={setCategory}
                distanceKm={computedDistance}
              />

              {computedDistance && (
                <FareBreakdownCard
                  distanceKm={computedDistance}
                  category={category}
                  categoryMultiplier={selectedCategoryObj.multiplier}
                />
              )}

              <Button
                onClick={bookRide}
                disabled={isLoading || !pickup || !drop}
                className="w-full h-12 bg-primary hover:bg-primary/95 text-white font-bold text-sm shadow-md rounded-xl gap-2 transition-transform active:scale-[0.99]"
              >
                <span>Book {selectedCategoryObj.name} with Woman Captain</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Right Column: Live Map Preview */}
        <div className="lg:col-span-6 h-[400px] lg:h-[580px] sticky top-20">
          <MapView
            pickup={pickup}
            drop={drop}
            status={status}
            distanceKm={computedDistance}
          />
        </div>
      </div>
    </div>
  );
}
