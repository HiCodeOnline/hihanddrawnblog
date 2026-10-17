import Link from "next/link";
import type { PostMeta } from "@/types";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = "/page",
}: Props) {
  if (totalPages <= 1) return null;

  const pages: (number | "ellipsis")[] = [];
  const push = (n: number | "ellipsis") => pages.push(n);

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      push(i);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      push("ellipsis");
    }
  }

  const href = (n: number) => (n === 1 ? "/" : `${basePath}/${n}`);

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10">
      {currentPage > 1 && (
        <Link
          href={href(currentPage - 1)}
          className="px-3 py-1.5 rounded-lg text-sm text-ink-500 hover:bg-paper-200/50 transition-colors"
        >
          上一页
        </Link>
      )}
      {pages.map((p, idx) =>
        p === "ellipsis" ? (
          <span key={`e-${idx}`} className="px-2 text-ink-300">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-sage-500 text-white shadow-sm"
                : "text-ink-500 hover:bg-paper-200/50"
            }`}
          >
            {p}
          </Link>
        )
      )}
      {currentPage < totalPages && (
        <Link
          href={href(currentPage + 1)}
          className="px-3 py-1.5 rounded-lg text-sm text-ink-500 hover:bg-paper-200/50 transition-colors"
        >
          下一页
        </Link>
      )}
    </nav>
  );
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}
