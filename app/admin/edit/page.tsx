// app/admin/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Edit,
  Trash2,
  Eye,
  Plus,
  Search,
  AlertCircle,
  Calendar,
  Tag,
  RefreshCw,
  ArrowUpDown,
  CheckSquare,
  Square,
  X,
} from "lucide-react";
import { formateDate } from "@/lib/utils";

interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  published: boolean;
  description?: string;
}

export default function EditPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [batchDeleteConfirm, setBatchDeleteConfirm] = useState(false);

  // 從 API 獲取文章列表
  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/list-posts");

      if (!response.ok) {
        throw new Error("獲取文章列表失敗");
      }

      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("獲取文章失敗:", err);
      setError("無法獲取文章列表，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  // 首次加載獲取文章
  useEffect(() => {
    fetchPosts();
  }, []);

  // 處理搜索和排序
  const filteredPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });

  // 處理刪除文章
  const handleDelete = async (slug: string) => {
    if (deleteConfirm === slug) {
      try {
        const response = await fetch("/api/delete-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (!response.ok) {
          throw new Error("刪除文章失敗");
        }

        // 重新獲取文章列表
        fetchPosts();
        setDeleteConfirm(null);
      } catch (err) {
        console.error("刪除文章失敗:", err);
        setError("刪除文章失敗，請稍後再試");
      }
    } else {
      setDeleteConfirm(slug);
    }
  };

  // 處理批量刪除
  const handleBatchDelete = async () => {
    if (!batchDeleteConfirm || selectedPosts.length === 0) {
      setBatchDeleteConfirm(true);
      return;
    }

    try {
      setLoading(true);

      // 逐一刪除所選文章
      const deletePromises = selectedPosts.map((slug) =>
        fetch("/api/delete-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        })
      );

      await Promise.all(deletePromises);

      // 重置狀態
      setSelectedPosts([]);
      setIsSelectionMode(false);
      setBatchDeleteConfirm(false);

      // 重新獲取文章列表
      await fetchPosts();
    } catch (err) {
      console.error("批量刪除文章失敗:", err);
      setError("批量刪除文章失敗，請稍後再試");
      setLoading(false);
    }
  };

  // 切換排序方式
  const toggleSort = (field: "date" | "title") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // 切換選擇模式
  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    // 退出選擇模式時，清空選擇
    if (isSelectionMode) {
      setSelectedPosts([]);
      setBatchDeleteConfirm(false);
    }
  };

  // 切換文章選擇
  const togglePostSelection = (slug: string) => {
    if (selectedPosts.includes(slug)) {
      setSelectedPosts(selectedPosts.filter((s) => s !== slug));
    } else {
      setSelectedPosts([...selectedPosts, slug]);
    }
  };

  // 全選/取消全選
  const toggleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map((post) => post.slug));
    }
  };

  return (
    <div className="space-y-6">
      {/* 頂部區域 - 標題、搜索和添加按鈕 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold dark:text-white">管理文章</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* 搜索框 */}
          <div className="relative">
            <input
              type="text"
              placeholder="搜尋文章..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* 添加按鈕和批量操作按鈕 */}
          <div className="flex gap-2">
            {!isSelectionMode ? (
              <>
                <button
                  onClick={toggleSelectionMode}
                  className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
                >
                  <CheckSquare className="h-4 w-4" />
                  <span>多選</span>
                </button>
                <Link
                  href="/admin/edit/new"
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>新增文章</span>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={toggleSelectAll}
                  className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
                >
                  {selectedPosts.length === filteredPosts.length
                    ? "取消全選"
                    : "全選"}
                </button>
                <button
                  onClick={handleBatchDelete}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    batchDeleteConfirm
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                  }`}
                  disabled={selectedPosts.length === 0}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>
                    {batchDeleteConfirm
                      ? "確認刪除"
                      : `刪除 (${selectedPosts.length})`}
                  </span>
                </button>
                <button
                  onClick={toggleSelectionMode}
                  className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>取消</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 統計和控制區 */}
      <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <span>共 {filteredPosts.length} 篇文章</span>
          <span className="text-gray-300 dark:text-gray-600">|</span>
          <span>{posts.filter((p) => !p.published).length} 篇草稿</span>
          {isSelectionMode && selectedPosts.length > 0 && (
            <>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span>已選 {selectedPosts.length} 篇</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <button
            onClick={() => toggleSort("date")}
            className={`flex items-center gap-1 px-2 py-1 rounded ${
              sortBy === "date" ? "bg-gray-200 dark:bg-gray-700" : ""
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>日期</span>
            {sortBy === "date" && (
              <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
            )}
          </button>

          <button
            onClick={() => toggleSort("title")}
            className={`flex items-center gap-1 px-2 py-1 rounded ${
              sortBy === "title" ? "bg-gray-200 dark:bg-gray-700" : ""
            }`}
          >
            <ArrowUpDown className="h-4 w-4" />
            <span>標題</span>
            {sortBy === "title" && (
              <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
            )}
          </button>

          <button
            onClick={fetchPosts}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* 錯誤信息 */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* 加載狀態 */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      ) : (
        <>
          {/* 空狀態 */}
          {filteredPosts.length === 0 && !loading && (
            <div className="text-center py-12 border border-dashed rounded-md dark:border-gray-700">
              {searchTerm ? (
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-300">
                    沒有符合「{searchTerm}」的文章
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    清除搜尋
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-300">
                    還沒有任何文章
                  </p>
                  <Link
                    href="/admin/edit/new"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Plus className="h-4 w-4" />
                    <span>新增第一篇文章</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* 文章列表 */}
          {filteredPosts.length > 0 && (
            <div className="grid gap-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.slug}
                  className={`border rounded-lg p-4 transition-all ${
                    !post.published
                      ? "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/60"
                      : "bg-white dark:bg-gray-800 dark:border-gray-700"
                  } ${
                    selectedPosts.includes(post.slug)
                      ? "ring-2 ring-blue-500 dark:ring-blue-400"
                      : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    {/* 文章信息 */}
                    <div className="flex gap-3">
                      {/* 選擇框（僅在選擇模式顯示） */}
                      {isSelectionMode && (
                        <div
                          className="cursor-pointer flex-shrink-0 mt-1"
                          onClick={() => togglePostSelection(post.slug)}
                        >
                          {selectedPosts.includes(post.slug) ? (
                            <CheckSquare className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                          ) : (
                            <Square className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-lg flex-grow dark:text-white">
                            {post.title}
                          </h3>
                          {!post.published && (
                            <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-xs rounded-full">
                              草稿
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formateDate(post.date)}</span>
                          </div>

                          {post.tags.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Tag className="h-3.5 w-3.5" />
                              <span>{post.tags.join(", ")}</span>
                            </div>
                          )}
                        </div>

                        {post.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {post.description.length > 100
                              ? post.description.substring(0, 100) + "..."
                              : post.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 操作按鈕 */}
                    {!isSelectionMode && (
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <Link
                          href={`/blog/${post.slug.split("/").pop()}`}
                          target="_blank"
                          className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="預覽"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          href={`/admin/edit/${post.slug}`}
                          className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          title="編輯"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>

                        <button
                          onClick={() => handleDelete(post.slug)}
                          className={`p-2 rounded-md transition-colors ${
                            deleteConfirm === post.slug
                              ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                              : "text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                          }`}
                          title={
                            deleteConfirm === post.slug ? "確認刪除" : "刪除"
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
