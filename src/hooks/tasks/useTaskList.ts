import { useEffect } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { taskService } from '../../utils/tasks/services/taskService';

export function useTaskList() {
  const { tasks, isLoading, error, setTasks, setError } = useTaskStore();

  useEffect(() => {
    let mounted = true;

    const loadTasks = async () => {
      try {
        const { data: tasks, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });

        if (!mounted) return;

        if (error) {
          setError(error.message);
          return;
        }

        setTasks(tasks.map(taskService.mapTaskFromDB));
      } catch (error) {
        if (!mounted) return;
        setError(error instanceof Error ? error.message : 'Failed to load tasks');
      }
    };

    loadTasks();

    return () => {
      mounted = false;
    };
  }, [setTasks, setError]);

  return {
    tasks,
    isLoading,
    error,
  };
}