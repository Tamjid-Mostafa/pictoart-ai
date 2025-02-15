import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FilterFallback = () => {
  return (
    <div className="flex gap-4 w-full sm:w-auto">
      <Select>
        <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700">
          <SelectValue placeholder="Filter by"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Most Recent</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="downloads">Most Downloaded</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
