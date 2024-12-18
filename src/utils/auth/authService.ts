import { supabase } from '../../config/supabase';
import { AppError } from '../error';
import type { UserProfile, UserRole } from '../../types/auth';

class AuthService {
  async getCurrentUser(): Promise<UserProfile | null> {
    try {
      const { data: { user }, error: sessionError } = await supabase.auth.getUser();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new AppError('Failed to get session', 'auth/session-error', sessionError);
      }
      
      if (!user) return null;

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        // If profile not found, try to create it
        if (profileError.code === 'PGRST116') {
          return this.createProfile(user);
        }
        throw new AppError('Failed to get user profile', 'auth/profile-error', profileError);
      }

      return {
        id: profile.id,
        username: profile.username,
        email: profile.email,
        role: profile.role as UserRole,
        avatarUrl: profile.avatar_url,
        created_at: profile.created_at,
      };
    } catch (error) {
      console.error('Get current user error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to get current user', 'auth/unknown-error', error);
    }
  }

  private async createProfile(user: any): Promise<UserProfile> {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email.toLowerCase(),
          username: user.user_metadata?.username?.toLowerCase() || user.email.split('@')[0].toLowerCase(),
          role: user.user_metadata?.role || 'User',
        })
        .select()
        .single();

      if (error) {
        throw new AppError('Failed to create profile', 'auth/profile-creation-error', error);
      }

      return {
        id: profile.id,
        username: profile.username,
        email: profile.email,
        role: profile.role as UserRole,
        avatarUrl: profile.avatar_url,
        created_at: profile.created_at,
      };
    } catch (error) {
      console.error('Create profile error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to create profile', 'auth/profile-creation-error', error);
    }
  }

  async signIn(email: string, password: string): Promise<UserProfile> {
    try {
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (signInError) {
        throw new AppError('Invalid email or password', 'auth/invalid-credentials', signInError);
      }

      if (!authData.user) {
        throw new AppError('No user data returned', 'auth/no-user-data');
      }

      return this.getCurrentUser() as Promise<UserProfile>;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to sign in', 'auth/unknown-error', error);
    }
  }

  async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new AppError('Failed to sign out', 'auth/sign-out-error', error);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to sign out', 'auth/unknown-error', error);
    }
  }
}

export const authService = new AuthService();