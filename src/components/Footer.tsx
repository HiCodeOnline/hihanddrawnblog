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
              {siteConfig.name}
            </p>
            <p className="text-sm text-ink-400 mt-1">{siteConfig.bio}</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-paper-200 flex items-center justify-center text-ink-400 hover:text-ink-700 hover:border-sage-300 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${siteConfig.social.email}`}
              className="w-9 h-9 rounded-full bg-white border border-paper-200 flex items-center justify-center text-ink-400 hover:text-ink-700 hover:border-rose-300 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.social.rss}
              className="w-9 h-9 rounded-full bg-white border border-paper-200 flex items-center justify-center text-ink-400 hover:text-ink-700 hover:border-butter-300 transition-colors"
              aria-label="RSS"
            >
              <Rss className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-paper-200/50 text-center text-sm text-ink-400">
          <p className="inline-flex items-center gap-1.5">
            © {year} {siteConfig.name}. Made with
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            and paper.
          </p>
          <p className="mt-1 text-xs text-ink-300">
            Powered by Next.js · Static Export
          </p>
        </div>
      </div>
    </footer>
  );
}
