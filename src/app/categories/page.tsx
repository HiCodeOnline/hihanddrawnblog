import Link from "next/link";
import { FolderOpen } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { getAllCategories, getAllPostsMeta } from "@/lib/posts";
import { t } from "@/i18n";

export default function CategoriesPage() {
  const categories = getAllCategories();
  const allPosts = getAllPostsMeta();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <PageHeader
        title={t.categories.title}
        subtitle={t.categories.subtitle(categories.length, allPosts.length)}
        icon={<FolderOpen className="w-8 h-8 text-sage-500" />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/categories/${encodeURIComponent(cat.name)}`}
            className="paper-card p-5 group hover:-translate-y-1"
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
                {t.categories.postCount(cat.count)}
              </p>
            </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="paper-card p-12 text-center">
          <p className="font-hand text-xl text-ink-400">{t.categories.empty}</p>
        </div>
      )}
    </div>
  );
}
