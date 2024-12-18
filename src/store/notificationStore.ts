import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Notification } from '../types/notification';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  addNotification: (notification: Notification) => void;
  dismissNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearError: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      unreadCount: 0,
      isLoading: false,
      error: null,

      addNotification: (notification) => 
        set(state => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + (notification.read ? 0 : 1),
        })),

      dismissNotification: (id) => 
        set(state => {
          const notification = state.notifications.find(n => n.id === id);
          if (!notification) return state;
          
          return {
            notifications: state.notifications.filter(n => n.id !== id),
            unreadCount: notification.read ? state.unreadCount : Math.max(0, state.unreadCount - 1),
          };
        }),

      markAsRead: (id) => 
        set(state => ({
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        })),

      markAllAsRead: () => 
        set({
          notifications: state.notifications.map(n => ({ ...n, read: true })),
          unreadCount: 0,
        }),

      clearError: () => set({ error: null }),
    }),
    {
      name: 'notification-storage',
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
      }),
    }
  )
);