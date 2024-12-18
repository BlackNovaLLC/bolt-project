import { useState, useCallback } from 'react';
import { useTaskStore } from '../../store/taskStore';
import type { TaskStatus } from '../../types/task';

const statusOrder: TaskStatus[] = ['Not Started', 'In Progress', 'Completed'];

export function useTaskStatusUpdate(taskId: string) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateTaskStatus } = useTaskStore();

  const handleStatusChange = useCallback(async (currentStatus: TaskStatus) => {
    if (!taskId || isUpdating) return;

    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex === -1) return;

    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    
    setIsUpdating(true);
    try {
      await updateTaskStatus(taskId, nextStatus);
    } catch (error) {
      console.error('Failed to update task status:', error);
    } finally {
      setIsUpdating(false);
    }
  }, [taskId, updateTaskStatus, isUpdating]);

  return {
    handleStatusChange,
    isUpdating,
  };
}