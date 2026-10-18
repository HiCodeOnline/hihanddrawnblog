"use client";

import { useEffect, useState } from "react";
import { t } from "@/i18n";

/** 文章图片灯箱：点击 .prose-content 内图片放大查看，点击遮罩或按 ESC 关闭 */
export default function ImageLightbox() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      // 忽略代码块顶栏/内容区域的点击，避免误触发放大
      if (el.closest(".code-head, .code-body")) return;
      const img = el.closest(
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
      aria-label={t.lightbox.dialog}
      onClick={() => setSrc(null)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={t.lightbox.alt} className="lightbox-img" />
      <p className="lightbox-tip">{t.lightbox.closeTip}</p>
    </div>
  );
}
