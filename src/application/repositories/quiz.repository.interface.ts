
import { Quiz } from "@/src/entities/models/quiz";

export interface QuizRepository {

  getSingleQuiz(quizId : string) : Promise<Quiz>;
  getQuizResult(quizId: string): Promise<{ correct: boolean; correctAnswer: string }>;
  getAllQuizes(category? : string) : Promise<Quiz[]>;
}
