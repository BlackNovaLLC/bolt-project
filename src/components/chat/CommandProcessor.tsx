import React from 'react';
import type { ParsedCommand } from '../../types/commands';
import { useAuthStore } from '../../store/authStore';
import { useTaskStore } from '../../store/taskStore';

interface CommandProcessorProps {
  command: ParsedCommand;
}

export function CommandProcessor({ command }: CommandProcessorProps) {
  const { user } = useAuthStore();
  const { createTask } = useTaskStore();

  if (!user) return null;

  // Handle task assignment
  if (command.type === 'ASSIGN_TASK' && command.task && command.targetUser) {
    createTask({
      title: command.task,
      description: `Task assigned to @${command.targetUser}`,
      assignee: command.targetUser,
      dueDate: new Date().toISOString(),
    });
    return (
      <div className="bg-green-50 rounded-lg p-4 mt-2">
        <p className="text-green-700">
          ✓ Task "{command.task}" assigned to @{command.targetUser}
        </p>
      </div>
    );
  }

  // Process other commands
  const renderTaskList = (tasks: any[], emptyMessage: string) => {
    if (tasks.length === 0) {
      return <p className="text-gray-500">{emptyMessage}</p>;
    }

    return (
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center space-x-2">
            <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
              {task.content}
              <span className="text-gray-500 text-sm ml-2">
                {task.completed ? '(completed)' : `(assigned to @${task.assignedTo})`}
              </span>
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-2">
      <h3 className="font-medium text-gray-900 mb-3">Command Result</h3>
      {renderTaskList([], 'No tasks found')}
    </div>
  );
}