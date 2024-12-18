import type { Task } from '../../../types/task';

class TaskMapper {
  mapTaskFromDB(task: any): Task | null {
    if (!task) return null;
    
    return {
      id: task.id,
      title: task.title,
      description: task.description || '',
      status: task.status,
      assignee: task.assignee,
      createdBy: task.created_by,
      dueDate: task.due_date,
      channel: task.channel,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
    };
  }
}

export const taskMapper = new TaskMapper();