import React, { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { formatDate } from '../../utils/date/dateUtils';
import { ChevronDown, ChevronRight, Calendar, MessageSquare } from 'lucide-react';
import type { Task } from '../../types/task';
import type { ChatChannel } from '../../types/chat';
import { TaskComments } from '../tasks/TaskComments';
import { TaskStatusBadge } from '../tasks/TaskStatusBadge';

interface ChannelTasksViewProps {
  channelId: ChatChannel;
}

export function ChannelTasksView({ channelId }: ChannelTasksViewProps) {
  const tasks = useTaskStore((state) => state.tasks);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  // Filter tasks for this channel
  const channelTasks = Array.isArray(tasks) ? tasks.filter(task => task.channel === channelId) : [];

  return (
    <div>
      {/* Header with collapse toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between w-full mb-4 pb-2 border-b border-gray-700 group"
      >
        <div className="flex items-center">
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#ececf1] mr-2" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-[#ececf1] mr-2" />
          )}
          <h2 className="text-lg font-medium text-[#ececf1]">Channel Tasks</h2>
        </div>
        <span className="text-sm text-gray-400">
          {channelTasks.length} {channelTasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </button>

      {/* Task list */}
      {!isCollapsed && (
        <div className="space-y-4">
          {channelTasks.length === 0 ? (
            <p className="text-center text-gray-400">
              No tasks in this channel yet.
            </p>
          ) : (
            channelTasks.map(task => (
              <div
                key={task.id}
                className="bg-[#40414f] rounded-lg p-4 shadow-sm border border-gray-700"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-medium text-[#ececf1] truncate flex-1 mr-3">
                    {task.title}
                  </h3>
                  <TaskStatusBadge status={task.status} />
                </div>
                
                {task.description && (
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {task.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>Due: {formatDate(task.dueDate)}</span>
                  </div>
                  <span>@{task.assignee}</span>
                </div>

                <button
                  onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                  className="mt-3 flex items-center text-xs text-gray-400 hover:text-[#ececf1] transition-colors duration-200"
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Comments
                </button>

                {expandedTaskId === task.id && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <TaskComments taskId={task.id} />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}