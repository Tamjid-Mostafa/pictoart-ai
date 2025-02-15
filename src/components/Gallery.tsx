"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import GalleryHero from "@/components/GalleryHero";
import { Button } from "@/components/ui/button";

import { CommunityPosts } from "@/components/CommunityPosts";
import { useInfinitePosts } from "@/hooks/useInfinitePosts";
import { BackgroundBlobs } from "./BackgroundBlobs";

interface GalleryProps {
  userId: string;
  filter: "popular" | "downloads" | "recent" | undefined;
  searchQuery: string;
  initialData:
    | {
        items: Post[];
        nextCursor: string | null;
        hasMore: boolean;
      }
    | undefined;
}

const Gallery = ({
  userId,
  filter,
  searchQuery,
  initialData,
}: GalleryProps) => {
  const { ref, inView } = useInView();

  const { data, hasNextPage, fetchNextPage } = useInfinitePosts({
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

  // const posts = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="min-h-screen">
      <BackgroundBlobs/>
      <GalleryHero />
      <main className="container mx-auto px-4 sm:px-6 py-8">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.items?.length > 0 ? (
              <>
                <CommunityPosts
                  posts={group.items}
                  variant="variant3"
                  title=""
                  isScrollable={false}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No artwork found</p>
              </div>
            )}
          </React.Fragment>
        ))}
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
      </main>
    </div>
  );
};

export default Gallery;
