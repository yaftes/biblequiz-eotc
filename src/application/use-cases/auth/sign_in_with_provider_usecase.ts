import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";

interface SignInWithProviderInput {
  provider: "google" | "github" | "facebook";
}

export class SignInWithProviderUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(input: SignInWithProviderInput): Promise<void> {
    return this.authRepository.signInWithProvider(input.provider);
  }
}
