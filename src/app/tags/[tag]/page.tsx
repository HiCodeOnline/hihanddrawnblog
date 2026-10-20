import Link from "next/link";
import { Tags } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { t } from "@/i18n";

interface Props {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((t) => ({
    tag: encodeURIComponent(t.name),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  return {
    title: t.tagsPage.metaTitle(decodeURIComponent(tag)),
  };
}

export default async function TagPage({ params }: Props) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const posts = getPostsByTag(tag);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <PageHeader
        title={`#${tag}`}
        subtitle={t.tagsPage.total(posts.length)}
        icon={<Tags className="w-8 h-8 text-rose-400" />}
      />

      <Link
        href="/tags"
        className="inline-flex items-center gap-1 text-sm text-ink-400 hover:text-sage-600 mb-6"
      >
        {t.tagsPage.backToList}
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="paper-card p-12 text-center">
          <p className="font-hand text-xl text-ink-400">{t.tagsPage.emptyTag}</p>
        </div>
      )}
    </div>
  );
}
