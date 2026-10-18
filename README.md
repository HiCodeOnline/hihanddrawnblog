# HiProfile

**English** | [简体中文](./README.zh-CN.md)

A healing handwritten-notebook style static blog, built with Next.js 14 (full static export, no server runtime required).

## Features

- 📝 **Markdown writing** — posts live in `content/posts/YYYY/MM/DD/*.md`, routes follow the same date structure
- 🎨 **Handwritten aesthetic** — torn-paper cards, colored washi tape, polaroid photo wall, fridge-magnet stickers (draggable, positions persisted in localStorage)
- 🌐 **Compile-time i18n** — switch the whole site between `zh-CN` and `en-US` via `src/config/locale.ts`, then rebuild (no runtime switching)
- 🖼️ **Image grids** — wrap consecutive images in `:::grid{cols=N}` (N = 1-4) to render a responsive photo grid
- 💻 **Enhanced code blocks** — colorful pin, filename/language badge, collapsible blocks, copy button
- 💬 **Giscus comments** — GitHub Discussions based, configured in `src/config/site.ts`
- 🖼 **Gallery** — images dropped into `public/gallery/` are auto-mounted as a draggable polaroid wall
- 🤝 **Friends / Messages / Donation wall** — data-driven pages fed by JSON files in `src/data/`
- 📱 **Responsive** — on mobile the sidebar cards move into a slide-in drawer

## Quick Start

```bash
npm install
npm run dev -- -p 3001   # dev preview
npm run build            # full static export to out/
npx serve out -l 3000    # preview the exported site
```

## Writing a Post

Create `content/posts/2026/10/18/my-post.md`:

```markdown
---
title: "My Post"
date: "2026-10-18"
category: "Notes"
tags: ["Markdown"]
excerpt: "Short summary."
---

Hello world!

:::grid{cols=3}
![a](/gallery/a.jpg)
![b](/gallery/b.jpg)
![c](/gallery/c.jpg)
:::
```

Supported extras: code blocks with filename (```` ```ts:src/a.ts ````), KaTeX, Mermaid, hand-drawn task lists, wavy dividers.

## Configuration

| File | Purpose |
|------|---------|
| `src/config/site.ts` | Site meta, nav, social links, donate QR codes, Giscus, code-block toggles |
| `src/config/locale.ts` | Site language: `"zh-CN"` or `"en-US"` (compile-time) |
| `src/i18n/zh-CN.ts` / `en-US.ts` | UI dictionaries (keep key structures identical) |
| `src/data/stickers.json` | Floating stickers: image, size, position, rotation |
| `src/data/friends.json` | Friend links |
| `src/data/messages.json` | Guestbook notes |
| `src/data/donations.json` | Donation wall records |
| `public/gallery/` | Gallery photos (auto-scanned at build) |

## Project Structure

```
content/posts/        Markdown posts (year/month/day folders)
public/               Static assets (logo, avatar, gallery, QR codes)
src/
  app/                Routes: home, archives, categories, tags, gallery, friends, messages, about
  components/         Header (mobile drawer), SidebarProfile, SidebarExtras, PostCard, ...
  config/             site.ts, locale.ts
  data/               JSON data files
  i18n/               Compile-time dictionaries
  lib/                posts.ts (markdown pipeline), gallery.ts
```

## Tech Stack

Next.js 14 (`output: "export"`) · React 18 · Tailwind CSS · remark/rehype · date-fns · lucide-react

## License

MIT
