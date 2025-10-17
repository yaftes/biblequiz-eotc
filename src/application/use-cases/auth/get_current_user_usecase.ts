import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";
import { User } from "@/src/entities/models/user";

export class GetCurrentUserUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<User | null> {
    return this.authRepository.getCurrentUser();
  }
}
