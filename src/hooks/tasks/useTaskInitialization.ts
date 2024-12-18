import { useState, useEffect } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { taskService } from '../../utils/tasks/services/taskService';
import { useAuthStore } from '../../store/authStore';
import { AppError } from '../../utils/error';

export function useTaskInitialization() {
  const { user } = useAuthStore();
  const { setTasks, setError } = useTaskStore();
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    let mounted = true;

    const initializeTasks = async () => {
      try {
        setIsLoading(true);
        const tasks = await taskService.getAllTasks();
        
        if (!mounted) return;
        
        setTasks(tasks);
        setError(null);
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize tasks:', error);
        if (!mounted) return;
        
        const message = error instanceof AppError 
          ? error.message 
          : 'Failed to load tasks';
        setError(message);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeTasks();

    return () => {
      mounted = false;
    };
  }, [user, setTasks, setError]);

  return {
    isLoading,
    initialized,
  };
}