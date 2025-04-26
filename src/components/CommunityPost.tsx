"use client";

import Image from "next/image";
import { Card } from "./ui/card";
import { motion, Variants } from "motion/react";
import { Download, Heart, Sparkles, Share2, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useMemo, useCallback, useRef, useTransition } from "react";
import { cn, extractPublicId } from "@/lib/utils";
import { downloadPost, toggleLike } from "@/lib/actions/post.action";
import { useClerk } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useImageGenerationStore } from "@/store/imageGenerationStore";
import { usePostStore } from "@/store/postStore";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface CommunityPostProps {
  post: Post;
}

export const CommunityPost = ({ post }: CommunityPostProps) => {
  const { downloadImageByURL, setPrompt, setPalette } =
    useImageGenerationStore();
  const { animatingPostId, deletePost } = usePostStore();
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);
  const isAnimating = post._id === animatingPostId;
  const isMobile = useIsMobile();
  const { openSignIn, user } = useClerk();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Create unique animation keys for each post
  const animationKeys = useMemo(
    () => ({
      image: `image-${post._id}`,
      overlay: `overlay-${post._id}`,
      buttons: `buttons-${post._id}`,
      content: `content-${post._id}`,
    }),
    [post._id]
  );

  // Track previous animation state
  const prevAnimationState = useRef({
    isHovered: false,
    isAnimating: false,
  });

  // Determine if animations should play
  const shouldAnimate = useMemo(() => {
    const stateChanged =
      prevAnimationState.current.isHovered !== isHovered ||
      prevAnimationState.current.isAnimating !== isAnimating;

    prevAnimationState.current = {
      isHovered,
      isAnimating,
    };

    return stateChanged;
  }, [isHovered, isAnimating]);

  // Memoize animations configurations
  const animations = useMemo(
    () => ({
      image: {
        variants: {
          rest: {
            scale: 1,
            transition: { duration: 0.2, type: "tween", ease: "easeOut" },
          },
          hover: {
            scale: 1.05,
            transition: { duration: 0.3, type: "tween", ease: "easeIn" },
          },
        } as Variants,
        key: animationKeys.image,
      },
      overlay: {
        variants: {
          rest: { opacity: !isMobile ? 0 : 1 },
          hover: { opacity: 1 },
        } as Variants,
        key: animationKeys.overlay,
      },
      buttons: {
        variants: {
          rest: { y: !isMobile ? 10 : 0, opacity: !isMobile ? 0 : 1 },
          hover: { y: 0, opacity: 1 },
        } as Variants,
        key: animationKeys.buttons,
      },
    }),
    [isMobile, animationKeys]
  );
  // Event handlers remain the same
  const handleLike = useCallback(async () => {
    try {
      if (!user?.publicMetadata.userId) {
        openSignIn();
      }
      const response = await toggleLike(
        post._id,
        user?.publicMetadata.userId as string
      );
      if (response.success) {
        // Refetch all active queries that begin with `posts` in the key
        await queryClient.refetchQueries({
          queryKey: ["posts"],
          type: "active",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [user, openSignIn, post._id]);

  const handleDownload = useCallback(async () => {
    try {
      await downloadImageByURL(post._id);
      const response = await downloadPost(post._id);

      if (response.success) {
        // Refetch all active queries that begin with `posts` in the key
        await queryClient.refetchQueries({
          queryKey: ["posts"],
          type: "active",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [user, openSignIn, post._id, downloadImageByURL, queryClient]);

  const handleShare = useCallback(async () => {
    try {
      const shareData = {
        title: "Check out this amazing creation!",
        text: post.prompt || "I just found this cool image!",
        url: post.photo,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(post.photo);
        toast({
          title: "Success",
          description: "Image URL copied to clipboard",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error sharing the image:", error);
      toast({
        title: "Error",
        description: "Could not share the image",
        variant: "destructive",
      });
    }
  }, [post.prompt, post.photo]);

  const handleStyleTry = useCallback(() => {
    setPrompt(post.prompt);
    setPalette(post.palette);
  }, [post.prompt, post.palette, setPrompt, setPalette]);

  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  const cardClassName = useMemo(
    () =>
      cn(
        "group relative overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-xl"
      ),
    []
  );
  console.log(post.photo);
  return (
    <Card className={cardClassName}>
      <motion.div
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className="relative aspect-square"
      >
        <>
          <motion.div className="absolute inset-0">
            <motion.div
              variants={animations.image.variants}
              key={animations.image.key}
              animate={
                shouldAnimate ? (isHovered ? "hover" : "rest") : undefined
              }
              className="h-full"
            >
              <Image
                src={post.photo}
                alt={post.prompt || "Community creation"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-t-xl"
                priority
              />
            </motion.div>

            <div className="absolute top-2 right-2 flex gap-2 z-10">
              {["download", "like", "share"].map((action, index) => (
                <motion.div
                  key={`${animations.buttons.key}-${action}`}
                  variants={animations.buttons.variants}
                  animate={
                    shouldAnimate ? (isHovered ? "hover" : "rest") : undefined
                  }
                >
                  {/* {action === "delete" ? (
                    <AlertDialog
                      open={showDeleteDialog}
                      onOpenChange={() => setShowDeleteDialog(true)}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="bg-white/90 backdrop-blur-sm hover:bg-white"
                        >
                          <Trash2 className="h-4 w-4 text-gray-700" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. It will permanently
                            remove your post and its image from Cloudinary.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={isPending}
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() =>
                              startTransition(async () => {
                                await deletePost(
                                  post._id,
                                  extractPublicId(post.photo)
                                );
                                await queryClient.refetchQueries({
                                  queryKey: ["posts"],
                                  type: "active",
                                });

                                // Now close the dialog
                                setShowDeleteDialog(false);
                              })
                            }
                          >
                            {isPending ? "Deleting..." : "Delete"}{" "}
                            {isPending && (
                              <Loader2 className="h-4 w-4 animate-spin text-muted" />
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : ( */}
                    <Button
                      size="icon"
                      onClick={
                        action === "download"
                          ? handleDownload
                          : action === "like"
                          ? handleLike
                          : handleShare
                      }
                      variant="secondary"
                      className="bg-white/90 backdrop-blur-sm hover:bg-white"
                    >
                      {action === "download" && (
                        <Download className="h-4 w-4 text-gray-700" />
                      )}
                      {action === "like" && (
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            post.isLiked
                              ? "fill-red-500 text-red-500"
                              : "text-gray-700"
                          )}
                        />
                      )}
                      {action === "share" && (
                        <Share2 className="h-4 w-4 text-gray-700" />
                      )}
                    </Button>
                  {/* )} */}
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={animations.overlay.variants}
              key={animations.overlay.key}
              animate={
                shouldAnimate ? (isHovered ? "hover" : "rest") : undefined
              }
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
                    {post.user?.username
                      ? `@${post.user.username}`
                      : "Anonymous"}
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

                <motion.div
                  variants={animations.buttons.variants}
                  key={`${animations.buttons.key}-try-style`}
                  animate={
                    shouldAnimate ? (isHovered ? "hover" : "rest") : undefined
                  }
                >
                  <Button
                    onClick={handleStyleTry}
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
        </>
      </motion.div>
    </Card>
  );
};
