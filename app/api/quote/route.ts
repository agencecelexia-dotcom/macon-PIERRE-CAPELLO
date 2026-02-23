import { NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/schemas/quote-form";
import { saveSubmission } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = quoteFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const { consent, ...data } = result.data;
    void consent;
    saveSubmission(data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
