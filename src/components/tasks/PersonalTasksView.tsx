import React, { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../utils/date/dateUtils';
import { Calendar, MessageSquare, Filter, Loader2 } from 'lucide-react';
import { TaskStatusBadge } from './TaskStatusBadge';
import { TaskComments } from './TaskComments';
import { PersonalTasksChat } from './PersonalTasksChat';
import { ErrorMessage } from '../common/ErrorMessage';

export function PersonalTasksView() {
  const { user } = useAuthStore();
  const { tasks = [], isLoading, error } = useTaskStore();
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

  // Filter tasks for current user
  const userTasks = Array.isArray(tasks) 
    ? tasks.filter(task => task.assignee === user?.username)
    : [];
  
  // Filter tasks based on completion status
  const filteredTasks = userTasks.filter(task => 
    showCompleted ? true : task.status !== 'Completed'
  );

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex items-center text-gray-400">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Loading tasks...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
        <div className="border-b border-gray-700 pb-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#ececf1]">Personal Tasks</h2>
              <p className="text-sm text-gray-400">Your assigned tasks</p>
            </div>
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="flex items-center px-3 py-1.5 rounded-lg bg-[#40414f] border border-gray-600 
              text-sm text-[#ececf1] hover:border-[#10a37f] transition-colors duration-200"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showCompleted ? 'Hide Completed' : 'Show Completed'}
            </button>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            {showCompleted 
              ? 'No tasks found' 
              : 'No active tasks found. Toggle the filter to see completed tasks.'}
          </p>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className={`bg-[#40414f] rounded-lg p-4 shadow-sm border border-gray-700 transition-all duration-300 ${
                  task.status === 'Completed' ? 'opacity-75' : ''
                }`}
              >
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

                  <TaskStatusBadge status={task.status} />
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                    className="flex items-center text-sm text-gray-400 hover:text-[#ececf1] transition-colors duration-200"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comments
                  </button>
                  {expandedTaskId === task.id && (
                    <TaskComments taskId={task.id} />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-shrink-0 border-t border-gray-700 bg-[#2a2b32] px-4 md:px-6 py-4">
        <PersonalTasksChat />
      </div>
    </div>
  );
}