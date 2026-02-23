import { NextRequest, NextResponse } from "next/server";
import { saveEvent } from "@/lib/storage";

export async function POST(request: NextRequest) {
  try {
    const { type, page, label } = await request.json();
    if (!type || !page) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }

    const ua = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";

    saveEvent({ type, page, label, ua, referrer });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
