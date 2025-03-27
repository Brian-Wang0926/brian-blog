"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Home } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 檢查身份驗證
    const isAuthenticated = localStorage.getItem("blog-admin-auth") === "true";
    setAuthenticated(isAuthenticated);
    setLoading(false);

    // 如果未通過驗證且不是在登入頁面，則重定向到登入頁面
    if (!isAuthenticated && pathname !== "/admin") {
      router.push("/admin");
    }
  }, [pathname, router]);

  // 登出功能
  const handleLogout = () => {
    localStorage.removeItem("blog-admin-auth");
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 dark:text-white">
        載入中...
      </div>
    );
  }

  if (!authenticated && pathname !== "/admin") {
    return null; // 等待重定向發生
  }

  // 登入頁面不需要顯示管理佈局
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  // 管理區佈局
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Home className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              部落格管理系統
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 flex items-center space-x-1 text-sm text-red-600 dark:text-red-400 border border-red-600 dark:border-red-400 rounded-md hover:bg-red-600 hover:text-white dark:hover:bg-red-500 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>登出</span>
          </button>
        </div>
      </header>
      <main className="container max-w-6xl px-4 py-6 sm:px-6 lg:px-8 mx-auto">
        {children}
      </main>

      {/* 固定在右下的按鈕可以在這裡添加，視需要而定 */}
    </div>
  );
}
