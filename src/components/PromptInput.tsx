"use client";
import { motion } from "framer-motion";
import {
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
interface PromptInputProps {
    prompt: string;
    onPromptChange: (value: string) => void;
    onGenerate: () => void;
    isGenerating: boolean;
  }
  
  export default function PromptInput({ prompt, onPromptChange, onGenerate, isGenerating }: PromptInputProps) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col gap-2 w-full">
          <Textarea
            placeholder="Describe your imagination..."
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            className="flex-1 glass-effect border-white/20"
          />
          <Button
            onClick={onGenerate}
            disabled={!prompt || isGenerating}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 whitespace-nowrap"
          >
            <Send className="h-4 w-4 mr-2" />
            Generate
          </Button>
        </div>
      </motion.div>
    );
  }
  
  