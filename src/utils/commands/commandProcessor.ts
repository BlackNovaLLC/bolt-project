import type { ParsedCommand } from '../../types/commands';
import { useTaskStore } from '../../store/taskStore';
import { useAuthStore } from '../../store/authStore';
import { filterTasksByAssignee, filterCompletedTasks, filterPendingTasks } from './taskFilters';
import { mapTaskToTaskItem } from './taskMappers';
import { isToday } from '../date/dateUtils';

export function processCommand(command: ParsedCommand | null, username: string) {
  if (!command || !username) {
    return null;
  }

  const { tasks } = useTaskStore.getState();
  const { user } = useAuthStore.getState();

  if (!user) return null;

  switch (command.type) {
    case 'VIEW_TODOS':
      return {
        title: 'Your tasks for today:',
        tasks: filterTasksByAssignee(tasks, username)
          .filter(task => isToday(task.createdAt))
          .map(mapTaskToTaskItem),
        emptyMessage: 'No tasks found for today.',
      };

    case 'VIEW_USER_TODOS':
      if (!command.targetUser) return null;
      return {
        title: `Tasks for @${command.targetUser} today:`,
        tasks: filterTasksByAssignee(tasks, command.targetUser)
          .filter(task => isToday(task.createdAt))
          .map(mapTaskToTaskItem),
        emptyMessage: 'No tasks found.',
      };

    case 'LIST_COMPLETED':
      return {
        title: 'Completed tasks today:',
        tasks: filterCompletedTasks(tasks)
          .filter(task => isToday(task.updatedAt))
          .map(mapTaskToTaskItem),
        emptyMessage: 'No completed tasks found for today.',
      };

    case 'LIST_PENDING':
      return {
        title: 'Pending tasks today:',
        tasks: filterPendingTasks(tasks)
          .filter(task => isToday(task.createdAt))
          .map(mapTaskToTaskItem),
        emptyMessage: 'No pending tasks found for today.',
      };

    default:
      return null;
  }
}