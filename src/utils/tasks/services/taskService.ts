```typescript
import { supabase } from '../../../config/supabase';
import { AppError } from '../../error';
import { taskMapper } from '../mappers/taskMapper';
import type { Task, TaskStatus, CreateTaskDTO } from '../../../types/task';

class TaskService {
  async getAllTasks(): Promise<Task[]> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new AppError('User not authenticated', 'auth/unauthorized', authError);
      }

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new AppError('Failed to fetch tasks', 'task/fetch-error', error);
      }

      return data
        .map(task => taskMapper.mapTaskFromDB(task))
        .filter(Boolean) as Task[];
    } catch (error) {
      console.error('Get all tasks error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to fetch tasks', 'task/fetch-error', error);
    }
  }

  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
    if (!taskId) {
      throw new AppError('Task ID is required', 'task/invalid-id');
    }

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new AppError('User not authenticated', 'auth/unauthorized', authError);
      }

      const { data: task, error } = await supabase
        .from('tasks')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', taskId)
        .select()
        .single();

      if (error) {
        throw new AppError('Failed to update task status', 'task/update-error', error);
      }

      const mappedTask = taskMapper.mapTaskFromDB(task);
      if (!mappedTask) {
        throw new AppError('Failed to map task data', 'task/mapping-error');
      }

      return mappedTask;
    } catch (error) {
      console.error('Update task status error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to update task status', 'task/update-error', error);
    }
  }

  async createTask(data: CreateTaskDTO): Promise<Task> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new AppError('User not authenticated', 'auth/unauthorized', authError);
      }

      const { data: task, error } = await supabase
        .from('tasks')
        .insert({
          title: data.title,
          description: data.description,
          assignee: data.assignee,
          created_by: user.user_metadata.username || user.email,
          due_date: data.dueDate,
          channel: data.channel,
          status: 'Not Started'
        })
        .select()
        .single();

      if (error) {
        throw new AppError('Failed to create task', 'task/create-error', error);
      }

      const mappedTask = taskMapper.mapTaskFromDB(task);
      if (!mappedTask) {
        throw new AppError('Failed to map task data', 'task/mapping-error');
      }

      return mappedTask;
    } catch (error) {
      console.error('Create task error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to create task', 'task/create-error', error);
    }
  }
}

export const taskService = new TaskService();
```