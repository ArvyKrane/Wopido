'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageSquare, Phone, FileQuestion, ChevronRight } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    { q: 'How are women captains verified on Wopido?', a: 'Every driver submits government ID, Driving Licence, vehicle RC, police clearance verification, and completes an in-person onboarding session.' },
    { q: 'Can men book rides on Wopido?', a: 'Wopido is designed as a safe, dedicated women-only transit service for women riders driven by verified women drivers.' },
    { q: 'How is the fare calculated?', a: 'Fares start at ₹40 for the first 2 km, followed by transparent per-kilometer rates based on vehicle category (Bike, Auto, Cab) plus a 3% platform fee.' },
    { q: 'What happens if I cancel a ride?', a: 'Cancellations made while searching or within 2 minutes of acceptance carry zero cancellation fees.' },
  ];

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-black text-foreground">Help & Support</h1>
        <p className="text-xs text-muted-foreground">24/7 dedicated support for women riders</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 border-border/70 text-center space-y-2 hover:border-primary/40 transition-all cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-foreground">Chat Support</h4>
            <p className="text-[11px] text-muted-foreground mt-0.5">Average reply in 2m</p>
          </div>
        </Card>

        <Card className="p-4 border-border/70 text-center space-y-2 hover:border-primary/40 transition-all cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-foreground">Call Helpline</h4>
            <p className="text-[11px] text-muted-foreground mt-0.5">Toll-free 24/7</p>
          </div>
        </Card>
      </div>

      <Card className="p-5 border-border/70 bg-card space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <FileQuestion className="w-3.5 h-3.5 text-primary" />
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="p-3 rounded-xl border bg-muted/20 space-y-1">
              <h5 className="font-semibold text-xs text-foreground">{faq.q}</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
