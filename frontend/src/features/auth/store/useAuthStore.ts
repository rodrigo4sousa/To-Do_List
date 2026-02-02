import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../models/User';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setLoading: (loading) =>
        set({
          loading,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);