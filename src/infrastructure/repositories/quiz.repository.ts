import { IQuizRepository } from "@/src/application/repositories/quiz.repository.interface";
import { Quiz } from "@/src/entities/models/quiz";
import { SupabaseClient } from "@supabase/supabase-js";

export class QuizRepository implements IQuizRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getAllQuizes(
    userId: string,
    category?: string
  ): Promise<(Quiz & { isAnswered: boolean })[]> {
    let query = this.supabase.from("quiz").select("*");

    if (category) {
      query = query.eq("category", category);
    }

    const { data: quizzes, error } = await query;
    if (error) throw new Error(`Failed to fetch quizzes: ${error.message}`);
    if (!quizzes) return [];

    const { data: results, error: resultError } = await this.supabase
      .from("quiz_results")
      .select("quiz_id")
      .eq("user_id", userId);

    if (resultError)
      throw new Error(`Failed to fetch quiz results: ${resultError.message}`);

    const answeredIds = new Set(results?.map((r) => r.quiz_id));

    return quizzes.map((quiz) => ({
      ...quiz,
      isAnswered: answeredIds.has(quiz.id),
    }));
  }

  async submitQuiz(
    userId: string,
    quizId: string,
    userAnswer: string
  ): Promise<{ correct: boolean; score: number }> {

    
    const { data: quiz, error: quizError } = await this.supabase
      .from("quiz")
      .select("answer, point")
      .eq("id", quizId)
      .single();

    if (quizError) throw new Error(`Quiz not found: ${quizError.message}`);

    const correct = quiz.answer.trim().toLowerCase() === userAnswer.trim().toLowerCase();

    
    const { data: existingResult, error: resultError } = await this.supabase
      .from("quiz_results")
      .select("id, attempts, score")
      .eq("user_id", userId)
      .eq("quiz_id", quizId)
      .single();

    if (resultError && resultError.code !== "PGRST116") 
      throw new Error(`Failed to fetch quiz result: ${resultError.message}`);

    let score = 0;

    if (correct) {
      
      const attempts = existingResult?.attempts ?? 0;
      score = Math.max(quiz.point - 2 * attempts, 0);

      if (existingResult) {
        
        const newScore = Math.max(existingResult.score, score);
        const { error: updateError } = await this.supabase
          .from("quiz_results")
          .update({ user_answer: userAnswer, correct: true, score: newScore })
          .eq("id", existingResult.id);

        if (updateError)
          throw new Error(`Failed to update quiz result: ${updateError.message}`);
      } else {
        
        const { error: insertError } = await this.supabase
          .from("quiz_results")
          .insert({
            user_id: userId,
            quiz_id: quizId,
            user_answer: userAnswer,
            correct: true,
            score,
            attempts: 0,
          });

        if (insertError)
          throw new Error(`Failed to store quiz result: ${insertError.message}`);
      }

      
      const { data: profileData, error: profileError } = await this.supabase
        .from("user_profile")
        .select("id, total_score")
        .eq("user_id", userId)
        .single();

      if (profileError) throw new Error(`Failed to fetch user profile: ${profileError.message}`);

      const newTotalScore = (profileData?.total_score ?? 0) + score;

      const { error: updateProfileError } = await this.supabase
        .from("user_profile")
        .update({ total_score: newTotalScore })
        .eq("user_id", userId);

      if (updateProfileError)
        console.error("Failed to update user total_score:", updateProfileError.message);

    } else {
      
      const attempts = (existingResult?.attempts ?? 0) + 1;

      if (existingResult) {
        const { error: updateError } = await this.supabase
          .from("quiz_results")
          .update({ user_answer: userAnswer, attempts })
          .eq("id", existingResult.id);

        if (updateError)
          throw new Error(`Failed to update quiz result attempts: ${updateError.message}`);
      } else {
        await this.supabase
          .from("quiz_results")
          .insert({
            user_id: userId,
            quiz_id: quizId,
            user_answer: userAnswer,
            correct: false,
            score: 0,
            attempts: 1,
          });
      }
    }

    return { correct, score };
  }
}
