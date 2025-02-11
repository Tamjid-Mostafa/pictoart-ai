import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import ImageGenerator from "@/components/ImageGenerator";

const Home = () => {
  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      {/* Decorative Background */}
      <BackgroundBlobs />
      <ImageGenerator />
    </div>
  );
};

export default Home;
