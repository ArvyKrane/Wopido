'use client';

import React, { useState } from 'react';
import Link from 'next/navigation';
import { DEMO_RIDES, type DemoRide } from '@/lib/demo-data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, ChevronRight, Star, AlertCircle, ArrowLeft } from 'lucide-react';
import NextLink from 'next/link';

export default function RidesHistoryPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'cancelled'>('all');

  const filteredRides = DEMO_RIDES.filter((r: DemoRide) => {
    if (filter === 'completed') return r.status === 'completed';
    if (filter === 'cancelled') return r.status === 'cancelled';
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-foreground">Your Rides</h1>
          <p className="text-xs text-muted-foreground">Past bookings, digital receipts and ratings</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <Clock className="w-3.5 h-3.5" />
          {DEMO_RIDES.length} total
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 p-1 bg-muted/60 rounded-xl border border-border/60">
        {(['all', 'completed', 'cancelled'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
              filter === t
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Rides List */}
      <div className="space-y-3">
        {filteredRides.map((ride: DemoRide) => (
          <NextLink key={ride.id} href={`/rides/${ride.id}`}>
            <Card className="p-4 border-border/70 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">
                  {new Date(ride.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <Badge
                  variant={ride.status === 'completed' ? 'default' : 'destructive'}
                  className={
                    ride.status === 'completed'
                      ? 'bg-emerald-600 hover:bg-emerald-600 text-[10px]'
                      : 'text-[10px]'
                  }
                >
                  {ride.status}
                </Badge>
              </div>

              {/* Route */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-semibold text-foreground line-clamp-1">{ride.pickupName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span className="font-semibold text-foreground line-clamp-1">{ride.dropName}</span>
                </div>
              </div>

              {/* Meta row */}
              <div className="flex items-center justify-between pt-2 border-t text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{ride.driverName}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-amber-600 font-medium">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {ride.driverRating}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground text-sm">₹{ride.fare.toFixed(2)}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </Card>
          </NextLink>
        ))}
      </div>
    </div>
  );
}
