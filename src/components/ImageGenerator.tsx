"use client";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Preview from "@/components/Preview";
import ColorPaletteSelector from "@/components/ColorPaletteSelector";
import PromptInput from "@/components/PromptInput";
import { useImageGeneratorStore } from "../../store/image-generator";
import { CommunityPosts } from "./CommunityPosts";
import Suggestions from "./SuggestionComponent";
import { useUser } from "@clerk/nextjs";
import { useScrollOnMobile } from "@/hooks/useScrollMobile";
import { Loader2, Sparkles } from "lucide-react";

export default function ImageGenerator() {
  const {
    setPrompt,
    setPalette,
    generateImage,
    downloadImage,
    shareImage,
    fetchPosts,
    prompt,
    palette,
    generatedImage,
    isGenerating,
    posts,
    isSharing,
    isImageShared, // Add this new selector
  } = useImageGeneratorStore();

  const { user } = useUser();

  const handleShare = async () => {
    if (!user?.id) return;
    await shareImage(user.id);
  };
  useEffect(() => {
    const { animatingPostId } = useImageGeneratorStore.getState();
    if (animatingPostId) {
      const element = document.getElementById(animatingPostId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [posts]);
  useEffect(() => {
    if ((isGenerating || generatedImage) && window.innerWidth < 1024) {
      const preview = document.getElementById("preview");
      preview?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isGenerating, generatedImage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Check if current image has been shared
  const isCurrentImageShared = generatedImage && isImageShared(generatedImage);

  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      <main className="container mx-auto px-6 py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-1 space-y-4">
            <ColorPaletteSelector palette={palette} setPalette={setPalette} />
            <PromptInput
              prompt={prompt}
              onPromptChange={setPrompt}
              onGenerate={generateImage}
              isGenerating={isGenerating}
            />
            <ScrollArea className="h-[500px]">
              <Suggestions onSelectSuggestion={setPrompt} />
            </ScrollArea>
          </div>

          {/* Preview Panel */}
          <Preview
            prompt={prompt}
            isGenerating={isGenerating}
            generatedImage={generatedImage}
          />

          {/* Actions & Community Panel */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex flex-col gap-2">
              <Button
                onClick={downloadImage}
                disabled={!generatedImage}
                className="w-full"
              >
                Download
              </Button>
              <Button
                onClick={handleShare}
                disabled={!generatedImage || isSharing || !!isCurrentImageShared}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 
             bg-gradient-to-r from-indigo-500 to-purple-500 
             text-white font-semibold rounded-lg shadow-md 
             transition-all duration-300 
             disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSharing ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Sharing...
                  </>
                ) : isCurrentImageShared ? (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Already Shared
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
                    Share
                  </>
                )}
              </Button>
            </div>
            <CommunityPosts posts={posts} />
          </div>
        </div>
      </main>
    </div>
  );
}
