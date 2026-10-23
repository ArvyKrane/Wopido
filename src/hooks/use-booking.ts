'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { RIDE_STATUS, type RideStatus } from '@/lib/constants';
import { getRandomDriver, type DemoDriver, type PuneLocation } from '@/lib/demo-data';
import { calculateFareForCategory } from '@/lib/fare';
import { calculateDistance, generateId, sleep } from '@/lib/utils';

export interface BookingState {
  rideId: string | null;
  status: RideStatus;
  pickup: PuneLocation | null;
  drop: PuneLocation | null;
  category: string;
  driver: DemoDriver | null;
  fare: number | null;
  distanceKm: number | null;
  eta: string | null;
  startedAt: Date | null;
}

export function useBooking() {
  const [state, setState] = useState<BookingState>({
    rideId: null,
    status: RIDE_STATUS.IDLE,
    pickup: null,
    drop: null,
    category: 'bike',
    driver: null,
    fare: null,
    distanceKm: null,
    eta: null,
    startedAt: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const supabase = getSupabaseBrowserClient();

  const setPickup = useCallback((location: PuneLocation | null) => {
    setState((prev) => ({ ...prev, pickup: location }));
  }, []);

  const setDrop = useCallback((location: PuneLocation | null) => {
    setState((prev) => ({ ...prev, drop: location }));
  }, []);

  const setCategory = useCallback((category: string) => {
    setState((prev) => ({ ...prev, category }));
  }, []);

  const computedDistance = state.pickup && state.drop
    ? calculateDistance(state.pickup.lat, state.pickup.lng, state.drop.lat, state.drop.lng)
    : null;

  const bookRide = useCallback(async () => {
    if (!state.pickup || !state.drop) {
      setError('Please select pickup and drop locations');
      return;
    }

    setIsLoading(true);
    setError(null);

    const distance = calculateDistance(
      state.pickup.lat, state.pickup.lng,
      state.drop.lat, state.drop.lng
    );

    const category = state.category;

    // Find multiplier
    const multipliers: Record<string, number> = { bike: 1.0, auto: 1.4, cab: 2.2 };
    const multiplier = multipliers[category] ?? 1.0;
    const fareBreakdown = calculateFareForCategory(distance, multiplier);
    const rideId = generateId();

    setState((prev) => ({
      ...prev,
      rideId,
      status: RIDE_STATUS.SEARCHING,
      distanceKm: distance,
      fare: fareBreakdown.total,
    }));

    setIsLoading(false);

    // Demo mode: simulate driver acceptance after 3-5 seconds
    if (!supabase) {
      await sleep(Math.random() * 2000 + 3000);

      const driver = getRandomDriver(category);
      const eta = category === 'bike' ? '4 min' : category === 'auto' ? '6 min' : '10 min';

      setState((prev) => ({
        ...prev,
        status: RIDE_STATUS.DRIVER_ARRIVING,
        driver,
        eta,
      }));

      // Simulate driver arriving after 20-30 more seconds (shortened for demo)
      setTimeout(() => {
        setState((prev) => {
          if (prev.status === RIDE_STATUS.DRIVER_ARRIVING) {
            return { ...prev, status: RIDE_STATUS.DRIVER_ARRIVED };
          }
          return prev;
        });
      }, 15000);

      // Simulate ride in progress
      setTimeout(() => {
        setState((prev) => {
          if (prev.status === RIDE_STATUS.DRIVER_ARRIVED || prev.status === RIDE_STATUS.DRIVER_ARRIVING) {
            return { ...prev, status: RIDE_STATUS.IN_PROGRESS, startedAt: new Date() };
          }
          return prev;
        });
      }, 30000);

      // Simulate ride completion
      setTimeout(() => {
        setState((prev) => {
          if (prev.status === RIDE_STATUS.IN_PROGRESS) {
            return { ...prev, status: RIDE_STATUS.COMPLETED };
          }
          return prev;
        });
      }, 90000);

      return;
    }

    // Supabase mode: insert ride and subscribe to realtime
    try {
      const clientAny = supabase as any;
      const { data, error: dbError } = await clientAny
        .from('rides')
        .insert({
          pickup_address: state.pickup.address,
          pickup_lat: state.pickup.lat,
          pickup_lng: state.pickup.lng,
          drop_address: state.drop.address,
          drop_lat: state.drop.lat,
          drop_lng: state.drop.lng,
          status: RIDE_STATUS.SEARCHING,
          category,
          fare: fareBreakdown.total,
          distance_km: distance,
          payment_method: 'cash',
          user_id: 'demo-user-001',
        })
        .select()
        .single();

      if (dbError) {
        setError(dbError.message);
        setState((prev) => ({ ...prev, status: RIDE_STATUS.IDLE }));
        return;
      }

      if (data) {
        setState((prev) => ({ ...prev, rideId: data.id }));

        // Subscribe to realtime
        clientAny
          .channel(`ride:${data.id}`)
          .on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'rides',
            filter: `id=eq.${data.id}`,
          }, (payload: any) => {
            const updated = payload.new as Record<string, unknown>;
            setState((prev) => ({
              ...prev,
              status: (updated.status as RideStatus) ?? prev.status,
            }));
          })
          .subscribe();

        // Polling fallback every 3 seconds
        pollingRef.current = setInterval(async () => {
          const { data: pollData } = await clientAny
            .from('rides')
            .select('*')
            .eq('id', data.id)
            .single();

          if (pollData) {
            setState((prev) => ({
              ...prev,
              status: (pollData.status as RideStatus) ?? prev.status,
            }));

            if (pollData.status === RIDE_STATUS.COMPLETED || pollData.status === RIDE_STATUS.CANCELLED) {
              if (pollingRef.current) clearInterval(pollingRef.current);
            }
          }
        }, 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to book ride');
      setState((prev) => ({ ...prev, status: RIDE_STATUS.IDLE }));
    }
  }, [state.pickup, state.drop, state.category, supabase]);

  const cancelRide = useCallback(async () => {
    if (state.status !== RIDE_STATUS.SEARCHING && state.status !== RIDE_STATUS.DRIVER_ARRIVING) {
      return;
    }

    if (pollingRef.current) clearInterval(pollingRef.current);

    if (supabase && state.rideId) {
      await (supabase as any)
        .from('rides')
        .update({ status: RIDE_STATUS.CANCELLED, cancelled_at: new Date().toISOString() })
        .eq('id', state.rideId);
    }

    setState((prev) => ({ ...prev, status: RIDE_STATUS.CANCELLED }));

    // Reset after a moment
    setTimeout(() => {
      setState({
        rideId: null,
        status: RIDE_STATUS.IDLE,
        pickup: null,
        drop: null,
        category: 'bike',
        driver: null,
        fare: null,
        distanceKm: null,
        eta: null,
        startedAt: null,
      });
    }, 3000);
  }, [state.status, state.rideId, supabase]);

  const resetBooking = useCallback(() => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    setState({
      rideId: null,
      status: RIDE_STATUS.IDLE,
      pickup: null,
      drop: null,
      category: 'bike',
      driver: null,
      fare: null,
      distanceKm: null,
      eta: null,
      startedAt: null,
    });
  }, []);

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  return {
    ...state,
    computedDistance,
    isLoading,
    error,
    setPickup,
    setDrop,
    setCategory,
    bookRide,
    cancelRide,
    resetBooking,
    isDemoMode: !supabase,
  };
}
