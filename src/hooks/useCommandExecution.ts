import { useState, useCallback } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useAuthStore } from '../store/authStore';
import { isToday, format, subDays } from 'date-fns';

export function useCommandExecution() {
  const [error, setError] = useState<string | null>(null);
  const { tasks, createTask } = useTaskStore();
  const { user } = useAuthStore();

  const execute = useCallback(async (command: string) => {
    if (!user) {
      setError('You must be logged in to use commands');
      return null;
    }

    try {
      setError(null);

      // View my tasks
      if (command === 'what are my to-do lists today.') {
        const userTasks = tasks.filter(task => 
          task.assignee === user.username && 
          task.status !== 'Completed' &&
          isToday(new Date(task.createdAt))
        );
        return {
          type: 'tasks',
          data: userTasks,
          message: 'Your tasks for today:',
        };
      }

      // View other user's tasks
      const userTodosMatch = command.match(/what are @(\w+)'s to-do lists today\./);
      if (userTodosMatch) {
        const targetUser = userTodosMatch[1];
        const userTasks = tasks.filter(task => 
          task.assignee === targetUser && 
          task.status !== 'Completed' &&
          isToday(new Date(task.createdAt))
        );
        return {
          type: 'tasks',
          data: userTasks,
          message: `Tasks for @${targetUser} today:`,
        };
      }

      // Assign task
      const assignMatch = command.match(/assign '(.+)' to @(\w+)\./);
      if (assignMatch) {
        const [_, taskTitle, assignee] = assignMatch;
        await createTask({
          title: taskTitle,
          description: `Task assigned to @${assignee}`,
          assignee,
          dueDate: new Date().toISOString(),
        });
        return {
          type: 'success',
          message: `Task "${taskTitle}" assigned to @${assignee}`,
        };
      }

      // List completed tasks
      if (command === 'list all completed tasks today.') {
        const completedTasks = tasks.filter(task => 
          task.status === 'Completed' &&
          isToday(new Date(task.updatedAt))
        );
        return {
          type: 'tasks',
          data: completedTasks,
          message: 'Completed tasks today:',
        };
      }

      // List pending tasks
      if (command === 'list all pending tasks today.') {
        const pendingTasks = tasks.filter(task => 
          task.status !== 'Completed' &&
          isToday(new Date(task.createdAt))
        );
        return {
          type: 'tasks',
          data: pendingTasks,
          message: 'Pending tasks today:',
        };
      }

      // Show tasks created today
      if (command === 'show tasks created today') {
        const todaysTasks = tasks.filter(task => 
          isToday(new Date(task.createdAt))
        );
        return {
          type: 'tasks',
          data: todaysTasks,
          message: 'Tasks created today:',
        };
      }

      // Show tasks created yesterday
      if (command === 'show tasks created yesterday') {
        const yesterday = subDays(new Date(), 1);
        const yesterdaysTasks = tasks.filter(task => 
          format(new Date(task.createdAt), 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')
        );
        return {
          type: 'tasks',
          data: yesterdaysTasks,
          message: 'Tasks created yesterday:',
        };
      }

      // Show in progress tasks
      if (command === 'show all in progress tasks') {
        const inProgressTasks = tasks.filter(task => 
          task.status === 'In Progress'
        );
        return {
          type: 'tasks',
          data: inProgressTasks,
          message: 'Tasks in progress:',
        };
      }

      setError('Unknown command');
      return null;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to execute command');
      return null;
    }
  }, [user, tasks, createTask]);

  return {
    execute,
    error,
    clearError: () => setError(null),
  };
}