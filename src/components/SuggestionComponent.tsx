import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface SuggestionsProps {
  onSelectSuggestion: (suggestion: string) => void;
}

export default function Suggestions({ onSelectSuggestion }: SuggestionsProps) {
  const suggestions = [
    {
      category: "Abstract & Geometric",
      prompts: [
        "Geometric fox head made of triangles and circles",
        "Abstract mountain landscape with flowing lines",
        "Minimalist maze pattern with gradient colors",
        "Interlocking geometric shapes forming a butterfly"
      ]
    },
    {
      category: "Nature & Animals",
      prompts: [
        "Origami-style hummingbird in flight",
        "Minimalist tree with spiral branches",
        "Sacred geometry owl face design",
        "Flowing line art of ocean waves"
      ]
    },
    {
      category: "Modern Icons",
      prompts: [
        "Tech-inspired brain made of circuit patterns",
        "Minimal coffee cup with rising steam swirls",
        "Geometric compass rose design",
        "Line art rocket with constellation trail"
      ]
    },
    {
      category: "Artistic Concepts",
      prompts: [
        "Musical notes transforming into birds",
        "Fibonacci spiral made of tiny polygons",
        "Minimal face line art with flowing hair",
        "Geometric mandala with nature elements"
      ]
    }
  ];

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        <h3 className="font-medium">Suggestions</h3>
      </div>
      
      <div className="space-y-6">
        {suggestions.map((category) => (
          <div key={category.category} className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">
              {category.category}
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {category.prompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-accent"
                  onClick={() => onSelectSuggestion(prompt)}
                >
                  <span className="line-clamp-2 text-sm">{prompt}</span>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}