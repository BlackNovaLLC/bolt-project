import { useEffect } from 'react';
import { useNotificationStore } from '../../../store/notificationStore';
import { useAuthStore } from '../../../store/authStore';
import { notificationService } from '../services/notificationService';

export function useNotificationSubscription() {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = notificationService.subscribeToNotifications(
      user.id,
      (notification) => {
        addNotification(notification);
        
        // Show browser notification if supported
        if (Notification.permission === 'granted') {
          new Notification('New Notification', {
            body: notification.content,
            icon: '/notification-icon.png'
          });
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user, addNotification]);

  // Request notification permission on mount
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);
}