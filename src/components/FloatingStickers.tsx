"use client";

import { useEffect, useRef, useState } from "react";
import stickersData from "@/data/stickers.json";

interface StickerDef {
  id: string;
  /** 贴纸图片地址（如 /stickers/flower.png），优先于 emoji */
  src?: string;
  /** 无图片时使用 emoji 字符 */
  emoji?: string;
  /** 贴纸尺寸（px） */
  size: number;
  /** 初始位置（视口百分比），默认落在页面左右两侧边缘，避开中间卡片区域 */
  x: number;
  y: number;
  rotate: number;
}

const STICKERS = stickersData as StickerDef[];

const STORAGE_KEY = "fridge-stickers";

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
    size: number;
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
        x: (s.x / 100) * window.innerWidth,
        y: (s.y / 100) * window.innerHeight,
      };
      const p = saved?.[s.id];
      init[s.id] =
        p && typeof p.x === "number" && typeof p.y === "number"
          ? {
              x: clamp(p.x, 0, window.innerWidth - s.size),
              y: clamp(p.y, 0, window.innerHeight - s.size),
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
      const x = clamp(
        e.clientX - drag.offsetX,
        0,
        window.innerWidth - drag.size
      );
      const y = clamp(
        e.clientY - drag.offsetY,
        0,
        window.innerHeight - drag.size
      );
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
                width: s.size,
                height: s.size,
                fontSize: s.size * 0.85,
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
                size: s.size,
              };
            }}
          >
            {s.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.src} alt="" draggable={false} />
            ) : (
              s.emoji
            )}
          </div>
        );
      })}
    </div>
  );
}
