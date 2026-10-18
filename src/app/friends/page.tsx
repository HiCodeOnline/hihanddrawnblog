import type { Metadata } from "next";
import { HeartHandshake } from "lucide-react";
import friendsData from "@/data/friends.json";
import Giscus from "@/components/Giscus";

export const metadata: Metadata = {
  title: "朋友圈",
  description: "交换友链，串串门",
};

interface FriendLink {
  name: string;
  url: string;
  avatar?: string;
  description?: string;
}

const FRIENDS = friendsData as FriendLink[];

export default function FriendsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <HeartHandshake className="w-5 h-5 text-sage-500" />
        <h1 className="font-serif text-2xl font-bold text-ink-700">朋友圈</h1>
        <span className="text-sm text-ink-400">共 {FRIENDS.length} 位邻居</span>
      </div>
      <p className="text-sm text-ink-400 mb-8">
        常来串门的邻居们，去他们的院子里坐坐吧～
      </p>

      {/* 友链卡片墙 */}
      {FRIENDS.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {FRIENDS.map((f) => (
            <a
              key={f.url}
              href={f.url}
              target="_blank"
              rel="noreferrer noopener"
              className="paper-card p-5 flex items-center gap-4 group"
            >
              {f.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-paper-200 flex-shrink-0"
                />
              ) : (
                <span className="w-12 h-12 rounded-full bg-sage-100 border-2 border-sage-200 flex items-center justify-center font-serif text-xl text-sage-600 flex-shrink-0 group-hover:rotate-6 transition-transform">
                  {f.name.slice(0, 1)}
                </span>
              )}
              <span className="min-w-0">
                <span className="block font-serif font-bold text-ink-700 group-hover:text-sage-600 transition-colors truncate">
                  {f.name}
                </span>
                {f.description && (
                  <span className="block text-xs text-ink-400 mt-1 line-clamp-2 leading-relaxed">
                    {f.description}
                  </span>
                )}
              </span>
            </a>
          ))}
        </div>
      ) : null}

      {/* 交换友链说明 */}
      <div className="sticky-note mb-10">
        <p className="font-serif font-bold text-ink-700 mb-2">🔗 交换友链</p>
        <p className="text-sm text-ink-500 leading-relaxed">
          欢迎交换友链！在下方评论区按以下格式留言，博主看到后会尽快添加：
        </p>
        <p className="mt-2 text-sm text-ink-600 bg-paper-100/70 rounded-md px-3 py-2 font-mono text-xs leading-relaxed">
          名称：你的网站名
          <br />
          链接：https://你的地址
          <br />
          头像：头像图片地址（可选）
          <br />
          简介：一句话介绍（可选）
        </p>
      </div>

      {/* 通过评论收集友链申请 */}
      <Giscus />
    </div>
  );
}
