import { useCallback } from 'react';
import { useNotificationStore } from '../../../store/notificationStore';
import { useAuthStore } from '../../../store/authStore';
import type { Notification } from '../../../types/notification';

export function useNotificationActions() {
  const { addNotification } = useNotificationStore();
  const { user } = useAuthStore();

  const createTaskNotification = useCallback(async (
    assigneeId: string,
    taskTitle: string,
    taskId: string,
    channelId: string
  ) => {
    if (!user) return;

    try {
      await addNotification({
        userId: assigneeId,
        type: 'task_assigned',
        content: `@${user.username} assigned you a task: ${taskTitle}`,
        taskId,
        channelId,
      });
    } catch (error) {
      console.error('Failed to create task notification:', error);
    }
  }, [user, addNotification]);

  const createMentionNotification = useCallback(async (
    mentionedUserId: string,
    channelId: string
  ) => {
    if (!user) return;

    try {
      await addNotification({
        userId: mentionedUserId,
        type: 'mention',
        content: `@${user.username} mentioned you in ${channelId} chat`,
        channelId,
      });
    } catch (error) {
      console.error('Failed to create mention notification:', error);
    }
  }, [user, addNotification]);

  return {
    createTaskNotification,
    createMentionNotification,
  };
}