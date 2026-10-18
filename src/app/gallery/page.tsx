import type { Metadata } from "next";
import { Images } from "lucide-react";
import { getGalleryPhotos } from "@/lib/gallery";
import GalleryWall from "@/components/GalleryWall";
import { t } from "@/i18n";

export const metadata: Metadata = {
  title: t.gallery.metaTitle,
  description: t.gallery.metaDesc,
};

export default function GalleryPage() {
  const photos = getGalleryPhotos();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <Images className="w-5 h-5 text-sage-500" />
        <h1 className="font-serif text-2xl font-bold text-ink-700">{t.gallery.title}</h1>
        <span className="text-sm text-ink-400">{t.gallery.count(photos.length)}</span>
      </div>
      <p className="text-sm text-ink-400 mb-8">
        {t.gallery.subtitle}
      </p>

      {photos.length > 0 ? (
        <GalleryWall photos={photos} />
      ) : (
        <div className="paper-card p-12 text-center">
          <p className="font-hand text-2xl text-ink-400">{t.gallery.emptyTitle}</p>
          <p className="mt-2 text-sm text-ink-400">
            {t.gallery.emptyHint}
          </p>
        </div>
      )}
    </div>
  );
}
