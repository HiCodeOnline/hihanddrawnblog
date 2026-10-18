"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { t } from "@/i18n";
import SidebarProfile from "@/components/SidebarProfile";
import SidebarExtras from "@/components/SidebarExtras";

interface CountItem {
  name: string;
  count: number;
}

interface Props {
  postCount: number;
  categoryCount: number;
  tagCount: number;
  categories: CountItem[];
  tags: CountItem[];
}

export default function Header({
  postCount,
  categoryCount,
  tagCount,
  categories,
  tags,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navName = (item: (typeof siteConfig.nav)[number]) =>
    item.key ? t.nav[item.key as keyof typeof t.nav] : item.name;

  return (
    <header className="relative z-50 p-3">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif font-bold text-lg text-ink-700">
            <img src={siteConfig.logo} alt={siteConfig.name} className="h-9" />
          </span>
        </Link>

        {/* 桌面导航 */}
        <nav className="hidden md:flex items-center gap-1">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "nav-active"
                  : "text-ink-500 hover:text-ink-700 hover:bg-paper-200/50"
              }`}
            >
              {navName(item)}
            </Link>
          ))}
        </nav>

        {/* 移动端抽屉按钮 */}
        <button
          className="md:hidden p-2 rounded-lg text-ink-600 hover:bg-paper-200/50"
          onClick={() => setOpen(true)}
          aria-label={t.header.menu}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* 移动端侧边抽屉 */}
      {open && (
        <div className="md:hidden">
          {/* 遮罩 */}
          <div
            className="fixed inset-0 z-[60] bg-ink-800/30"
            onClick={() => setOpen(false)}
          />
          {/* 抽屉面板 */}
          <aside className="drawer-panel fixed top-0 right-0 bottom-0 z-[70] w-48vw】 max-w-[50vw] overflow-y-auto bg-[#fffdf6] shadow-[0_2px_16px_rgba(74,70,53,0.18)] p-5">
            <div className="flex items-center justify-between mb-5">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <img src={siteConfig.logo} alt={siteConfig.name} className="h-9" />
              </Link>
              <button
                className="p-2 rounded-lg text-ink-600 hover:bg-paper-200/50"
                onClick={() => setOpen(false)}
                aria-label={t.header.menu}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 导航菜单 */}
            <nav className="space-y-1 mb-6">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "nav-active"
                      : "text-ink-500 hover:text-ink-700 hover:bg-paper-200/50"
                  }`}
                >
                  {navName(item)}
                </Link>
              ))}
            </nav>

            {/* 首页侧边栏内容 */}
            <div className="space-y-6">
              <SidebarProfile
                posts={postCount}
                categories={categoryCount}
                tags={tagCount}
              />
              <SidebarExtras categories={categories} tags={tags} />
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
