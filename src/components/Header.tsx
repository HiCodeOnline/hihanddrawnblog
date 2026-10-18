"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { t } from "@/i18n";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
              {item.key ? t.nav[item.key as keyof typeof t.nav] : item.name}
            </Link>
          ))}
        </nav>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden p-2 rounded-lg text-ink-600 hover:bg-paper-200/50"
          onClick={() => setOpen(!open)}
          aria-label={t.header.menu}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 移动端菜单 */}
      {open && (
        <nav className="md:hidden max-w-5xl mx-auto bg-[#fffdf6] border border-paper-200/60 border-t-0 shadow-[0_2px_12px_rgba(74,70,53,0.10)] px-4 py-3 space-y-1">
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
              {item.key ? t.nav[item.key as keyof typeof t.nav] : item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
