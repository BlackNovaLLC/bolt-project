export type NotificationType = 'task_assigned' | 'task_updated' | 'mention';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  content: string;
  read: boolean;
  createdAt: string;
  taskId?: string;
  channelId?: string;
}