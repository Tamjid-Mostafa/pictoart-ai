"use client";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Get values from URL search params with defaults
  const filter =
    (searchParams.get("filter") as "popular" | "downloads" | "recent") ||
    "recent";

  const handleFilterChange = (value: "popular" | "downloads" | "recent") => {
    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "filter",
      value,
    });

    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="flex gap-4 w-full sm:w-auto">
      <Select value={filter} onValueChange={handleFilterChange}>
        <SelectTrigger className="w-full sm:w-[180px] bg-transparent">
          <SelectValue placeholder="Filter by" />
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
