import { IAuthRepository } from "@/src/application/repositories/auth.repository.interface";
import { User } from "@/src/entities/models/user";
import { SupabaseClient } from "@supabase/supabase-js";
import { InvalidCredentialsError, ProviderAuthError } from "@/src/entities/errors/auth";

export class AuthRepository implements IAuthRepository {
    
  constructor(private readonly supabase: SupabaseClient) {}
 async getUserProfile(): Promise<User> {
  
    const { data, error } = await this.supabase.auth.getUser();
    if (error || !data.user) throw new Error("User not authenticated");

    const authUser = data.user;

    
    const { data: profile, error: profileError } = await this.supabase
      .from("user_profile")
      .select("name, totalScore, rank")
      .eq("user_id", authUser.id)
      .single();

    if (profileError) throw new Error("Failed to fetch user profile");

    
    return new User(
      authUser.id,
      authUser.email ?? "",
      profile?.name ?? "",
      profile?.totalScore ?? 0,
      profile?.rank ?? 0
    );
  }

  async signUpWithEmail(name: string, email: string, password: string): Promise<User> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { name } 
      },
    });

    if (error || !data.user) throw new InvalidCredentialsError(error?.message);

    
    const { error: profileError } = await this.supabase
      .from("user_profile")
      .insert({
        user_id: data.user.id,
        name,
        total_score: 0,
        rank: 0
      });

    if (profileError) console.error("Failed to create user profile:", profileError.message);

    return new User(
      data.user.id,
      data.user.email ?? '',
      name,
      0,
      0
    );
  }

  async signInWithEmail(email: string, password: string): Promise<User> {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) throw new InvalidCredentialsError(error?.message);

    
    const { data: profile } = await this.supabase
      .from("user_profile")
      .select("name, total_score, rank")
      .eq("user_id", data.user.id)
      .single();

    return new User(
      data.user.id,
      data.user.email ?? '',
      profile?.name ?? '',
      profile?.total_score ?? 0,
      profile?.rank ?? 0
    );
  }

  async getCurrentUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();
    const user = data.user;
    if (!user) return null;

    const { data: profile } = await this.supabase
      .from("user_profile")
      .select("name, total_score, rank")
      .eq("user_id", user.id)
      .single();

    return new User(
      user.id,
      user.email ?? '',
      profile?.name ?? '',
      profile?.total_score ?? 0,
      profile?.rank ?? 0
    );
  }

  async signInWithProvider(provider: 'google' | 'github' | 'facebook'): Promise<void> {
    const { error } = await this.supabase.auth.signInWithOAuth({ provider });
    if (error) throw new ProviderAuthError(provider);
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async calculateRank(): Promise<number> {
    
    const { count, error } = await this.supabase
      .from("user_profile")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Failed to count users:", error.message);
      return 0;
    }

    return count ?? 0;
  }

  async reCalculateRank(): Promise<void> {
    
    const { data: users, error } = await this.supabase
      .from("user_profile")
      .select("user_id, total_score")
      .order("total_score", { ascending: false });

    if (error || !users) {
      console.error("Failed to fetch users for rank calculation:", error?.message);
      return;
    }

    
    let currentRank = 1;
    let prevScore: number | null = null;
    let skipRank = 0;

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const score = user.total_score ?? 0;

      if (prevScore !== null && score === prevScore) {
        skipRank++;
      } else if (prevScore !== null) {
        currentRank += skipRank + 1;
        skipRank = 0;
      }

      prevScore = score;

      
      const { error: updateError } = await this.supabase
        .from("user_profile")
        .update({ rank: currentRank })
        .eq("user_id", user.user_id);

      if (updateError) console.error(`Failed to update rank for user ${user.user_id}:`, updateError.message);
    }
  }
}
