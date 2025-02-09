import { motion } from "motion/react";
import { Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface SuggestionsProps {
  onSelectSuggestion: (suggestion: string) => void;
}
const suggestions = [
  "A serene Japanese garden with cherry blossoms at sunset",
  "A futuristic cityscape with flying cars and neon lights",
  "An underwater scene with bioluminescent creatures",
  "A cozy cabin in a snowy forest during winter",
  "A steampunk-inspired mechanical butterfly",
  "A magical library with floating books and starlit ceiling",
];

export default function Suggestions({ onSelectSuggestion }: SuggestionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h2 className="text-lg font-semibold">Creative Suggestions</h2>
      </div>
      <Card className="glass-effect border-white/20">
        <ScrollArea className="h-[calc(100vh-20rem)] rounded-md p-4">
          <div className="space-y-2 pr-4">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left hover:bg-white/10 transition-colors"
                  onClick={() => onSelectSuggestion(suggestion)}
                >
                  <span className="truncate">{suggestion}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </motion.div>
  );
}
