```typescript
import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';

interface NotificationToastProps {
  message: string;
  onDismiss: () => void;
  duration?: number;
}

export function NotificationToast({ message, onDismiss, duration = 5000 }: NotificationToastProps) {
  const handleDismiss = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(handleDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleDismiss]);

  return (
    <div className="bg-[#40414f] border border-gray-600 rounded-lg shadow-lg p-4 flex items-center justify-between">
      <p className="text-[#ececf1]">{message}</p>
      <button
        onClick={handleDismiss}
        className="ml-4 p-1 text-gray-400 hover:text-[#ececf1] transition-colors rounded-lg hover:bg-gray-700/50"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
```