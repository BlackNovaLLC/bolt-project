import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationState } from '../../../utils/notifications/hooks/useNotificationState';
import { formatDate } from '../../../utils/date/dateUtils';
import { Bell, MessageSquare, CheckCircle } from 'lucide-react';
import type { Notification } from '../../../types/notification';

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const navigate = useNavigate();
  const { handleMarkAsRead } = useNotificationState();

  const handleClick = () => {
    handleMarkAsRead(notification.id);
    
    // Navigate based on notification type
    if (notification.taskId) {
      navigate(`/tasks?taskId=${notification.taskId}`);
    } else if (notification.channelId) {
      navigate(`/${notification.channelId}`);
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'task_assigned':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'mention':
        return <Bell className="h-4 w-4 text-blue-400" />;
      case 'task_updated':
        return <MessageSquare className="h-4 w-4 text-yellow-400" />;
      default:
        return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 ${
        notification.read 
          ? 'bg-[#2a2b32]' 
          : 'bg-[#343541] hover:bg-[#2a2b32]'
      } transition-colors duration-200 cursor-pointer`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${notification.read ? 'text-gray-400' : 'text-[#ececf1]'}`}>
            {notification.content}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {formatDate(notification.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}