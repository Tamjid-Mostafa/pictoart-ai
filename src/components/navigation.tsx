"use client";

import { ModeToggle } from "./mode-toggle";
import * as motion from "motion/react-client";
import { LogIn, Sparkles, Wand2 } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navigation() {
  const { openSignIn } = useClerk();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check initial scroll position
    const initialScroll = window.scrollY > 10;
    setIsScrolled(initialScroll);
    setIsLoaded(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "border-b border-white/20 glass-effect" : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: "-10%" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, once: true }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative">
            <Wand2
              className="h-8 w-8 text-primary absolute animate-pulse"
              style={{ opacity: 0.5 }}
            />
            <Sparkles className="h-8 w-8 text-primary relative z-10" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            PictoArt AI
          </h1>
        </Link>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button variant="outline" onClick={() => openSignIn()}>
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </SignedOut>
        </div>
      </div>
    </motion.header>
  );
}
