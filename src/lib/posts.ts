import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import readingTime from "reading-time";
import { t } from "@/i18n";
import type { Post, PostFrontmatter, PostMeta } from "@/types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/** 确保目录存在，构建时可能 content/posts 为空 */
function ensureDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

/** 递归收集 content/posts 下所有 .md 文件（按 年/月/日 分目录存放） */
function collectMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? collectMarkdownFiles(path.join(dir, entry.name))
      : entry.name.endsWith(".md")
        ? [path.join(dir, entry.name)]
        : []
  );
}

/** 从日期字符串提取路由段："2026-10-05" -> ["2026", "10", "05"] */
function dateSegments(date: string): [string, string, string] {
  const m = String(date).match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!m) {
    throw new Error(`文章 date 格式不正确（应为 YYYY-MM-DD）: ${date}`);
  }
  return [m[1], m[2].padStart(2, "0"), m[3].padStart(2, "0")];
}

interface RawPost {
  slug: string;
  href: string;
  data: PostFrontmatter;
  content: string;
}

/** 读取所有文章原始数据（含按日期生成的 href） */
function readAllRaw(): RawPost[] {
  ensureDir();
  return collectMarkdownFiles(POSTS_DIR).map((filePath) => {
    const slug = path.basename(filePath).replace(/\.md$/, "");
    const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
    const fm = data as PostFrontmatter;
    const href = `/posts/${[...dateSegments(fm.date), slug].join("/")}`;
    return { slug, href, data: fm, content };
  });
}

/** 获取所有文章 slug（文件名不含 .md） */
export function getAllPostSlugs(): string[] {
  return readAllRaw().map((p) => p.slug);
}

/** 由原始数据构建元信息 */
function toMeta(raw: RawPost): PostMeta {
  const stats = readingTime(raw.content);
  return {
    slug: raw.slug,
    href: raw.href,
    ...raw.data,
    tags: raw.data.tags ?? [],
    excerpt:
      raw.data.excerpt ??
      raw.content.replace(/[#>*`\-!\[\]()]/g, "").slice(0, 120) + "...",
    readingTime: t.post.readingTime(Math.max(1, Math.ceil(stats.minutes))),
    wordCount: stats.words,
  };
}

/** 将 Markdown 渲染为 HTML */
async function renderMarkdown(content: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: { className: ["anchor"] },
    })
    .use(rehypeStringify)
    .process(content);
  return String(file);
}

/** 获取所有文章元信息（不含正文 HTML），按日期倒序 */
export function getAllPostsMeta(): PostMeta[] {
  const posts: PostMeta[] = readAllRaw()
    .map(toMeta)
    .filter((p) => !p.draft);

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** 获取单篇文章完整内容（href 形如 /posts/2026/10/05/slug） */
export async function getPostByHref(href: string): Promise<Post | null> {
  const raw = readAllRaw().find((r) => r.href === href);
  if (!raw || raw.data.draft) return null;
  const html = await renderMarkdown(raw.content);
  return {
    ...toMeta(raw),
    content: raw.content,
    html,
  };
}

/** 获取所有分类及其文章数 */
export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPostsMeta();
  const map = new Map<string, number>();
  posts.forEach((p) => {
    if (p.category) {
      map.set(p.category, (map.get(p.category) ?? 0) + 1);
    }
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/** 获取所有标签及其文章数 */
export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPostsMeta();
  const map = new Map<string, number>();
  posts.forEach((p) => {
    p.tags?.forEach((t) => {
      map.set(t, (map.get(t) ?? 0) + 1);
    });
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/** 按分类筛选文章 */
export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.category === category);
}

/** 按标签筛选文章 */
export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.tags?.includes(tag));
}

/** 获取置顶文章 */
export function getPinnedPosts(): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.pinned);
}

/** 获取上一篇 / 下一篇 */
export function getAdjacentPosts(href: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPostsMeta();
  const index = posts.findIndex((p) => p.href === href);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

/** 获取全站统计 */
export function getSiteStats() {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();
  const tags = getAllTags();
  const totalWords = posts.reduce((sum, p) => sum + p.wordCount, 0);
  return {
    postCount: posts.length,
    categoryCount: categories.length,
    tagCount: tags.length,
    totalWords,
  };
}
