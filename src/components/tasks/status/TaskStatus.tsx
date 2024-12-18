```typescript
import React, { useCallback } from 'react';
import { useTaskStore } from '../../../store/taskStore';
import { useTaskStatusPermissions } from '../../../hooks/tasks/useTaskStatusPermissions';
import { TaskStatusBadge } from './TaskStatusBadge';
import type { Task, TaskStatus } from '../../../types/task';

interface TaskStatusProps {
  taskId: string;
  status: TaskStatus;
  task: Task;
}

const statusOrder: TaskStatus[] = ['Not Started', 'In Progress', 'Completed'];

export function TaskStatus({ taskId, status, task }: TaskStatusProps) {
  const { updateTaskStatus } = useTaskStore();
  const { canModifyStatus } = useTaskStatusPermissions(task);

  const handleStatusChange = useCallback(async () => {
    if (!taskId || !canModifyStatus) return;

    try {
      const currentIndex = statusOrder.indexOf(status);
      if (currentIndex === -1) return;
      
      const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
      await updateTaskStatus(taskId, nextStatus);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  }, [taskId, status, canModifyStatus, updateTaskStatus]);

  return (
    <TaskStatusBadge
      status={status}
      onClick={canModifyStatus ? handleStatusChange : undefined}
      disabled={!canModifyStatus}
    />
  );
}
```