import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";
import { User } from "@/src/entities/models/user";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { InvalidCredentialsError, ProviderAuthError } from "@/src/entities/errors/auth";

export class AuthRepository implements IAuthRepository {
    
  constructor(private readonly supabase: SupabaseClient) {}

 async signUpWithEmail(name: string, email: string, password: string): Promise<User> {
  const { data, error } = await this.supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name } 
    }
  });

  if (error || !data.user) throw new InvalidCredentialsError();

  return new User(
    data.user.id,
    data.user.email ?? '',
    data.user.user_metadata?.name ?? name 
  );
}


  async signInWithEmail(email: string, password: string): Promise<User> {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) throw new InvalidCredentialsError();
    return new User(data.user.id, data.user.email ?? '');
  }

  async signInWithProvider(provider: 'google' | 'github' | 'facebook'): Promise<void> {
    const { error } = await this.supabase.auth.signInWithOAuth({ provider });
    if (error) throw new ProviderAuthError(provider);
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getCurrentUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();
    const user = data.user;
    if (!user) return null;
    return new User(user.id, user.email ?? '', user.user_metadata?.name,);
  }
}
