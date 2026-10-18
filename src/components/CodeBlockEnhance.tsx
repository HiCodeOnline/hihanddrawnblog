"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";
import { t } from "@/i18n";

const COLLAPSE_MIN_LINES = 10;

/**
 * 代码块增强（纯 DOM，无 SSR 风险）：
 * - 多彩图钉（颜色由 CSS nth-of-type 循环）
 * - 顶部栏：文件名（```lang:path/to/file 语法）或语言徽标
 * - 右侧按钮：收缩/展开、复制（可在 siteConfig.codeBlock 配置开关）
 */
export default function CodeBlockEnhance() {
  useEffect(() => {
    const { collapsible, copyable } = siteConfig.codeBlock;

    document
      .querySelectorAll<HTMLPreElement>(".prose-content pre")
      .forEach((pre) => {
        if (pre.closest(".code-block")) return; // 已增强
        const code = pre.querySelector("code");
        if (!code) return;

        // 解析语言与文件名：class="language-js" 或 "language-js:lib/utils.ts"
        const langClass = Array.from(code.classList).find((c) =>
          c.startsWith("language-")
        );
        let lang = "";
        let filename = "";
        if (langClass) {
          const raw = langClass.replace("language-", "");
          const idx = raw.indexOf(":");
          if (idx >= 0) {
            lang = raw.slice(0, idx);
            filename = raw.slice(idx + 1);
          } else {
            lang = raw;
          }
        }

        // 组装容器
        const wrapper = document.createElement("div");
        wrapper.className = "code-block";

        const pin = document.createElement("span");
        pin.className = "code-pin";
        pin.setAttribute("aria-hidden", "true");

        const head = document.createElement("div");
        head.className = "code-head";

        const title = document.createElement("span");
        if (filename) {
          title.className = "code-filename";
          title.textContent = filename;
          title.title = filename;
        } else {
          title.className = "code-lang";
          title.textContent = lang || "code";
        }
        head.appendChild(title);

        const actions = document.createElement("div");
        actions.className = "code-actions";

        const body = document.createElement("div");
        body.className = "code-body";

        const text = code.textContent ?? "";
        const lines = text.replace(/\n$/, "").split("\n").length;

        // 收缩/展开
        let expandBtn: HTMLButtonElement | null = null;
        if (collapsible && lines > COLLAPSE_MIN_LINES) {
          const toggle = document.createElement("button");
          toggle.type = "button";
          toggle.className = "code-btn";
          toggle.textContent = t.codeBlock.expand;
          toggle.setAttribute("aria-expanded", "false");
          body.classList.add("collapsed");

          expandBtn = document.createElement("button");
          expandBtn.type = "button";
          expandBtn.className = "code-expand";
          expandBtn.textContent = t.codeBlock.expandAll(lines);

          const doToggle = () => {
            const collapsed = body.classList.toggle("collapsed");
            toggle.textContent = collapsed ? t.codeBlock.expand : t.codeBlock.collapse;
            toggle.setAttribute("aria-expanded", String(!collapsed));
            expandBtn!.style.display = collapsed ? "" : "none";
          };
          toggle.addEventListener("click", doToggle);
          expandBtn.addEventListener("click", doToggle);
          actions.appendChild(toggle);
        }

        // 复制
        if (copyable) {
          const copyBtn = document.createElement("button");
          copyBtn.type = "button";
          copyBtn.className = "code-btn";
          copyBtn.textContent = t.codeBlock.copy;
          copyBtn.addEventListener("click", async () => {
            try {
              await navigator.clipboard.writeText(text);
            } catch {
              const ta = document.createElement("textarea");
              ta.value = text;
              document.body.appendChild(ta);
              ta.select();
              document.execCommand("copy");
              ta.remove();
            }
            copyBtn.textContent = t.codeBlock.copied;
            setTimeout(() => (copyBtn.textContent = t.codeBlock.copy), 2000);
          });
          actions.appendChild(copyBtn);
        }

        if (actions.childElementCount > 0) head.appendChild(actions);

        // 替换 DOM
        pre.parentNode?.insertBefore(wrapper, pre);
        body.appendChild(pre);
        wrapper.appendChild(pin);
        wrapper.appendChild(head);
        wrapper.appendChild(body);
        if (expandBtn) body.appendChild(expandBtn);
      });
  }, []);

  return null;
}
