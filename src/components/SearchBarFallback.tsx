import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

const SearchBarFallback: React.FC = () => {
  return (
    <div className="relative w-full sm:w-96">
      <Input
        type="text"
        placeholder="Search artwork..."
        className="pl-10 bg-gray-800 border-gray-700"
      />
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    </div>
  );
};

export default SearchBarFallback;
