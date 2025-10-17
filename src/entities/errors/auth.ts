export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super('Invalid email or password');
  }
}

export class ProviderAuthError extends AuthError {
  constructor(provider: string) {
    super(`Failed to sign in with ${provider}`);
  }
}

export class UnauthenticatedError extends AuthError {
  constructor() {
    super('User is not authenticated');
  }
}
