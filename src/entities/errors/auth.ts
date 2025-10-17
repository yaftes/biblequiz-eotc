
export class UnauthenticatedError extends Error {
  constructor(message: string = 'User is not authenticated') {
    super(message);
    this.name = 'UnauthenticatedError';
    if (Error.captureStackTrace) Error.captureStackTrace(this, UnauthenticatedError);
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = 'User is not authorized') {
    super(message);
    this.name = 'UnauthorizedError';
    if (Error.captureStackTrace) Error.captureStackTrace(this, UnauthorizedError);
  }
}
