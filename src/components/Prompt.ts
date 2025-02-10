import { COLOR_PALETTES } from "@/lib/color-palettes";

/**
 * Creates a detailed prompt that emphasizes color usage through multiple approaches
 */
export default function engineerPrompt(
  userPrompt: string,
  palette: string
): string {
  const paletteInfo =
    COLOR_PALETTES[palette as keyof typeof COLOR_PALETTES] ||
    COLOR_PALETTES.none;

  if (palette === "none") {
    return `Create an image based on this request:

Creative Request: ${userPrompt}

Generate a focused composition with:
- Central, dominant main subject
- Minimal negative space
- No background elements
- Clean, essential elements only`;
  }

  const colorInstructions = paletteInfo.colors
    .map((hex, i) => `${paletteInfo.descriptions[i]} (${hex})`)
    .join(", ");

  return `Create an image with STRICT requirements:

1. MANDATORY COLOR PALETTE: ONLY use these colors: ${colorInstructions}
2. COMPOSITION RULES:
   - Central, prominent main object filling 80%+ of frame
   - Minimal negative space around subject
   - No background elements/patterns
   - No decorative elements unrelated to request
3. COLOR APPLICATION:
   - Use ${paletteInfo.colors[0]} as dominant subject color
   - Apply other colors ONLY as essential accents
   - Hard-edged color blocks (no gradients/blending)
4. Style: ${paletteInfo.style}

Creative Request: ${userPrompt}

FORBIDDEN:
- Floating colors
- Color swatches/bars
- Empty spaces
- Patterned backgrounds
- Multiple small objects

Final output must show ONLY the essential subject with palette colors, filling the frame completely.`;
}
