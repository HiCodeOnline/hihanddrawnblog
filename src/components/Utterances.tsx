"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";

/** utterances 评论（基于 GitHub Issues），在 site.ts 中配置 repo 后生效 */
export default function Utterances() {
  const ref = useRef<HTMLDivElement>(null);
  const cfg = siteConfig.utterances;
  const configured = cfg.repo && !cfg.repo.includes("your-username");

  useEffect(() => {
    if (!configured || !ref.current) return;
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", cfg.repo);
    script.setAttribute("issue-term", cfg.issueTerm);
    script.setAttribute("theme", cfg.theme);
    if (cfg.label) script.setAttribute("label", cfg.label);
    script.setAttribute("crossorigin", "anonymous");
    ref.current.appendChild(script);
    // 卸载时清空，避免路由切换重复注入
    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [configured, cfg.repo, cfg.issueTerm, cfg.theme, cfg.label]);

  if (!configured) {
    return (
      <div className="mt-10 paper-card p-6 text-center text-sm text-ink-400">
        在 src/config/site.ts 中配置 utterances.repo 后即可开启评论 💬
      </div>
    );
  }

  return <div ref={ref} className="mt-10" />;
}
