import { IQuizRepository } from "@/src/application/repositories/quiz.repository.interface";

export class GetQuizResultUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  async execute(quizId: string, userAnswer: string): Promise<{ correct: boolean; correctAnswer: string }> {
    return this.quizRepository.getQuizResult(quizId, userAnswer);
  }
}
