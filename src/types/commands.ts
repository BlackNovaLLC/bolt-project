export type CommandType = 
  | 'VIEW_TODOS'
  | 'VIEW_USER_TODOS'
  | 'ASSIGN_TASK'
  | 'LIST_COMPLETED'
  | 'LIST_PENDING';

export interface TaskItem {
  id: string;
  content: string;
  assignedTo: string;
  createdBy: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface ParsedCommand {
  type: CommandType;
  targetUser?: string;
  task?: string;
}