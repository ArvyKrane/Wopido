'use client';

import React, { useState } from 'react';
import { DEMO_USER } from '@/lib/demo-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, MapPin, Phone, Mail, Home, Briefcase, Plus, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState(DEMO_USER.name);
  const [email, setEmail] = useState(DEMO_USER.email);
  const [phone, setPhone] = useState(DEMO_USER.phone);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16 border-2 border-primary/20 shadow-md">
          <AvatarFallback className="bg-primary text-white text-xl font-bold">
            {name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-bold text-foreground">{name}</h1>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xs text-muted-foreground">{phone}</p>
          <span className="inline-block mt-1 text-[10px] bg-emerald-500/10 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
            Verified Rider
          </span>
        </div>
      </div>

      {/* Edit Profile */}
      <Card className="p-5 border-border/70 bg-card space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
          Personal Information
        </h3>

        <form onSubmit={handleSave} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="prof-name" className="text-xs font-semibold">Name</Label>
            <Input
              id="prof-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="prof-email" className="text-xs font-semibold">Email</Label>
            <Input
              id="prof-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="prof-phone" className="text-xs font-semibold">Phone</Label>
            <Input
              id="prof-phone"
              value={phone}
              disabled
              className="h-9 text-xs bg-muted"
            />
          </div>

          <Button
            type="submit"
            size="sm"
            className="w-full bg-primary hover:bg-primary/95 text-xs font-semibold"
          >
            {saved ? 'Changes Saved!' : 'Update Profile'}
          </Button>
        </form>
      </Card>

      {/* Saved Places */}
      <Card className="p-5 border-border/70 bg-card space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
            Saved Places
          </h3>
          <Button variant="ghost" size="sm" className="h-7 text-xs text-primary gap-1">
            <Plus className="w-3 h-3" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2.5 rounded-xl border bg-muted/30">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Home className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">Home</p>
              <p className="text-[11px] text-muted-foreground truncate">{DEMO_USER.savedLocations.home.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl border bg-muted/30">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">Work</p>
              <p className="text-[11px] text-muted-foreground truncate">{DEMO_USER.savedLocations.work.address}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Log out */}
      <Button
        variant="outline"
        onClick={() => router.push('/auth')}
        className="w-full text-xs text-destructive hover:bg-destructive/10 border-destructive/30 gap-2"
      >
        <LogOut className="w-3.5 h-3.5" />
        Sign Out
      </Button>
    </div>
  );
}
