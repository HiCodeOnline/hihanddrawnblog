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
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.9 12.9c-.86.34-1.93.6-3.13.72.68.9 1.2 1.52 1.47 1.87l-.9.6c-.35-.5-.98-1.28-1.78-2.22-.8.94-1.44 1.72-1.79 2.22l-.9-.6c.28-.35.8-.97 1.48-1.87-1.2-.12-2.27-.38-3.12-.72l.5-1.06c.72.28 1.6.5 2.6.6.3-.58.63-1.3.94-2.06H7.35v-1.1h3.3V9.9H7.5v-1h3.15V6.6c0-.2.1-.3.3-.3h1.1v2.6h3.15v1h-3.15v1.38h3.3v1.1h-3.96c.32.76.65 1.48.96 2.06 1-.1 1.88-.32 2.6-.6l.5 1.06Z" />
    </svg>
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
export default function DonateSection() {
  const [active, setActive] = useState<Channel | null>(null);
  const donate = siteConfig.donate as Record<Channel, string | undefined>;
  if (!donate.wechat && !donate.alipay) return null;

  return (
    <div className="mt-10 text-center">
      <p className="hand-text text-lg text-ink-400">
        {t.donate.prompt}
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
