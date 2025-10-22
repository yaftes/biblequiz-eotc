import { authController } from "@/di/container";


export async function POST(req: Request) {
  const {name, email, password } = await req.json();

  const user = await authController.signUpWithEmail(name,email, password);
  return Response.json(user);
}
