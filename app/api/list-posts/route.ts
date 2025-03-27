// app/api/list-posts/route.ts
import { Octokit } from "octokit";
import { NextResponse } from "next/server";
import matter from "gray-matter";

// 從環境變量獲取 GitHub 令牌
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_REPO = process.env.GITHUB_REPO;

export async function GET() {
  if (!GITHUB_TOKEN || !GITHUB_USER || !GITHUB_REPO) {
    return NextResponse.json({ error: "GitHub 配置不完整" }, { status: 500 });
  }

  try {
    // 實例化 Octokit
    const octokit = new Octokit({ auth: GITHUB_TOKEN });

    // 獲取文件列表
    const { data: files } = await octokit.rest.repos.getContent({
      owner: GITHUB_USER,
      repo: GITHUB_REPO,
      path: "content/blog",
    });

    if (!Array.isArray(files)) {
      return NextResponse.json({ error: "無法獲取文件列表" }, { status: 400 });
    }

    // 篩選 .mdx 文件
    const mdxFiles = files.filter(
      (file) => file.type === "file" && file.name.endsWith(".mdx")
    );

    // 獲取每個文件的內容和 frontmatter
    const postsPromises = mdxFiles.map(async (file) => {
      try {
        const { data: fileData } = await octokit.rest.repos.getContent({
          owner: GITHUB_USER,
          repo: GITHUB_REPO,
          path: file.path,
        });

        if (
          Array.isArray(fileData) ||
          fileData.type !== "file" ||
          !("content" in fileData)
        ) {
          return null;
        }

        const content = Buffer.from(fileData.content, "base64").toString(
          "utf-8"
        );
        const { data: frontmatter } = matter(content);

        // 從文件名中提取 slug
        const slug = file.name.replace(/\.mdx$/, "");

        return {
          slug,
          title: frontmatter.title || "無標題",
          description: frontmatter.description || "",
          date: frontmatter.date || "",
          tags: frontmatter.tags || [],
          published: frontmatter.published !== false,
        };
      } catch (error) {
        console.error(`獲取文件 ${file.path} 失敗:`, error);
        return null;
      }
    });

    const posts = (await Promise.all(postsPromises)).filter(Boolean);

    // 根據日期排序（最新的在前）
    posts.sort(
      (a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()
    );

    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error("獲取文章列表失敗:", error);
    return NextResponse.json(
      { error: `獲取失敗: ${error.message}` },
      { status: 500 }
    );
  }
}
