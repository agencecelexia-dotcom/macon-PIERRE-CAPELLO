import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readAnalytics } from "@/lib/storage";

const ADMIN_TOKEN = "macon-admin-session-v1";

export async function GET() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");
  if (auth?.value !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json(readAnalytics());
}
