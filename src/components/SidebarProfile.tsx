import Link from "next/link";
import { Github, Youtube, Instagram, Mail, Rss } from "lucide-react";
import { siteConfig } from "@/config/site";
import { t } from "@/i18n";

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

/** 支持的平台（在 siteConfig.social 中配置对应 key 即自动展示） */
const SOCIALS = [
  { key: "github", label: "GitHub", color: "#7d8590", Icon: Github },
  { key: "x", label: "X", color: "#5b6470", Icon: XIcon },
  { key: "youtube", label: "YouTube", color: "#ec7a6e", Icon: Youtube },
  { key: "instagram", label: "Instagram", color: "#d9a3c0", Icon: Instagram },
  { key: "email", label: t.sidebar.emailLabel, color: "#a8c29b", Icon: Mail },
  { key: "rss", label: "RSS", color: "#f0b95e", Icon: Rss },
];

/** 标签微倾斜角，错落有致 */
const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1];

interface Props {
  posts: number;
  categories: number;
  tags: number;
}

/** 侧边栏个人信息卡：头像、简介、统计、社交标签 */
export default function SidebarProfile({ posts, categories, tags }: Props) {
  const social = siteConfig.social as Record<string, string | undefined>;
  const socials = SOCIALS.flatMap((def, i) => {
    const raw = social[def.key];
    if (!raw) return [];
    const href = def.key === "email" ? `mailto:${raw}` : raw;
    return [{ ...def, href, r: ROTATIONS[i % ROTATIONS.length] }];
  });

  const stats = [
    { label: t.common.posts, value: posts, href: "/" },
    { label: t.common.categories, value: categories, href: "/categories" },
    { label: t.common.tags, value: tags, href: "/tags" },
  ];

  return (
    <div className="paper-card p-5 text-center">
      {/* 头像 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={siteConfig.avatar}
        alt={siteConfig.author}
        className="w-20 h-20 mx-auto rounded-full border-2 border-paper-200 bg-white p-1 rotate-[-2deg]"
      />
      <h3 className="mt-3 font-serif font-bold text-lg text-ink-700">
        {siteConfig.author}
      </h3>
      <p className="mt-1 hand-text text-sm text-ink-400 leading-relaxed">
        {siteConfig.bio}
      </p>

      {/* 统计 */}
      <div className="mt-4 grid grid-cols-3 border-y border-dashed border-paper-300 py-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group border-x border-dashed border-paper-300 first:border-l-0 last:border-r-0"
          >
            <p className="font-serif font-bold text-lg text-ink-700 group-hover:text-sage-600 transition-colors">
              {s.value}
            </p>
            <p className="text-xs text-ink-400">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* 社交标签 */}
      {socials.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {socials.map((s) => (
            <a
              key={s.key}
              href={s.href}
              title={s.label}
              aria-label={s.label}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="social-tag"
              style={
                { "--c": s.color, "--r": `${s.r}deg` } as React.CSSProperties
              }
            >
              <s.Icon className="w-3.5 h-3.5" />
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
