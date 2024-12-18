import { create } from 'zustand';
import type { Task, TaskStatus, CreateTaskDTO } from '../types/task';
import { AppError } from '../utils/error';
import { taskService } from '../utils/tasks/services/taskService';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  updateTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>;
  createTask: (data: CreateTaskDTO) => Promise<void>;
  setTasks: (tasks: Task[]) => void;
  setError: (error: string | null) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  updateTaskStatus: async (taskId, status) => {
    if (!taskId) {
      throw new AppError('Task ID is required', 'task/invalid-id');
    }

    try {
      set({ isLoading: true, error: null });
      const updatedTask = await taskService.updateTaskStatus(taskId, status);
      
      set(state => ({
        tasks: state.tasks.map(task => 
          task.id === taskId ? updatedTask : task
        ),
        isLoading: false,
        error: null
      }));
    } catch (error) {
      console.error('Failed to update task status:', error);
      const message = error instanceof AppError ? error.message : 'Failed to update task status';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  createTask: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const newTask = await taskService.createTask(data);
      
      set(state => ({
        tasks: [newTask, ...state.tasks],
        isLoading: false,
        error: null
      }));
    } catch (error) {
      console.error('Failed to create task:', error);
      const message = error instanceof AppError ? error.message : 'Failed to create task';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  setTasks: (tasks) => set({ tasks, error: null }),
  setError: (error) => set({ error }),
}));