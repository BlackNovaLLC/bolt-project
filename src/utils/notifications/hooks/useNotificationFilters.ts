import { useMemo } from 'react';
import type { Notification } from '../../../types/notification';

export function useNotificationFilters(notifications: Notification[]) {
  return useMemo(() => {
    const filterByType = (type: Notification['type']) => 
      notifications.filter(n => n.type === type);

    const filterByRead = (read: boolean) => 
      notifications.filter(n => n.read === read);

    const filterByChannel = (channelId: string) =>
      notifications.filter(n => n.channelId === channelId);

    const filterByTask = (taskId: string) =>
      notifications.filter(n => n.taskId === taskId);

    return {
      filterByType,
      filterByRead,
      filterByChannel,
      filterByTask,
    };
  }, [notifications]);
}