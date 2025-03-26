import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { sortPosts } from "@/lib/utils";
import { Metadata } from "next";
import { TagFilter } from "@/components/tag-filter";

export const metadata: Metadata = {
  title: "My Blog",
  description: "All of my ramblings on all things web dev.",
};

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: {
    page?: string;
    tags?: string;
  };
}
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;

  // 處理多重標籤
  const selectedTags = searchParams.tags ? searchParams.tags.split(",") : [];
  const isAllSelected = selectedTags.length === 0;

  // 收集所有標籤
  const allTags = new Set<string>();
  
  posts.forEach((post) => {
    if (post.published && post.tags) {
      post.tags.forEach((tag) => allTags.add(tag));
    }
  });
  const sortedTags = Array.from(allTags).sort();

  // 篩選文章
  let filteredPosts = posts.filter((post) => post.published);
  if (!isAllSelected) {
    filteredPosts = filteredPosts.filter((post) =>
      // 確保文章包含所有選中的標籤
      selectedTags.every((tag) => post.tags?.includes(tag))
    );
  }

  const sortedPosts = sortPosts(filteredPosts);
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">
            My ramblings on all things web dev.
          </p>
        </div>
      </div>

      {/* 標籤篩選 */}
      <div className="mt-6">
        <TagFilter allTags={sortedTags} />
      </div>

      <div className="grid grid-cols-12 gap-3 mt-4">
        <div className="col-span-12 col-start-1">
          <hr className="mt-8" />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const { slug, title, description, date, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      title={title}
                      description={description}
                      date={date}
                      tags={tags}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No posts yet</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
            additionalParams={
              !isAllSelected ? { tags: selectedTags.join(",") } : {}
            }
          />{" "}
        </div>
      </div>
    </div>
  );
}
