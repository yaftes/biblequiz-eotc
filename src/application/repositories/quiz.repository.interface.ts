
import { Quiz } from "@/src/entities/models/quiz";

export interface IQuizRepository {
  getSingleQuiz(quizId : string) : Promise<Quiz>;
  getQuizResult(quizId: string,userAnswer : string): Promise<{ correct: boolean; correctAnswer: string }>;
  getAllQuizes(category? : string) : Promise<Quiz[]>;
}
