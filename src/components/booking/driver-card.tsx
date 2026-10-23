'use client';

import React, { useState, useEffect } from 'react';
import type { DemoDriver } from '@/lib/demo-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, ShieldCheck, Phone, MessageSquare, AlertCircle, Clock, KeyRound, MapPin, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DriverCardProps {
  driver: DemoDriver;
  eta: string | null;
  status: string;
  otp?: string | null;
  onCall?: () => void;
  onChat?: () => void;
  onCancel?: () => void;
}

export function DriverCard({
  driver,
  eta,
  status,
  otp = '4821',
  onCall,
  onChat,
  onCancel,
}: DriverCardProps) {
  // Live seconds countdown when driver is arriving
  const initialSeconds = 180; // 3 mins default
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [distanceRemainingMeters, setDistanceRemainingMeters] = useState(650);

  useEffect(() => {
    if (status !== 'driver_arriving') return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });

      setDistanceRemainingMeters((prev) => {
        if (prev <= 20) return 0;
        return Math.max(0, prev - 4);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timeFormatted = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;

  return (
    <Card className="p-5 border-2 border-primary/20 bg-white dark:bg-slate-900 shadow-md space-y-4 rounded-2xl">
      {/* Live Arrival Countdown Header */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-primary/5 border border-emerald-200/80 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
              {status === 'driver_arriving' && 'Captain Arriving'}
              {status === 'driver_arrived' && 'Captain Arrived at Pickup!'}
              {status === 'in_progress' && 'Trip in Progress'}
            </span>
          </div>

          <p className="text-xs font-bold text-foreground">
            {status === 'driver_arriving' && (
              <span>
                Reaching in <span className="text-primary font-black">{timeFormatted}</span> ({distanceRemainingMeters}m away)
              </span>
            )}
            {status === 'driver_arrived' && 'Captain is waiting outside your pickup spot'}
            {status === 'in_progress' && 'Traveling safely towards destination'}
          </p>
        </div>

        {/* Start OTP PIN for Passenger Safety */}
        <div className="text-right bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-border shadow-sm">
          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
            <KeyRound className="w-3 h-3 text-primary" />
            <span>Start OTP</span>
          </div>
          <span className="text-base font-black tracking-widest text-primary font-mono">
            {otp || '5923'}
          </span>
        </div>
      </div>

      {/* Driver & Vehicle Details */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3.5">
          <Avatar className="w-12 h-12 border-2 border-primary/20">
            <AvatarFallback className="bg-primary text-white font-black text-sm">
              {driver.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-foreground">{driver.name}</h4>
              {driver.verified && (
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 font-medium">
              <span className="flex items-center gap-0.5 font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {driver.rating}
              </span>
              <span>•</span>
              <span>{driver.totalRides} trips</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-black text-foreground">{driver.vehicle}</p>
          <span className="inline-block text-[11px] font-mono font-bold bg-muted px-2 py-0.5 rounded-md mt-0.5">
            {driver.regNo}
          </span>
        </div>
      </div>

      {/* Action Buttons: Call & Chat */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onCall}
          className="gap-2 text-xs h-10 rounded-xl font-bold border-border"
        >
          <Phone className="w-3.5 h-3.5 text-primary" />
          Call Captain
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onChat}
          className="gap-2 text-xs h-10 rounded-xl font-bold border-border"
        >
          <MessageSquare className="w-3.5 h-3.5 text-primary" />
          Message
        </Button>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/80 pt-2.5 font-medium">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Share OTP with captain upon boarding
        </span>

        {status === 'driver_arriving' && onCancel && (
          <button
            onClick={onCancel}
            className="text-rose-600 hover:underline font-bold text-[11px]"
          >
            Cancel Ride
          </button>
        )}
      </div>
    </Card>
  );
}
