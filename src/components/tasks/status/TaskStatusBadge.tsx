import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { TaskStatus } from '../../../types/task';

interface TaskStatusBadgeProps {
  status: TaskStatus;
  onClick?: () => void;
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

export function TaskStatusBadge({ status, onClick, disabled = false }: TaskStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  const badge = (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} ${config.color}`}>
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{status}</span>
    </div>
  );

  if (!onClick) return badge;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`transition-all duration-200 ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:ring-2 hover:ring-current cursor-pointer'
      }`}
    >
      {badge}
    </button>
  );
}