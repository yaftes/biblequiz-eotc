import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";
import { User } from "@/src/entities/models/user";

interface SignInWithEmailInput {
  email: string;
  password: string;
}

export class SignInWithEmailUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(input: SignInWithEmailInput): Promise<User> {
    return this.authRepository.signInWithEmail(input.email, input.password);
  }
}
