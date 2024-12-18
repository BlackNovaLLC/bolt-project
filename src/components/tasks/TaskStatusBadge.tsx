import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { TaskStatus } from '../../types/task';
import { useTaskStore } from '../../store/taskStore';

interface TaskStatusBadgeProps {
  taskId: string;
  status: TaskStatus;
  disabled?: boolean;
}

const statusConfig = {
  'Not Started': {
    icon: AlertCircle,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  'In Progress': {
    icon: Clock,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  'Completed': {
    icon: CheckCircle,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
} as const;

const statusOrder: TaskStatus[] = ['Not Started', 'In Progress', 'Completed'];

export function TaskStatusBadge({ taskId, status, disabled = false }: TaskStatusBadgeProps) {
  const { updateTaskStatus } = useTaskStore();
  const config = statusConfig[status];
  const Icon = config.icon;

  const handleStatusChange = async () => {
    if (disabled) return;

    const currentIndex = statusOrder.indexOf(status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    
    try {
      await updateTaskStatus(taskId, nextStatus);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <button
      onClick={handleStatusChange}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} ${config.color}
        transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:ring-2 hover:ring-current cursor-pointer'}`}
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{status}</span>
    </button>
  );
}