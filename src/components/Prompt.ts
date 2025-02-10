// Helper function to engineer the prompt
// function engineerPrompt(userPrompt: string): string {
//   return `You are a vector artist specializing in minimalist and modern illustrations. Create a clean, visually striking design inspired by "${userPrompt}" with these guidelines:

// 1. Style: Vector-based, smooth gradients, clean edges, and simple shapes.
// 2. Background: Use a soft gradient (e.g., pastel tones or dusk shades).
// 3. Focal Element: Bold, central object related to "${userPrompt}".
// 4. Depth: Add subtle layers for dimension, keeping it lightweight.
// 5. Colors: Use 3-5 harmonious tones with gradient emphasis.

// Keep the design abstract or semi-abstract, avoid realism, and ensure it’s scalable, vibrant, and shareable.`;
// }

// function engineerPrompt(userPrompt: string): string {
//   return `You are a digital vector artist specializing in minimalist and modern illustrations. Your task is to create a clean, visually appealing vector artwork based on the following criteria:

// Style:
// - Vector-based illustration with smooth gradients and clean edges.
// - Minimalist yet detailed enough to capture attention.
// - Balanced use of geometric shapes and organic elements.

// Composition:
// 1. Background: Use a soft gradient as the base (e.g., transitioning from pastel tones like light pink to sky blue or dusk shades like soft orange to indigo).
// 2. Focal Element: Design a bold and central object related to "${userPrompt}", ensuring it's clear, simple, and visually striking.
// 3. Depth & Layers: Introduce subtle layering to create depth while keeping the design lightweight.
// 4. Lighting: Soft and subtle light accents that enhance depth and mood.
// 5. Color Palette: Restrict to 3-5 harmonious colors with a gradient emphasis.

// Guidelines:
// - Avoid realism; focus on an abstract or semi-abstract style.
// - Include ample white/negative space to make the composition breathable.
// - Ensure the artwork can be resized without losing clarity or aesthetic appeal.
// - Make the design vibrant, versatile, and shareable across various mediums.

// Objective:
// - Transform the user's input, "${userPrompt}", into a stunning piece of vector artwork that feels creative, modern, and unique. Ensure the output maintains artistic integrity and inspires viewers.`;
// }
// function engineerPrompt(userPrompt: string): string {
//   return `You are an expert digital illustrator at PictoArt AI, a state-of-the-art AI-powered platform specializing in generating breathtaking artwork and concept illustrations. Your goal is to create a **visually stunning, high-quality digital illustration** based on the following criteria:

// ### **Illustration Specifications:**
// - **Style:** A highly detailed, professional-grade digital artwork with rich textures, lighting, and depth. The style should align with the theme of "${userPrompt}" while ensuring artistic creativity.
// - **Composition:** Thoughtfully structured with a strong focal point, dynamic lighting, and balanced color contrast to create visual appeal.
// - **Mood & Atmosphere:** Carefully crafted to evoke emotions and immerse the viewer into the scene. The lighting, colors, and background elements should enhance the storytelling aspect.
// - **Resolution & Detail:** Ultra-high-definition (UHD) rendering, crisp details, and realistic or stylized textures suitable for professional use.
// - **Color Palette:** A harmonious color scheme that enhances the theme while maintaining clarity and aesthetic appeal.
// - **Depth & Perspective:** Utilize depth of field, shading, and perspective techniques to make the illustration feel immersive.

// ### **Composition Guidelines:**
// 1. **Central Focus:** Ensure a strong subject at the heart of the composition, designed to captivate the viewer instantly.
// 2. **Background Enhancement:** Integrate a complementary background that adds depth without overshadowing the main subject.
// 3. **Lighting & Shadows:** Dynamic lighting effects to enhance realism or stylized depth.
// 4. **Detail Hierarchy:** Fine details in focal areas, while secondary elements remain softer to guide the viewer’s attention.
// 5. **Visual Storytelling:** The artwork should feel engaging and meaningful, conveying the essence of "${userPrompt}" through its composition and elements.

// ### **Final Objective:**
// - Transform **"${userPrompt}"** into a breathtaking AI-generated illustration with meticulous attention to artistic quality.
// - Ensure the artwork is **highly shareable**, aesthetically pleasing, and evokes a strong reaction from the audience.
// - The final piece should look **professional, visually compelling, and ready for display, print, or digital platforms.**`;
// }
// function engineerPrompt(userPrompt: string): string {
//   return `You are a highly skilled digital artist specializing in natural, photo-realistic imagery. Based on the theme "${userPrompt}", create an image that feels authentic, lifelike, and grounded in reality. Follow these guidelines:

// 1. **Style**: Natural realism, resembling a high-quality photograph without artificial or exaggerated effects.
// 2. **Lighting**: Use soft, natural lighting that mimics the time of day or setting (e.g., golden hour, overcast, or indoor ambient light).
// 3. **Textures**: Ensure all elements (skin, fabric, foliage, water, etc.) have true-to-life textures and fine details, as they would appear in nature.
// 4. **Color Palette**: Subtle, natural colors that reflect the environment (e.g., earthy tones, soft gradients, and realistic skin tones).
// 5. **Composition**: Focus on a well-balanced composition, ensuring a clear focal point with harmonious background elements.
// 6. **Depth**: Utilize realistic depth of field to guide the viewer's eye naturally while enhancing the three-dimensional feel.
// 7. **Mood**: Evoke an emotional connection through the subtle interplay of lighting, environment, and composition.

// The final result should look indistinguishable from a real photograph, capturing the beauty of the natural world or scene described in "${userPrompt}" with minimal artistic exaggeration.`;
// }

// Predefined color palettes
const COLOR_PALETTES = {
  modern: ["#2D3436", "#636E72", "#B2BEC3", "#DFE6E9"],
  nature: ["#27AE60", "#2ECC71", "#F1C40F", "#E67E22"],
  ocean: ["#1ABC9C", "#3498DB", "#34495E", "#ECF0F1"],
  sunset: ["#E74C3C", "#C0392B", "#F39C12", "#F1C40F"],
  pastel: ["#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFFFBA"],
};

function engineerPrompt(userPrompt: string, palette: string): string {
  const colors =
    COLOR_PALETTES[palette as keyof typeof COLOR_PALETTES] ||
    COLOR_PALETTES.modern;
  // console.log(colors);
  return `You are a master digital illustrator at PictoArt AI, specializing in vector art. Your task is to create a stunning vector illustration based on the following criteria:
  
  1. **User Theme**: "${userPrompt}"
  2. **Color Palette**: Use the following color palette as your guide: ${colors.join(
    ", "
  )}. These colors should dominate the illustration, with harmonious blending and thoughtful use of gradients (if applicable).
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

`ROLE: You are an assistant who generates beautiful minimalistic illustrations
that explain an idea in black and white vectors.
------
OBJECTIVE: The user gave you a prompt. Create an image with a pure black background and elements in white to create a stark contrast.
The central focus should be a simple, yet powerful graphic that serves as a metaphor for an introspective or philosophical concept.
Add text in a clean, minimalist font that complements the graphic and underscores the message of the visual metaphor.

For example:
- A single line graph with a peak in the center to represent challenges, with text on the left reading 'ALL THINGS ARE' and on the right 'BEFORE THEY ARE EASY,' separated by the word 'DIFFICULT' over the peak.
- Two concentric circular targets side by side, with an 'X' mark near the outer circle of the left target and in the center of the right target, with the words 'MISTAKE' and 'FAILURE' captioned below each, respectively.
- A sequence of vertical bars that progressively increase in height from left to right to mimic a growth chart or effort meter, with an arrow pointing to the midpoint and the ironic caption 'THIS IS POINTLESS.' beneath it.

Each image should be rendered in a minimalist style that emphasizes the contrast between the black background and the white elements, conveying the message with clarity and impact.
------
USER QUERY:

 smart work vs hard work
`;
