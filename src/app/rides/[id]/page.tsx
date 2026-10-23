'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DEMO_RIDES, type DemoRide } from '@/lib/demo-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Star, Download, ShieldCheck, MapPin } from 'lucide-react';
import NextLink from 'next/link';

export default function SingleRidePage() {
  const params = useParams();
  const router = useRouter();
  const rideId = params?.id as string;

  const ride = DEMO_RIDES.find((r: DemoRide) => r.id === rideId) || DEMO_RIDES[0];

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <NextLink href="/rides">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </NextLink>
        <div>
          <h1 className="text-lg font-bold text-foreground">Ride Receipt</h1>
          <p className="text-[11px] font-mono text-muted-foreground">{ride.id}</p>
        </div>
      </div>

      <Card className="p-6 border-border/70 bg-card shadow-md space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">Total Fare Paid</span>
            <p className="text-2xl font-black text-primary">₹{ride.fare.toFixed(2)}</p>
          </div>
          <Badge
            variant={ride.status === 'completed' ? 'default' : 'destructive'}
            className={ride.status === 'completed' ? 'bg-emerald-600' : ''}
          >
            {ride.status}
          </Badge>
        </div>

        <Separator />

        {/* Route Details */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trip Route</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{ride.pickupName}</p>
                <p className="text-muted-foreground text-[11px]">{ride.pickupAddress}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{ride.dropName}</p>
                <p className="text-muted-foreground text-[11px]">{ride.dropAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Driver Details */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Captain Details</h4>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{ride.driverName}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span className="flex items-center gap-1 font-semibold text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {ride.driverRating}
            </span>
          </div>
        </div>

        <Separator />

        {/* Fare Breakdown */}
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Distance</span>
            <span className="font-medium text-foreground">{ride.distanceKm} km</span>
          </div>
          <div className="flex justify-between">
            <span>Duration</span>
            <span className="font-medium text-foreground">{ride.duration || 15} mins</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method</span>
            <span className="font-medium text-foreground uppercase">{ride.paymentMethod || 'UPI (Direct)'}</span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => alert('Receipt downloaded (Demo Simulation)')}
          className="w-full text-xs font-semibold gap-2 border-dashed"
        >
          <Download className="w-3.5 h-3.5" />
          Download PDF Receipt
        </Button>
      </Card>
    </div>
  );
}
