import { useEffect } from 'react';
import { useNotificationStore } from '../../../store/notificationStore';
import { useAuthStore } from '../../../store/authStore';
import { notificationService } from '../services/notificationService';

export function useNotificationEffects() {
  const { user } = useAuthStore();
  const { addNotification, setInitialized } = useNotificationStore();

  // Initialize notifications
  useEffect(() => {
    if (!user) return;

    const initializeNotifications = async () => {
      try {
        const notifications = await notificationService.getUserNotifications(user.id);
        notifications.forEach(addNotification);
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize notifications:', error);
      }
    };

    initializeNotifications();
  }, [user, addNotification, setInitialized]);

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;

    const unsubscribe = notificationService.subscribeToNotifications(
      user.id,
      (notification) => {
        addNotification(notification);
        notificationService.showBrowserNotification(notification.content);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user, addNotification]);

  // Request notification permission
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);
}