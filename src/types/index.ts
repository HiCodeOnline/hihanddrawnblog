export interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt?: string;
  cover?: string;
  pinned?: boolean;
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  /** 含日期的路由路径，如 /posts/2026/10/05/slug */
  href: string;
  content: string;
  html: string;
  readingTime: string;
  wordCount: number;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  /** 含日期的路由路径，如 /posts/2026/10/05/slug */
  href: string;
  readingTime: string;
  wordCount: number;
}

export interface HeadingItem {
  level: number;
  id: string;
  text: string;
}
