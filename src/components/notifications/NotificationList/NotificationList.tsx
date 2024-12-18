import React from 'react';
import { X } from 'lucide-react';
import { useNotificationState } from '../../../utils/notifications/hooks/useNotificationState';
import { useNotificationFilters } from '../../../utils/notifications/hooks/useNotificationFilters';
import { useAuthStore } from '../../../store/authStore';
import { NotificationGroup } from './NotificationGroup';

interface NotificationListProps {
  onClose: () => void;
}

export function NotificationList({ onClose }: NotificationListProps) {
  const { user } = useAuthStore();
  const { notifications, handleMarkAllAsRead } = useNotificationState();
  const { filterByRead } = useNotificationFilters(notifications);

  const unreadNotifications = filterByRead(false);
  const readNotifications = filterByRead(true);

  const handleMarkAllRead = () => {
    if (user) {
      handleMarkAllAsRead(user.id);
    }
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-[#40414f] rounded-lg shadow-xl border border-gray-700">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-[#ececf1]">Notifications</h3>
        <div className="flex items-center space-x-4">
          {unreadNotifications.length > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-sm text-gray-400 hover:text-[#ececf1] transition-colors"
            >
              Mark all as read
            </button>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#ececf1] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            No notifications
          </div>
        ) : (
          <>
            <NotificationGroup
              title="New"
              notifications={unreadNotifications}
              className="border-b border-gray-700"
            />
            <NotificationGroup
              title="Earlier"
              notifications={readNotifications}
            />
          </>
        )}
      </div>
    </div>
  );
}