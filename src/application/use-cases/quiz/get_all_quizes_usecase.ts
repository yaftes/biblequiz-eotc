import { IQuizRepository } from "@/src/application/repositories/quiz.repository.interface";
import { Quiz } from "@/src/entities/models/quiz";

export class GetAllQuizzesUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  async execute(category?: string): Promise<Quiz[]> {
    return this.quizRepository.getAllQuizes(category);
  }
}
