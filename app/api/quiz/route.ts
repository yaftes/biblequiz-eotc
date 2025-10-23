import { quizController } from "@/di/container";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category") || undefined;

    const quizzes = await quizController.getAllQuizzes(category);

    return NextResponse.json({ success: true, data: quizzes });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
