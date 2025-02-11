import { CommunityPost } from "./CommunityPost";
import { ScrollArea } from "./ui/scroll-area";

interface CommunityPostsProps {
    posts: Post[];
  }
  
  export const CommunityPosts = ({ posts }: CommunityPostsProps) => (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Community Creations</h3>
      <ScrollArea className="h-[600px]">
        <div className="grid gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <CommunityPost key={post._id} post={post} />
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No community creations yet
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
  