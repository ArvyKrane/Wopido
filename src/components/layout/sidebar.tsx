'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, Shield, User, HelpCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { href: '/', label: 'Book a Ride', icon: Home, description: 'Find a ride now' },
  { href: '/rides', label: 'My Rides', icon: Clock, description: 'View ride history' },
  { href: '/safety', label: 'Safety Center', icon: Shield, description: 'SOS & emergency contacts' },
  { href: '/profile', label: 'My Profile', icon: User, description: 'Account & settings' },
  { href: '/help', label: 'Help & Support', icon: HelpCircle, description: 'Get assistance' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed left-0 top-0 bottom-0 z-50 w-72 bg-white border-r border-border shadow-xl flex flex-col transition-transform duration-300',
        'lg:relative lg:translate-x-0 lg:shadow-none lg:z-auto lg:flex',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="w-9 h-9 rounded-xl wopido-gradient flex items-center justify-center shadow-md">
              <span className="text-white font-black text-lg">W</span>
            </div>
            <span className="font-bold text-xl text-wopido-plum">Wopido</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group',
                  isActive
                    ? 'bg-[#4A1C6A]/10 text-[#4A1C6A]'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                  isActive ? 'bg-[#4A1C6A] text-white' : 'bg-muted group-hover:bg-border'
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-medium', isActive && 'font-semibold')}>{item.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                </div>
                {isActive && (
                  <div className="w-1.5 h-5 rounded-full bg-[#4A1C6A]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 p-3 bg-wopido-muted rounded-xl">
            <div className="w-8 h-8 rounded-full bg-[#E8637A]/20 flex items-center justify-center">
              <Shield className="h-4 w-4 text-[#E8637A]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">All drivers are women</p>
              <p className="text-[11px] text-muted-foreground">Verified & background checked</p>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Wopido v1.0.0 · Women-First Rides
          </p>
        </div>
      </aside>
    </>
  );
}
