import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = "1234";
const ADMIN_TOKEN = "macon-admin-session-v1";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_auth", ADMIN_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
