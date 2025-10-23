// File: /app/api/profile/route.ts
import { NextResponse } from "next/server";
import { authController } from "@/di/container";

export async function GET() {
  try {
    const profile = await authController.getUserProfile();
    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
