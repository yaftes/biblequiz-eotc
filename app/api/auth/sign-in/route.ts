import { authController } from "@/di/container";


export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await authController.signInWithEmail(email, password);
  return Response.json(user);
}
