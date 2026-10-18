/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  // GitHub Pages 项目站点部署在 <user>.github.io/<repo>/ 子路径，
  // basePath 与 assetPrefix 会自动处理 _next 静态资源与 <Link> 内部链接的前缀。
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
