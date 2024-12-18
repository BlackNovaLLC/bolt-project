import { useMemo } from 'react';
import type { Notification } from '../../../types/notification';

export function useNotificationGroups(notifications: Notification[]) {
  return useMemo(() => {
    const groupByDate = () => {
      const groups = notifications.reduce((acc, notification) => {
        const date = new Date(notification.createdAt).toDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(notification);
        return acc;
      }, {} as Record<string, Notification[]>);

      return Object.entries(groups).sort((a, b) => 
        new Date(b[0]).getTime() - new Date(a[0]).getTime()
      );
    };

    const groupByType = () => {
      const groups = notifications.reduce((acc, notification) => {
        if (!acc[notification.type]) {
          acc[notification.type] = [];
        }
        acc[notification.type].push(notification);
        return acc;
      }, {} as Record<Notification['type'], Notification[]>);

      return groups;
    };

    return {
      groupByDate,
      groupByType,
    };
  }, [notifications]);
}