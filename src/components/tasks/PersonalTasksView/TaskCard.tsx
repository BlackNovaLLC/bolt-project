import React from 'react';
import { Calendar, User } from 'lucide-react';
import { useTaskActions } from '../../../utils/tasks/hooks/useTaskActions';
import { formatDate } from '../../../utils/date/dateUtils';
import { TaskStatusBadge } from '../TaskStatusBadge';
import type { Task } from '../../../types/task';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { isProcessing, handleStatusChange, handleDelete } = useTaskActions();

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
          <p className="text-sm text-gray-400">{task.description}</p>
          
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

        <TaskStatusBadge 
          status={task.status} 
          onChange={status => handleStatusChange(task.id, status)}
          disabled={isProcessing}
        />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <button
          onClick={() => handleDelete(task.id)}
          disabled={isProcessing}
          className="text-sm text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}