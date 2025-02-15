import { getAllPosts } from "@/lib/actions/post.action";
import { useInfiniteQuery } from "@tanstack/react-query";


type PostsResponse = {
  items: Post[];
  nextCursor: string | null;
  hasMore: boolean;
};


type UseInfinitePostsParams = {
  userId?: string;
  filter?: "popular" | "downloads" | "recent";
  searchQuery?: string;
  limit?: number;
  initialData?: PostsResponse;
};

export const useInfinitePosts = ({
  userId,
  filter = "recent",
  searchQuery,
  limit = 9,
  initialData,
}: UseInfinitePostsParams) => {
  return useInfiniteQuery<PostsResponse>({
    queryKey: ["posts", { userId, filter, searchQuery }],
    queryFn: async ({ pageParam = "" }) => {
      const response = await getAllPosts({
        cursor: pageParam as string | undefined,
        limit,
        filter,
        searchQuery,
        userId,
      });
      
      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch posts");
      }
      
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: initialData ? {
      pages: [initialData],
      pageParams: [""]
    } : undefined,
    initialPageParam: "",
  });
};