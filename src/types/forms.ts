import type { ChatChannel } from './chat';

export interface TaskFormData {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  channel: ChatChannel;
  files: File[];
}

export interface TaskFormErrors {
  title?: string;
  assignee?: string;
  dueDate?: string;
  channel?: string;
  files?: string;
  form?: string;
}