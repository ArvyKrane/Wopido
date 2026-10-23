'use client';

import { useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { DEMO_USER } from '@/lib/demo-data';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    if (!supabase) {
      // Demo mode: use seeded user
      setUser({
        id: DEMO_USER.id,
        name: DEMO_USER.name,
        email: DEMO_USER.email,
        phone: DEMO_USER.phone,
        avatar: null,
      });
      setIsLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name ?? 'User',
          email: session.user.email ?? '',
          phone: session.user.phone ?? '',
          avatar: session.user.user_metadata?.avatar_url ?? null,
        });
      }
      setIsLoading(false);
    });

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name ?? 'User',
          email: session.user.email ?? '',
          phone: session.user.phone ?? '',
          avatar: session.user.user_metadata?.avatar_url ?? null,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signOut = async () => {
    if (!supabase) {
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
  };

  const isDemo = !supabase;

  return { user, isLoading, signOut, isDemo };
}
