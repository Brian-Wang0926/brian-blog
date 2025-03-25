import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import { formateDate } from "@/lib/utils";
import Link from "next/link";
import { Tag } from "lucide-react";

import "@/style/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}
export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    //prose 參考： https://github.com/shadcn-ui/ui/blob/main/apps/www/components/mdx-components.tsx
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
      {post.description ? (
        <p className="text-s mb-2 mt-0 text-muted-foreground">
          {post.description}
        </p>
      ) : null}
      <p className="mt-0 ">{formateDate(post.date)}</p>

      {/* 添加標籤顯示 */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2 not-prose">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="flex items-center gap-1 text-sm bg-muted px-2 py-1 rounded-md hover:bg-muted/80"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </Link>
          ))}
        </div>
      )}
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  );
}
