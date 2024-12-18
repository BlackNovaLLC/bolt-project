import React from 'react';
import { useTaskStats } from '../../../utils/tasks/hooks/useTaskStats';
import type { Task } from '../../../types/task';

interface TaskStatsCardProps {
  tasks: Task[];
}

export function TaskStatsCard({ tasks }: TaskStatsCardProps) {
  const stats = useTaskStats(tasks);

  if (!stats) return null;

  return (
    <div className="bg-[#40414f] rounded-lg p-4 border border-gray-700">
      <h3 className="text-lg font-medium text-[#ececf1] mb-4">Task Statistics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Total Tasks</p>
          <p className="text-2xl font-semibold text-[#ececf1]">{stats.total}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400">Completion Rate</p>
          <p className="text-2xl font-semibold text-[#ececf1]">{stats.completionRate}%</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">In Progress</p>
          <p className="text-2xl font-semibold text-blue-400">{stats.inProgress}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Completed</p>
          <p className="text-2xl font-semibold text-green-400">{stats.completed}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Not Started</p>
          <p className="text-2xl font-semibold text-yellow-400">{stats.notStarted}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Overdue</p>
          <p className="text-2xl font-semibold text-red-400">{stats.overdue}</p>
        </div>
      </div>
    </div>
  );
}