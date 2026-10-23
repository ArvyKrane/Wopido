'use client';

import Link from 'next/link';
import { Bell, Menu, LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { getInitials } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onMenuToggle?: () => void;
}

export function Navbar({ onMenuToggle }: NavbarProps) {
  const { user, signOut, isDemo } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifCount] = useState(2);

  const handleMenuToggle = () => {
    if (onMenuToggle) onMenuToggle();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6 max-w-screen-2xl mx-auto">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground hover:bg-muted"
            onClick={handleMenuToggle}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center shadow-sm">
              <span className="text-slate-950 font-black text-lg leading-none">W</span>
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight hidden sm:block">
              Wopido
            </span>
          </Link>
        </div>

        {/* Center: Nav Links (desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {[
            { href: '/', label: 'Book Ride' },
            { href: '/rides', label: 'My Rides' },
            { href: '/safety', label: 'Safety' },
            { href: '/help', label: 'Help' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Notifications + User */}
        <div className="flex items-center gap-2">
          {/* Demo badge */}
          {isDemo && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200">
              DEMO
            </span>
          )}

          {/* Notification Bell */}
          <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-muted" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            {notifCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-wopido-rose text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {notifCount}
              </span>
            )}
          </Button>

          {/* User Menu */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-muted transition-colors"
                aria-label="User menu"
                aria-expanded={menuOpen}
              >
                <Avatar className="h-8 w-8">
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                  <AvatarFallback className="text-xs">
                    {getInitials(user.name || 'U')}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium text-foreground max-w-[120px] truncate">
                  {user.name?.split(' ')[0]}
                </span>
                <ChevronDown className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform hidden md:block', menuOpen && 'rotate-180')} />
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-border z-40 overflow-hidden animate-fade-in">
                    <div className="p-3 border-b border-border bg-muted/30">
                      <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                        My Profile
                      </Link>
                      <button
                        onClick={() => { signOut(); setMenuOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-destructive hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {!user && (
            <Link href="/auth">
              <Button variant="wopido" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
