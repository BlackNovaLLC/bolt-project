import type { Task } from '../../types/task';
import type { TaskItem } from '../../types/commands';

export const mapTaskToTaskItem = (task: Task): TaskItem => ({
  id: task.id,
  content: task.title,
  assignedTo: task.assignee,
  createdBy: task.createdBy,
  completed: task.status === 'Completed',
  createdAt: task.createdAt,
  completedAt: task.status === 'Completed' ? task.updatedAt : undefined,
});