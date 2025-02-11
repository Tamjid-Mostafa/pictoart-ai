import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";
import { useImageGeneratorStore } from "../../store/image-generator";
interface CommunityPostProps {
  post: Post;
}

export const CommunityPost = ({ post }: CommunityPostProps) => {
  const { animatingPostId, tempImageUrl } = useImageGeneratorStore();
  const isAnimating = post._id === animatingPostId;

  return (
    <Card className="overflow-hidden">
      <motion.div
        className="aspect-square relative"
        layoutId={isAnimating && tempImageUrl ? "preview-image" : undefined}
        onLayoutAnimationComplete={() => {
          if (isAnimating) {
            useImageGeneratorStore.getState().setAnimatingPostId(null);
            useImageGeneratorStore.getState().setTempImageUrl(null);
          }
        }}
      >
        <Image
          src={isAnimating && tempImageUrl ? tempImageUrl : post.photo}
          alt={post.prompt || "Community creation"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
      <motion.div
        initial={isAnimating ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        className="p-4"
      >
        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.prompt || "No prompt provided"}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Palette: {post.palette}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          by {post.user?.username ? `@${post.user.username}` : "Anonymous"}
        </p>
      </motion.div>
    </Card>
  );
};
