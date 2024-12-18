import { useState, useCallback, useRef } from 'react';
import { userService } from '../../utils/users/services/userService';
import type { UserProfile } from '../../types/auth';

export function useUserSearch() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchTimeoutRef = useRef<number>();

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = window.setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await userService.searchUsers(query);
        setUsers(results);
      } catch (error) {
        console.error('User search error:', error);
        setError(error instanceof Error ? error.message : 'Failed to search users');
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  const clearSearch = useCallback(() => {
    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
    }
    setUsers([]);
    setError(null);
  }, []);

  return {
    users,
    isLoading,
    error,
    searchUsers,
    clearSearch,
  };
}