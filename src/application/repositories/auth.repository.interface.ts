import { User } from "@/src/entities/models/user";

export interface IAuthRepository {
  signUpWithEmail(name : string,email: string, password: string): Promise<User>;
  signInWithEmail(email: string, password: string): Promise<User>;
  signInWithProvider(provider: 'google' | 'github' | 'facebook'): Promise<void>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  reCalculateRank() : Promise<void>;
}
