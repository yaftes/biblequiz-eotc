import { QuizRepository } from "@/src/infrastructure/repositories/quiz.repository";
import { AuthRepository } from "@/src/infrastructure/repositories/auth.repository";
import { GetSingleQuizUseCase } from "@/src/application/use-cases/quiz/get_single_quiz_usecase";
import { GetQuizResultUseCase } from "@/src/application/use-cases/quiz/get_quiz_result_usecase";
import { SignUpWithEmailUseCase } from "@/src/application/use-cases/auth/sign_up_with_email_usecase";
import { SignInWithEmailUseCase } from "@/src/application/use-cases/auth/sign_in_with_email_usecase";
import { SignInWithProviderUseCase } from "@/src/application/use-cases/auth/sign_in_with_provider_usecase";
import { SignOutUseCase } from "@/src/application/use-cases/auth/sign_out_usecase";
import { GetCurrentUserUseCase } from "@/src/application/use-cases/auth/get_current_user_usecase";
import {supabase} from "../drizzle/supabase_client";
import { GetAllQuizzesUseCase } from "@/src/application/use-cases/quiz/get_all_quizes_usecase";
import { QuizController } from "@/src/interface-adapters/quiz/quiz.controller";
import { AuthController } from "@/src/interface-adapters/auth/auth.controller";



const quizRepo = new QuizRepository(supabase);
const authRepo = new AuthRepository(supabase);


const getSingleQuizUseCase = new GetSingleQuizUseCase(quizRepo);
const getAllQuizzesUseCase = new GetAllQuizzesUseCase(quizRepo);
const getQuizResultUseCase = new GetQuizResultUseCase(quizRepo);

const signUpWithEmailUseCase = new SignUpWithEmailUseCase(authRepo);
const signInWithEmailUseCase = new SignInWithEmailUseCase(authRepo);
const signInWithProviderUseCase = new SignInWithProviderUseCase(authRepo);
const signOutUseCase = new SignOutUseCase(authRepo);
const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepo);


export const quizController = new QuizController(
  getSingleQuizUseCase,
  getAllQuizzesUseCase,
  getQuizResultUseCase,
  getCurrentUserUseCase
);

export const authController = new AuthController(
  signUpWithEmailUseCase,
  signInWithEmailUseCase,
  signInWithProviderUseCase,
  signOutUseCase,
  getCurrentUserUseCase
);
