import { GetCurrentUserUseCase } from "@/src/application/use-cases/auth/get_current_user_usecase";
import { GetUserProfileUseCase } from "@/src/application/use-cases/auth/get_user_profile_usecase";
import { RecalculateRankUseCase } from "@/src/application/use-cases/auth/recalculate_rank_usecase";
import { GetAllQuizzesUseCase } from "@/src/application/use-cases/quiz/get_all_quizes_usecase";
import SubmitQuizUseCase from "@/src/application/use-cases/quiz/submit_quiz_usecase";
import { Quiz } from "@/src/entities/models/quiz";

export type QuizDTO = {
  id: string;
  question: string;
  choices: string[];
  hint?: string;
  category: string;
  isAnswered: boolean;
};

export class QuizController {
  constructor(
    private readonly submitQuizUseCase: SubmitQuizUseCase,
    private readonly getAllQuizzesUseCase: GetAllQuizzesUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
    private readonly reCalculateRankUseCase : RecalculateRankUseCase,
    private readonly getUserProfileUseCase : GetUserProfileUseCase,
  ) {}

  private async ensureAuthenticated() {
    const user = await this.getCurrentUserUseCase.execute();
    if (!user) throw new Error("User not authenticated");
    return user;
  }

  private validateQuizId(quizId: string): void {
    if (!quizId || typeof quizId !== "string" || quizId.trim() === "") {
      throw new Error("Invalid quiz ID");
    }
  }

  private validateCategory(category?: string): void {
    if (category && (typeof category !== "string" || category.trim() === "")) {
      throw new Error("Invalid category value");
    }
  }

  private validateUserAnswer(answer: string): void {
    if (!answer || typeof answer !== "string" || answer.trim() === "") {
      throw new Error("Invalid user answer");
    }
  }

  async getAllQuizzes(category?: string): Promise<QuizDTO[]> {

    const user = await this.ensureAuthenticated();
    this.validateCategory(category);

    const quizzes = await this.getAllQuizzesUseCase.execute(user.id, category);
    return quizzes.map((q) => this.presentQuiz(q));

  }

  async submitQuiz(quizId: string, userAnswer: string) {

    const user = await this.ensureAuthenticated();
    this.validateQuizId(quizId);
    this.validateUserAnswer(userAnswer);

    const result = await this.submitQuizUseCase.execute(user.id, quizId, userAnswer);
    await this.reCalculateRankUseCase.execute();

    return this.presentQuizResult({
      correct: result.correct,
    });

  }

  private presentQuiz(quiz: Quiz & { isAnswered: boolean }): QuizDTO {
    return {
      id: quiz.id,
      question: quiz.question,
      choices: quiz.choices,
      hint: quiz.hint,
      category: quiz.category,
      isAnswered: quiz.isAnswered,
    };
  }

  private presentQuizResult(result: { correct: boolean }) {
    return {
      correct: result.correct,
    };
  }
}
