---
title: "Next.js 静态导出实践：把博客部署到任何地方"
date: "2026-09-28"
category: "技术"
tags: ["Next.js", "静态导出", "SSG", "部署"]
excerpt: "分享使用 Next.js output: export 模式构建纯静态博客的实践经验，包括配置要点、动态路由处理、图片优化替代方案等。"
---

Next.js 不仅可以做服务端渲染，还支持 `output: "export"` 模式，把整个网站导出为纯静态 HTML。这对博客来说非常合适——部署简单、速度快、成本低。

## 配置

在 `next.config.ts` 中开启静态导出：

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

## 关键要点

### 1. 图片必须 unoptimized

静态导出不支持 Next.js 的图片优化服务，所以要设置 `images.unoptimized: true`，或者直接使用原生 `<img>` 标签。

### 2. 动态路由需要 generateStaticParams

对于 `[slug]` 这样的动态路由，必须提供 `generateStaticParams` 来告诉 Next.js 需要生成哪些页面：

```ts
export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}
```

### 3. 避免服务端特性

不能使用以下特性：
- `cookies()`、`headers()` 等服务端 API
- `revalidatePath`、增量静态再生
- 路由处理器（Route Handlers）的运行时依赖
- 需要请求时计算的动态内容

### 4. trailingSlash 推荐开启

开启 `trailingSlash: true` 后，每个页面会生成 `index.html`，访问路径如 `/posts/hello/`，兼容性更好。

## 构建

```bash
npm run build
```

构建产物在 `out/` 目录下，把它放到任何静态文件服务器上即可——Nginx、Vercel、Cloudflare Pages、GitHub Pages 都可以。

## 总结

静态导出让博客的部署变得异常简单。虽然牺牲了一些动态能力，但对于内容型网站来说，这些牺牲完全值得换来极致的性能和部署便利。
