import { QuizRepository } from "../repositories/quiz.repository.interface";

export const getQuizResultUseCase = async (
  quizId: string,
  userAnswer: string,
  quizRepository: QuizRepository
): Promise<{ correct: boolean; correctAnswer: string }> => {
  if (!quizId) throw new Error("Quiz ID is required");
  if (!userAnswer) throw new Error("User answer is required");

  return quizRepository.getQuizResult(quizId, userAnswer);
};
