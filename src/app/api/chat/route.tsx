import { NextResponse } from "next/server";
import { getChatResponse } from "../../../../lib/langchain";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }
    const response = await getChatResponse(message);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}