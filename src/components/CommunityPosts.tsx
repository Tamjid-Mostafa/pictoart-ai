import { CommunityPost } from "./CommunityPost";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

type Variant = "default" | "variant3" | "variant4";

interface CommunityPostsProps {
  posts: Post[] | undefined;
  variant?: Variant;
  isScrollable?: boolean;
  scrollHeight?: string;
  title?: string;
}

export const CommunityPosts = ({
  posts,
  variant = "default",
  isScrollable = true,
  scrollHeight = "h-[600px]",
  title = "Community Creations",
}: CommunityPostsProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "variant3":
        return "grid grid-cols-1 md:grid-cols-3 gap-6";
      case "variant4":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4";
      default:
        return "grid gap-4";
    }
  };

  const Content = () => (
    <div className={getVariantStyles()}>
      {posts && posts?.length > 0 ? (
        posts?.map((post) => (
          <CommunityPost
            key={post._id}
            post={post}
            // variant={variant}
          />
        ))
      ) : (
        <div
          className={cn(
            "text-center text-muted-foreground py-8",
            variant !== "default" && "col-span-full"
          )}
        >
          No community creations yet
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {title && <h3 className="font-semibold text-lg">{title}</h3>}
      {isScrollable ? (
        <ScrollArea className={scrollHeight}>
          <Content />
        </ScrollArea>
      ) : (
        <Content />
      )}
    </div>
  );
};
