import Link from "next/link";
import { Tags } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { getAllTags } from "@/lib/posts";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <PageHeader
        title="全部标签"
        subtitle={`${tags.length} 个标签`}
        icon={<Tags className="w-8 h-8 text-rose-400" />}
      />

      <div className="paper-card p-6 sm:p-8">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => {
            // 根据数量调整标签大小
            const sizes = [
              "text-xs",
              "text-sm",
              "text-base",
              "text-lg",
            ];
            const size = sizes[Math.min(3, Math.floor(tag.count / 3))];
            return (
              <Link
                key={tag.name}
                href={`/tags/${encodeURIComponent(tag.name)}`}
                className={`inline-flex items-center px-3 py-1.5 rounded-full bg-paper-100 border border-paper-200 text-ink-600 hover:bg-rose-100 hover:text-rose-600 hover:border-rose-200 transition-colors ${size} font-medium`}
              >
                #{tag.name}
                <span className="ml-1.5 text-xs opacity-60">{tag.count}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {tags.length === 0 && (
        <div className="paper-card p-12 text-center">
          <p className="font-hand text-xl text-ink-400">还没有标签哦～</p>
        </div>
      )}
    </div>
  );
}
