import { GetCurrentUserUseCase } from "@/src/application/use-cases/auth/get_current_user_usecase";
import { GetUserProfileUseCase } from "@/src/application/use-cases/auth/get_user_profile_usecase";
import { SignInWithEmailUseCase } from "@/src/application/use-cases/auth/sign_in_with_email_usecase";
import { SignInWithProviderUseCase } from "@/src/application/use-cases/auth/sign_in_with_provider_usecase";
import { SignOutUseCase } from "@/src/application/use-cases/auth/sign_out_usecase";
import { SignUpWithEmailUseCase } from "@/src/application/use-cases/auth/sign_up_with_email_usecase";
import { User } from "@/src/entities/models/user";

export class AuthController {
  constructor(
    private readonly signUpWithEmailUseCase: SignUpWithEmailUseCase,
    private readonly signInWithEmailUseCase: SignInWithEmailUseCase,
    private readonly signInWithProviderUseCase: SignInWithProviderUseCase,
    private readonly signOutUseCase: SignOutUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
  ) {}

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

  async signUpWithEmail(name: string, email: string, password: string): Promise<User> {
    this.validateEmail(email);
    this.validatePassword(password);
    return await this.signUpWithEmailUseCase.execute({ name, email, password });
  }

  async signInWithEmail(email: string, password: string): Promise<User> {
    this.validateEmail(email);
    this.validatePassword(password);
    return await this.signInWithEmailUseCase.execute({ email, password });
  }

  async signInWithProvider(provider: "google" | "github" | "facebook"): Promise<void> {
    this.validateProvider(provider);
    return await this.signInWithProviderUseCase.execute({ provider });
  }

  async signOut(): Promise<void> {
    return await this.signOutUseCase.execute();
  }

  async getCurrentUser(): Promise<User | null> {
    return await this.getCurrentUserUseCase.execute();
  }

  // ✅ New method to get user profile
  async getUserProfile(): Promise<User> {
    return await this.getUserProfileUseCase.execute();
  }
}
