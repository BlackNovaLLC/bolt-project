import { useAuthStore } from '../../store/authStore';
import type { Task } from '../../types/task';

export function useTaskStatusPermissions(task: Task) {
  const { user } = useAuthStore();

  if (!user || !task) {
    return {
      canModifyStatus: false,
      isAssignee: false,
      isCreator: false,
    };
  }

  const isAssignee = task.assignee === user.username;
  const isCreator = task.createdBy === user.username;
  const canModifyStatus = isAssignee || isCreator;

  return {
    canModifyStatus,
    isAssignee,
    isCreator,
  };
}