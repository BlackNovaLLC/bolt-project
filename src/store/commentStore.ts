import { create } from 'zustand';
import type { Comment, CreateCommentDTO } from '../types/comment';
import { useAuthStore } from './authStore';
import { useNotificationStore } from './notificationStore';

interface CommentState {
  comments: Record<string, Comment[]>;
  isLoading: boolean;
  error: string | null;
  createComment: (data: CreateCommentDTO) => Promise<void>;
  clearError: () => void;
}

export const useCommentStore = create<CommentState>((set, get) => ({
  comments: {},
  isLoading: false,
  error: null,

  createComment: async (data) => {
    const { user } = useAuthStore.getState();
    if (!user) throw new Error('Not authenticated');

    try {
      set({ isLoading: true, error: null });
      
      const comment: Comment = {
        id: crypto.randomUUID(),
        taskId: data.taskId,
        userId: user.id,
        content: data.content,
        createdAt: new Date().toISOString(),
        username: user.username,
        avatarUrl: user.avatarUrl,
      };

      // Add comment to store
      set(state => ({
        comments: {
          ...state.comments,
          [data.taskId]: [...(state.comments[data.taskId] || []), comment],
        },
        isLoading: false,
      }));

      // Create notification for task owner
      const { addNotification } = useNotificationStore.getState();
      addNotification({
        userId: 'task-owner-id', // Would come from task lookup
        type: 'comment',
        content: `@${user.username} commented on your task`,
        taskId: data.taskId,
      });

    } catch (error: any) {
      set({ 
        error: error.message || 'Failed to create comment',
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));