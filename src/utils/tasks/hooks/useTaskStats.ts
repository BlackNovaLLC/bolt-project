import { useMemo } from 'react';
import type { Task } from '../../../types/task';

export function useTaskStats(tasks: Task[]) {
  return useMemo(() => {
    if (!Array.isArray(tasks)) return null;

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
    const notStartedTasks = tasks.filter(t => t.status === 'Not Started').length;

    const completionRate = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100) 
      : 0;

    const overdueTasks = tasks.filter(task => 
      new Date(task.dueDate) < new Date() && task.status !== 'Completed'
    ).length;

    return {
      total: totalTasks,
      completed: completedTasks,
      inProgress: inProgressTasks,
      notStarted: notStartedTasks,
      overdue: overdueTasks,
      completionRate,
    };
  }, [tasks]);
}