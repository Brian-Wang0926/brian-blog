// app/api/save-post/route.ts
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
    const { slug, content, isNew } = await request.json();

    if (!slug || !content) {
      return NextResponse.json({ error: "缺少必要參數" }, { status: 400 });
    }

    // 實例化 Octokit
    const octokit = new Octokit({ auth: GITHUB_TOKEN });

    // 檔案路徑
    const filePath = `content/blog/${slug}.mdx`;

    // 如果是更新現有文章，需要獲取文件的 SHA
    let sha: string | undefined;

    if (!isNew) {
      try {
        const { data: fileData } = await octokit.rest.repos.getContent({
          owner: GITHUB_USER,
          repo: GITHUB_REPO,
          path: filePath,
        });

        if (!Array.isArray(fileData) && fileData.type === "file") {
          sha = fileData.sha;
        }
      } catch (error) {
        // 如果文件不存在，則忽略錯誤
        console.log("文件不存在，將創建新文件");
      }
    }

    // 使用 GitHub API 創建或更新文件
    const response = await octokit.rest.repos.createOrUpdateFileContents({
      owner: GITHUB_USER,
      repo: GITHUB_REPO,
      path: filePath,
      message: isNew ? `創建文章: ${slug}` : `更新文章: ${slug}`,
      content: Buffer.from(content).toString("base64"),
      sha: sha,
    });

    return NextResponse.json({
      success: true,
      message: isNew ? "文章創建成功" : "文章更新成功",
      path: filePath,
    });
  } catch (error: any) {
    console.error("保存文章失敗:", error);
    return NextResponse.json(
      { error: `保存失敗: ${error.message}` },
      { status: 500 }
    );
  }
}
