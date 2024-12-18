import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile } from '../types/auth';
import { AppError } from '../utils/error';
import { authService } from '../utils/auth/authService';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      initialized: false,

      initialize: async () => {
        try {
          set({ loading: true, error: null });
          const user = await authService.getCurrentUser();
          set({ 
            user,
            loading: false,
            initialized: true,
            error: null
          });
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ 
            user: null,
            loading: false,
            initialized: true,
            error: error instanceof AppError ? error.message : 'Failed to initialize auth'
          });
        }
      },

      signIn: async (email, password) => {
        try {
          set({ loading: true, error: null });
          const user = await authService.signIn(email, password);
          set({ user, loading: false, error: null });
        } catch (error) {
          console.error('Sign in error:', error);
          set({ 
            loading: false,
            error: error instanceof AppError ? error.message : 'Failed to sign in'
          });
          throw error;
        }
      },

      signOut: async () => {
        try {
          await authService.signOut();
          set({ 
            user: null,
            loading: false,
            error: null
          });
        } catch (error) {
          console.error('Sign out error:', error);
          set({ 
            error: error instanceof AppError ? error.message : 'Failed to sign out',
            loading: false
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        initialized: state.initialized
      }),
    }
  )
);