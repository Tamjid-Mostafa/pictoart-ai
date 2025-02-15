"use client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GalleryHero from "@/components/GalleryHero";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CommunityPosts } from "@/components/CommunityPosts";
import { useDebounce } from "use-debounce";
import { useInfinitePosts } from "@/hooks/useInfinitePosts";

interface GalleryProps {
  userId: string;
  data: { items: Post[]; nextCursor: string | null; hasMore: boolean; } | undefined;
}
const Gallery = ({ userId , data}: GalleryProps) => {
  const [filter, setFilter] = useState<"popular" | "downloads" | "recent">(
    "recent"
  );
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);

  const { ref, inView } = useInView();
console.log(data);
  const handleFilterChange = (value: "popular" | "downloads" | "recent") => {
    setFilter(value);
  };
  // const { data, hasNextPage, fetchNextPage } = useInfinitePosts({
  //   userId,
  //   filter,
  //   searchQuery: debouncedSearch,
  //   limit: 10,
  // });
  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage]);
  // const posts = data?.pages.flatMap((page) => page.items) ?? [];
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <GalleryHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full sm:w-96">
            <Input
              type="text"
              placeholder="Search artwork..."
              className="pl-10 bg-gray-800 border-gray-700"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          <div className="flex gap-4 w-full sm:w-auto">
            <Select
              value={filter}
              onValueChange={(value: "popular" | "downloads" | "recent") =>
                handleFilterChange(value)
              }
            >
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="downloads">Most Downloaded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data && data?.items?.length > 0 ? (
          <>
            <CommunityPosts
              posts={data?.items}
              variant="variant3"
              title=""
              isScrollable={false}
            />
            <div ref={ref} className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 hover:bg-gray-800"
              >
                Load More Artwork
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No artwork found</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Gallery;
