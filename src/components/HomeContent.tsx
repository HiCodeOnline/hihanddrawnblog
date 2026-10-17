import Link from "next/link";
import { FolderOpen, Tags } from "lucide-react";
import PostCard from "@/components/PostCard";
import PostBrowser from "@/components/PostBrowser";
import SidebarProfile from "@/components/SidebarProfile";
import {
  getAllPostsMeta,
  getAllCategories,
  getAllTags,
  getPinnedPosts,
} from "@/lib/posts";

export default function HomeContent() {
  const allPosts = getAllPostsMeta();
  const pinnedPosts = getPinnedPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-10 relative z-10">
        {/* 置顶文章区 */}
        {pinnedPosts.length > 0 && (
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pinnedPosts.slice(0, 2).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* 主内容：文章列表 */}
          <div className="lg:col-span-2" id="posts">
            {allPosts.length === 0 ? (
              <div className="paper-card p-12 text-center">
                <p className="font-hand text-2xl text-ink-400">
                  这里还没有文字呢～
                </p>
                <p className="mt-2 text-sm text-ink-400">
                  在 content/posts 目录下添加 .md 文件即可
                </p>
              </div>
            ) : (
              <PostBrowser posts={allPosts} />
            )}
          </div>

          {/* 侧边栏 */}
          <aside className="space-y-6">
            {/* 个人信息 */}
            <SidebarProfile
              posts={allPosts.length}
              categories={categories.length}
              tags={tags.length}
            />

            {/* 分类 */}
            <div className="paper-card p-5">
              <h3 className="section-title text-base mb-4">
                <FolderOpen className="w-4 h-4 text-sage-500" />
                分类
              </h3>
              <div className="space-y-2">
                {categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/categories/${encodeURIComponent(cat.name)}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-paper-100 transition-colors group"
                  >
                    <span className="text-sm text-ink-600 group-hover:text-sage-600">
                      {cat.name}
                    </span>
                    <span className="text-xs text-ink-400 bg-paper-100 px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  </Link>
                ))}
                {categories.length > 6 && (
                  <Link
                    href="/categories"
                    className="block text-center text-xs text-ink-400 hover:text-sage-500 pt-2"
                  >
                    查看全部分类 →
                  </Link>
                )}
              </div>
            </div>

            {/* 热门标签 */}
            <div className="paper-card p-5">
              <h3 className="section-title text-base mb-4">
                <Tags className="w-4 h-4 text-rose-400" />
                热门标签
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 14).map((tag) => (
                  <Link
                    key={tag.name}
                    href={`/tags/${encodeURIComponent(tag.name)}`}
                    className="sticker-tag"
                  >
                    #{tag.name}
                    <span className="ml-1 opacity-60">{tag.count}</span>
                  </Link>
                ))}
              </div>
              {tags.length > 14 && (
                <Link
                  href="/tags"
                  className="block text-center text-xs text-ink-400 hover:text-sage-500 mt-3"
                >
                  查看全部标签 →
                </Link>
              )}
            </div>

            {/* 手帐便签 */}
            <div className="sticky-note">
              <p className="hand-text text-sm leading-relaxed text-ink-600">
                慢一点，再慢一点。
                <br />
                把日子过成诗，把生活写成文。
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
