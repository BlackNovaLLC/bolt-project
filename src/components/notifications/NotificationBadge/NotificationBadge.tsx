import React from 'react';
import { Bell } from 'lucide-react';
import { useNotificationState } from '../../../utils/notifications/hooks/useNotificationState';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationBadgeProps {
  onClick: () => void;
}

export function NotificationBadge({ onClick }: NotificationBadgeProps) {
  const { unreadCount } = useNotificationState();

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-400 hover:text-[#ececf1] rounded-lg hover:bg-[#2a2b32] 
      transition-colors duration-200"
      aria-label={`${unreadCount} unread notifications`}
    >
      <Bell className="h-5 w-5" />
      <AnimatePresence>
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center 
            rounded-full bg-red-500 text-xs font-medium text-white"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}