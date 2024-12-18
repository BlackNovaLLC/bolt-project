import { AppError } from './AppError';

export class ConfigError extends AppError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'config/validation-error', originalError);
    this.name = 'ConfigError';
    Object.setPrototypeOf(this, ConfigError.prototype);
  }
}