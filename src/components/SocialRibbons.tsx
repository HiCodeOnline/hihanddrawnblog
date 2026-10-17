"use client";

import { useEffect, useState } from "react";
import { Github, Youtube, Instagram, Mail, Rss } from "lucide-react";
import { siteConfig } from "@/config/site";

/** X（原 Twitter）图标 */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

interface RibbonDef {
  key: string;
  label: string;
  color: string;
  Icon: React.ComponentType<{ className?: string }>;
}

/** 支持的平台（在 siteConfig.social 中配置对应 key 即自动展示） */
const RIBBONS: RibbonDef[] = [
  { key: "github", label: "GitHub", color: "#7d8590", Icon: Github },
  { key: "x", label: "X", color: "#5b6470", Icon: XIcon },
  { key: "youtube", label: "YouTube", color: "#ec7a6e", Icon: Youtube },
  { key: "instagram", label: "Instagram", color: "#d9a3c0", Icon: Instagram },
  { key: "email", label: "邮箱", color: "#a8c29b", Icon: Mail },
  { key: "rss", label: "RSS", color: "#f0b95e", Icon: Rss },
];

/** 每条标签的长度与倾斜角，垂直方向故意参差不齐 */
const STAGGER = [
  { h: 74, r: -4 },
  { h: 58, r: 3 },
  { h: 86, r: -2 },
  { h: 64, r: 5 },
  { h: 80, r: -5 },
  { h: 68, r: 2 },
];

export default function SocialRibbons() {
  // 卷帘门状态：向下滚动收起，向上滚动拉开
  const [rolled, setRolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 60 && y > lastY + 4) setRolled(true);
        else if (y < lastY - 4 || y <= 60) setRolled(false);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const social = siteConfig.social as Record<string, string>;
  const ribbons = RIBBONS.flatMap((def, i) => {
    const raw = social[def.key];
    if (!raw) return [];
    const href = def.key === "email" ? `mailto:${raw}` : raw;
    return [{ ...def, href, ...STAGGER[i % STAGGER.length] }];
  });

  if (ribbons.length === 0) return null;

  return (
    <nav
      className={`social-ribbons hidden md:flex${rolled ? " rolled" : ""}`}
      aria-label="社交链接"
    >
      {ribbons.map((r) => (
        <a
          key={r.key}
          href={r.href}
          title={r.label}
          aria-label={r.label}
          target={r.href.startsWith("http") ? "_blank" : undefined}
          rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="social-ribbon"
          style={
            {
              "--c": r.color,
              "--h": `${r.h}px`,
              "--r": `${r.r}deg`,
            } as React.CSSProperties
          }
        >
          <r.Icon className="w-4 h-4 text-white drop-shadow-sm" />
        </a>
      ))}
    </nav>
  );
}
