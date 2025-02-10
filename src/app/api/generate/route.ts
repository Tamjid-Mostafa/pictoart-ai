import { COLOR_PALETTES } from "@/lib/color-palettes";
import { ratelimit } from "@/lib/rateLimiter";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";



/**
 * Creates a detailed prompt that emphasizes color usage through multiple approaches
 */
function engineerPrompt(userPrompt: string, palette: string): string {
  const paletteInfo = 
    COLOR_PALETTES[palette as keyof typeof COLOR_PALETTES] || 
    COLOR_PALETTES.none;

  // If no palette is selected, return just the user prompt
  if (palette === 'none') {
    return `Create an image based on this request:

Creative Request: ${userPrompt}

Generate the image using any colors and style that best suits the creative request.`;
  }

  // Otherwise, return the color-restricted prompt
  const colorInstructions = paletteInfo.colors
    .map((hex, i) => `${paletteInfo.descriptions[i]} (${hex})`)
    .join(", ");

  return `Create an image with the following STRICT color requirements:

1. MANDATORY COLOR PALETTE: You must ONLY use these exact colors: ${colorInstructions}
2. DO NOT use any colors outside this palette
3. Style Guide: The image should be ${paletteInfo.style}

Creative Request: ${userPrompt}

Additional Color Instructions:
- Ensure every element in the image uses ONLY the specified colors
- Use color blocking and clear shapes to maintain color accuracy
- Prioritize the dominant colors based on the subject matter
- Create clear distinction between elements using the provided palette

The final image must strictly adhere to this color palette with no additional colors or variations.`;
}
export async function POST(req: NextRequest) {
  // Identify the client (using the x-forwarded-for header or fallback)
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  // Rate limit check (currently commented out)
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
      model: "dall-e-3",
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
