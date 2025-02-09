"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // updated import for Framer Motion
import {
  Sparkles,
  Image as ImageIcon,
  Lightbulb,
  Send,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { useToast } from "@/hooks/use-toast";
import Preview from "@/components/Preview";
import Suggestions from "@/components/SuggestionComponent";
import PromptInput from "@/components/PromptInput";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const { toast } = useToast();
  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setGeneratedImage("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        // Throw error with message from API (this could be the rate limit message)
        throw new Error(errorData.message || "Failed to generate image");
      }
      const data = await response.json();
      // Prepend the data URI scheme to the base64 result
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

  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      {/* Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/30 dark:bg-blue-500/20 blur-3xl blob-spin" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/30 dark:bg-purple-500/20 blur-3xl blob" />
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-pink-500/30 dark:bg-pink-500/20 blur-3xl blob-spin" />
      </div>

      <main className="container mx-auto px-4 py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Input and Suggestions */}
          <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto scrollbar-hide">
            {/* Prompt Input */}
            <PromptInput
              prompt={prompt}
              onPromptChange={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
            {/* Suggestions */}
            <Suggestions onSelectSuggestion={setPrompt} />
          </div>

          {/* Right Panel: Preview */}
          <Preview
            prompt={prompt}
            isGenerating={isGenerating}
            generatedImage={generatedImage}
          />
        </div>
      </main>
    </div>
  );
}
