import { siteConfig } from "@/config/site";
import { getSiteStats } from "@/lib/posts";
import PageHeader from "@/components/PageHeader";
import DonationWall from "@/components/DonationWall";
import DonateSection from "@/components/DonateSection";
import { User, Heart, Coffee } from "lucide-react";
import { t } from "@/i18n";

export default function AboutPage() {
  const stats = getSiteStats();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
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
            {t.about.hobbyLife}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Coffee className="w-4 h-4 text-butter-500" />
            {t.about.hobbyCoffee}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="w-4 h-4 text-sky-500" />
            {t.about.hobbyDaily}
          </span>
        </div>
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: t.common.posts, value: stats.postCount },
          { label: t.common.categories, value: stats.categoryCount },
          { label: t.common.tags, value: stats.tagCount },
          { label: t.about.wordsK, value: Math.round(stats.totalWords / 1000) },
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
          <h2>{t.about.greeting}</h2>
          <p>{t.about.intro1}</p>
          <p>{t.about.intro2}</p>
          <h2>{t.about.blogTitle}</h2>
          <p>{t.about.blogDesc}</p>
          <blockquote>{t.about.quote}</blockquote>
          <h2>{t.about.contactTitle}</h2>
          <p>{t.about.contactDesc}</p>
        </div>
      </div>

      {/* 赞赏信息 */}
      <DonateSection prompt={t.donate.promptAbout} />

      {/* 赞赏墙 */}
      <DonationWall />
    </div>
  );
}
