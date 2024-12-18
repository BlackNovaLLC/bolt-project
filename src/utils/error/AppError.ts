export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static isAuthError(error: unknown): boolean {
    return error instanceof AppError && error.code.startsWith('auth/');
  }

  static isConfigError(error: unknown): boolean {
    return error instanceof AppError && error.code.startsWith('config/');
  }

  static isSupabaseError(error: unknown): boolean {
    return error instanceof AppError && error.code.startsWith('supabase/');
  }
}

export { AppError as default };