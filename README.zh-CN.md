# HiProfile

[English](./README.md) | **简体中文**

治愈系手帐风格的静态博客，基于 Next.js 14 构建（全静态导出，无需服务器运行时）。

## 功能特性

- 📝 **Markdown 写作** —— 文章放在 `content/posts/年/月/日/*.md`，路由与日期目录一致
- 🎨 **手帐美学** —— 撕纸卡片、彩色和纸胶带、拍立得照片墙、可拖拽的冰箱贴（位置持久化到 localStorage）
- 🌐 **编译期国际化** —— 修改 `src/config/locale.ts` 后重新构建即可整站切换 `zh-CN` / `en-US`（无运行时切换）
- 🖼️ **图片网格** —— 用 `:::grid{cols=N}`（N = 1-4）包裹连续图片即可渲染响应式网格
- 💻 **增强代码块** —— 多彩图钉、文件名/语言徽标、可折叠、复制按钮
- 💬 **Giscus 评论** —— 基于 GitHub Discussions，在 `src/config/site.ts` 中配置
- 🖼 **图集** —— 图片丢进 `public/gallery/` 即自动生成可拖拽的拍立得照片墙
- 🤝 **朋友圈 / 留言 / 赞赏墙** —— 由 `src/data/` 下的 JSON 文件驱动
- 📱 **响应式** —— 手机屏幕下侧边栏卡片收进侧边抽屉

## 快速开始

```bash
npm install
npm run dev -- -p 3001   # 开发预览
npm run build            # 全静态导出到 out/
npx serve out -l 3000    # 预览导出结果
```

## 写文章

新建 `content/posts/2026/10/18/my-post.md`：

```markdown
---
title: "我的文章"
date: "2026-10-18"
category: "随笔"
tags: ["Markdown"]
excerpt: "一句话摘要。"
---

你好，世界！

:::grid{cols=3}
![a](/gallery/a.jpg)
![b](/gallery/b.jpg)
![c](/gallery/c.jpg)
:::
```

额外支持：带文件名的代码块（```` ```ts:src/a.ts ````）、KaTeX 公式、Mermaid 流程图、手绘任务列表、波浪分割线。

## 配置文件

| 文件 | 作用 |
|------|------|
| `src/config/site.ts` | 站点信息、导航、社交链接、赞赏码、Giscus、代码块开关 |
| `src/config/locale.ts` | 站点语言：`"zh-CN"` 或 `"en-US"`（编译期生效） |
| `src/i18n/zh-CN.ts` / `en-US.ts` | UI 文案字典（两个文件的键结构需保持一致） |
| `src/data/stickers.json` | 散落贴纸：图片、大小、初始位置、旋转角度 |
| `src/data/friends.json` | 友链 |
| `src/data/messages.json` | 留言便签 |
| `src/data/donations.json` | 赞赏墙记录 |
| `public/gallery/` | 图集照片（构建时自动扫描） |

## 项目结构

```
content/posts/        Markdown 文章（年/月/日目录）
public/               静态资源（logo、头像、图集、赞赏码）
src/
  app/                路由：首页、归档、分类、标签、图集、朋友圈、留言、关于
  components/         Header（移动端抽屉）、SidebarProfile、SidebarExtras、PostCard 等
  config/             site.ts、locale.ts
  data/               JSON 数据文件
  i18n/               编译期字典
  lib/                posts.ts（Markdown 渲染管线）、gallery.ts
```

## 技术栈

Next.js 14（`output: "export"`） · React 18 · Tailwind CSS · remark/rehype · date-fns · lucide-react

## 许可证

MIT
