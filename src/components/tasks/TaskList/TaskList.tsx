import React from 'react';
import { useTaskStore } from '../../../store/taskStore';
import { TaskCard } from './TaskCard';
import { ErrorMessage } from '../../common/ErrorMessage';

export function TaskList() {
  const { tasks, error } = useTaskStore();

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!Array.isArray(tasks) || tasks.length === 0) {
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