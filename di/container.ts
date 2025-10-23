import { supabase } from "../drizzle/supabase_client";
import { AuthRepository } from "@/src/infrastructure/repositories/auth.repository";
import { GetAllQuizzesUseCase } from "@/src/application/use-cases/quiz/get_all_quizes_usecase";
import { SignUpWithEmailUseCase } from "@/src/application/use-cases/auth/sign_up_with_email_usecase";
import { SignInWithEmailUseCase } from "@/src/application/use-cases/auth/sign_in_with_email_usecase";
import { SignInWithProviderUseCase } from "@/src/application/use-cases/auth/sign_in_with_provider_usecase";
import { SignOutUseCase } from "@/src/application/use-cases/auth/sign_out_usecase";
import { GetCurrentUserUseCase } from "@/src/application/use-cases/auth/get_current_user_usecase";
import { QuizController } from "@/src/interface-adapters/quiz/quiz.controller";
import { AuthController } from "@/src/interface-adapters/auth/auth.controller";
import { QuizRepository } from "@/src/infrastructure/repositories/quiz.repository";
import SubmitQuizUseCase from "@/src/application/use-cases/quiz/submit_quiz_usecase";
import { RecalculateRankUseCase } from "@/src/application/use-cases/auth/recalculate_rank_usecase";
import { GetUserProfileUseCase } from "@/src/application/use-cases/auth/get_user_profile_usecase";


const quizRepo = new QuizRepository(supabase);
const authRepo = new AuthRepository(supabase);


const getAllQuizzesUseCase = new GetAllQuizzesUseCase(quizRepo);
const submitQuizUseCase = new SubmitQuizUseCase(quizRepo);

const signUpWithEmailUseCase = new SignUpWithEmailUseCase(authRepo);
const signInWithEmailUseCase = new SignInWithEmailUseCase(authRepo);
const signInWithProviderUseCase = new SignInWithProviderUseCase(authRepo);
const signOutUseCase = new SignOutUseCase(authRepo);
const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepo);
const reCalculateRankUseCase = new RecalculateRankUseCase(authRepo);
const getUserProfileUseCase  = new GetUserProfileUseCase(authRepo);



export const quizController = new QuizController(
  submitQuizUseCase,
  getAllQuizzesUseCase,
  getCurrentUserUseCase,
  reCalculateRankUseCase,

);



export const authController = new AuthController(
  signUpWithEmailUseCase,
  signInWithEmailUseCase,
  signInWithProviderUseCase,
  signOutUseCase,
  getCurrentUserUseCase,
  getUserProfileUseCase
);
