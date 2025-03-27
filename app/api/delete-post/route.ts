// app/api/delete-post/route.ts
import { Octokit } from "octokit";
import { NextRequest, NextResponse } from "next/server";

// 從環境變量獲取 GitHub 令牌
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_REPO = process.env.GITHUB_REPO;

export async function POST(request: NextRequest) {
  if (!GITHUB_TOKEN || !GITHUB_USER || !GITHUB_REPO) {
    return NextResponse.json({ error: "GitHub 配置不完整" }, { status: 500 });
  }

  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: "缺少必要參數" }, { status: 400 });
    }

    // 實例化 Octokit
    const octokit = new Octokit({ auth: GITHUB_TOKEN });

    // 文件路徑
    const filePath = `content/blog/${slug}.mdx`;

    // 首先獲取文件的 SHA（GitHub 需要這個來刪除文件）
    const { data: fileData } = await octokit.rest.repos.getContent({
      owner: GITHUB_USER,
      repo: GITHUB_REPO,
      path: filePath,
    });

    if (
      Array.isArray(fileData) ||
      fileData.type !== "file" ||
      !("sha" in fileData)
    ) {
      return NextResponse.json(
        { error: "找不到文章或無法獲取文件信息" },
        { status: 404 }
      );
    }

    // 使用 GitHub API 刪除文件
    await octokit.rest.repos.deleteFile({
      owner: GITHUB_USER,
      repo: GITHUB_REPO,
      path: filePath,
      message: `刪除文章: ${slug}`,
      sha: fileData.sha,
    });

    return NextResponse.json({
      success: true,
      message: "文章刪除成功",
      path: filePath,
    });
  } catch (error: any) {
    console.error("刪除文章失敗:", error);

    // 特別處理文件不存在的情況
    if (error.status === 404) {
      return NextResponse.json({ error: "文章不存在" }, { status: 404 });
    }

    return NextResponse.json(
      { error: `刪除失敗: ${error.message}` },
      { status: 500 }
    );
  }
}
