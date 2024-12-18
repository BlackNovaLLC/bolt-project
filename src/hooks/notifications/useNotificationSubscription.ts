import { useEffect } from 'react';
import { useNotificationStore } from '../../store/notificationStore';
import { useAuthStore } from '../../store/authStore';

export function useNotificationSubscription() {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (!user) return;

    // Mock subscription for now
    console.log('Setting up notification subscription for user:', user.id);

    return () => {
      console.log('Cleaning up notification subscription');
    };
  }, [user, addNotification]);
}