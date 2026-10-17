export const siteConfig = {
  name: "HiProfile",
  title: "HiProfile · 治愈系手帐博客",
  description:
    "一个清新自然的手帐风格博客，记录生活、分享文字，在纸页间寻找治愈。",
  author: "手帐旅人",
  avatar: "/avatar.svg",
  // 首页 Hero 背景图（使用占位渐变/插画）
  heroImage: "/hero-pattern.svg",
  bio: "在纸页与光影之间，记录每一段值得珍藏的日常。",
  social: {
    github: "https://github.com",
    x: "https://x.com",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    email: "hello@hiprofile.dev",
    rss: "/feed.xml",
  },
  nav: [
    { name: "首页", href: "/" },
    { name: "归档", href: "/archives" },
    { name: "分类", href: "/categories" },
    { name: "标签", href: "/tags" },
    { name: "关于", href: "/about" },
  ],
  postsPerPage: 6,
};

export type SiteConfig = typeof siteConfig;
