import { supabase } from '../../../config/supabase';
import { AppError } from '../../error';
import type { UserProfile } from '../../../types/auth';

class UserService {
  async searchUsers(query: string): Promise<UserProfile[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`username.ilike.%${query}%,email.ilike.%${query}%`)
        .limit(10);

      if (error) {
        throw new AppError('Failed to search users', 'user/search-error', error);
      }

      return data;
    } catch (error) {
      console.error('User search error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to search users', 'user/search-error', error);
    }
  }

  async getUserByUsername(username: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw new AppError('Failed to get user', 'user/get-error', error);
      }

      return data;
    } catch (error) {
      console.error('Get user error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to get user', 'user/get-error', error);
    }
  }
}

export const userService = new UserService();