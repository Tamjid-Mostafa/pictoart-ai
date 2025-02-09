"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Image as ImageIcon,
  Palette,
  Send,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { useToast } from "@/hooks/use-toast";
import Preview from "@/components/Preview";
import Suggestions from "@/components/SuggestionComponent";
import PromptInput from "@/components/PromptInput";

const COLOR_PALETTES = {
  modern: ["#2D3436", "#636E72", "#B2BEC3", "#DFE6E9"],
  nature: ["#27AE60", "#2ECC71", "#F1C40F", "#E67E22"],
  ocean: ["#1ABC9C", "#3498DB", "#34495E", "#ECF0F1"],
  sunset: ["#E74C3C", "#C0392B", "#F39C12", "#F1C40F"],
  pastel: ["#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFFFBA"],
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [palette, setPalette] = useState("modern");
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

  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      {/* Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/30 dark:bg-blue-500/20 blur-3xl blob-spin" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/30 dark:bg-purple-500/20 blur-3xl blob" />
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-pink-500/30 dark:bg-pink-500/20 blur-3xl blob-spin" />
      </div>

      <main className="container mx-auto px-6 py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Input and Suggestions */}
          <>
            <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-24 ">
              {/* Color Palette Selector */}
              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    <span className="font-medium">Color Palette</span>
                  </div>
                  <Select value={palette} onValueChange={setPalette}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a color palette" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(COLOR_PALETTES).map(([key, colors]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {colors.map((color) => (
                                <div
                                  key={color}
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <span className="capitalize">{key}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Card>

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
        </div>
      </main>
    </div>
  );
}
