```typescript
import { useEffect, useCallback } from 'react';

export function useNotificationToastLifecycle(
  onDismiss: () => void,
  duration: number
) {
  const handleDismiss = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(handleDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleDismiss]);

  return { handleDismiss };
}
```