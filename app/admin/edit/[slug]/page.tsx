// app/admin/edit/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import matter from "gray-matter";
import { marked } from "marked";

// 動態導入編輯器，避免 SSR 問題
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
import "react-markdown-editor-lite/lib/index.css";

export default function EditPost({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const isNewPost = params.slug === "new";
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [tags, setTags] = useState<string[]>(["General"]);
  const [published, setPublished] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNewPost) {
      setLoading(false);
      return;
    }

    // 從 GitHub 獲取文章內容
    const fetchPost = async () => {
      try {
        // 暫時使用模擬數據，之後替換為真實 API 調用
        const response = await fetch(`/api/get-post?slug=${params.slug}`);
        if (!response.ok) throw new Error("文章不存在");

        const data = await response.json();
        const { content: fileContent } = data;

        // 使用 gray-matter 解析 frontmatter
        const { data: frontmatter, content: markdownContent } =
          matter(fileContent);

        setTitle(frontmatter.title || "");
        setDescription(frontmatter.description || "");
        setContent(markdownContent || "");
        setDate(frontmatter.date || new Date().toISOString().split("T")[0]);
        setTags(frontmatter.tags || ["General"]);
        setPublished(frontmatter.published !== false);

        setLoading(false);
      } catch (err) {
        console.error("獲取文章失敗:", err);
        setError("無法加載文章，請稍後再試");
        setLoading(false);
      }
    };

    fetchPost();
  }, [isNewPost, params.slug]);

  const handleContentChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagArray = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    setTags(tagArray);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError("標題不能為空");
      return;
    }

    try {
      setSaving(true);

      // 生成 slug（如果是新文章）
      let slug = params.slug;
      if (isNewPost) {
        slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        // 為確保唯一性，可以添加日期前綴
        const datePrefix = new Date()
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "");
        slug = `${datePrefix}-${slug}`;
      }

      // 構建 frontmatter
      const frontmatter = {
        title,
        description,
        date,
        tags,
        published,
      };

      // 使用 gray-matter 將 frontmatter 和內容結合
      const fileContent = matter.stringify(content, frontmatter);

      // 發送到 API
      const response = await fetch("/api/save-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          content: fileContent,
          isNew: isNewPost,
        }),
      });

      if (!response.ok) {
        throw new Error("保存失敗");
      }

      router.push("/admin/edit");
    } catch (err) {
      console.error("保存文章失敗:", err);
      setError("保存失敗，請稍後再試");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">
          {isNewPost ? "新增文章" : "編輯文章"}
        </h1>
        <div className="space-x-2">
          <button
            onClick={() => router.push("/admin/edit")}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:text-white"
            disabled={saving}
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={saving}
          >
            {saving ? "保存中..." : "保存"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            標題
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
            placeholder="文章標題"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            描述
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
            placeholder="簡短描述（可選）"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              日期
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              標籤（以逗號分隔）
            </label>
            <input
              type="text"
              value={tags.join(", ")}
              onChange={handleTagsChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
              placeholder="例如: Next.js, React, 教學"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="published"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            發布文章（取消勾選則為草稿）
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            內容
          </label>
          <MdEditor
            style={{ height: "500px" }}
            value={content}
            renderHTML={(text) => marked(text)}
            onChange={handleContentChange}
            className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
}
