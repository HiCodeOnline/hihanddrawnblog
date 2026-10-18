import Link from "next/link";
import { Calendar, Clock, Folder, Pin } from "lucide-react";
import { format } from "date-fns";
import type { PostMeta } from "@/types";
import { t, dateLocale } from "@/i18n";

interface Props {
  post: PostMeta;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: Props) {
  const dateStr = post.date
    ? format(new Date(post.date), t.dateFormat.card, { locale: dateLocale })
    : "";

  return (
    <article
      className={`paper-card group ${featured ? "md:col-span-2" : ""}`}
    >
      {/* 封面图（如有） */}
      {post.cover ? (
        <Link
          href={post.href}
          className="block overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      ) : null}

      <div className="p-5 sm:p-6">
        {/* 顶部元信息 */}
        <div className="flex items-center gap-3 text-xs text-ink-400 mb-3 flex-wrap">
          {post.pinned && (
            <span className="inline-flex items-center gap-1 text-rose-500 font-medium">
              <Pin className="w-3 h-3 fill-rose-500" />
              {t.post.pinned}
            </span>
          )}
          {post.category && (
            <Link
              href={`/categories/${encodeURIComponent(post.category)}`}
              className="inline-flex items-center gap-1 text-sage-600 hover:text-sage-700 hover:underline"
            >
              <Folder className="w-3 h-3" />
              {post.category}
            </Link>
          )}
          {dateStr && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {dateStr}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime}
          </span>
        </div>

        {/* 标题 */}
        <h3
          className={`font-serif font-bold text-ink-700 group-hover:text-sage-600 transition-colors ${
            featured ? "text-xl sm:text-2xl" : "text-lg"
          }`}
        >
          <Link href={post.href}>{post.title}</Link>
        </h3>

        {/* 摘要 */}
        <p className="mt-2 text-sm text-ink-500 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="sticker-tag"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
