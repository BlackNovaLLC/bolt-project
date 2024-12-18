import { useState, useCallback } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { useAuthStore } from '../../store/authStore';
import { useTaskValidation } from './useTaskValidation';
import type { Task, CreateTaskDTO } from '../../types/task';
import { AppError } from '../../utils/error';

export function useTaskOperations() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createTask, updateTask, deleteTask } = useTaskStore();
  const { user } = useAuthStore();
  const { validateTask } = useTaskValidation();

  const handleCreateTask = useCallback(async (data: CreateTaskDTO) => {
    if (!user) {
      setError('You must be logged in to create tasks');
      return;
    }

    const validation = validateTask(data);
    if (!validation.isValid) {
      setError(Object.values(validation.errors || {})[0] as string);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const task = await createTask({
        ...data,
        title: data.title.trim(),
        description: data.description?.trim() || '',
        assignee: data.assignee.trim(),
      });
      return task;
    } catch (error) {
      const message = error instanceof AppError ? error.message : 'Failed to create task';
      setError(message);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [user, createTask, validateTask]);

  const handleUpdateTask = useCallback(async (id: string, data: Partial<Task>) => {
    if (!user) {
      setError('You must be logged in to update tasks');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      await updateTask(id, data);
    } catch (error) {
      const message = error instanceof AppError ? error.message : 'Failed to update task';
      setError(message);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [user, updateTask]);

  const handleDeleteTask = useCallback(async (id: string) => {
    if (!user) {
      setError('You must be logged in to delete tasks');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      await deleteTask(id);
    } catch (error) {
      const message = error instanceof AppError ? error.message : 'Failed to delete task';
      setError(message);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [user, deleteTask]);

  return {
    isProcessing,
    error,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    clearError: () => setError(null),
  };
}