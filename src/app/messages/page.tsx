import type { Metadata } from "next";
import { MessageCircleHeart } from "lucide-react";
import messagesData from "@/data/messages.json";
import Giscus from "@/components/Giscus";
import { t } from "@/i18n";

export const metadata: Metadata = {
  title: t.messages.metaTitle,
  description: t.messages.metaDesc,
};

interface Message {
  name: string;
  content: string;
  date?: string;
}

const MESSAGES = messagesData as Message[];

export default function MessagesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <MessageCircleHeart className="w-5 h-5 text-sage-500" />
        <h1 className="font-serif text-2xl font-bold text-ink-700">{t.messages.title}</h1>
        <span className="text-sm text-ink-400">{t.messages.count(MESSAGES.length)}</span>
      </div>
      <p className="text-sm text-ink-400 mb-8">
        {t.messages.subtitle}
      </p>

      {/* 留言便签墙 */}
      {MESSAGES.length > 0 ? (
        <div className="flex flex-wrap gap-5 mb-10">
          {MESSAGES.map((m, i) => {
            const tilt = [-1.2, 1, -0.6, 1.4, -1.6, 0.8][i % 6];
            return (
              <div
                key={`${m.name}-${i}`}
                className="sticky-note w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                style={{ transform: `rotate(${tilt}deg)` }}
              >
                <p className="text-sm text-ink-600 leading-relaxed break-words">
                  {m.content}
                </p>
                <p className="mt-3 flex items-center justify-between text-xs text-ink-400">
                  <span className="font-serif font-bold text-ink-500">
                    —— {m.name}
                  </span>
                  {m.date && <span>{m.date}</span>}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* 通过评论收集留言 */}
      <Giscus />
    </div>
  );
}
