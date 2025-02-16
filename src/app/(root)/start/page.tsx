import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import ImageGenerator from "@/components/ImageGenerator";
import { getAllPosts } from "@/lib/actions/post.action";

const StartPage = async () => {
  const {data} = await getAllPosts({limit: 9});
  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      {/* Decorative Background */}
      <BackgroundBlobs />
      <ImageGenerator posts={data?.items}/>
    </div>
  );
};

export default StartPage;
