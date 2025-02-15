import { Suspense } from "react";
import SearchBarFallback from "./SearchBarFallback";
import { SearchBar } from "./SearchBar";
import { FilterFallback } from "./FilterFallback";
import { Filter } from "./Filter";

export const GalleryHero = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className="pt-8 pb-6 container mx-auto px-4 sm:px-6">
        <div className="">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-purple-800 text-transparent bg-clip-text mb-4">
            Art Gallery
          </h1>
          <p className="text-gray-400 text-lg">
            Discover and download amazing AI-generated vector illustrations
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-10  border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            <Suspense fallback={<SearchBarFallback />}>
              <SearchBar />
            </Suspense>
            <Suspense fallback={<FilterFallback />}>
              <Filter />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryHero;
