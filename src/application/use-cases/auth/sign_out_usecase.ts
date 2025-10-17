import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";

export class SignOutUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    return this.authRepository.signOut();
  }
}
