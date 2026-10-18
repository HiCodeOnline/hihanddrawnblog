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
  // 赞赏二维码（替换 public/ 下对应图片为你的真实赞赏码）
  donate: {
    wechat: "/wechat-qr.svg",
    alipay: "/alipay-qr.svg",
  },
  // giscus 评论（基于 GitHub Discussions）：在 https://giscus.app/zh-CN 生成各项值后填入
  giscus: {
    repo: "your-username/your-repo",
    repoId: "YOUR_REPO_ID",
    category: "Announcements",
    categoryId: "YOUR_CATEGORY_ID",
    mapping: "pathname",
    reactionsEnabled: true,
    theme: "light",
    lang: "zh-CN",
  },
  // 代码块功能按钮（false 则不渲染对应按钮）
  codeBlock: {
    collapsible: true,
    copyable: true,
  },
  /**
   * 导航菜单：
   * - key 对应 src/i18n 字典 nav 下的键，显示文案随语言自动切换
   * - 自定义外部链接可改用 { name: "显示名", href: "https://..." }
   */
  nav: [
    { key: "home", href: "/" },
    { key: "gallery", href: "/gallery" },
    { key: "friends", href: "/friends" },
    { key: "messages", href: "/messages" },
    { key: "archives", href: "/archives" },
    { key: "about", href: "/about" },
  ] as { key?: string; name?: string; href: string }[],
  postsPerPage: 6,
};

export type SiteConfig = typeof siteConfig;
