import React, { useEffect } from 'react';
import { useTaskSubscription } from '../hooks/tasks/useTaskSubscription';
import { useTaskInitialization } from '../hooks/tasks/useTaskInitialization';
import { useTaskStore } from '../store/taskStore';
import { taskService } from '../utils/tasks/services/taskService';

interface TaskProviderProps {
  children: React.ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const { setTasks } = useTaskStore();
  useTaskSubscription();
  const { isLoading, initialized } = useTaskInitialization();

  // Refresh tasks periodically
  useEffect(() => {
    if (!initialized) return;

    const refreshTasks = async () => {
      try {
        const tasks = await taskService.getAllTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Failed to refresh tasks:', error);
      }
    };

    const interval = setInterval(refreshTasks, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [initialized, setTasks]);

  return <>{children}</>;
}