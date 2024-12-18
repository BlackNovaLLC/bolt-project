import { supabase } from '../../../config/supabase';
import { AppError } from '../../error';
import type { Notification } from '../../../types/notification';

class NotificationService {
  async markAsRead(notificationId: string): Promise<void> {
    if (!notificationId) {
      throw new AppError('Notification ID is required', 'notification/invalid-id');
    }

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) {
        throw new AppError('Failed to mark notification as read', 'notification/update-error', error);
      }
    } catch (error) {
      console.error('Mark notification as read error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to mark notification as read', 'notification/update-error', error);
    }
  }

  async markAllAsRead(userId: string): Promise<void> {
    if (!userId) {
      throw new AppError('User ID is required', 'notification/invalid-user');
    }

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) {
        throw new AppError('Failed to mark all notifications as read', 'notification/update-error', error);
      }
    } catch (error) {
      console.error('Mark all notifications as read error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to mark all notifications as read', 'notification/update-error', error);
    }
  }

  async createNotification(data: {
    userId: string;
    type: Notification['type'];
    content: string;
    taskId?: string;
    channelId?: string;
  }): Promise<Notification> {
    try {
      const { data: notification, error } = await supabase
        .from('notifications')
        .insert({
          user_id: data.userId,
          type: data.type,
          content: data.content,
          task_id: data.taskId,
          channel_id: data.channelId,
          read: false,
        })
        .select()
        .single();

      if (error) {
        throw new AppError('Failed to create notification', 'notification/create-error', error);
      }

      return notification;
    } catch (error) {
      console.error('Create notification error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to create notification', 'notification/create-error', error);
    }
  }
}

export const notificationService = new NotificationService();