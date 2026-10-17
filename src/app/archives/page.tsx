import Link from "next/link";
import { Archive, Calendar } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { getAllPostsMeta } from "@/lib/posts";

export default function ArchivesPage() {
  const posts = getAllPostsMeta();

  // 按年份分组
  const yearMap = new Map<string, typeof posts>();
  posts.forEach((p) => {
    const year = p.date ? new Date(p.date).getFullYear().toString() : "未知";
    if (!yearMap.has(year)) yearMap.set(year, []);
    yearMap.get(year)!.push(p);
  });
  const years = Array.from(yearMap.entries()).sort((a, b) =>
    b[0].localeCompare(a[0])
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <PageHeader
        title="文章归档"
        subtitle={`共 ${posts.length} 篇文章`}
        icon={<Archive className="w-8 h-8 text-sky-500" />}
      />

      <div className="space-y-10">
        {years.map(([year, yearPosts]) => (
          <section key={year}>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-serif text-2xl font-bold text-ink-700">
                {year}
              </span>
              <span className="text-sm text-ink-400">
                {yearPosts.length} 篇
              </span>
              <div className="flex-1 dotted-divider" />
            </div>

            <div className="relative pl-6 border-l-2 border-dashed border-paper-300 space-y-4">
              {yearPosts.map((post) => {
                const date = post.date
                  ? new Date(post.date)
                  : null;
                const dateStr = date
                  ? `${date.getMonth() + 1}月${date.getDate()}日`
                  : "";
                return (
                  <div key={post.slug} className="relative">
                    {/* 时间轴圆点 */}
                    <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-sage-400 border-2 border-white shadow-sm" />
                    <div className="flex items-start gap-3 group">
                      <span className="text-xs text-ink-400 whitespace-nowrap mt-0.5 inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {dateStr}
                      </span>
                      <Link
                        href={post.href}
                        className="font-serif text-ink-700 group-hover:text-sage-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="paper-card p-12 text-center">
          <p className="font-hand text-xl text-ink-400">还没有文章哦～</p>
        </div>
      )}
    </div>
  );
}
