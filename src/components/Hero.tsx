import React from "react";
import * as motion from "motion/react-client";
import { Wand2, Sparkles, ArrowRight, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <Wand2 className="h-4 w-4 text-blue-400 animate-pulse" />
            <p className="text-sm font-medium text-blue-300">
              TURN IDEAS INTO STUNNING VECTOR ART
            </p>
          </div>
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="relative">
              <Wand2
                className="h-8 w-8 text-blue-400 absolute animate-pulse"
                style={{ opacity: 0.5 }}
              />
              <div className="relative">
                <Sparkles className="h-8 w-8 text-blue-400" />
                <div className="absolute inset-0 animate-ping opacity-50">
                  <Sparkles className="h-8 w-8 text-blue-400" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold">PictoArt AI</h1>
          </div>

          {/* Main Headline */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            AI-Powered Vector Illustrations, Instantly
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-8">
            Generate stunning vector artwork effortlessly. Customize colors.
            Download instantly.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group"
              >
                Get Started – Free Credits
                <Zap className="ml-2 h-4 w-4 group-hover:animate-bounce" />
              </Button>
            </Link>
            <Link href="/gallery">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-500 text-foreground"
              >
                View Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Extra Info / Features */}
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              <span>3 Free Credits</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              <span>Instant Access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
