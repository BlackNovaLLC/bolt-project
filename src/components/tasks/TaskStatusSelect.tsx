import React from 'react';
import { useAuthStore } from '../../store/authStore';
import type { Task, TaskStatus } from '../../types/task';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TaskStatusSelectProps {
  task: Task;
  onStatusChange: (status: TaskStatus) => void;
  disabled?: boolean;
}

const STATUS_OPTIONS: { value: TaskStatus; label: string; icon: React.ElementType }[] = [
  { value: 'Not Started', label: 'Not Started', icon: AlertCircle },
  { value: 'In Progress', label: 'In Progress', icon: Clock },
  { value: 'Completed', label: 'Completed', icon: CheckCircle },
];

const STATUS_COLORS = {
  'Not Started': 'text-yellow-400 bg-yellow-400/10',
  'In Progress': 'text-blue-400 bg-blue-400/10',
  'Completed': 'text-green-400 bg-green-400/10',
} as const;

export function TaskStatusSelect({ task, onStatusChange, disabled }: TaskStatusSelectProps) {
  const { user } = useAuthStore();
  
  // Check if user can modify the task
  const canModify = user && (
    task.assignee === user.username || 
    task.createdBy === user.username
  );

  if (!canModify) {
    // Read-only status badge
    const statusConfig = STATUS_OPTIONS.find(s => s.value === task.status);
    const Icon = statusConfig?.icon || AlertCircle;
    
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${STATUS_COLORS[task.status]}`}>
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{task.status}</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <select
        value={task.status}
        onChange={(e) => onStatusChange(e.target.value as TaskStatus)}
        disabled={disabled}
        className={`appearance-none cursor-pointer ${STATUS_COLORS[task.status]} 
          inline-flex items-center gap-1.5 pl-8 pr-8 py-1 rounded-full
          border border-transparent hover:border-current transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a37f]`}
      >
        {STATUS_OPTIONS.map(({ value, label }) => (
          <option 
            key={value} 
            value={value}
            className="bg-[#40414f] text-[#ececf1]"
          >
            {label}
          </option>
        ))}
      </select>
      
      {/* Status Icon */}
      {(() => {
        const Icon = STATUS_OPTIONS.find(s => s.value === task.status)?.icon || AlertCircle;
        return <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4" />;
      })()}
      
      {/* Custom select arrow */}
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}