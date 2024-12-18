import type { ChatChannel } from './chat';

export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string;
  createdBy: string;
  dueDate: string;
  channel: ChatChannel;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDTO {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  channel: ChatChannel;
}