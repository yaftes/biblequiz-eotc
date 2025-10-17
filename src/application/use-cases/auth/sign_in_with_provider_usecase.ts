import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";

export const signInWithProviderUseCase = async (
  provider: 'google' | 'github' | 'facebook',
  authRepository: IAuthRepository
): Promise<void> => {
  return authRepository.signInWithProvider(provider);
};
