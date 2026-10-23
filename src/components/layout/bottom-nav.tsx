'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, Shield, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/rides', label: 'Rides', icon: Clock },
  { href: '/safety', label: 'Safety', icon: Shield },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-border safe-bottom shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200 min-w-[60px]',
                isActive
                  ? 'text-wopido-plum'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={cn(
                'w-10 h-6 flex items-center justify-center rounded-full transition-all duration-200',
                isActive ? 'bg-wopido-plum/10' : ''
              )}>
                <Icon
                  className={cn(
                    'h-5 w-5 transition-all',
                    isActive ? 'stroke-[2.5px]' : 'stroke-[1.75px]'
                  )}
                />
              </div>
              <span className={cn(
                'text-[11px] font-medium leading-none transition-all',
                isActive ? 'font-semibold' : ''
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
