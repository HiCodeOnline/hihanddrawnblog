import type { Metadata } from "next";
import { Images } from "lucide-react";
import { getGalleryPhotos } from "@/lib/gallery";
import GalleryWall from "@/components/GalleryWall";

export const metadata: Metadata = {
  title: "图集",
  description: "贴在墙上的照片们",
};

export default function GalleryPage() {
  const photos = getGalleryPhotos();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <Images className="w-5 h-5 text-sage-500" />
        <h1 className="font-serif text-2xl font-bold text-ink-700">图集</h1>
        <span className="text-sm text-ink-400">共 {photos.length} 张</span>
      </div>
      <p className="text-sm text-ink-400 mb-8">
        把喜欢的瞬间贴在墙上，可以随意拖动它们～
      </p>

      {photos.length > 0 ? (
        <GalleryWall photos={photos} />
      ) : (
        <div className="paper-card p-12 text-center">
          <p className="font-hand text-2xl text-ink-400">墙上还没有照片呢～</p>
          <p className="mt-2 text-sm text-ink-400">
            把图片放进 public/gallery 目录即可自动上墙
          </p>
        </div>
      )}
    </div>
  );
}
