import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  Folder,
  Tag,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import {
  getPostByHref,
  getAllPostsMeta,
  getAdjacentPosts,
} from "@/lib/posts";
import type { HeadingItem } from "@/types";
import DonateSection from "@/components/DonateSection";
import Utterances from "@/components/Utterances";
import ImageLightbox from "@/components/ImageLightbox";

interface Props {
  /** 年/月/日/slug 路径段，如 ["2026", "10", "05", "autumn-coffee"] */
  params: { slug: string[] };
}

function hrefFromParams(params: Props["params"]) {
  return `/posts/${params.slug.join("/")}`;
}

export function generateStaticParams() {
  return getAllPostsMeta().map((post) => ({
    slug: post.href.replace(/^\/posts\//, "").split("/"),
  }));
}

export async function generateMetadata({ params }: Props) {
  const post = await getPostByHref(hrefFromParams(params));
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const href = hrefFromParams(params);
  const post = await getPostByHref(href);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(href);
  const headings = extractHeadings(post.html);

  const dateStr = post.date
    ? format(new Date(post.date), "yyyy 年 MM 月 dd 日", { locale: zhCN })
    : "";

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* 返回链接 */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-sage-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        返回首页
      </Link>

      {/* 文章头部 */}
      <header className="paper-card p-6 sm:p-10 mb-8 relative">
        {post.category && (
          <Link
            href={`/categories/${encodeURIComponent(post.category)}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-600 text-xs font-medium mb-4 hover:bg-sage-200 transition-colors"
          >
            <Folder className="w-3 h-3" />
            {post.category}
          </Link>
        )}

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-ink-800 text-balance leading-tight">
          {post.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-ink-400">
          {dateStr && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {dateStr}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readingTime}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            {post.wordCount} 字
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-5">
        {/* 正文 */}
        <div className="paper-card p-6 sm:p-10">
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* 标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-paper-200">
              <div className="flex items-center gap-2 text-sm text-ink-500 mb-3">
                <Tag className="w-4 h-4" />
                标签
              </div>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="sticker-tag"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 目录 */}
        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 paper-card p-4">
              <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">
                目录
              </p>
              <nav className="space-y-1.5 text-sm">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`block truncate hover:text-sage-600 transition-colors ${
                      h.level === 2
                        ? "text-ink-600 font-medium"
                        : "text-ink-400 pl-3"
                    }`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>

      {/* 赞赏 */}
      <DonateSection />

      {/* 上一篇 / 下一篇 */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="paper-card p-5 group"
          >
            <span className="inline-flex items-center gap-1 text-xs text-ink-400 mb-2">
              <ChevronLeft className="w-3 h-3" />
              上一篇
            </span>
            <p className="font-serif font-medium text-ink-700 group-hover:text-sage-600 transition-colors line-clamp-1">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={next.href}
            className="paper-card p-5 group text-right"
          >
            <span className="inline-flex items-center gap-1 text-xs text-ink-400 mb-2">
              下一篇
              <ChevronRight className="w-3 h-3" />
            </span>
            <p className="font-serif font-medium text-ink-700 group-hover:text-sage-600 transition-colors line-clamp-1">
              {next.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* 评论 */}
      <Utterances />

      {/* 图片灯箱 */}
      <ImageLightbox />
    </article>
  );
}

/** 从渲染后的 HTML 中提取标题目录 */
function extractHeadings(html: string): HeadingItem[] {
  const headingRegex = /<h([2-3])[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h[2-3]>/g;
  const items: HeadingItem[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    // 去除标签，保留纯文本
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    items.push({ level, id, text });
  }
  return items;
}
