import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from '@/hooks/use-toast';
import { DownloadImageOptions, GenerateImageResponse } from '@/types/image';
import { GenerateImageParams } from '@/types/image';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // This is a native JavaScript error (e.g., TypeError, RangeError)
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    // This is a string error message
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    // This is an unknown type of error
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

const BASE64_IMAGE_PREFIX = "data:image/png;base64,";

/**
 * Generates an image using the API
 */
export async function generateImage({
  prompt,
  palette,
}: GenerateImageParams): Promise<GenerateImageResponse> {
  try {
    if (!prompt) {
      throw new Error("Prompt is required");
    }

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, palette }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to generate image");
    }

    const data = await response.json();
    return {
      photo: `${BASE64_IMAGE_PREFIX}${data.photo}`,
      success: true,
    };
  } catch (error) {
    console.error("Error generating image:", error);
    return {
      photo: "",
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate image",
    };
  }
}

/**
 * Downloads an image from a URL or base64 string
 */
export async function downloadImage(
  imageSource: string,
  options: DownloadImageOptions = {}
): Promise<boolean> {
  const {
    fileName = `generated-image-${Date.now()}`,
    format = 'png'
  } = options;

  try {
    // Validate image source
    if (!imageSource) {
      throw new Error("Image source is required");
    }

    // Handle the image download
    const response = await fetch(imageSource);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    // Create and trigger download link
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.${format}`;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Error downloading image:", error);
    toast({
      title: "Error",
      description: "Failed to download image",
      variant: "destructive",
    });
    return false;
  }
}
