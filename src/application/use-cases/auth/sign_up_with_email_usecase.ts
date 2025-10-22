import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";
import { User } from "@/src/entities/models/user";

interface SignUpWithEmailInput {
  email: string;
  password: string;
  name : string,
}

export class SignUpWithEmailUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(input: SignUpWithEmailInput): Promise<User> {
    return this.authRepository.signUpWithEmail(input.name,input.email, input.password);
  }
}
