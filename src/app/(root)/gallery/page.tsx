
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";
import Gallery from "@/components/Gallery";
import { getAllPosts } from "@/lib/actions/post.action";

export default async function GalleryPage() {
  const { userId } = await auth();
  let mongoUserId;
  
  try {
    if (userId) {
      const user = await getUserById(userId);
      mongoUserId = user?._id;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  const {data} = await getAllPosts({
    userId: mongoUserId,
    filter: "recent",
    limit: 10,
  });

  return <Gallery userId={mongoUserId} data={data} />;
}