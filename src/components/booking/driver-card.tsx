'use client';

import React from 'react';
import type { DemoDriver } from '@/lib/demo-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, ShieldCheck, Phone, MessageSquare, AlertCircle } from 'lucide-react';

interface DriverCardProps {
  driver: DemoDriver;
  eta: string | null;
  status: string;
  onCall?: () => void;
  onChat?: () => void;
  onCancel?: () => void;
}

export function DriverCard({
  driver,
  eta,
  status,
  onCall,
  onChat,
  onCancel,
}: DriverCardProps) {
  const getStatusText = () => {
    switch (status) {
      case 'driver_arriving':
        return `Arriving in ${eta || '4 mins'}`;
      case 'driver_arrived':
        return 'Driver has arrived at pickup!';
      case 'in_progress':
        return 'Trip in progress';
      case 'completed':
        return 'Trip completed';
      default:
        return 'Driver assigned';
    }
  };

  return (
    <Card className="p-4 border-primary/20 bg-card shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {getStatusText()}
          </span>
        </div>
        <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-mono">
          {driver.regNo}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {driver.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-semibold text-sm text-foreground">{driver.name}</h4>
              {driver.verified && (
                <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
              <span className="flex items-center gap-0.5 font-medium text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {driver.rating}
              </span>
              <span>•</span>
              <span>{driver.totalRides} rides</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs font-semibold text-foreground">{driver.vehicle}</p>
          <p className="text-[11px] text-muted-foreground capitalize">{driver.category}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onCall}
          className="gap-2 text-xs h-9"
        >
          <Phone className="w-3.5 h-3.5 text-primary" />
          Call Driver
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onChat}
          className="gap-2 text-xs h-9"
        >
          <MessageSquare className="w-3.5 h-3.5 text-primary" />
          Chat
        </Button>
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t pt-2">
        <span className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-amber-500" />
          OTP is verified automatically
        </span>
        {status === 'driver_arriving' && onCancel && (
          <button
            onClick={onCancel}
            className="text-destructive hover:underline font-medium text-[11px]"
          >
            Cancel ride
          </button>
        )}
      </div>
    </Card>
  );
}
