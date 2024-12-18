import React from 'react';
import { Clock } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { Column } from './board/Column';

export function ActivityBoard() {
  const { tasks } = useTaskStore();

  // Group tasks by status
  const todoTasks = tasks.filter(task => task.status === 'Not Started');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
    <div className="h-full">
      <div className="h-16 bg-[#343541] border-b border-gray-700 flex items-center px-6">
        <Clock className="h-5 w-5 text-[#10a37f]" />
        <h1 className="ml-2 text-lg font-medium text-[#ececf1]">Activity Board</h1>
      </div>

      <div className="p-6 h-[calc(100%-4rem)] overflow-auto">
        <div className="grid grid-cols-3 gap-6 h-full">
          <Column 
            title="To Do" 
            tasks={todoTasks} 
            color="bg-yellow-500"
            icon="alert-circle"
          />
          <Column 
            title="In Progress" 
            tasks={inProgressTasks} 
            color="bg-blue-500"
            icon="clock"
          />
          <Column 
            title="Completed" 
            tasks={completedTasks} 
            color="bg-green-500"
            icon="check-circle"
          />
        </div>
      </div>
    </div>
  );
}