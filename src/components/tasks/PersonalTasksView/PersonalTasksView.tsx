import React, { useState } from 'react';
import { useTaskStore } from '../../../store/taskStore';
import { useAuthStore } from '../../../store/authStore';
import { useTaskFilters } from '../../../utils/tasks/hooks/useTaskFilters';
import { Filter, Loader2 } from 'lucide-react';
import { TaskList } from './TaskList';
import { PersonalTasksChat } from './PersonalTasksChat';
import { TaskStatsCard } from '../TaskStats/TaskStatsCard';
import { ErrorMessage } from '../../common/ErrorMessage';

export function PersonalTasksView() {
  const { user } = useAuthStore();
  const { tasks = [], isLoading, error } = useTaskStore();
  const [showCompleted, setShowCompleted] = useState(false);

  const filteredTasks = useTaskFilters(tasks, user?.username, showCompleted);

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

        <div className="grid gap-6">
          <TaskStatsCard tasks={filteredTasks} />
          <TaskList tasks={filteredTasks} />
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-gray-700 bg-[#2a2b32] px-4 md:px-6 py-4">
        <PersonalTasksChat />
      </div>
    </div>
  );
}