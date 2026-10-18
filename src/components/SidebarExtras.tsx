import Link from "next/link";
import { FolderOpen, Tags } from "lucide-react";
import { t } from "@/i18n";

interface CountItem {
  name: string;
  count: number;
}

interface Props {
  categories: CountItem[];
  tags: CountItem[];
}

/** 首页侧边栏附加卡片：分类、热门标签、手帐便签（桌面端侧边栏 / 移动端抽屉共用） */
export default function SidebarExtras({ categories, tags }: Props) {
  return (
    <>
      {/* 分类 */}
      <div className="paper-card p-5">
        <h3 className="section-title text-base mb-4">
          <FolderOpen className="w-4 h-4 text-sage-500" />
          {t.home.categoriesTitle}
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
              {t.home.viewAllCategories}
            </Link>
          )}
        </div>
      </div>

      {/* 热门标签 */}
      <div className="paper-card p-5">
        <h3 className="section-title text-base mb-4">
          <Tags className="w-4 h-4 text-rose-400" />
          {t.home.hotTags}
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
            {t.home.viewAllTags}
          </Link>
        )}
      </div>

      {/* 手帐便签 */}
      <div className="sticky-note">
        <p className="hand-text text-sm leading-relaxed text-ink-600">
          {t.home.noteLine1}
          <br />
          {t.home.noteLine2}
        </p>
      </div>
    </>
  );
}
