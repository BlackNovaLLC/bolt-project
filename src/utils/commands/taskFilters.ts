import type { Task } from '../../types/task';

export const filterTasksByAssignee = (tasks: Task[], username: string) => 
  tasks.filter(task => task.assignee.toLowerCase() === username.toLowerCase());

export const filterCompletedTasks = (tasks: Task[]) =>
  tasks.filter(task => task.status === 'Completed');

export const filterPendingTasks = (tasks: Task[]) =>
  tasks.filter(task => task.status !== 'Completed');