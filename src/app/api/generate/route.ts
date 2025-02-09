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

function engineerPrompt(userPrompt: string, palette: string) {
  const colors = COLOR_PALETTES[palette as keyof typeof COLOR_PALETTES] || COLOR_PALETTES.modern;
  
  return `Create a minimalist vector illustration based on: "${userPrompt}"

Style Requirements:
1. Use ONLY these specific colors: ${colors.join(', ')}
2. Create clean, geometric vector shapes
3. Maintain minimalist design principles
4. Ensure strong visual hierarchy
5. Include subtle gradients only when necessary
6. Make it suitable for both light and dark backgrounds

The illustration should be professional, scalable, and immediately recognizable.`;
}

export async function POST(req: NextRequest) {
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
      model: "dall-e-2",
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