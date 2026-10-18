import fs from "fs";
import path from "path";

export interface GalleryPhoto {
  src: string;
  name: string;
}

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"]);

/** 递归扫描 public/gallery 目录中的图片 */
export function getGalleryPhotos(): GalleryPhoto[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];
  const photos: GalleryPhoto[] = [];

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (IMAGE_EXTS.has(path.extname(entry.name).toLowerCase())) {
        const rel = path.relative(GALLERY_DIR, full).split(path.sep).join("/");
        photos.push({
          src: `/gallery/${rel}`,
          name: path.basename(entry.name, path.extname(entry.name)),
        });
      }
    }
  };

  walk(GALLERY_DIR);
  photos.sort((a, b) => a.src.localeCompare(b.src));
  return photos;
}
