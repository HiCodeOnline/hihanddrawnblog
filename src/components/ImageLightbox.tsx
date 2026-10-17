"use client";

import { useEffect, useState } from "react";

/** 文章图片灯箱：点击 .prose-content 内图片放大查看，点击遮罩或按 ESC 关闭 */
export default function ImageLightbox() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const img = (e.target as HTMLElement).closest(
        ".prose-content img"
      ) as HTMLImageElement | null;
      if (img?.src) setSrc(img.src);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSrc(null);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!src) return null;

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-label="查看大图"
      onClick={() => setSrc(null)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="放大查看" className="lightbox-img" />
      <p className="lightbox-tip">点击任意处关闭</p>
    </div>
  );
}
