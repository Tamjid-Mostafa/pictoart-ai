// imageGenerationStore.ts
import { create } from "zustand";
import { downloadImage as downloadImageUtil, generateImage } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { downloadPost } from "@/lib/actions/post.action";

interface ImageGenerationState {
  prompt: string;
  palette: string;
  generatedImage: string;
  isGenerating: boolean;
  isDownloading: boolean;
  setPrompt: (prompt: string) => void;
  setPalette: (palette: string) => void;
  generateImage: () => Promise<void>;
  downloadImage: () => Promise<void>;
  downloadImageByURL: (postId: string) => Promise<void>;
}

export const useImageGenerationStore = create<ImageGenerationState>()((set, get) => ({
  prompt: "",
  palette: "modern",
  generatedImage: "",
  isGenerating: false,
  isDownloading: false,

  setPrompt: (prompt) => set({ prompt }),
  setPalette: (palette) => set({ palette }),


  generateImage: async () => {
    const { prompt, palette } = get();
    if (!prompt) return;
    
    set({ isGenerating: true, generatedImage: "" });
    const result = await generateImage({ prompt, palette });
    
    if (result.success) {
      set({ generatedImage: result.photo, isGenerating: false });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      set({ isGenerating: false });
    }
  },
  downloadImage: async () => {
    const { generatedImage } = get();
    if (!generatedImage) {
      toast({
        title: "Error",
        description: "No image to download",
        variant: "destructive",
      });
      return;
    }

    set({ isDownloading: true });
    try {
      await downloadImageUtil(generatedImage, {
        fileName: `ai-generated-image-${Date.now()}`,
        format: "png",
      });

      toast({
        title: "Success",
        description: "Image downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download image",
        variant: "destructive",
      });
    } finally {
      set({ isDownloading: false });
    }
  },

  downloadImageByURL: async (postId: string) => {
    set({ isDownloading: true });
    try {
      // First update the download count in the database
      const response = await downloadPost(postId);
      
      if (!response.data?.photo) {
        throw new Error("No image to download");
      }
      // Then download the image
      await downloadImageUtil(response.data?.photo, {
        fileName: `ai-generated-image-${Date.now()}`,
        format: "png",
      });

      toast({
        title: "Success",
        description: "Image downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download image",
        variant: "destructive",
      });
    } finally {
      set({ isDownloading: false });
    }
  },
}));