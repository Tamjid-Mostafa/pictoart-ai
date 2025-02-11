import engineerPrompt from "@/components/Prompt";
import { ratelimit } from "@/lib/rateLimiter";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";




export async function POST(req: NextRequest) {
  // Identify the client (using the x-forwarded-for header or fallback)
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  // Rate limit check (currently commented out)
  const { success } = await ratelimit.limit(ip);
  // if (!success) {
  //   return NextResponse.json(
  //     {
  //       error: "Too Many Requests",
  //       message:
  //         "You have reached your daily limit of 3 requests. Please try again after 24 hours.",
  //     },
  //     { status: 429 }
  //   );
  // }

  try {
    const { prompt, palette = "modern" } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const engineeredPrompt = engineerPrompt(prompt, palette);
    // console.log("Engineered Prompt:", engineeredPrompt);

    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: engineeredPrompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
      quality: "standard",
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
