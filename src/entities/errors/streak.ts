export class StreakError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StreakError';
    if (Error.captureStackTrace) Error.captureStackTrace(this, StreakError);
  }
}