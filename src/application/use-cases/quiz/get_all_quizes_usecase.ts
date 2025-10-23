import { IQuizRepository } from "@/src/application/repositories/quiz.repository.interface";

export class GetAllQuizzesUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  async execute(userId: string, category?: string) {
    return await this.quizRepository.getAllQuizes(userId, category);
  }
}
