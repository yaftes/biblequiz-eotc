import { GetCurrentUserUseCase } from "@/src/application/use-cases/auth/get_current_user_usecase";
import { GetAllQuizzesUseCase } from "@/src/application/use-cases/quiz/get_all_quizes_usecase";
import { GetQuizResultUseCase } from "@/src/application/use-cases/quiz/get_quiz_result_usecase";
import { GetSingleQuizUseCase } from "@/src/application/use-cases/quiz/get_single_quiz_usecase";
import { Quiz } from "@/src/entities/models/quiz";

export class QuizController {
  constructor(
    private readonly getSingleQuizUseCase: GetSingleQuizUseCase,
    private readonly getAllQuizzesUseCase: GetAllQuizzesUseCase,
    private readonly getQuizResultUseCase: GetQuizResultUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase
  ) {}

  private async ensureAuthenticated() {
    const user = await this.getCurrentUserUseCase.execute();
    if (!user) {
      throw new Error("User not authenticated");
    }
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

  async getSingleQuiz(quizId: string): Promise<Quiz> {
    await this.ensureAuthenticated();
    this.validateQuizId(quizId);
    const quiz = await this.getSingleQuizUseCase.execute(quizId);
    return this.presentQuiz(quiz);
  }

  async getAllQuizes(category?: string): Promise<Quiz[]> {
    await this.ensureAuthenticated();
    this.validateCategory(category);
    const quizzes = await this.getAllQuizzesUseCase.execute(category);
    return quizzes.map((q) => this.presentQuiz(q));
  }

  async getQuizResult(
    quizId: string,
    userAnswer: string
  ): Promise<{ correct: boolean; correctAnswer: string }> {
    await this.ensureAuthenticated();
    this.validateQuizId(quizId);
    this.validateUserAnswer(userAnswer);
    const result = await this.getQuizResultUseCase.execute(quizId, userAnswer);
    return this.presentQuizResult(result);
  }

 
  private presentQuiz(quiz: Quiz) {
    return {
      id: quiz.id,
      question: quiz.question,
      choices: quiz.choices,
      hint: quiz.hint,
      isAnswered: quiz.isAnswered,
      category : quiz.category,
      answer : quiz.answer
    };

  }

  private presentQuizResult(result: { correct: boolean; correctAnswer: string }) {
    return {
      correct: result.correct,
      correctAnswer: result.correctAnswer,
    };
  }
}
