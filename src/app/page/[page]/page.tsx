import HomeContent from "@/components/HomeContent";
import { getAllPostsMeta } from "@/lib/posts";
import { siteConfig } from "@/config/site";

interface Props {
  params: { page: string };
}

export function generateStaticParams() {
  const total = getAllPostsMeta().length;
  const totalPages = Math.max(1, Math.ceil(total / siteConfig.postsPerPage));
  // 静态导出要求 generateStaticParams 返回非空数组，因此包含第 1 页
  // 首页分页组件会把第 1 页链接指向 "/"，不会产生导航冲突
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export function generateMetadata({ params }: Props) {
  return {
    title: `第 ${params.page} 页`,
  };
}

export default function PaginatedPage({ params }: Props) {
  const page = parseInt(params.page, 10);
  return <HomeContent page={isNaN(page) ? 1 : page} />;
}
