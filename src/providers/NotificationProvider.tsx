import React from 'react';
import { useNotificationSubscription } from '../hooks/notifications/useNotificationSubscription';
import { NotificationContainer } from '../components/notifications/NotificationContainer';

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  useNotificationSubscription();

  return (
    <>
      {children}
      <NotificationContainer />
    </>
  );
}