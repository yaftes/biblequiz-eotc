import { IQuizRepository } from "@/src/application/repositories/quiz.repository.interface";
import { Quiz } from "@/src/entities/models/quiz";

export class GetSingleQuizUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  async execute(quizId: string): Promise<Quiz> {
    return this.quizRepository.getSingleQuiz(quizId);
  }
}
