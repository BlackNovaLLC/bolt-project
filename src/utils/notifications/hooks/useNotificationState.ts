import { useCallback } from 'react';
import { useNotificationStore } from '../../../store/notificationStore';
import type { Notification } from '../../../types/notification';

export function useNotificationState() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();

  const handleMarkAsRead = useCallback(async (notificationId: string) => {
    try {
      await markAsRead(notificationId);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }, [markAsRead]);

  const handleMarkAllAsRead = useCallback(async (userId: string) => {
    try {
      await markAllAsRead(userId);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  }, [markAllAsRead]);

  const getUnreadNotifications = useCallback(() => {
    return notifications.filter(n => !n.read);
  }, [notifications]);

  const getNotificationsByType = useCallback((type: Notification['type']) => {
    return notifications.filter(n => n.type === type);
  }, [notifications]);

  return {
    notifications,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllAsRead,
    getUnreadNotifications,
    getNotificationsByType,
  };
}