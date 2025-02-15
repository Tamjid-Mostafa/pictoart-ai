"use client";

import Image from "next/image";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { useImageGeneratorStore } from "../store/image-generator";
import { Download, Heart, Sparkles, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { downloadPost, toggleLike } from "@/lib/actions/post.action";
import { useClerk } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface CommunityPostProps {
  post: Post;
  variant?: "default" | "variant3" | "variant4";
}

export const CommunityPost = ({
  post,
  variant = "default",
}: CommunityPostProps) => {
  const {
    animatingPostId,
    tempImageUrl,
    downloadImageByURL,
    setPrompt,
    setPalette,
  } = useImageGeneratorStore();
  const queryClient = useQueryClient();

  const [isHovered, setIsHovered] = useState(false);
  const isAnimating = post._id === animatingPostId;
  const isMobile = useIsMobile();
  const imageAnimation = {
    rest: {
      scale: 1,
      transition: { duration: 0.2, type: "tween", ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, type: "tween", ease: "easeIn" },
    },
  };

  const overlayAnimation = {
    rest: { opacity: !isMobile ? 0 : 1 },
    hover: { opacity: 1 },
  };

  const buttonAnimation = {
    rest: { y: !isMobile ? 10 : 0, opacity: !isMobile ? 0 : 1 },
    hover: { y: 0, opacity: 1 },
  };
  const { user, openSignIn } = useClerk();

  const handleLike = async (postId: string) => {
    try {
      if (!user) {
        openSignIn();
      } else {
        const res = await getUserById(user.id);
        const userId = res._id;
        const response = await toggleLike(postId, userId);
        console.log(response);
        if (response.success) {
          queryClient.invalidateQueries({
            predicate: (query) => {
              return query.queryKey[0] === "posts";
            },
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDownload = async (postId: string) => {
    try {
      if (!user) {
        openSignIn();
      } else {
        await downloadImageByURL(post._id);
        const response = await downloadPost(postId);
        console.log(response);
        if (response.success) {
          queryClient.invalidateQueries({
            predicate: (query) => {
              return query.queryKey[0] === "posts";
            },
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleShare = async (post: Post) => {
    try {
      const shareData = {
        title: "Check out this amazing creation!",
        text: post.prompt || "I just found this cool image!",
        url: post.photo,
      };

      if (navigator.share) {
        // Use the Web Share API
        await navigator.share(shareData);
        console.log("Image shared successfully");
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(post.photo);
        toast({
          title: "Success",
          description: "Image URL copied to clipboard",
          variant: "default",
        });
        console.log("URL copied to clipboard");
      }
    } catch (error) {
      console.error("Error sharing the image:", error);
      toast({
        title: "Error",
        description: "Could not share the image",
        variant: "destructive",
      });
    }
  };

  return (
    <Card
    key={post._id}
      className={cn(
        "group relative overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-xl",
        variant === "variant4" && "max-w-sm mx-auto"
      )}
    >
      <motion.div
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative aspect-square"
      >
        <motion.div
          // initial={{ opacity: 0, scale: 0.9 }}
          // whileInView={{ opacity: 1, scale: 1 }}
          // viewport={{ once: true }}
          layoutId={isAnimating && tempImageUrl ? "preview-image" : undefined}
          onLayoutAnimationComplete={() => {
            if (isAnimating) {
              useImageGeneratorStore.getState().setAnimatingPostId(null);
              useImageGeneratorStore.getState().setTempImageUrl(null);
            }
          }}
          className="absolute inset-0"
        >
          <motion.div variants={imageAnimation} className="h-full">
            <Image
              src={isAnimating && tempImageUrl ? tempImageUrl : post.photo}
              alt={post.prompt || "Community creation"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-t-xl"
              priority
            />
          </motion.div>

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <motion.div variants={buttonAnimation}>
              <Button
                size="icon"
                onClick={() => handleDownload(post._id)}
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
              >
                <Download className="h-4 w-4 text-gray-700" />
              </Button>
            </motion.div>
            <motion.div variants={buttonAnimation}>
              <Button
                size="icon"
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={() => handleLike(post._id)}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    post.isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
                  )}
                />
              </Button>
            </motion.div>
            <motion.div variants={buttonAnimation}>
              <Button
                onClick={() => handleShare(post)}
                size="icon"
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
              >
                <Share2 className="h-4 w-4 text-gray-700" />
              </Button>
            </motion.div>
          </div>

          {/* Overlay Content */}
          <motion.div
            variants={overlayAnimation}
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
          >
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <p className="text-sm text-gray-100 font-medium line-clamp-2 mb-2">
                {post.prompt || "No prompt provided"}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <p className="text-xs text-gray-300">{post.palette}</p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-300">
                  by{" "}
                  {post.user?.username ? `@${post.user.username}` : "Anonymous"}
                </p>
                <div className="flex gap-3 text-gray-300">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span className="text-xs">{post.likes}</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    <span className="text-xs">{post.downloads}</span>
                  </span>
                </div>
              </div>

              <motion.div variants={buttonAnimation}>
                <Button
                  onClick={() => {
                    setPrompt(post.prompt);
                    setPalette(post.palette);
                  }}
                  variant="secondary"
                  size="sm"
                  className="w-full bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800"
                >
                  <Sparkles className="h-3 w-3 mr-2" />
                  Try This Style
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </Card>
  );
};
