import { useState } from 'react';
import { useTaskStore } from '../../../store/taskStore';
import type { Task } from '../../../types/task';

export function useTaskActions() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { updateTask, deleteTask } = useTaskStore();

  const handleStatusChange = async (taskId: string, status: Task['status']) => {
    setIsProcessing(true);
    try {
      await updateTask(taskId, { status });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    setIsProcessing(true);
    try {
      await deleteTask(taskId);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    handleStatusChange,
    handleDelete,
  };
}