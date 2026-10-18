/**
 * giscus 自定义主题路由：/giscus-theme.css
 *
 * giscus 以 <link crossorigin="anonymous"> 加载自定义主题，
 * 跨域请求要求 Access-Control-Allow-Origin 响应头 ——
 * public/ 静态文件与 output:export 均无法附加该头，
 * 因此用 force-static 路由输出：开发模式带 CORS 头，
 * 构建时静态导出为 out/giscus-theme.css（GitHub Pages 自带 ACAO: *）。
 *
 * 主题内容：手帐纸页风，基于 giscus 官方 light 主题变量改写，
 * 评论框/评论卡片等边框对齐文章代码块样式（2px dashed #a8a289）。
 */
export const dynamic = "force-static";

const css = `
@import url("https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap");

html,
body {
  background-color: #fffdf6 !important;
}

/* 主题变量（挂在 body 与 main 上，确保继承到所有元素） */
body,
main {
  color-scheme: light;

  /* 按钮 */
  --color-btn-text: #4f4635;
  --color-btn-bg: #faf6ec;
  --color-btn-border: #d4cdc0;
  --color-btn-shadow: 0 1px 0 rgba(74, 70, 53, 0.04);
  --color-btn-inset-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
  --color-btn-hover-bg: #f3ecda;
  --color-btn-hover-border: #b3a894;
  --color-btn-active-bg: #ece8e1;
  --color-btn-active-border: #b3a894;
  --color-btn-selected-bg: #ece8e1;
  --color-btn-primary-text: #fffdf6;
  --color-btn-primary-bg: #5f874e;
  --color-btn-primary-border: #4a6b3d;
  --color-btn-primary-hover-bg: #4a6b3d;
  --color-btn-primary-hover-border: #4a6b3d;
  --color-btn-primary-selected-bg: #4a6b3d;
  --color-btn-primary-disabled-text: rgba(255, 253, 246, 0.8);
  --color-btn-primary-disabled-bg: #a8c29b;
  --color-btn-primary-disabled-border: #4a6b3d;

  /* 画布 */
  --color-canvas-default: #fffdf6;
  --color-canvas-overlay: #fffdf6;
  --color-canvas-inset: #faf6ec;
  --color-canvas-subtle: #faf6ec;

  /* 边框 */
  --color-border-default: #d4cdc0;
  --color-border-muted: #e8ddc0;

  /* 中性 */
  --color-neutral-muted: rgba(179, 168, 148, 0.2);
  --color-neutral-subtle: rgba(232, 221, 192, 0.5);

  /* 强调 */
  --color-accent-fg: #4a7eac;
  --color-accent-emphasis: #4a7eac;
  --color-accent-muted: rgba(155, 192, 221, 0.4);
  --color-accent-subtle: #e4eef5;

  --color-success-fg: #5f874e;
  --color-attention-fg: #e0a82a;
  --color-danger-fg: #c75a4a;
  --color-done-fg: #8250df;

  /* 文字 */
  --color-fg-default: #4f4635;
  --color-fg-muted: #8a7e68;
  --color-fg-subtle: #6b5f4a;
}

/* 手写体：统一继承（与站点 --font-sans 一致），等宽元素除外 */
main {
  font-family: "ZCOOL XiaoWei", "KaiTi", "STKaiti", "PingFang SC",
    "Microsoft YaHei", serif !important;
}
main * {
  font-family: inherit !important;
}
main code,
main pre,
main kbd,
main samp {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace !important;
}

/* ============ 手绘边框（对齐文章代码块：2px dashed #a8a289 + 12px 圆角） ============ */

/* 评论输入框：纸张底色 + 手绘虚线框 */
main .gsc-comment-box-textarea {
  border: 2px dashed #a8a289 !important;
  border-radius: 12px !important;
  background-color: #fdfaf0 !important;
}
main .gsc-comment-box-textarea:focus {
  border-color: #8fb57f !important;
  outline: 2px dashed rgba(168, 194, 155, 0.55) !important;
  outline-offset: 2px;
}

/* 评论输入区整体容器 */
main .gsc-comment-box:not(.gsc-comment-box-is-reply) {
  border: 2px dashed #a8a289 !important;
  border-radius: 12px !important;
  background-color: #fdfaf0;
}

/* 评论卡片 */
main .gsc-comment {
  border: 2px dashed #a8a289 !important;
  border-radius: 12px !important;
  background-color: #fffdf6;
}

/* 表情回应按钮：虚线小胶囊 */
main .gsc-reactions-button,
main .gsc-direct-reaction-button {
  border: 1.5px dashed #b3a894 !important;
  border-radius: 10px !important;
}
main .gsc-reactions-button:hover,
main .gsc-direct-reaction-button:hover {
  border-color: #8fb57f !important;
  background-color: #f3ecda;
}

/* 表情选择弹层 */
main .gsc-reactions-popover {
  border: 2px dashed #a8a289 !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 16px rgba(74, 70, 53, 0.14);
}

main .gsc-comment-box-textarea-extras {
  border-width: 0 !important;
}

/* 普通按钮：虚线手绘风 + 斜纹底 + 悬停轻抬（与导航栏选中态一致的斜纹） */
main button {
  border-radius: 10px;
}
main button:not([class*="primary"]):not(.color-bg-accent-emphasis) {
  border: 1.5px dashed #b3a894 !important;
  background-color: #faf6ec;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(143, 181, 127, 0.15) 0 4px,
    transparent 4px 8px
  );
}
main button:hover {
  box-shadow: 0 2px 6px rgba(74, 70, 53, 0.1);
}

/* 主操作按钮（鼠尾草绿，实线 + 白色斜纹） */
main button[class*="primary"],
main button.color-bg-accent-emphasis {
  border: 1.5px solid #4a6b3d !important;
  background-color: #5f874e !important;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.16) 0 4px,
    transparent 4px 8px
  ) !important;
  color: #fffdf6 !important;
}

/* 头像加一圈细纸边 */
main img.avatar,
main .gsc-comment-author-avatar img {
  border: 1px solid #e8ddc0;
}
`;

export function GET() {
  return new Response(css, {
    headers: {
      "Content-Type": "text/css; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=600",
    },
  });
}
