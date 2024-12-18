import { AppError } from './AppError';
import { ERROR_MESSAGES } from '../../config/constants';

export function handleError(error: unknown, defaultMessage: string, code: string): AppError {
  if (error instanceof AppError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new AppError(error.message, code, error);
  }
  
  return new AppError(defaultMessage, code);
}

export function handleAuthError(error: unknown): AppError {
  return handleError(
    error,
    ERROR_MESSAGES.auth.notAuthenticated,
    'auth/unknown-error'
  );
}

export function handleTaskError(error: unknown): AppError {
  return handleError(
    error,
    ERROR_MESSAGES.tasks.createFailed,
    'task/unknown-error'
  );
}

export function handleChatError(error: unknown): AppError {
  return handleError(
    error,
    ERROR_MESSAGES.chat.sendFailed,
    'chat/unknown-error'
  );
}

export function handleNotificationError(error: unknown): AppError {
  return handleError(
    error,
    ERROR_MESSAGES.notifications.createFailed,
    'notification/unknown-error'
  );
}