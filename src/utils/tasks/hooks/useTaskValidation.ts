import { useMemo } from 'react';
import { z } from 'zod';
import type { Task } from '../../../types/task';

export function useTaskValidation() {
  const taskSchema = useMemo(() => z.object({
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().max(500).optional(),
    assignee: z.string().min(1, 'Assignee is required'),
    dueDate: z.string().min(1, 'Due date is required'),
    channel: z.string().min(1, 'Channel is required'),
  }), []);

  const validateTask = (data: Partial<Task>) => {
    try {
      taskSchema.parse(data);
      return { isValid: true, errors: null };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, err) => ({
          ...acc,
          [err.path[0]]: err.message,
        }), {});
        return { isValid: false, errors };
      }
      return { isValid: false, errors: { form: 'Invalid task data' } };
    }
  };

  return { validateTask };
}