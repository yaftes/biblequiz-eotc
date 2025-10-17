import { Quiz } from "@/src/entities/models/quiz";
import { QuizRepository } from "../repositories/quiz.repository.interface";


export const getSingleQuizUseCase = async (
  quizId: string,
  quizRepository: QuizRepository
): Promise<Quiz> => {
  if (!quizId) {
    throw new Error("Quiz ID is required");
  }

  const quiz = await quizRepository.getSingleQuiz(quizId);

  if (!quiz) {
    throw new Error(`Quiz with ID ${quizId} not found`);
  }

  return quiz;
};
