import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { TaskCard } from './TaskCard';
import type { Task } from '../../../types/task';

interface ColumnProps {
  title: string;
  tasks: Task[];
  color: string;
  icon: 'alert-circle' | 'clock' | 'check-circle';
}

export function Column({ title, tasks, color, icon }: ColumnProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const Icon = {
    'alert-circle': AlertCircle,
    'clock': Clock,
    'check-circle': CheckCircle,
  }[icon];

  return (
    <div className="h-full flex flex-col bg-[#2a2b32] rounded-lg">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between w-full p-4 border-b border-gray-700 group"
      >
        <div className="flex items-center gap-2">
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#ececf1]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-[#ececf1]" />
          )}
          <div className={`h-2 w-2 rounded-full ${color}`} />
          <h2 className="text-lg font-medium text-[#ececf1]">{title}</h2>
          <span className="ml-2 text-sm text-gray-400">
            {tasks.length}
          </span>
        </div>
      </button>
      
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {tasks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              <Icon className="h-8 w-8 text-gray-500 mb-2" />
              <p className="text-sm text-gray-400">No tasks</p>
            </div>
          ) : (
            tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      )}
    </div>
  );
}