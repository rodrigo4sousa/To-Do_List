'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { getCurrentUser } from '../services/AuthService';

export function AuthListener({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    // Check if user is authenticated on mount
    const user = getCurrentUser();
    setUser(user);
    setLoading(false);
  }, [setUser, setLoading]);

  return <>{children}</>;
}
