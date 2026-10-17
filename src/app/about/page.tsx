import { siteConfig } from "@/config/site";
import { getSiteStats } from "@/lib/posts";
import PageHeader from "@/components/PageHeader";
import { User, Heart, Coffee } from "lucide-react";

export default function AboutPage() {
  const stats = getSiteStats();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <PageHeader
        title="关于"
        subtitle="一页纸的自我介绍"
        icon={<User className="w-8 h-8 text-rose-400" />}
      />

      {/* 个人卡片 */}
      <div className="paper-card p-8 text-center relative mb-8">
        <img
          src={siteConfig.avatar}
          alt={siteConfig.author}
          className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-paper mb-4"
        />
        <h2 className="font-serif text-2xl font-bold text-ink-700">
          {siteConfig.author}
        </h2>
        <p className="hand-text text-lg text-ink-400 mt-1">{siteConfig.name}</p>
        <p className="mt-4 text-ink-500 leading-relaxed max-w-md mx-auto">
          {siteConfig.bio}
        </p>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-ink-400">
          <span className="inline-flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-400" />
            热爱生活
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Coffee className="w-4 h-4 text-butter-500" />
            咖啡续命
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="w-4 h-4 text-sky-500" />
            记录日常
          </span>
        </div>
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "文章", value: stats.postCount },
          { label: "分类", value: stats.categoryCount },
          { label: "标签", value: stats.tagCount },
          { label: "字数(k)", value: Math.round(stats.totalWords / 1000) },
        ].map((s) => (
          <div key={s.label} className="paper-card p-4 text-center">
            <p className="font-serif text-2xl font-bold text-sage-600">
              {s.value}
            </p>
            <p className="text-xs text-ink-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* 自我介绍正文 */}
      <div className="paper-card p-8">
        <div className="prose-content">
          <h2>你好呀 👋</h2>
          <p>
            欢迎来到我的小小博客。这里是我记录生活、整理思绪的地方，就像一本摊开的手帐本，
            每一页都写满了日常的碎碎念。
          </p>
          <p>
            我相信文字有治愈的力量，也相信慢下来才能看见生活的美好。
            希望这里的每一篇文章，都能给你带来一点点温暖。
          </p>
          <h2>这个博客</h2>
          <p>
            这是一个使用 Next.js 构建的静态博客，采用清新自然的手帐风格设计。
            所有文章都以 Markdown 格式书写，构建时自动生成静态页面。
          </p>
          <blockquote>
            慢一点，再慢一点。把日子过成诗，把生活写成文。
          </blockquote>
          <h2>联系我</h2>
          <p>
            如果你喜欢这里的内容，或者想和我聊聊，欢迎通过页脚的方式联系我。
            也可以在文章下方留言，我会认真回复每一条。
          </p>
        </div>
      </div>
    </div>
  );
}
