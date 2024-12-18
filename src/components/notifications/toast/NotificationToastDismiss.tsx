```typescript
import React from 'react';
import { X } from 'lucide-react';

interface NotificationToastDismissProps {
  onDismiss: () => void;
}

export function NotificationToastDismiss({ onDismiss }: NotificationToastDismissProps) {
  return (
    <button
      onClick={onDismiss}
      className="p-1 text-gray-400 hover:text-[#ececf1] transition-colors rounded-lg hover:bg-gray-700/50"
      aria-label="Dismiss notification"
    >
      <X className="h-4 w-4" />
    </button>
  );
}
```