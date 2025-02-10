"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Image as ImageIcon,
  Palette,
  Send,
  Wand2,
  Share,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import Preview from "@/components/Preview";
import Suggestions from "@/components/SuggestionComponent";
import PromptInput from "@/components/PromptInput";
import Image from "next/image";
import { createPost, getAllPosts } from "@/lib/actions/post.action";
import { useAuth, useClerk } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import ColorPaletteSelector from "@/components/ColorPaletteSelector";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [palette, setPalette] = useState("modern");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const { toast } = useToast();
  const { isSignedIn, userId } = useAuth();
  const { openSignIn } = useClerk();

  const handleGenerate = async () => {
    if (!prompt) return;

    if (!isSignedIn) {
      openSignIn();
      return;
    }

    setIsGenerating(true);
    setGeneratedImage("");

    try {
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
      setGeneratedImage(`data:image/png;base64,${data.photo}`);
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const [posts, setPosts] = useState<
    Array<{
      _id: string;
      userId: string;
      prompt: string;
      photo: string;
      user: {
        username: string | null;
      };
    }>
  >([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts();
      // console.log("Fetched posts:", fetchedPosts);
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  const handleShare = async () => {
    if (!generatedImage) return;

    try {
      setIsSharing(true);

      if (!userId) {
        openSignIn();
        return;
      }

      const user = await getUserById(userId);
      if (!user) {
        toast({
          title: "User not found",
          description: "Please sign in to share your post",
        });
        return;
      }

      // Upload to Cloudinary through our API
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: generatedImage,
        }),
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const { url: cloudinaryUrl } = await uploadResponse.json();

      // Create post with Cloudinary URL
      await createPost({
        prompt,
        photo: cloudinaryUrl,
        palette,
        userId: user._id,
      });

      // Refresh posts
      const updatedPosts = await getAllPosts();
      setPosts(updatedPosts);

      toast({
        title: "Post shared",
        description: "Your creation has been shared with the community",
      });
    } catch (error) {
      console.error("Error sharing post:", error);
      toast({
        title: "Error",
        description: "Failed to share your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };
  // console.log(posts.map((post: any) => post));
  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      {/* Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/30 dark:bg-blue-500/20 blur-3xl blob-spin" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/30 dark:bg-purple-500/20 blur-3xl blob" />
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-pink-500/30 dark:bg-pink-500/20 blur-3xl blob-spin" />
      </div>

      <main className="container mx-auto px-6 py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Input and Suggestions */}
          <>
            <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-24 ">
              {/* Color Palette Selector */}
              <ColorPaletteSelector palette={palette} setPalette={setPalette} />

              {/* Prompt Input */}
              <PromptInput
                prompt={prompt}
                onPromptChange={setPrompt}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />

              {/* Suggestions */}
              <ScrollArea className="h-[500px]">
                <Suggestions onSelectSuggestion={setPrompt} />
              </ScrollArea>
            </div>
          </>

          {/* Right Panel: Preview */}
          <Preview
            prompt={prompt}
            isGenerating={isGenerating}
            generatedImage={generatedImage}
          />

          {/* Side Panel: Actions & Posts */}
          <div className="lg:col-span-1 space-y-4">
            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleDownload}
                className="w-full"
                disabled={!generatedImage}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleShare}
                disabled={!generatedImage || isSharing}
              >
                <Share className="mr-2 h-4 w-4" />
                {isSharing ? "Sharing..." : "Share"}
              </Button>
            </div>

            {/* Community Posts */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Community Creations</h3>

              <ScrollArea className="h-[600px]">
                <div className="grid gap-4">
                  {posts?.length > 0 ? (
                    posts.map((post: any) => {
                      // Remove the nested post structure since data is already at top level
                      if (!post?.photo || !post?._id) return null;

                      return (
                        <Card key={post._id} className="overflow-hidden">
                          <div className="aspect-square relative">
                            <Image
                              src={post.photo}
                              alt={post.prompt || "Community creation"}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {post.prompt || "No prompt provided"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Palette: {post.palette}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              by{" "}
                              {post.user?.username
                                ? `@${post.user.username}`
                                : "Anonymous"}
                            </p>
                          </CardContent>
                        </Card>
                      );
                    })
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      No community creations yet
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
