import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useCommentStore } from '../../../store/commentStore';
import { useAuthStore } from '../../../store/authStore';
import { useTaskStore } from '../../../store/taskStore';
import { notificationService } from '../../../utils/notifications/services/notificationService';
import { formatDate } from '../../../utils/date/dateUtils';

interface TaskCommentsProps {
  taskId: string;
}

export function TaskComments({ taskId }: TaskCommentsProps) {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthStore();
  const { comments, createComment, error } = useCommentStore();
  const { tasks } = useTaskStore();
  const taskComments = comments[taskId] || [];

  const task = tasks.find(t => t.id === taskId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !task) return;

    try {
      await createComment({
        taskId,
        content: newComment.trim(),
      });

      // Notify task creator if commenter is not the creator
      if (user.username !== task.createdBy) {
        await notificationService.createTaskCommentNotification({
          taskId,
          commenterId: user.id,
          commenterUsername: user.username,
          recipientId: task.createdBy,
          taskTitle: task.title,
        });
      }

      // Notify assignee if commenter is not the assignee
      if (user.username !== task.assignee) {
        await notificationService.createTaskCommentNotification({
          taskId,
          commenterId: user.id,
          commenterUsername: user.username,
          recipientId: task.assignee,
          taskTitle: task.title,
        });
      }

      setNewComment('');
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  // ... rest of the component remains the same
}