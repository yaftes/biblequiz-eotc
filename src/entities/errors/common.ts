
export class InputParseError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'InputParseError';
    (this as any).cause = cause;
    if (Error.captureStackTrace) Error.captureStackTrace(this, InputParseError);
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    if (Error.captureStackTrace) Error.captureStackTrace(this, NotFoundError);
  }
}

export class InvalidOperationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidOperationError';
    if (Error.captureStackTrace) Error.captureStackTrace(this, InvalidOperationError);
  }
}
