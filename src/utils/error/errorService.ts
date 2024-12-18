import { AppError } from './AppError';
import { ERROR_MESSAGES } from '../../config/constants';

class ErrorService {
  handleError(error: unknown, defaultMessage: string, code: string): AppError {
    if (error instanceof AppError) {
      return error;
    }
    
    if (error instanceof Error) {
      return new AppError(error.message, code, error);
    }
    
    return new AppError(defaultMessage, code);
  }

  handleAuthError(error: unknown): AppError {
    return this.handleError(
      error,
      ERROR_MESSAGES.auth.notAuthenticated,
      'auth/unknown-error'
    );
  }

  handleTaskError(error: unknown): AppError {
    return this.handleError(
      error,
      ERROR_MESSAGES.tasks.createFailed,
      'task/unknown-error'
    );
  }

  handleChatError(error: unknown): AppError {
    return this.handleError(
      error,
      ERROR_MESSAGES.chat.sendFailed,
      'chat/unknown-error'
    );
  }

  handleNotificationError(error: unknown): AppError {
    return this.handleError(
      error,
      ERROR_MESSAGES.notifications.createFailed,
      'notification/unknown-error'
    );
  }
}

export const errorService = new ErrorService();