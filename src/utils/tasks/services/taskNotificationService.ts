import { supabase } from '../../../config/supabase';
import { AppError } from '../../error';
import type { Task } from '../../../types/task';

class TaskNotificationService {
  async notifyTaskAssignment(task: Task): Promise<void> {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: task.assignee,
          type: 'task_assigned',
          content: `You have been assigned to task: ${task.title}`,
          task_id: task.id,
          channel_id: task.channel,
          read: false,
        });

      if (error) {
        throw new AppError(
          'Failed to create assignment notification',
          'notification/create-error',
          error
        );
      }
    } catch (error) {
      console.error('Task notification error:', error);
      // Don't throw here to prevent task creation from failing
      // Just log the error since notifications are not critical
    }
  }

  async notifyStatusChange(task: Task): Promise<void> {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: task.createdBy,
          type: 'task_updated',
          content: `Task "${task.title}" status changed to ${task.status}`,
          task_id: task.id,
          channel_id: task.channel,
          read: false,
        });

      if (error) {
        throw new AppError(
          'Failed to create status notification',
          'notification/create-error',
          error
        );
      }
    } catch (error) {
      console.error('Status notification error:', error);
      // Don't throw here to prevent task update from failing
    }
  }
}

export const taskNotificationService = new TaskNotificationService();