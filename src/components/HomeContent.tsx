import PostCard from "@/components/PostCard";
import PostBrowser from "@/components/PostBrowser";
import SidebarProfile from "@/components/SidebarProfile";
import SidebarExtras from "@/components/SidebarExtras";
import {
  getAllPostsMeta,
  getAllCategories,
  getAllTags,
  getPinnedPosts,
} from "@/lib/posts";
import { t } from "@/i18n";

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
                  {t.home.emptyTitle}
                </p>
                <p className="mt-2 text-sm text-ink-400">
                  {t.home.emptyHint}
                </p>
              </div>
            ) : (
              <PostBrowser posts={allPosts} />
            )}
          </div>

          {/* 侧边栏（移动端隐藏，内容移至导航抽屉） */}
          <aside className="hidden lg:block space-y-6">
            {/* 个人信息 */}
            <SidebarProfile
              posts={allPosts.length}
              categories={categories.length}
              tags={tags.length}
            />

            <SidebarExtras categories={categories} tags={tags} />
          </aside>
        </div>
      </div>
    </>
  );
}
