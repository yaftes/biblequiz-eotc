import { User } from "@/src/entities/models/user";
import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";

export class GetUserProfileUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<User> {
    const user = await this.authRepository.getUserProfile();
    return user;
  }
}
