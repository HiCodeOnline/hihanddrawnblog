"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/lib/gallery";

/** 胶带配色 */
const TAPE_COLORS = [
  "rgba(168, 194, 155, 0.78)",
  "rgba(236, 172, 161, 0.78)",
  "rgba(155, 192, 221, 0.78)",
  "rgba(247, 215, 124, 0.85)",
];

/** 由字符串生成确定性伪随机数 */
function hashRand(seed: string, salt: number) {
  let h = salt;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return (h % 1000) / 1000;
}

interface Item extends GalleryPhoto {
  rotate: number;
  tapeL: { color: string; rotate: number };
  tapeR: { color: string; rotate: number };
}

const ITEM_W = 222;
const ITEM_H = 225;
const GAP = 24;

type PosMap = Record<string, { x: number; y: number }>;

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

export default function GalleryWall({ photos }: { photos: GalleryPhoto[] }) {
  const wallRef = useRef<HTMLDivElement>(null);
  const [items] = useState<Item[]>(() =>
    photos.map((p) => ({
      ...p,
      rotate: hashRand(p.src, 7) * 8 - 4,
      tapeL: {
        color: TAPE_COLORS[Math.floor(hashRand(p.src, 11) * 4)],
        rotate: -38 - hashRand(p.src, 13) * 20,
      },
      tapeR: {
        color: TAPE_COLORS[Math.floor(hashRand(p.src, 17) * 4)],
        rotate: 38 + hashRand(p.src, 19) * 20,
      },
    }))
  );
  const [positions, setPositions] = useState<PosMap | null>(null);
  const positionsRef = useRef<PosMap | null>(null);
  const dragRef = useRef<{ src: string; dx: number; dy: number } | null>(null);
  const zRef = useRef(10);
  const [zMap, setZMap] = useState<Record<string, number>>({});

  // 初始网格布局（带随机抖动），挂载后按容器宽度计算
  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;
    const cols = Math.min(4, Math.max(1, Math.floor((wall.clientWidth + GAP) / (ITEM_W + GAP))));
    const usedW = cols * ITEM_W + (cols - 1) * GAP;
    const offsetX = (wall.clientWidth - usedW) / 2;
    const init: PosMap = {};
    items.forEach((it, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      init[it.src] = {
        x: offsetX + col * (ITEM_W + GAP) + (hashRand(it.src, 23) * 24 - 12),
        y: row * (ITEM_H + GAP) + (hashRand(it.src, 29) * 24 - 12),
      };
    });
    positionsRef.current = init;
    setPositions(init);
  }, [items]);

  useEffect(() => {
    if (!positions) return;
    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      const wall = wallRef.current;
      if (!drag || !wall) return;
      const rect = wall.getBoundingClientRect();
      const x = clamp(e.clientX - rect.left - drag.dx, -40, rect.width - ITEM_W + 40);
      const y = clamp(e.clientY - rect.top - drag.dy, -20, rect.height - 60);
      const next = { ...(positionsRef.current ?? {}), [drag.src]: { x, y } };
      positionsRef.current = next;
      setPositions(next);
    };
    const onUp = () => {
      dragRef.current = null;
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

  const rows = positions
    ? Math.ceil(items.length / Math.min(4, Math.max(1, Math.floor(((wallRef.current?.clientWidth ?? 800) + GAP) / (ITEM_W + GAP)))))
    : 1;

  return (
    <div
      ref={wallRef}
      className="relative"
      style={{ minHeight: rows * (ITEM_H + GAP) + 20 }}
    >
      {items.map((it) => {
        const p = positions?.[it.src];
        return (
          <figure
            key={it.src}
            className="wall-photo"
            style={{
              left: p?.x ?? 0,
              top: p?.y ?? 0,
              width: ITEM_W,
              zIndex: zMap[it.src] ?? 1,
              visibility: p ? "visible" : "hidden",
              "--r": `${it.rotate}deg`,
            } as React.CSSProperties}
            onPointerDown={(e) => {
              e.preventDefault();
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              dragRef.current = {
                src: it.src,
                dx: e.clientX - rect.left,
                dy: e.clientY - rect.top,
              };
              zRef.current += 1;
              setZMap((m) => ({ ...m, [it.src]: zRef.current }));
            }}
          >
            {/* 上左角胶带 */}
            <span
              className="wall-tape"
              style={{
                left: -14,
                top: -10,
                backgroundColor: it.tapeL.color,
                transform: `rotate(${it.tapeL.rotate}deg)`,
              }}
            />
            {/* 上右角胶带 */}
            <span
              className="wall-tape"
              style={{
                right: -14,
                top: -10,
                backgroundColor: it.tapeR.color,
                transform: `rotate(${it.tapeR.rotate}deg)`,
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.src} alt={it.name} draggable={false} />
            <figcaption className="font-hand">{it.name}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
