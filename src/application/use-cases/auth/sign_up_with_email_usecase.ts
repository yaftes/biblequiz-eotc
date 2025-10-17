import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";
import { User } from "@/src/entities/models/user";

export const signUpWithEmailUseCase = async (
  email: string,
  password: string,
  authRepository: IAuthRepository
): Promise<User> => {
  return authRepository.signUpWithEmail(email, password);
};
