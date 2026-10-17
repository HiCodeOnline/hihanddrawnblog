import Link from "next/link";
import { ArrowDown, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getSiteStats } from "@/lib/posts";

export default function Hero() {
  const stats = getSiteStats();

  return (
    <section className="relative overflow-hidden">
      {/* 背景插画 */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${siteConfig.heroImage})` }}
      />
      {/* 渐变遮罩，保证文字可读 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper-100/40 to-paper-100" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
        {/* 头像 */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 rounded-full bg-butter-300/40 blur-xl animate-float-soft" />
          <img
            src={siteConfig.avatar}
            alt={siteConfig.author}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-paper-hover object-cover"
          />
          {/* 装饰小贴纸 */}
          <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-rose-300 border-2 border-white flex items-center justify-center shadow-sm animate-wobble">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink-800 text-balance">
          {siteConfig.name}
          <span className="hand-text text-2xl sm:text-3xl block mt-1 text-ink-500">
            一页纸，一段时光
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-ink-500 max-w-xl mx-auto text-balance">
          {siteConfig.description}
        </p>

        {/* 统计贴纸 */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <StatCard label="文章" value={stats.postCount} color="sage" />
          <StatCard label="分类" value={stats.categoryCount} color="rose" />
          <StatCard label="标签" value={stats.tagCount} color="sky" />
          <StatCard
            label="字数"
            value={Math.round(stats.totalWords / 1000) + "k"}
            color="butter"
          />
        </div>

        <div className="mt-10">
          <a
            href="#posts"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink-700 text-paper-100 text-sm font-medium hover:bg-ink-800 transition-colors shadow-paper"
          >
            开始阅读
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color: "sage" | "rose" | "sky" | "butter";
}) {
  const colorMap = {
    sage: "bg-sage-100 text-sage-700 border-sage-200",
    rose: "bg-rose-100 text-rose-600 border-rose-200",
    sky: "bg-sky-100 text-sky-600 border-sky-200",
    butter: "bg-butter-100 text-butter-600 border-butter-200",
  };
  return (
    <div
      className={`px-4 py-2 rounded-xl border ${colorMap[color]} shadow-sm animate-fade-up`}
    >
      <span className="font-serif font-bold text-lg">{value}</span>
      <span className="ml-1.5 text-xs opacity-80">{label}</span>
    </div>
  );
}
