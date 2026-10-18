"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { t } from "@/i18n";

/** 回到顶部彩带标签：滚动超过阈值后从底部弹出，点击平滑滚回顶部 */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top${show ? " show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t.backToTop}
      title={t.backToTop}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
