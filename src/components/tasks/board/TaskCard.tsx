import React, { useState } from 'react';
import { Calendar, User, MessageSquare } from 'lucide-react';
import { formatDate } from '../../../utils/date/dateUtils';
import type { Task } from '../../../types/task';
import { TaskStatusBadge } from '../TaskStatusBadge';
import { TaskComments } from '../TaskComments';
import { TaskActions } from '../TaskActions';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-[#40414f] rounded-lg p-4 shadow-sm border border-gray-700 hover:border-[#10a37f] transition-colors duration-200">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-[#ececf1] truncate flex-1 mr-3">
          {task.title}
        </h3>
        <TaskActions task={task} />
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <div className="flex items-center gap-2">
          <User className="h-3 w-3" />
          <span>@{task.assignee}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(task.dueDate)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <TaskStatusBadge status={task.status} />
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-xs text-gray-400 hover:text-[#ececf1] transition-colors flex items-center gap-1"
        >
          <MessageSquare className="h-3 w-3" />
          Comments
        </button>
      </div>

      {showComments && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <TaskComments taskId={task.id} />
        </div>
      )}
    </div>
  );
}