'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import type { RideStatus } from '@/lib/constants';

interface BookingStatusProps {
  status: RideStatus;
  rideId: string | null;
  onCancel: () => void;
  onNewBooking: () => void;
}

export function BookingStatus({
  status,
  rideId,
  onCancel,
  onNewBooking,
}: BookingStatusProps) {
  if (status === 'searching') {
    return (
      <Card className="p-6 text-center border-primary/30 bg-primary/5 space-y-4">
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-base text-foreground">Finding your Wopido Captain</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Notifying nearby women drivers in Pune...
          </p>
          {rideId && (
            <p className="text-[11px] font-mono text-muted-foreground mt-2">
              Ride ID: {rideId.slice(0, 8)}
            </p>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="text-xs text-destructive hover:bg-destructive/10 border-destructive/30"
        >
          Cancel Request
        </Button>
      </Card>
    );
  }

  if (status === 'completed') {
    return (
      <Card className="p-6 text-center border-emerald-500/30 bg-emerald-500/5 space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <h3 className="font-bold text-base text-foreground">Trip Completed Safely!</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Thank you for riding with Wopido. Women driving women safely.
          </p>
        </div>

        <Button
          onClick={onNewBooking}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-xs"
        >
          Book Another Ride
        </Button>
      </Card>
    );
  }

  if (status === 'cancelled') {
    return (
      <Card className="p-6 text-center border-destructive/30 bg-destructive/5 space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-destructive text-white flex items-center justify-center shadow-lg">
          <XCircle className="w-8 h-8" />
        </div>

        <div>
          <h3 className="font-bold text-base text-foreground">Ride Cancelled</h3>
          <p className="text-xs text-muted-foreground mt-1">
            This booking was cancelled. No charges apply.
          </p>
        </div>

        <Button
          onClick={onNewBooking}
          variant="outline"
          className="w-full text-xs font-semibold"
        >
          Book a New Ride
        </Button>
      </Card>
    );
  }

  return null;
}
