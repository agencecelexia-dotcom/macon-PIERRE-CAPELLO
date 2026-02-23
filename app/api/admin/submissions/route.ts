import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  readSubmissions,
  markSubmissionRead,
  deleteSubmission,
} from "@/lib/storage";

const ADMIN_TOKEN = "macon-admin-session-v1";

async function checkAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");
  return auth?.value === ADMIN_TOKEN;
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json(readSubmissions());
}

export async function PATCH(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    const ok = markSubmissionRead(id);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    const ok = deleteSubmission(id);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
