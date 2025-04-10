// postStore.ts
import { create } from "zustand";
import {
  getAllPosts,
  createPost,
  toggleLike,
  deletePost as deletePostFromDB,
} from "@/lib/actions/post.action";
import { toast } from "@/hooks/use-toast";
import { deleteImageFromCloudinary } from "@/lib/delete-from-cloudinary";

interface PostState {
  posts: Post[];
  isSharing: boolean;
  sharedImages: Set<string>;
  animatingPostId: string | null;
  setPosts: (posts: Post[]) => void;
  fetchPosts: () => Promise<void>;
  shareImage: (imageData: {
    userId: string;
    generatedImage: string;
    prompt: string;
    palette: string;
  }) => Promise<void>;
  toggleLike: (postId: string, userId: string) => Promise<void>;
  deletePost: (postId: string, publicId: string) => Promise<void>;
}

export const usePostStore = create<PostState>()((set, get) => ({
  posts: [],
  isSharing: false,
  sharedImages: new Set<string>(),
  animatingPostId: null,

  setPosts: (posts) => set({ posts }),

  fetchPosts: async () => {
    try {
      const { data } = await getAllPosts({ filter: "recent" });
      set({ posts: data?.items || [] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch community posts",
        variant: "destructive",
      });
    }
  },

  shareImage: async ({ userId, generatedImage, prompt, palette }) => {
    const { sharedImages } = get();

    if (sharedImages.has(generatedImage)) {
      toast({
        title: "Already Shared",
        description: "This image has already been shared to the community",
      });
      return;
    }

    set({ isSharing: true });

    try {
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: generatedImage }),
      });

      if (!uploadResponse.ok) throw new Error("Failed to upload image");

      const { url: cloudinaryUrl } = await uploadResponse.json();
      const { data } = await createPost({
        prompt,
        photo: cloudinaryUrl,
        palette,
        user: userId,
      });

      const updatedSharedImages = new Set(sharedImages);
      updatedSharedImages.add(generatedImage);

      set({
        animatingPostId: data?._id,
        sharedImages: updatedSharedImages,
      });
      set({ posts: [data as Post, ...get().posts] });
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

  toggleLike: async (postId: string, userId: string) => {
    const { posts } = get();

    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        const isCurrentlyLiked = post.isLiked;
        return {
          ...post,
          isLiked: !isCurrentlyLiked,
          likes: isCurrentlyLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    });

    set({ posts: updatedPosts });

    try {
      await toggleLike(postId, userId);
    } catch (error) {
      set({ posts }); // Revert on error
      console.error(error);
    }
  },
  deletePost: async (postId, publicId) => {
    try {
      // 1. Delete from DB
      const deleteResponse = await deletePostFromDB(postId);
      if (!deleteResponse.success) {
        toast({
          title: "Error",
          description: "Failed to delete post",
          variant: "destructive",
        });
        return;
      }

      // 2. Delete from Cloudinary
      const result = await deleteImageFromCloudinary(publicId);
      if (!result.success) {
        toast({
          title: "Error",
          description: result.error || "Failed to delete image",
          variant: "destructive",
        });
        return;
      }

      // 3. Update local state
      const updatedPosts = get().posts.filter((post) => post._id !== postId);
      set({ posts: updatedPosts });

      toast({
        title: "Deleted",
        description: "Post successfully removed from community.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the post.",
        variant: "destructive",
      });
      console.error("Delete post error:", error);
    }
  },
}));
