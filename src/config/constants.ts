export const APP_CONFIG = {
  name: 'Task Manager',
  version: '1.0.0',
  description: 'A modern task management system',
} as const;

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  tasks: '/tasks',
  activity: '/activity',
} as const;

export const API_ENDPOINTS = {
  tasks: '/tasks',
  users: '/users',
  notifications: '/notifications',
  chat: '/chat',
} as const;

export const ERROR_MESSAGES = {
  auth: {
    notAuthenticated: 'You must be logged in to perform this action',
    invalidCredentials: 'Invalid email or password',
    emailTaken: 'This email is already in use',
    usernameTaken: 'This username is already taken',
  },
  tasks: {
    createFailed: 'Failed to create task',
    updateFailed: 'Failed to update task',
    deleteFailed: 'Failed to delete task',
    notFound: 'Task not found',
  },
  chat: {
    sendFailed: 'Failed to send message',
    fetchFailed: 'Failed to fetch messages',
  },
  notifications: {
    createFailed: 'Failed to create notification',
    updateFailed: 'Failed to update notification',
  },
} as const;