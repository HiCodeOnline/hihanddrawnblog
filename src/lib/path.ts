/**
 * 静态资源/路由路径前缀工具
 *
 * 用于适配 GitHub Pages 项目站点（部署在 <user>.github.io/<repo>/ 子路径）。
 * 构建时通过环境变量 NEXT_PUBLIC_BASE_PATH 注入仓库名前缀，例如 `/hiprofile`。
 * 本地开发或部署在根路径时留空即可。
 */
export const BASE_PATH: string = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * 为以 "/" 开头的站点内路径拼接 basePath。
 * 外部链接（http/https）、协议相对路径（//）、非 "/" 开头的路径原样返回。
 */
export function withBase(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path}`;
}
