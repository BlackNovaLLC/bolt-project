import React from 'react';
import { AppProvider } from './providers/AppProvider';
import { AppRoutes } from './routes/AppRoutes';
import { NotificationContainer } from './components/notifications/NotificationContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppRoutes />
        <NotificationContainer />
      </AppProvider>
    </ErrorBoundary>
  );
}