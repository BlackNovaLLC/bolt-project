```typescript
import React from 'react';

interface NotificationToastContentProps {
  message: string;
}

export function NotificationToastContent({ message }: NotificationToastContentProps) {
  return (
    <p className="text-[#ececf1] flex-1 mr-4">{message}</p>
  );
}
```