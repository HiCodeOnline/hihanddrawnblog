import type { Dictionary } from "./zh-CN";

const enUS: Dictionary = {
  nav: {
    home: "Home",
    gallery: "Gallery",
    friends: "Friends",
    messages: "Messages",
    archives: "Archives",
    about: "About",
  },
  header: {
    menu: "Menu",
  },
  common: {
    posts: "Posts",
    categories: "Categories",
    tags: "Tags",
  },
  backToTop: "Back to top",
  codeBlock: {
    expand: "Expand",
    collapse: "Collapse",
    expandAll: (lines: number) => `Expand all ${lines} lines`,
    copy: "Copy",
    copied: "Copied",
  },
  lightbox: {
    dialog: "View image",
    alt: "Zoomed view",
    closeTip: "Click anywhere to close",
  },
  home: {
    emptyTitle: "No posts yet ~",
    emptyHint: "Add .md files under content/posts to get started",
    categoriesTitle: "Categories",
    viewAllCategories: "View all categories →",
    hotTags: "Hot Tags",
    viewAllTags: "View all tags →",
    noteLine1: "Slow down, take it easy.",
    noteLine2: "Turn days into poetry, life into words.",
  },
  sidebar: {
    emailLabel: "Email",
  },
  post: {
    pinned: "Pinned",
    backHome: "Back to Home",
    tagsTitle: "Tags",
    toc: "Contents",
    prev: "Previous",
    next: "Next",
    words: (n: number) => `${n} words`,
    readingTime: (min: number) => `${min} min read`,
  },
  dateFormat: {
    card: "MMM d, yyyy",
    post: "MMMM d, yyyy",
    archiveItem: "MMM d",
  },
  archives: {
    title: "Archives",
    total: (n: number) => `${n} posts in total`,
    perYear: (n: number) => `${n} posts`,
    empty: "No posts yet ~",
    unknownYear: "Unknown",
  },
  categories: {
    title: "Categories",
    subtitle: (cats: number, posts: number) =>
      `${cats} categories, ${posts} posts`,
    postCount: (n: number) => `${n} posts →`,
    empty: "No categories yet ~",
    metaTitle: (name: string) => `Category: ${name}`,
    total: (n: number) => `${n} posts in total`,
    backToList: "← Back to categories",
    emptyCategory: "No posts in this category",
  },
  tagsPage: {
    title: "Tags",
    subtitle: (n: number) => `${n} tags`,
    empty: "No tags yet ~",
    metaTitle: (name: string) => `Tag: ${name}`,
    total: (n: number) => `${n} posts in total`,
    backToList: "← Back to tags",
    emptyTag: "No posts with this tag",
  },
  pagination: {
    label: "Pagination",
    prev: "Previous",
    next: "Next",
    page: (n: number) => `Page ${n}`,
  },
  donate: {
    prompt: "If this article helped you, buy me a coffee ☕",
    wechat: "WeChat",
    alipay: "Alipay",
    aria: (label: string) => `${label} Donate`,
    qrAlt: (label: string) => `${label} donation QR code`,
    scanTip: "Scan to buy me a coffee ~",
  },
  donationWall: {
    title: "Donation Wall",
    summary: (count: number, total: string) =>
      `Thanks to ${count} supporters, total ¥${total} ❤️`,
  },
  giscus: {
    notConfiguredPre:
      "Configure giscus repo / repoId / category / categoryId in src/config/site.ts to enable comments (get values at ",
    notConfiguredPost: ") 💬",
  },
  gallery: {
    metaTitle: "Gallery",
    metaDesc: "Photos pinned on the wall",
    title: "Gallery",
    count: (n: number) => `${n} photo${n === 1 ? "" : "s"}`,
    subtitle: "Pin your favorite moments on the wall. Drag them around!",
    emptyTitle: "No photos on the wall yet ~",
    emptyHint: "Drop images into public/gallery to auto-display them",
  },
  friends: {
    metaTitle: "Friends",
    metaDesc: "Friend links & neighbors",
    title: "Friends",
    count: (n: number) => `${n} neighbor${n === 1 ? "" : "s"}`,
    subtitle: "Neighbors who often drop by—visit their yards ~",
    exchangeTitle: "🔗 Exchange Friend Link",
    exchangeDesc:
      "Welcome to exchange friend links! Leave a comment below in the following format and the blogger will add it ASAP:",
    formatName: "Name: your-site-name",
    formatUrl: "URL: https://your-site.com",
    formatAvatar: "Avatar: image URL (optional)",
    formatDesc: "Description: a short intro (optional)",
  },
  messages: {
    metaTitle: "Messages",
    metaDesc: "Leave me a note",
    title: "Guestbook",
    count: (n: number) => `${n} note${n === 1 ? "" : "s"}`,
    subtitle: "Write something in the comments below and it will be pinned to the wall ~",
  },
  about: {
    hobbyLife: "Love life",
    hobbyCoffee: "Coffee powered",
    hobbyDaily: "Daily notes",
    wordsK: "Words (k)",
    greeting: "Hi there 👋",
    intro1:
      "Welcome to my little blog. This is where I record life and sort out thoughts, like an open notebook where every page is filled with daily musings.",
    intro2:
      "I believe in the healing power of words, and that slowing down lets you see the beauty of life. I hope every article here brings you a little warmth.",
    blogTitle: "This Blog",
    blogDesc:
      "A static blog built with Next.js, featuring a fresh and natural notebook-style design. All articles are written in Markdown and automatically generated as static pages at build time.",
    quote: "Slow down, take it easy. Turn days into poetry, life into words.",
    contactTitle: "Contact Me",
    contactDesc:
      "If you enjoy the content here, or just want to chat, feel free to reach out via the footer links. You can also leave a comment on any post—I'll reply to every one.",
  },
  notFound: {
    oops: "Oops, this page is gone",
    hint: "Maybe it was blown away by the wind, or hasn't been written yet ~",
    backHome: "Back to Home",
    viewArchives: "View Archives",
  },
};

export default enUS;
