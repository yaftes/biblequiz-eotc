import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";

export const signOutUseCase = async (authRepository: IAuthRepository): Promise<void> => {
  return authRepository.signOut();
};
