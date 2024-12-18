import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  assignee: z.string().min(1, 'Assignee is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  channel: z.string().min(1, 'Channel is required'),
});

export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  role: z.string().min(1, 'Role is required'),
});

export const chatMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(1000),
  channelId: z.string().min(1, 'Channel is required'),
});

export const notificationSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  type: z.string().min(1, 'Type is required'),
  content: z.string().min(1, 'Content is required'),
});