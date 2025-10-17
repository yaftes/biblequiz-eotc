
export class QuizNotFoundError extends Error {
  constructor(message: string = 'Quiz not found') {
    super(message);
    this.name = 'QuizNotFoundError';
    if (Error.captureStackTrace) Error.captureStackTrace(this, QuizNotFoundError);
  }
}



