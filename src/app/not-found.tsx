import Link from "next/link";
import { Home, Compass } from "lucide-react";
import { t } from "@/i18n";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center paper-card p-10 sm:p-14 max-w-md">
        <div className="text-7xl font-serif font-bold text-sage-400 mb-2">
          404
        </div>
        <p className="hand-text text-xl text-ink-500 mb-2">{t.notFound.oops}</p>
        <p className="text-sm text-ink-400 mb-8">{t.notFound.hint}</p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sage-500 text-white text-sm font-medium hover:bg-sage-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            {t.notFound.backHome}
          </Link>
          <Link
            href="/archives"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-paper-200 text-ink-600 text-sm font-medium hover:bg-paper-300 transition-colors"
          >
            <Compass className="w-4 h-4" />
            {t.notFound.viewArchives}
          </Link>
        </div>
      </div>
    </div>
  );
}
