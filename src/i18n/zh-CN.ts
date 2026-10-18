/**
 * 中文字典（默认语言）
 * 新增语言时请保持与本文件完全相同的键结构（Dictionary 类型即由此推导）
 */
const zhCN = {
  nav: {
    home: "首页",
    gallery: "图集",
    friends: "朋友圈",
    messages: "留言",
    archives: "归档",
    about: "关于",
  },
  header: {
    menu: "菜单",
  },
  common: {
    posts: "文章",
    categories: "分类",
    tags: "标签",
  },
  backToTop: "回到顶部",
  codeBlock: {
    expand: "展开",
    collapse: "收起",
    expandAll: (lines: number) => `展开全部 ${lines} 行`,
    copy: "复制",
    copied: "已复制",
  },
  lightbox: {
    dialog: "查看大图",
    alt: "放大查看",
    closeTip: "点击任意处关闭",
  },
  home: {
    emptyTitle: "这里还没有文字呢～",
    emptyHint: "在 content/posts 目录下添加 .md 文件即可",
    categoriesTitle: "分类",
    viewAllCategories: "查看全部分类 →",
    hotTags: "热门标签",
    viewAllTags: "查看全部标签 →",
    noteLine1: "慢一点，再慢一点。",
    noteLine2: "把日子过成诗，把生活写成文。",
  },
  sidebar: {
    emailLabel: "邮箱",
  },
  post: {
    pinned: "置顶",
    backHome: "返回首页",
    tagsTitle: "标签",
    toc: "目录",
    prev: "上一篇",
    next: "下一篇",
    words: (n: number) => `${n} 字`,
    readingTime: (min: number) => `${min} 分钟`,
  },
  /** date-fns 格式串 */
  dateFormat: {
    card: "yyyy-MM-dd",
    post: "yyyy 年 MM 月 dd 日",
    archiveItem: "M月d日",
  },
  archives: {
    title: "文章归档",
    total: (n: number) => `共 ${n} 篇文章`,
    perYear: (n: number) => `${n} 篇`,
    empty: "还没有文章哦～",
    unknownYear: "未知",
  },
  categories: {
    title: "全部分类",
    subtitle: (cats: number, posts: number) =>
      `${cats} 个分类，${posts} 篇文章`,
    postCount: (n: number) => `${n} 篇文章 →`,
    empty: "还没有分类哦～",
    metaTitle: (name: string) => `分类：${name}`,
    total: (n: number) => `共 ${n} 篇文章`,
    backToList: "← 返回分类列表",
    emptyCategory: "该分类下暂无文章",
  },
  tagsPage: {
    title: "全部标签",
    subtitle: (n: number) => `${n} 个标签`,
    empty: "还没有标签哦～",
    metaTitle: (name: string) => `标签：${name}`,
    total: (n: number) => `共 ${n} 篇文章`,
    backToList: "← 返回标签列表",
    emptyTag: "该标签下暂无文章",
  },
  pagination: {
    label: "分页",
    prev: "上一页",
    next: "下一页",
    page: (n: number) => `第 ${n} 页`,
  },
  donate: {
    prompt: "如果这篇文章对你有帮助，请作者喝杯咖啡 ☕",
    wechat: "微信",
    alipay: "支付宝",
    aria: (label: string) => `${label}赞赏`,
    qrAlt: (label: string) => `${label}赞赏码`,
    scanTip: "扫一扫，请作者喝杯咖啡～",
  },
  donationWall: {
    title: "赞赏墙",
    summary: (count: number, total: string) =>
      `感谢 ${count} 位小伙伴的投喂，共 ¥${total} ❤️`,
  },
  giscus: {
    notConfiguredPre:
      "在 src/config/site.ts 中配置 giscus 的 repo / repoId / category / categoryId 后即可开启评论（值可在 ",
    notConfiguredPost: " 生成）💬",
  },
  gallery: {
    metaTitle: "图集",
    metaDesc: "贴在墙上的照片们",
    title: "图集",
    count: (n: number) => `共 ${n} 张`,
    subtitle: "把喜欢的瞬间贴在墙上，可以随意拖动它们～",
    emptyTitle: "墙上还没有照片呢～",
    emptyHint: "把图片放进 public/gallery 目录即可自动上墙",
  },
  friends: {
    metaTitle: "朋友圈",
    metaDesc: "交换友链，串串门",
    title: "朋友圈",
    count: (n: number) => `共 ${n} 位邻居`,
    subtitle: "常来串门的邻居们，去他们的院子里坐坐吧～",
    exchangeTitle: "🔗 交换友链",
    exchangeDesc: "欢迎交换友链！在下方评论区按以下格式留言，博主看到后会尽快添加：",
    formatName: "名称：你的网站名",
    formatUrl: "链接：https://你的地址",
    formatAvatar: "头像：头像图片地址（可选）",
    formatDesc: "简介：一句话介绍（可选）",
  },
  messages: {
    metaTitle: "留言",
    metaDesc: "给我留张小纸条吧",
    title: "留言板",
    count: (n: number) => `共 ${n} 张小纸条`,
    subtitle: "在下方评论区写下想说的话，便会贴到这面留言墙上～",
  },
  about: {
    hobbyLife: "热爱生活",
    hobbyCoffee: "咖啡续命",
    hobbyDaily: "记录日常",
    wordsK: "字数(k)",
    greeting: "你好呀 👋",
    intro1:
      "欢迎来到我的小小博客。这里是我记录生活、整理思绪的地方，就像一本摊开的手帐本，每一页都写满了日常的碎碎念。",
    intro2:
      "我相信文字有治愈的力量，也相信慢下来才能看见生活的美好。希望这里的每一篇文章，都能给你带来一点点温暖。",
    blogTitle: "这个博客",
    blogDesc:
      "这是一个使用 Next.js 构建的静态博客，采用清新自然的手帐风格设计。所有文章都以 Markdown 格式书写，构建时自动生成静态页面。",
    quote: "慢一点，再慢一点。把日子过成诗，把生活写成文。",
    contactTitle: "联系我",
    contactDesc:
      "如果你喜欢这里的内容，或者想和我聊聊，欢迎通过页脚的方式联系我。也可以在文章下方留言，我会认真回复每一条。",
  },
  notFound: {
    oops: "哎呀，这页纸不见了",
    hint: "可能是被风吹走了，或者还没写上去～",
    backHome: "回首页",
    viewArchives: "看归档",
  },
};

export default zhCN;
export type Dictionary = typeof zhCN;
