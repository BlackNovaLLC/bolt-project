import { useCallback } from 'react';
import { useTaskStore } from '../../store/taskStore';
import type { Task } from '../../types/task';

export function useTaskState() {
  const { tasks, isLoading, error, setTasks, setError } = useTaskStore();

  const updateTaskInState = useCallback((updatedTask: Task) => {
    setTasks(
      Array.isArray(tasks) 
        ? tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
        : [updatedTask]
    );
  }, [tasks, setTasks]);

  const removeTaskFromState = useCallback((taskId: string) => {
    setTasks(
      Array.isArray(tasks) 
        ? tasks.filter(task => task.id !== taskId)
        : []
    );
  }, [tasks, setTasks]);

  const addTaskToState = useCallback((newTask: Task) => {
    setTasks([newTask, ...(Array.isArray(tasks) ? tasks : [])]);
  }, [tasks, setTasks]);

  return {
    tasks: Array.isArray(tasks) ? tasks : [],
    isLoading,
    error,
    updateTaskInState,
    removeTaskFromState,
    addTaskToState,
    setError,
  };
}