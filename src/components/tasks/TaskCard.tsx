import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDate } from '../../utils/date/dateUtils';
import { TaskStatus } from './status/TaskStatus';
import type { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  if (!task?.id) {
    console.error('Task ID is missing:', task);
    return null;
  }

  return (
    <div className={`bg-[#40414f] rounded-lg p-4 shadow-sm border border-gray-700 transition-all duration-300 ${
      task.status === 'Completed' ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1 mr-4">
          <h3 className={`text-[#ececf1] font-medium ${
            task.status === 'Completed' ? 'line-through' : ''
          }`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-400">{task.description}</p>
          )}
          
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <span>Created by @{task.createdBy}</span>
            <span>•</span>
            <span>{formatDate(task.createdAt)}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-400">
              Due: {formatDate(task.dueDate)}
            </span>
          </div>
        </div>

        <TaskStatus 
          taskId={task.id}
          status={task.status}
          task={task}
        />
      </div>
    </div>
  );
}