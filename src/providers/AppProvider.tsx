import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationProvider } from './NotificationProvider';
import { TaskProvider } from './TaskProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <Router>
      <NotificationProvider>
        <TaskProvider>
          {children}
        </TaskProvider>
      </NotificationProvider>
    </Router>
  );
}