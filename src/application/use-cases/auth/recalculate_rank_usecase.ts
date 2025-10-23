import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";

export class RecalculateRankUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.reCalculateRank();
  }
}
