"use client";
import { ModeToggle } from "./mode-toggle";
// React Server Components
import * as motion from "motion/react-client";
import { LogIn, Sparkles, Wand2 } from "lucide-react";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useClerk } from "@clerk/nextjs";
export function Navigation() {
  const { openSignIn } = useClerk();
  return (
    <motion.header
      className="glass-effect border-b border-white/20 sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Wand2
              className="h-8 w-8 text-primary absolute animate-pulse"
              style={{ opacity: 0.5 }}
            />
            <Sparkles className="h-8 w-8 text-primary relative z-10" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Pictoart AI
          </h1>
        </div>
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
