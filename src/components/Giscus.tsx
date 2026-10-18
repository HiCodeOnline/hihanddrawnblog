"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";

/**
 * giscus 评论（基于 GitHub Discussions）
 * 在 site.ts 中配置 repo / repoId / category / categoryId 后生效，
 * 各项值可在 https://giscus.app/zh-CN 上生成
 */
export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const cfg = siteConfig.giscus;
  const configured =
    cfg.repo &&
    cfg.repoId &&
    !cfg.repo.includes("your-username") &&
    !cfg.repoId.includes("YOUR_");

  useEffect(() => {
    if (!configured || !ref.current) return;
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.setAttribute("data-repo", cfg.repo);
    script.setAttribute("data-repo-id", cfg.repoId);
    script.setAttribute("data-category", cfg.category);
    script.setAttribute("data-category-id", cfg.categoryId);
    script.setAttribute("data-mapping", cfg.mapping);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", String(cfg.reactionsEnabled ? 1 : 0));
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", cfg.theme);
    script.setAttribute("data-lang", cfg.lang);
    script.setAttribute("data-loading", "lazy");
    script.setAttribute("crossorigin", "anonymous");
    ref.current.appendChild(script);
    // 卸载时清空，避免路由切换重复注入
    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [configured, cfg]);

  if (!configured) {
    return (
      <div className="mt-10 paper-card p-6 text-center text-sm text-ink-400">
        在 src/config/site.ts 中配置 giscus 的 repo / repoId / category /
        categoryId 后即可开启评论（值可在{" "}
        <a
          href="https://giscus.app/zh-CN"
          target="_blank"
          rel="noreferrer"
          className="prose-link"
        >
          giscus.app
        </a>{" "}
        生成）💬
      </div>
    );
  }

  return <div ref={ref} className="mt-10 giscus-wrap" />;
}
