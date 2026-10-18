"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/types";
import { t } from "@/i18n";

const PAGE_SIZE = 10;
const MAX_BTNS = 5;

interface Props {
  posts: PostMeta[];
}

/** 首页文章浏览器：客户端分页（每页 10 条，分页按钮 ≤5 个） */
export default function PostBrowser({ posts }: Props) {
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const cur = Math.min(page, totalPages);
  const pagePosts = posts.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE);

  const goto = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 组装分页按钮：上一页/下一页 + 页码，总数不超过 MAX_BTNS
  const buttons: (number | "prev" | "next")[] = [];
  if (totalPages > 1) {
    const hasPrev = cur > 1;
    const hasNext = cur < totalPages;
    const slots = Math.min(
      MAX_BTNS - (hasPrev ? 1 : 0) - (hasNext ? 1 : 0),
      totalPages
    );
    const start = Math.max(
      1,
      Math.min(cur - Math.floor(slots / 2), totalPages - slots + 1)
    );
    if (hasPrev) buttons.push("prev");
    for (let i = 0; i < slots; i++) buttons.push(start + i);
    if (hasNext) buttons.push("next");
  }

  return (
    <div ref={topRef} className="scroll-mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {pagePosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* 手绘分页（按钮总数 ≤5） */}
      {buttons.length > 0 && (
        <nav
          className="mt-8 flex items-center justify-center gap-2.5"
          aria-label={t.pagination.label}
        >
          {buttons.map((b) =>
            b === "prev" ? (
              <button
                key="prev"
                type="button"
                className="page-btn"
                aria-label={t.pagination.prev}
                onClick={() => goto(cur - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : b === "next" ? (
              <button
                key="next"
                type="button"
                className="page-btn"
                aria-label={t.pagination.next}
                onClick={() => goto(cur + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                key={b}
                type="button"
                className={`page-btn ${b === cur ? "page-btn-active" : ""}`}
                aria-label={t.pagination.page(b)}
                aria-current={b === cur ? "page" : undefined}
                onClick={() => goto(b)}
              >
                {b}
              </button>
            )
          )}
        </nav>
      )}
    </div>
  );
}
