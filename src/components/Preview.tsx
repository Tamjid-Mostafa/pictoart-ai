import { motion } from "motion/react";
import { Sparkles, Image as ImageIcon, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PreviewProps {
  prompt: string;
  isGenerating: boolean;
  generatedImage: string;
}

export default function Preview({
  prompt,
  isGenerating,
  generatedImage,
}: PreviewProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="lg:col-span-2"
    >
      <Card className="glass-effect border-white/20 p-6 h-full min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center relative overflow-hidden">
        {isGenerating ? (
          <div className="text-center space-y-4 relative z-10">
            <div className="animate-spin">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground animate-pulse">
              Creating your masterpiece...
            </p>
          </div>
        ) : generatedImage ? (
          <div className="relative w-full">
            {/* Download button in top right corner */}
            <Button 
              onClick={handleDownload}
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 z-20 bg-white/40 hover:bg-white"
            >
              <Download className="h-4 w-4" />
            </Button>
            <img
              src={generatedImage}
              alt="Generated illustration"
              className="max-w-full h-auto rounded shadow-lg"
            />
          </div>
        ) : prompt ? (
          <div className="text-center space-y-4 relative z-10">
            <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">
              Your creation will appear here
            </p>
          </div>
        ) : (
          <div className="text-center space-y-4 relative z-10">
            <div className="relative">
              <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto" />
              <Sparkles className="h-6 w-6 text-primary absolute -top-2 -right-2 animate-pulse" />
            </div>
            <p className="text-muted-foreground">Enter a prompt to begin</p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}