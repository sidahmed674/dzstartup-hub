import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, locale = "en" } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // In production, save to database
    console.log(`Newsletter subscription: ${email} (${locale})`);

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
      email,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
