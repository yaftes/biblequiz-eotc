import { IQuizRepository } from "@/src/application/repositories/quiz.repository.interface";
import { Quiz } from "@/src/entities/models/quiz";
import { SupabaseClient } from "@supabase/supabase-js";

export class QuizRepository implements IQuizRepository {

  constructor(private readonly supabaseClient: SupabaseClient) {}


  async getSingleQuiz(quizId: string): Promise<Quiz> {

  const { data, error } = await this.supabaseClient
    .from('quizzes')
    .select('*')
    .eq('id', quizId)
    .single();

  if (error || !data) {
    throw new Error(`Quiz with id ${quizId} not found`);
  }

  return data as Quiz;
}


  async getQuizResult(
    quizId: string,
    userAnswer: string
  ): Promise<{ correct: boolean; correctAnswer: string }> {
    const { data, error } = await this.supabaseClient
      .from('quizzes')
      .select('answer')
      .eq('id', quizId)
      .single();

    if (error || !data) {
      console.error('Error fetching quiz answer:', error?.message);
      return { correct: false, correctAnswer: '' };
    }

    const correct = data.answer === userAnswer;
    return { correct, correctAnswer: data.answer };
  }

  async getAllQuizes(category?: string): Promise<Quiz[]> {
    let query = this.supabaseClient.from('quizzes').select('*');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error || !data) {
      console.error('Error fetching quizzes:', error?.message);
      return [];
    }

    return data as Quiz[];
  }
}
