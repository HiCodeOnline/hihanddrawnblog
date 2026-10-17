"use client";

import { useEffect, useRef, useState } from "react";

interface StickerDef {
  id: string;
  emoji: string;
  /** 初始位置（视口百分比），默认落在页面左右两侧边缘，避开中间卡片区域 */
  xPct: number;
  yPct: number;
  rotate: number;
}

const STICKERS: StickerDef[] = [
  { id: "sakura", emoji: "🌸", xPct: 3, yPct: 30, rotate: -8 },
  { id: "coffee", emoji: "☕", xPct: 95, yPct: 26, rotate: 6 },
  { id: "star", emoji: "⭐", xPct: 2.5, yPct: 55, rotate: 10 },
  { id: "clover", emoji: "🍀", xPct: 96, yPct: 52, rotate: -12 },
  { id: "bear", emoji: "🐻", xPct: 3.5, yPct: 80, rotate: 5 },
  { id: "moon", emoji: "🌙", xPct: 95, yPct: 78, rotate: -6 },
];

const STORAGE_KEY = "fridge-stickers";
const SIZE = 52;

type PosMap = Record<string, { x: number; y: number }>;

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

export default function FloatingStickers() {
  const [positions, setPositions] = useState<PosMap | null>(null);
  const positionsRef = useRef<PosMap | null>(null);
  const dragRef = useRef<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const persist = () => {
    if (!positionsRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(positionsRef.current));
    } catch {
      /* ignore */
    }
  };

  // 挂载时：从 localStorage 恢复，或按百分比计算初始像素位置
  useEffect(() => {
    const init: PosMap = {};
    let saved: PosMap | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) saved = JSON.parse(raw);
    } catch {
      saved = null;
    }
    for (const s of STICKERS) {
      const fallback = {
        x: (s.xPct / 100) * window.innerWidth,
        y: (s.yPct / 100) * window.innerHeight,
      };
      const p = saved?.[s.id];
      init[s.id] =
        p && typeof p.x === "number" && typeof p.y === "number"
          ? {
              x: clamp(p.x, 0, window.innerWidth - SIZE),
              y: clamp(p.y, 0, window.innerHeight - SIZE),
            }
          : fallback;
    }
    positionsRef.current = init;
    setPositions(init);
  }, []);

  useEffect(() => {
    if (!positions) return;

    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const x = clamp(e.clientX - drag.offsetX, 0, window.innerWidth - SIZE);
      const y = clamp(e.clientY - drag.offsetY, 0, window.innerHeight - SIZE);
      const next = { ...(positionsRef.current ?? {}), [drag.id]: { x, y } };
      positionsRef.current = next;
      setPositions(next);
    };

    const onUp = () => {
      if (!dragRef.current) return;
      dragRef.current = null;
      persist();
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions !== null]);

  if (!positions) return null;

  return (
    <div className="hidden md:block" aria-hidden>
      {STICKERS.map((s) => {
        const p = positions[s.id];
        if (!p) return null;
        return (
          <div
            key={s.id}
            className="fridge-sticker"
            style={
              {
                left: p.x,
                top: p.y,
                "--r": `${s.rotate}deg`,
              } as React.CSSProperties
            }
            onPointerDown={(e) => {
              e.preventDefault();
              const rect = (
                e.currentTarget as HTMLElement
              ).getBoundingClientRect();
              dragRef.current = {
                id: s.id,
                offsetX: e.clientX - rect.left,
                offsetY: e.clientY - rect.top,
              };
            }}
          >
            {s.emoji}
          </div>
        );
      })}
    </div>
  );
}
