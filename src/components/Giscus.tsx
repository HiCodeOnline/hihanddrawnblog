"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { withBase } from "@/lib/path";
import { t } from "@/i18n";

/**
 * giscus 评论（基于 GitHub Discussions）
 * 在 site.ts 中配置 repo / repoId / category / categoryId 后生效，
 * 各项值可在 https://giscus.app/zh-CN 上生成
 *
 * 主题支持手绘风自定义 CSS（以 "/" 开头的路径），
 * 因 iframe 位于 giscus.app 域，会自动解析为站点绝对地址。
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
    // 自定义主题：把站点内路径解析为绝对 URL（iframe 在 giscus.app 域下）
    const theme = cfg.theme.startsWith("/")
      ? `${window.location.origin}${withBase(cfg.theme)}`
      : cfg.theme;
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
    script.setAttribute("data-theme", theme);
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
        {t.giscus.notConfiguredPre}
        <a
          href="https://giscus.app/zh-CN"
          target="_blank"
          rel="noreferrer"
          className="prose-link"
        >
          giscus.app
        </a>
        {t.giscus.notConfiguredPost}
      </div>
    );
  }

  return <div ref={ref} className="mt-10 paper-card giscus-wrap" />;
}
