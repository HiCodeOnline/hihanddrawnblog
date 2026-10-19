"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { t } from "@/i18n";

/** 微信图标（手绘风简约气泡） */
function WeChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M9.5 4C5.36 4 2 6.91 2 10.5c0 2.05 1.13 3.87 2.9 5.03l-.73 2.47 2.6-1.4c.84.25 1.75.4 2.73.4.22 0 .44-.01.66-.03-.16-.55-.25-1.12-.25-1.72 0-3.59 3.36-6.5 7.5-6.5.24 0 .47.01.7.03C17.18 6.02 13.72 4 9.5 4Zm-2.3 4.15a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Zm4.6 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" />
      <path d="M22 14.75c0-3.04-2.84-5.5-6.34-5.5s-6.33 2.46-6.33 5.5c0 3.03 2.83 5.5 6.33 5.5.72 0 1.4-.09 2.05-.27l2.23 1.2-.64-2.14c1.15-.96 1.7-2.37 1.7-4.29Zm-8.4-.66a.78.78 0 1 1 .02 1.56.78.78 0 0 1-.02-1.56Zm4.16 0a.78.78 0 1 1 .02 1.56.78.78 0 0 1-.02-1.56Z" />
    </svg>
  );
}

/** 支付宝图标（圆形"支"字） */
function AlipayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className} aria-hidden><path d="M308.6 545.7c-19.8 2-57.1 10.7-77.4 28.6-61 53-24.5 150 99 150 71.8 0 143.5-45.7 199.8-119-80.2-38.9-148.1-66.8-221.4-59.6z m460.5 67c100.1 33.4 154.7 43 166.7 44.8C951.5 611.9 960 563 960 512c0-247.4-200.6-448-448-448S64 264.6 64 512s200.6 448 448 448c155.9 0 293.2-79.7 373.5-200.5-75.6-29.8-213.6-85-286.8-120.1-69.9 85.7-160.1 137.8-253.7 137.8-158.4 0-212.1-138.1-137.2-229 16.3-19.8 44.2-38.7 87.3-49.4 67.5-16.5 175 10.3 275.7 43.4 18.1-33.3 33.4-69.9 44.7-108.9H305.1V402h160v-56.2H271.3v-31.3h193.8v-80.1s0-13.5 13.7-13.5H557v93.6h191.7v31.3H557.1V402h156.4c-15 61.1-37.7 117.4-66.2 166.8 47.5 17.1 90.1 33.3 121.8 43.9z" p-id="6450"></path></svg>
  );
}

type Channel = "wechat" | "alipay";

const CHANNELS: {
  key: Channel;
  label: string;
  color: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "wechat", label: t.donate.wechat, color: "#7fb069", Icon: WeChatIcon },
  { key: "alipay", label: t.donate.alipay, color: "#5b9bd5", Icon: AlipayIcon },
];

/** 赞赏区：点击微信/支付宝图标展示对应二维码 */
export default function DonateSection({ prompt = t.donate.prompt }: { prompt?: string }) {
  const [active, setActive] = useState<Channel | null>(null);
  const donate = siteConfig.donate as Record<Channel, string | undefined>;
  if (!donate.wechat && !donate.alipay) return null;

  return (
    <div className="mt-10 text-center">
      <p className="hand-text text-lg text-ink-400">
        {prompt}
      </p>
      <div className="mt-4 flex items-center justify-center gap-4">
        {CHANNELS.filter((c) => donate[c.key]).map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setActive(active === c.key ? null : c.key)}
            aria-label={t.donate.aria(c.label)}
            className={`donate-btn ${active === c.key ? "donate-btn-active" : ""}`}
            style={{ "--dc": c.color } as React.CSSProperties}
          >
            <c.Icon className="w-6 h-6" />
            <span className="text-sm">{c.label}</span>
          </button>
        ))}
      </div>

      {active && donate[active] && (
        <div className="donate-panel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={donate[active]}
            alt={t.donate.qrAlt(CHANNELS.find((c) => c.key === active)!.label)}
            className="w-48 h-48 object-contain mx-auto"
          />
          <p className="mt-3 hand-text text-base text-ink-400">
            {t.donate.scanTip}
          </p>
        </div>
      )}
    </div>
  );
}
