import type { ChatChannel } from '../types/chat';
import type { TaskStatus } from '../types/task';
import type { NotificationType } from '../types/notification';
import type { UserRole } from '../types/auth';

export interface AppConfig {
  name: string;
  version: string;
  description: string;
}

export interface RouteConfig {
  path: string;
  label: string;
  icon?: string;
  roles?: UserRole[];
}

export interface ApiConfig {
  baseUrl: string;
  endpoints: {
    [key: string]: string;
  };
}

export interface ChannelConfig {
  id: ChatChannel;
  label: string;
  icon: string;
  description: string;
}

export interface TaskConfig {
  statuses: TaskStatus[];
  priorities: string[];
}

export interface NotificationConfig {
  types: NotificationType[];
  maxDisplay: number;
  autoHideDelay: number;
}