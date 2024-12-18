import React from 'react';
import { TaskCard } from './TaskCard';
import type { Task } from '../../../types/task';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <p className="text-gray-400 text-center py-8">
        No tasks found. Toggle the filter to see completed tasks.
      </p>
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