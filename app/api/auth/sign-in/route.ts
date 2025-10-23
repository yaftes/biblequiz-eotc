import { authController } from "@/di/container";
import { AuthError } from "@/src/entities/errors/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await authController.signInWithEmail(email, password);
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    let status = 500;
    let message = "Internal Server Error";

    if (error instanceof AuthError) {
      status = 400;
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return new Response(JSON.stringify({ error: message }), { status });
  }
}
