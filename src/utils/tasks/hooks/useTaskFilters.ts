import { useMemo } from 'react';
import type { Task } from '../../../types/task';

export function useTaskFilters(tasks: Task[], username?: string, showCompleted = false) {
  return useMemo(() => {
    if (!Array.isArray(tasks)) return [];
    
    // Filter by user
    const userTasks = username 
      ? tasks.filter(task => task.assignee === username)
      : tasks;

    // Filter by completion status
    return showCompleted 
      ? userTasks 
      : userTasks.filter(task => task.status !== 'Completed');
  }, [tasks, username, showCompleted]);
}