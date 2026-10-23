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
import { ShieldCheck, Sparkles, AlertCircle, ArrowRight, HeartHandshake, Lock, PhoneCall } from 'lucide-react';
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
    <div className="relative space-y-6">
      {/* Brand Hero & Women-first Promise - Clean Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-border p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl font-black text-primary tracking-tight">Wopido</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-primary text-white">
                For Women, By Women
              </span>
            </div>
            <p className="text-xs font-medium text-muted-foreground max-w-lg">
              Rourkela&apos;s premier ride-hailing network driven 100% by verified women captains. Safe, reliable, and respectful travel every time.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isDemoMode && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-800 dark:text-amber-200">
                <AlertCircle className="w-3.5 h-3.5" />
                Demo Mode
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Women Captains
            </div>
          </div>
        </div>

        {/* Psychological Trust Banner */}
        <div className="mt-4 pt-3 border-t border-border/50 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-semibold text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-primary" />
            <span>Private & Masked Calls</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Police-Verified Drivers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
            <span>Zero Male Passengers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-primary" />
            <span>24/7 SOS Response</span>
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
            <div className="relative z-30 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/80 dark:border-white/10 p-5 sm:p-6 shadow-[0_15px_35px_rgba(74,28,106,0.06)] space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Where are you heading?
                </h2>
                <span className="text-[11px] font-semibold text-muted-foreground/80">Rourkela Region</span>
              </div>

              <LocationSearch
                pickup={pickup}
                drop={drop}
                onPickupChange={setPickup}
                onDropChange={setDrop}
              />

              {error && (
                <div className="p-3 bg-destructive/10 text-destructive text-xs font-semibold rounded-2xl border border-destructive/20">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Ride Options & Pricing */}
          {!isBookingActive && pickup && drop && (
            <div className="relative z-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/80 dark:border-white/10 p-5 sm:p-6 shadow-[0_15px_35px_rgba(74,28,106,0.06)] space-y-4">
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

              {/* Claymorphic 3D Book Button */}
              <button
                type="button"
                onClick={bookRide}
                disabled={isLoading || !pickup || !drop}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#4A1C6A] via-[#6B2FA0] to-[#E8637A] text-white font-extrabold text-sm tracking-wide shadow-[0_10px_25px_rgba(74,28,106,0.3),inset_0_2px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2)] hover:shadow-[0_14px_32px_rgba(74,28,106,0.4)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                <span>Book {selectedCategoryObj.name} with Woman Captain</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Live Map Preview */}
        <div className="lg:col-span-6 h-[420px] lg:h-[600px] sticky top-24">
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
