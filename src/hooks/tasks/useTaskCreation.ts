import { useState, useCallback } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { useAuthStore } from '../../store/authStore';
import type { CreateTaskDTO } from '../../types/task';
import { AppError } from '../../utils/error';

export function useTaskCreation() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createTask } = useTaskStore();
  const { user } = useAuthStore();

  const handleCreateTask = useCallback(async (data: CreateTaskDTO) => {
    if (!user) {
      setError('You must be logged in to create tasks');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const createdTask = await createTask({
        ...data,
        title: data.title.trim(),
        description: data.description?.trim() || '',
        assignee: data.assignee.trim(),
      });

      console.log('Task created successfully:', createdTask);
      return createdTask;
    } catch (error) {
      console.error('Task creation error:', error);
      const errorMessage = error instanceof AppError 
        ? error.message 
        : 'Failed to create task';
      setError(errorMessage);
      throw error;
    } finally {
      setIsCreating(false);
    }
  }, [user, createTask]);

  return {
    isCreating,
    error,
    createTask: handleCreateTask,
    clearError: () => setError(null),
  };
}