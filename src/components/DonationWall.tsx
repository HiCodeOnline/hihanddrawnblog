import { HeartHandshake } from "lucide-react";
import donations from "@/data/donations.json";

interface Donation {
  name: string;
  amount: number;
  channel: "wechat" | "alipay";
  date?: string;
  message?: string;
}

const CHANNELS = {
  wechat: { label: "微信", color: "#7fb069" },
  alipay: { label: "支付宝", color: "#5b9bd5" },
} as const;

/** 赞赏墙：展示 src/data/donations.json 中的赞赏记录 */
export default function DonationWall() {
  const list = donations as Donation[];
  if (list.length === 0) return null;

  const total = list.reduce((sum, d) => sum + d.amount, 0);

  return (
    <section className="mt-8">
      <h2 className="section-title mb-2">
        <HeartHandshake className="w-5 h-5 text-rose-400" />
        赞赏墙
      </h2>
      <p className="text-sm text-ink-400 mb-5">
        感谢 {list.length} 位小伙伴的投喂，共 ¥{total.toFixed(2)} ❤️
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((d, i) => {
          const ch = CHANNELS[d.channel] ?? CHANNELS.wechat;
          return (
            <div
              key={`${d.name}-${i}`}
              className="paper-card p-4"
              style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
            >
              <div className="flex items-center justify-between">
                <p className="font-serif font-bold text-ink-700 truncate">
                  {d.name}
                </p>
                <span
                  className="social-tag shrink-0"
                  style={{ "--c": ch.color, "--r": "0deg" } as React.CSSProperties}
                >
                  {ch.label}
                </span>
              </div>
              <p className="mt-1 font-serif text-xl font-bold text-rose-500">
                ¥{d.amount.toFixed(2)}
              </p>
              {d.message && (
                <p className="mt-1 hand-text text-sm text-ink-500 leading-relaxed">
                  “{d.message}”
                </p>
              )}
              {d.date && (
                <p className="mt-2 text-xs text-ink-300">{d.date}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
