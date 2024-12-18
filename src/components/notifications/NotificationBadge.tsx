import React from 'react';
import { Bell } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';

interface NotificationBadgeProps {
  onClick: () => void;
}

export function NotificationBadge({ onClick }: NotificationBadgeProps) {
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-400 hover:text-[#ececf1] rounded-lg hover:bg-[#2a2b32] 
      transition-colors duration-200"
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center 
        rounded-full bg-[#10a37f] text-xs font-medium text-white">
          {unreadCount}
        </span>
      )}
    </button>
  );
}