import { IQuizRepository } from "@/src/application/repositories/quiz.repository.interface";

export default class SubmitQuizUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  async execute(userId: string, quizId: string, userAnswer: string) {
    return await this.quizRepository.submitQuiz(userId, quizId, userAnswer);
  }
}
