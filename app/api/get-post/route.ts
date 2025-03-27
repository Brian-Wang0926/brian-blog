// app/api/get-post/route.ts
import { Octokit } from "octokit";
import { NextRequest, NextResponse } from "next/server";

// 從環境變量獲取 GitHub 令牌
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_REPO = process.env.GITHUB_REPO;

export async function GET(request: NextRequest) {
  if (!GITHUB_TOKEN || !GITHUB_USER || !GITHUB_REPO) {
    return NextResponse.json({ error: "GitHub 配置不完整" }, { status: 500 });
  }

  // 獲取 slug 參數
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "需要提供 slug 參數" }, { status: 400 });
  }

  try {
    // 實例化 Octokit
    const octokit = new Octokit({ auth: GITHUB_TOKEN });

    // 文件路徑
    const filePath = `content/blog/${slug}.mdx`;

    // 獲取文件內容
    const { data: fileData } = await octokit.rest.repos.getContent({
      owner: GITHUB_USER,
      repo: GITHUB_REPO,
      path: filePath,
    });

    if (
      Array.isArray(fileData) ||
      fileData.type !== "file" ||
      !("content" in fileData)
    ) {
      return NextResponse.json({ error: "無法獲取文件內容" }, { status: 400 });
    }

    // 解碼 Base64 內容
    const content = Buffer.from(fileData.content, "base64").toString("utf-8");

    return NextResponse.json({ content });
  } catch (error: any) {
    console.error("獲取文章失敗:", error);

    if (error.status === 404) {
      return NextResponse.json({ error: "文章不存在" }, { status: 404 });
    }

    return NextResponse.json(
      { error: `獲取失敗: ${error.message}` },
      { status: 500 }
    );
  }
}
