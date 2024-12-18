import React from 'react';
import { X } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';
import { formatDate } from '../../utils/date/dateUtils';

interface NotificationListProps {
  onClose: () => void;
}

export function NotificationList({ onClose }: NotificationListProps) {
  const { notifications, markAllAsRead } = useNotificationStore();

  return (
    <div className="fixed top-16 right-4 w-96 max-w-[calc(100vw-2rem)] bg-[#40414f] rounded-lg shadow-xl border border-gray-700 z-[100]">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-[#ececf1]">Notifications</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={markAllAsRead}
            className="text-sm text-gray-400 hover:text-[#ececf1] transition-colors"
          >
            Mark all as read
          </button>
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
          <div className="divide-y divide-gray-700">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 ${
                  notification.read 
                    ? 'bg-[#2a2b32]' 
                    : 'bg-[#343541] hover:bg-[#2a2b32]'
                } transition-colors duration-200`}
              >
                <p className={`text-sm ${notification.read ? 'text-gray-400' : 'text-[#ececf1]'}`}>
                  {notification.content}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {formatDate(notification.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}