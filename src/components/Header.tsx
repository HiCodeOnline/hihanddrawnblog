"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, PenLine } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-paper-100/80 backdrop-blur-md border-b border-paper-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-200 to-butter-200 flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform">
            <PenLine className="w-5 h-5 text-ink-600" />
          </span>
          <span className="font-serif font-bold text-lg text-ink-700">
            {siteConfig.name}
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
                  ? "bg-sage-100 text-sage-600"
                  : "text-ink-500 hover:text-ink-700 hover:bg-paper-200/50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden p-2 rounded-lg text-ink-600 hover:bg-paper-200/50"
          onClick={() => setOpen(!open)}
          aria-label="菜单"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 移动端菜单 */}
      {open && (
        <nav className="md:hidden border-t border-paper-200/60 bg-paper-100 px-4 py-3 space-y-1">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-sage-100 text-sage-600"
                  : "text-ink-500 hover:text-ink-700 hover:bg-paper-200/50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
