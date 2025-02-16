"use client";

import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface GalleryFallbackProps {
  variant?: "default" | "variant3" | "variant4";
  count?: number;
}

export const GalleryFallback = ({ 
  variant = "variant3", 
  count = 9 
}: GalleryFallbackProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "variant3":
        return "grid grid-cols-1 md:grid-cols-3 gap-6";
      case "variant4":
        return "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4";
      default:
        return "grid gap-4";
    }
  };

  return (
    <div className={getVariantStyles()}>
      {Array.from({ length: count }).map((_, index) => (
        <Card 
          key={index} 
          className="relative overflow-hidden rounded-xl"
        >
          <div className="relative aspect-square">
            {/* Image skeleton */}
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-t-xl" />

            {/* Top buttons skeleton */}
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              {Array.from({ length: 3 }).map((_, btnIndex) => (
                <div
                  key={btnIndex}
                  className="h-8 w-8 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"
                />
              ))}
            </div>

            {/* Content overlay skeleton */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                {/* Prompt skeleton */}
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2 w-3/4" />
                
                {/* Palette info skeleton */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
                  <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                </div>

                {/* User and stats skeleton */}
                <div className="flex items-center justify-between mb-3">
                  <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="flex gap-3">
                    <div className="h-3 w-12 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-3 w-12 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </div>

                {/* Try style button skeleton */}
                <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};