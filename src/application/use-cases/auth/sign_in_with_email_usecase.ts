import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";
import { User } from "@/src/entities/models/user";

export const signInWithEmailUseCase = async (
  email: string,
  password: string,
  authRepository: IAuthRepository
): Promise<User> => {
  return authRepository.signInWithEmail(email, password);
};
