import React from 'react';
import { useTaskStore } from '../../store/taskStore';
import { TaskCard } from './TaskCard';

export function TaskList() {
  const { tasks, error } = useTaskStore();

  if (error) {
    return (
      <div className="p-4 text-red-400 bg-red-500/10 rounded-lg">
        {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No tasks found. Create one to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}