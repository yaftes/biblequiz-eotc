import { Quiz } from "@/src/entities/models/quiz";

export interface IQuizRepository {
  submitQuiz(userId: string, quizId: string, userAnswer: string): Promise<{ correct: boolean ,score : number }>;
  getAllQuizes(userId: string, category?: string): Promise<(Quiz & { isAnswered: boolean })[]>;
}
