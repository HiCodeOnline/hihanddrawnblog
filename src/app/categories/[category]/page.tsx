import Link from "next/link";
import { FolderOpen } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import { t } from "@/i18n";

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return getAllCategories().map((c) => ({
    category: encodeURIComponent(c.name),
  }));
}

export function generateMetadata({ params }: Props) {
  return {
    title: t.categories.metaTitle(decodeURIComponent(params.category)),
  };
}

export default function CategoryPage({ params }: Props) {
  const category = decodeURIComponent(params.category);
  const posts = getPostsByCategory(category);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <PageHeader
        title={category}
        subtitle={t.categories.total(posts.length)}
        icon={<FolderOpen className="w-8 h-8 text-sage-500" />}
      />

      <Link
        href="/categories"
        className="inline-flex items-center gap-1 text-sm text-ink-400 hover:text-sage-600 mb-6"
      >
        {t.categories.backToList}
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="paper-card p-12 text-center">
          <p className="font-hand text-xl text-ink-400">{t.categories.emptyCategory}</p>
        </div>
      )}
    </div>
  );
}
