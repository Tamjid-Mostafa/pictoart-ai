"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";

import { CommunityPosts } from "@/components/CommunityPosts";
import { useInfinitePosts } from "@/hooks/useInfinitePosts";
import { GalleryFallback } from "./GalleryFallback";
type Variant = "default" | "variant3" | "variant4";
interface GalleryProps {
  userId: string;
  filter?: "popular" | "downloads" | "recent" | undefined;
  searchQuery?: string;
  initialData:
    | {
        items: Post[];
        nextCursor: string | null;
        hasMore: boolean;
      }
    | undefined;
  variant?: Variant;
}

const Gallery = ({
  userId,
  filter,
  searchQuery,
  initialData,
  variant,
}: GalleryProps) => {
  const { ref, inView } = useInView();

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfinitePosts({
    initialData,
    userId,
    filter,
    searchQuery,
    limit: 9,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const posts = data?.pages.flatMap((page) => page.items) ?? [];
  if (isLoading) {
    return <GalleryFallback variant={variant} />;
  }
  return (
    <>
      {posts?.length > 0 ? (
        <>
          <CommunityPosts
            posts={posts}
            variant={variant}
            title=""
            isScrollable={false}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No artwork found</p>
        </div>
      )}
      {hasNextPage && (
        <div ref={ref} className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-gray-700 hover:bg-gray-800"
          >
            Load More Artwork
          </Button>
        </div>
      )}
    </>
  );
};

export default Gallery;
