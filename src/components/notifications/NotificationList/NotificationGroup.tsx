import React from 'react';
import { NotificationItem } from './NotificationItem';
import type { Notification } from '../../../types/notification';

interface NotificationGroupProps {
  title: string;
  notifications: Notification[];
  className?: string;
}

export function NotificationGroup({ title, notifications, className = '' }: NotificationGroupProps) {
  if (notifications.length === 0) return null;

  return (
    <div className={className}>
      <div className="px-4 py-2 text-xs font-medium text-gray-400 bg-[#2a2b32]">
        {title}
      </div>
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}