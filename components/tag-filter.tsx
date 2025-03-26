"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface TagFilterProps {
  allTags: string[];
}

export function TagFilter({ allTags }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedTags = searchParams.get("tags")
    ? searchParams.get("tags")!.split(",")
    : [];
  const isAllSelected = selectedTags.length === 0;

  const handleTagClick = (tag: string) => {
    if (tag === "all") {
      // 點擊"all"清除所有選擇
      router.push("/blog");
      return;
    }

    let newTags = [...selectedTags];

    // 如果標籤已經被選中，則移除它
    if (newTags.includes(tag)) {
      newTags = newTags.filter((t) => t !== tag);
    } else {
      // 否則添加它
      newTags.push(tag);
    }

    // 如果沒有選中任何標籤，重定向到全部
    if (newTags.length === 0) {
      router.push("/blog");
      return;
    }

    let url = `/blog?tags=${newTags.join(",")}`;

    router.push(url);
  };

  return (
    <div className="flex flex-wrap gap-1 mb-2 ">
      <button
        onClick={() => handleTagClick("all")}
        className={cn(
          "px-3 py-0.5 rounded-md text-sm ",
          isAllSelected
            ? "bg-primary text-primary-foreground"
            : "bg-muted hover:bg-muted/80 bg-gray-200 dark:bg-gray-600"
        )}
      >
        全部
      </button>

      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={cn(
            "px-3 py-0.5 rounded-md text-sm ",
            selectedTags.includes(tag)
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80 bg-gray-200 dark:bg-gray-600"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
