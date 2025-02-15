
import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import ImageGenerator from "@/components/ImageGenerator";
import { getAllPosts } from "@/lib/actions/post.action";

const Home = async () => {
  const {data} = await getAllPosts({})
  // console.log(data?.items);
  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      {/* Decorative Background */}
      <BackgroundBlobs />
      <ImageGenerator posts={data?.items}/>
    </div>
  );
};

export default Home;
