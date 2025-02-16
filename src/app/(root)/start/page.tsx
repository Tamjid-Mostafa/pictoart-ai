import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import ImageGenerator from "@/components/ImageGenerator";
import { getAllPosts } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

const StartPage = async () => {
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
    limit: 9,
  });
  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      {/* Decorative Background */}
      <BackgroundBlobs />
      <ImageGenerator posts={data?.items}/>
    </div>
  );
};

export default StartPage;
