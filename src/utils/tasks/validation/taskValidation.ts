import { z } from 'zod';
import { isAfter } from 'date-fns';
import type { CreateTaskDTO } from '../../../types/task';

const taskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters')
    .trim(),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .transform(val => val?.trim() || ''),
  assignee: z.string()
    .min(1, 'Assignee is required')
    .trim(),
  dueDate: z.string()
    .min(1, 'Due date is required')
    .refine(date => isAfter(new Date(date), new Date()), {
      message: 'Due date must be in the future'
    }),
  channel: z.string()
    .min(1, 'Channel is required'),
});

export function validateTaskData(data: Partial<CreateTaskDTO>) {
  try {
    return {
      success: true,
      data: taskSchema.parse(data),
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, err) => ({
        ...acc,
        [err.path[0]]: err.message,
      }), {});
      return { success: false, data: null, errors };
    }
    return {
      success: false,
      data: null,
      errors: { form: 'Invalid task data' },
    };
  }
}