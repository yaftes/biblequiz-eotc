
import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";
import { User } from "@/src/entities/models/user";

export class AuthController {
  constructor(private authRepo: IAuthRepository) {}

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
  }

  private validatePassword(password: string): void {
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
  }

  private validateProvider(provider: string): void {
    const allowedProviders = ["google", "github", "facebook"];
    if (!allowedProviders.includes(provider)) {
      throw new Error("Unsupported provider");
    }
  }

  async signUpWithEmail(email: string, password: string): Promise<User> {
    this.validateEmail(email);
    this.validatePassword(password);
    return await this.authRepo.signUpWithEmail(email, password);
  }

  async signInWithEmail(email: string, password: string): Promise<User> {
    this.validateEmail(email);
    this.validatePassword(password);
    return await this.authRepo.signInWithEmail(email, password);
  }

  async signInWithProvider(provider: "google" | "github" | "facebook"): Promise<void> {
    this.validateProvider(provider);
    return await this.authRepo.signInWithProvider(provider);
  }

  async signOut(): Promise<void> {
    return await this.authRepo.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    return await this.authRepo.getCurrentUser();
  }
}
