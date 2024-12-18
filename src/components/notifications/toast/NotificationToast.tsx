```typescript
import React from 'react';
import { NotificationToastContent } from './NotificationToastContent';
import { NotificationToastDismiss } from './NotificationToastDismiss';
import { useNotificationToastLifecycle } from '../../../hooks/notifications/useNotificationToastLifecycle';

interface NotificationToastProps {
  message: string;
  onDismiss: () => void;
  duration?: number;
}

export function NotificationToast({ message, onDismiss, duration = 5000 }: NotificationToastProps) {
  useNotificationToastLifecycle(onDismiss, duration);

  return (
    <div className="bg-[#40414f] border border-gray-600 rounded-lg shadow-lg p-4 flex items-center justify-between">
      <NotificationToastContent message={message} />
      <NotificationToastDismiss onDismiss={onDismiss} />
    </div>
  );
}
```