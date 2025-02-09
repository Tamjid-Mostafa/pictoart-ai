import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { ratelimit } from "@/lib/rateLimiter";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: NextRequest) {
  // Identify the client (using the x-forwarded-for header or fallback)
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  // Check rate limit for this IP
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      {
        error: "Too Many Requests",
        message:
          "You have reached your daily limit of 3 requests. Please try again after 24 hours.",
      },
      { status: 429 }
    );
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = response.data[0].b64_json;
    return NextResponse.json({ photo: image });
  } catch (error: any) {
    console.error("DALL-E API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate image" },
      { status: 500 }
    );
  }
}
