import { ratelimit } from "@/lib/rateLimiter";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

// Predefined color palettes
const COLOR_PALETTES = {
  modern: ['#2D3436', '#636E72', '#B2BEC3', '#DFE6E9'],
  nature: ['#27AE60', '#2ECC71', '#F1C40F', '#E67E22'],
  ocean: ['#1ABC9C', '#3498DB', '#34495E', '#ECF0F1'],
  sunset: ['#E74C3C', '#C0392B', '#F39C12', '#F1C40F'],
  pastel: ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA']
};

function engineerPrompt(userPrompt: string, palette: string): string {
  const colors = COLOR_PALETTES[palette as keyof typeof COLOR_PALETTES] || COLOR_PALETTES.modern;
  console.log(colors);
  return `You are a master digital illustrator at PictoArt AI, specializing in vector art. Your task is to create a stunning vector illustration based on the following criteria:

1. **User Theme**: "${userPrompt}"
2. **Color Palette**: Use the following color palette as your guide: ${colors.join(", ")}. These colors should dominate the illustration, with harmonious blending and thoughtful use of gradients (if applicable).
3. **Style**: Minimalist, clean vector art with a modern aesthetic. Ensure sharp, crisp lines and bold shapes.
4. **Composition**:
   - Central Subject: Create a clear focal point aligned with the theme "${userPrompt}".
   - Background: Subtle and complementary to enhance the subject without overpowering it.
   - Negative Space: Use strategic negative space for a professional and balanced look.
5. **Artistic Details**:
   - Avoid realism or complex textures—focus on flat, layered vector shapes.
   - Use gradients sparingly, only to add depth or subtle transitions.
   - Maintain a geometric or organic flow depending on the theme.
6. **Adaptability**:
   - Ensure the illustration works well for both square and vertical formats.
   - Make it scalable without losing clarity, suitable for both web and print.

The final illustration must be visually appealing, vibrant, and reflective of the provided theme and color palette, while staying true to the vector art style.`;
}


export async function POST(req: NextRequest) {
  // Identify the client (using the x-forwarded-for header or fallback)
  // const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  // // Check rate limit for this IP
  // const { success } = await ratelimit.limit(ip);
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
    const { prompt, palette = 'modern' } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const engineeredPrompt = engineerPrompt(prompt, palette);
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: engineeredPrompt,
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