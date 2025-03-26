"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Printer, Share2, Copy, Languages } from "lucide-react";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ReactNode } from "react";
import ResumeContentEN from "./resume/resumeContentEN";
import ResumeContentZH from "./resume/resumeContentZH";

export default function AboutPage() {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [language, setLanguage] = useState<"en" | "zh">("en"); // 默認為英文

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  // 共用標籤元件
  const Badge = ({ children }: { children: ReactNode }) => {
    return (
      <span className="text-xs font-medium whitespace-nowrap bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-2.5 py-0.5 rounded-lg mb-1 inline-block">
        {children}
      </span>
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${siteConfig.author} - Resume`,
          text: `Check out ${siteConfig.author}'s resume`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
        setShowShareOptions(!showShareOptions);
      }
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("URL copied to clipboard!");
    setShowShareOptions(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en");
  };

  return (
    <>
      <div className="container max-w-6xl py-6 lg:py-10">
        {/* 列印、分享按鈕 - 固定在右下 */}
        <div className="fixed bottom-10 right-4 flex flex-col gap-2 z-50">
          <button
            onClick={toggleLanguage}
            className="p-2 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-full shadow-md"
          >
            <Languages className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Print"
            onClick={() => reactToPrintFn()}
            className="p-2 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-full shadow-md"
          >
            <Printer className="h-4 w-4" />
          </button>
          <div className="relative">
            {!showShareOptions && (
              <button
                type="button"
                title="Share"
                onClick={handleShare}
                className="p-2 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-full shadow-md"
              >
                <Share2 className="h-4 w-4" />
              </button>
            )}
            {showShareOptions && (
              <button
                onClick={copyToClipboard}
                className="p-2 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-full shadow-md"
              >
                <Copy className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* 大頭照區域 */}
        <div className="my-8 flex justify-center">
          <Avatar className="h-48 w-48">
            <AvatarImage src="/avatar.png" alt={siteConfig.author} />
            <AvatarFallback>{siteConfig.author.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <hr className="mt-8" />

        {/* A4 履歷內容 - 使用 ref 來指定要列印的內容 */}
        <div className="a4-container mx-auto" ref={contentRef}>
          {language === "en" ? (
            <ResumeContentEN Badge={Badge} />
          ) : (
            <ResumeContentZH Badge={Badge} />
          )}
        </div>
      </div>

      {/* 基本樣式 */}
      <style jsx global>{`
        /* A4 容器樣式 */
        .a4-container {
          width: 210mm;
          max-width: 100%;
          padding: 6mm;
          box-sizing: border-box;
        }

        @media screen and (max-width: 210mm) {
          .a4-container {
            width: 100%;
            padding: 0;
          }
        }
      `}</style>
    </>
  );
}
