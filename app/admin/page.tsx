"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // 檢查是否已經登入
    const isAuthenticated = localStorage.getItem("blog-admin-auth");
    if (isAuthenticated === "true") {
      router.push("/admin/edit");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 這裡設置您的密碼，您可以將其移至環境變數中以增加安全性
    const correctPassword = "0926";

    if (password === correctPassword) {
      localStorage.setItem("blog-admin-auth", "true");
      router.push("/admin/edit");
    } else {
      setError("密碼錯誤，請重試");
      setPassword("");
    }
  };

  return (
    <div className="container max-w-6xl py-6 lg:py-10 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-center dark:text-white">
            部落格管理
          </h1>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
            請輸入管理員密碼
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="password" className="sr-only">
              密碼
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="輸入密碼"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 dark:bg-blue-700 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            >
              登入
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
