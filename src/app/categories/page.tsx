import Link from "next/link";
import { FolderOpen } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { getAllCategories, getAllPostsMeta } from "@/lib/posts";

export default function CategoriesPage() {
  const categories = getAllCategories();
  const allPosts = getAllPostsMeta();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <PageHeader
        title="全部分类"
        subtitle={`${categories.length} 个分类，${allPosts.length} 篇文章`}
        icon={<FolderOpen className="w-8 h-8 text-sage-500" />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat, idx) => {
          const colors = [
            "from-sage-100 to-sage-200/50 border-sage-200",
            "from-rose-100 to-rose-200/50 border-rose-200",
            "from-sky-100 to-sky-200/50 border-sky-200",
            "from-butter-100 to-butter-200/50 border-butter-200",
          ];
          const color = colors[idx % colors.length];
          return (
            <Link
              key={cat.name}
              href={`/categories/${encodeURIComponent(cat.name)}`}
              className={`paper-card p-5 bg-gradient-to-br ${color} group hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-ink-700 group-hover:text-ink-800">
                  {cat.name}
                </h3>
                <span className="font-serif text-2xl font-bold text-ink-300 group-hover:text-ink-400">
                  {cat.count}
                </span>
              </div>
              <p className="text-sm text-ink-400 mt-1">
                {cat.count} 篇文章 →
              </p>
            </Link>
          );
        })}
      </div>

      {categories.length === 0 && (
        <div className="paper-card p-12 text-center">
          <p className="font-hand text-xl text-ink-400">还没有分类哦～</p>
        </div>
      )}
    </div>
  );
}
