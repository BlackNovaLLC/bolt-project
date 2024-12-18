import { useEffect } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { useAuthStore } from '../../store/authStore';
import { taskSubscriptionService } from '../../utils/tasks/services/taskSubscriptionService';

export function useTaskSubscription() {
  const { user } = useAuthStore();
  const { setTasks } = useTaskStore();

  useEffect(() => {
    if (!user) return;

    // Subscribe to task updates
    const unsubscribe = taskSubscriptionService.subscribeToTasks((task) => {
      setTasks((prevTasks) => {
        const taskIndex = prevTasks.findIndex((t) => t.id === task.id);
        if (taskIndex === -1) {
          return [...prevTasks, task];
        }
        const newTasks = [...prevTasks];
        newTasks[taskIndex] = task;
        return newTasks;
      });
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [user, setTasks]);
}