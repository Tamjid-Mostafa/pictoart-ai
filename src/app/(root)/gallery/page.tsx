import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";
import Gallery from "@/components/Gallery";
import { getAllPosts } from "@/lib/actions/post.action";
import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import GalleryHero from "@/components/GalleryHero";
import { Suspense } from "react";
import { GalleryFallback } from "@/components/GalleryFallback";

export default async function GalleryPage(props: {
  searchParams: Promise<{
    filter?: "popular" | "downloads" | "recent";
    searchQuery?: string;
    cursor?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { filter = "recent", searchQuery = "" } = searchParams;
  const { userId } = await auth();
  let mongoUserId: string = "";

  try {
    if (userId) {
      const user = await getUserById(userId);
      mongoUserId = user?._id;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  // Fetch posts using server action
  const { data } = await getAllPosts({
    userId: mongoUserId,
    filter,
    searchQuery,
    limit: 9,
  });

  return (
    <div className="min-h-svh">
      <BackgroundBlobs />
      <GalleryHero />
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <Suspense fallback={<GalleryFallback variant="variant4"/>}>
          <Gallery
            userId={mongoUserId}
            filter={filter}
            searchQuery={searchQuery}
            initialData={data}
            variant="variant4"
          />
        </Suspense>
      </main>
    </div>
  );
}
