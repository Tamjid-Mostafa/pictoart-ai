import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike } from '@/lib/actions/post.action';

export const useLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, userId }: { postId: string; userId: string }) => {
      const response = await toggleLike(postId, userId);
      if (!response.success) {
        throw new Error(response.message || 'Failed to toggle like');
      }
      return response.data;
    },
    onMutate: async ({ postId }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Get the previous posts data
      const previousPosts = queryClient.getQueryData(['posts']);

      // Optimistically update the posts
      queryClient.setQueryData(['posts'], (old: any) => {
        return {
          pages: old.pages.map((page: any) => ({
            ...page,
            items: page.items.map((post: any) => {
              if (post._id === postId) {
                return {
                  ...post,
                  likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                  isLiked: !post.isLiked,
                };
              }
              return post;
            }),
          })),
        };
      });

      return { previousPosts };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
  });
}; 