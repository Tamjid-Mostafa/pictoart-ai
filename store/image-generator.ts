import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { toast } from "@/hooks/use-toast";
import { createPost, getAllPosts } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { downloadImage, generateImage } from "@/lib/utils";

export interface ImageGeneratorState {
  // Existing state
  prompt: string;
  palette: string;
  generatedImage: string;
  isGenerating: boolean;
  isSharing: boolean;
  posts: Post[];
  animatingPostId: string | null;
  tempImageUrl: string | null;
  
  // New state for duplicate prevention
  sharedImages: Set<string>;
  
  // Existing actions
  setPrompt: (prompt: string) => void;
  setPalette: (palette: string) => void;
  setGeneratedImage: (image: string) => void;
  setPosts: (posts: Post[]) => void;
  setAnimatingPostId: (postId: string | null) => void;
  setTempImageUrl: (url: string | null) => void;
  
  // Async actions
  generateImage: () => Promise<void>;
  downloadImage: () => Promise<void>;
  shareImage: (userId: string) => Promise<void>;
  fetchPosts: () => Promise<void>;
  
  // New helper method
  isImageShared: (imageUrl: string) => boolean;
}

export const useImageGeneratorStore = create<ImageGeneratorState>()(
  devtools(
    (set, get) => ({
      // Existing initial state
      prompt: "",
      palette: "modern",
      generatedImage: "",
      isGenerating: false,
      isSharing: false,
      posts: [],
      animatingPostId: null,
      tempImageUrl: null,
      
      // New state for duplicate prevention
      sharedImages: new Set<string>(),
      
      // Existing basic actions
      setPrompt: (prompt) => set({ prompt }),
      setPalette: (palette) => set({ palette }),
      setGeneratedImage: (image) => set({ generatedImage: image }),
      setPosts: (posts) => set({ posts }),
      setTempImageUrl: (url) => set({ tempImageUrl: url }),
      setAnimatingPostId: (postId) => set({ animatingPostId: postId }),
      
      // New helper method
      isImageShared: (imageUrl: string) => get().sharedImages.has(imageUrl),
      
      // Modified async actions
      generateImage: async () => {
        const { prompt, palette } = get();
        
        if (!prompt) return;
        
        set({ isGenerating: true, generatedImage: "" });
        
        const result = await generateImage({ prompt, palette });
        
        if (result.success) {
          set({
            generatedImage: result.photo,
            isGenerating: false,
          });
        } else {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
          set({ isGenerating: false });
        }
      },

      shareImage: async (userId: string) => {
        const { generatedImage, prompt, palette, sharedImages } = get();

        if (!generatedImage || !userId) return;
        
        // Check if image has already been shared
        if (sharedImages.has(generatedImage)) {
          toast({
            title: "Already Shared",
            description: "This image has already been shared to the community",
            variant: "default",
          });
          return;
        }

        set({
          isSharing: true,
          tempImageUrl: generatedImage,
        });

        try {
          const user = await getUserById(userId);
          if (!user) {
            throw new Error("User not found");
          }

          const uploadResponse = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: generatedImage }),
          });

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload image");
          }

          const { url: cloudinaryUrl } = await uploadResponse.json();

          const post = await createPost({
            prompt,
            photo: cloudinaryUrl,
            palette,
            userId: user._id,
          });

          // Add the shared image to the Set
          const updatedSharedImages = new Set(sharedImages);
          updatedSharedImages.add(generatedImage);
          
          set({ 
            animatingPostId: post._id,
            sharedImages: updatedSharedImages
          });
          
          // Refresh posts after sharing
          await get().fetchPosts();

          toast({
            title: "Success",
            description: "Your creation has been shared with the community",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to share your post",
            variant: "destructive",
          });
        } finally {
          set({ isSharing: false });
        }
      },

      // Existing fetchPosts implementation
      fetchPosts: async () => {
        try {
          const fetchedPosts = await getAllPosts();
          set({ posts: fetchedPosts });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch community posts",
            variant: "destructive",
          });
        }
      },

      downloadImage: async () => {
        const { generatedImage } = get();
        if (!generatedImage) return;

        await downloadImage(generatedImage, {
          fileName: `ai-generated-image-${Date.now()}`,
          format: "png",
        });
      },
    }),
    { name: "image-generator-store" }
  )
);