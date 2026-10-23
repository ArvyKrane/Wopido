'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, AlertTriangle, PhoneCall, Share2, HeartHandshake, Bell, Lock } from 'lucide-react';
import { DEMO_USER } from '@/lib/demo-data';

export default function SafetyPage() {
  const [sosActive, setSosActive] = useState(false);

  const handleTriggerSos = () => {
    setSosActive(true);
    alert('🚨 DEMO SOS TRIGGERED\nIn production, this automatically alerts emergency contacts, transmits GPS location, and initiates safety dispatch.\n(This is a simulated demonstration).');
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-black text-foreground">Safety Centre</h1>
        <p className="text-xs text-muted-foreground">
          Dedicated protections built exclusively for women riders
        </p>
      </div>

      {/* SOS Button Card */}
      <Card className="p-6 text-center border-rose-500/30 bg-rose-500/5 space-y-4 shadow-sm">
        <div className="space-y-1">
          <Badge variant="outline" className="border-rose-500/40 text-rose-600 text-[10px] font-bold">
            Simulated Emergency Service
          </Badge>
          <h2 className="text-base font-bold text-foreground">One-Tap Emergency SOS</h2>
          <p className="text-xs text-muted-foreground">
            Instantly shares live location with trusted contacts & safety response team.
          </p>
        </div>

        <button
          onClick={handleTriggerSos}
          className="w-28 h-28 mx-auto rounded-full bg-rose-600 hover:bg-rose-700 text-white font-black text-lg shadow-xl shadow-rose-600/30 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all"
        >
          <AlertTriangle className="w-8 h-8" />
          <span>SOS</span>
        </button>

        <p className="text-[11px] text-muted-foreground font-mono">
          [DEMO MODE: No real emergency services dispatched]
        </p>
      </Card>

      {/* Emergency Contacts */}
      <Card className="p-5 border-border/70 bg-card space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <PhoneCall className="w-3.5 h-3.5 text-primary" />
          Trusted Emergency Contacts
        </h3>

        <div className="space-y-2">
          {DEMO_USER.emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-3 rounded-xl border bg-muted/30 text-xs"
            >
              <div>
                <p className="font-semibold text-foreground">{contact.name} ({contact.relation})</p>
                <p className="text-muted-foreground text-[11px] font-mono">{contact.phone}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert(`Calling ${contact.name} (Demo)`)}
                className="h-7 text-[11px] gap-1"
              >
                <PhoneCall className="w-3 h-3 text-emerald-600" />
                Call
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Share Trip Feature */}
      <Card className="p-5 border-border/70 bg-card space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Share2 className="w-3.5 h-3.5 text-primary" />
          Live Ride Sharing
        </h3>
        <p className="text-xs text-muted-foreground">
          Generate an encrypted tracking link to share with family or friends via WhatsApp or SMS.
        </p>
        <Button
          variant="outline"
          onClick={() => alert('Trip link copied: https://wopido.in/track/demo-ride-live (Simulated)')}
          className="w-full text-xs font-semibold gap-2 border-primary/30 text-primary"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share Live Trip Link (Demo)
        </Button>
      </Card>

      {/* Safety Helplines in Pune */}
      <Card className="p-5 border-border/70 bg-card space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-primary" />
          Pune Women Safety Helplines
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg border bg-muted/20">
            <p className="font-bold text-foreground">Pune Police (Women)</p>
            <p className="text-primary font-mono font-bold mt-0.5">1091</p>
          </div>
          <div className="p-2.5 rounded-lg border bg-muted/20">
            <p className="font-bold text-foreground">National Helpline</p>
            <p className="text-primary font-mono font-bold mt-0.5">112</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
