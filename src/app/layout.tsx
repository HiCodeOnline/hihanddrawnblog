import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { locale } from "@/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingStickers from "@/components/FloatingStickers";
import BackToTop from "@/components/BackToTop";
import { getAllPostsMeta, getAllCategories, getAllTags } from "@/lib/posts";
import { withBase } from "@/lib/path";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: withBase("/favicon.svg"),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf6ec",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header
          postCount={posts.length}
          categoryCount={categories.length}
          tagCount={tags.length}
          categories={categories}
          tags={tags}
        />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingStickers />
        <BackToTop />
      </body>
    </html>
  );
}
