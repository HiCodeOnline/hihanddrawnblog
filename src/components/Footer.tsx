import Link from "next/link";
import { Github, Mail, Rss, Heart } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-paper-200/60 bg-paper-100/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif font-bold text-ink-700">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="font-serif font-bold text-lg text-ink-700">
                  <img src={siteConfig.logo} alt={siteConfig.name} className="h-9" />
                </span>
              </Link>
            </p>
            <p className="text-sm text-ink-400 mt-1">{siteConfig.bio}</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-paper-200 border-dashed flex items-center justify-center text-ink-400 hover:text-ink-700 hover:border-sage-300 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-paper-200/50 text-center text-sm text-ink-400">
          <p className="inline-flex items-center gap-1.5">
            © {year} {siteConfig.name}. Made with
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            and Hexo theme <a href="https://github.com/Homulilly/hexo-theme-flatpaper" target="_blank" rel="noopener noreferrer">Flatpaper</a>.
          </p>
          <p className="mt-1 text-xs text-ink-300">
            Powered by <a href="https://www.hicode.online/en/apps/hihanddrawnblog" target="_blank" rel="noopener noreferrer">HiCode.Online</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
