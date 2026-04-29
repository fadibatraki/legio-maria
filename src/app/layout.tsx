import Footer from "@/components/layout/Footer";
import Header from "@/components/Header";
import ChaptersSidebar from "@/components/ChaptersSidebar";
import SearchHighlighter from "@/components/SearchHighlighter";
import { getChapters } from "@/data/chapters";
import { Suspense } from "react";
import type { Metadata } from "next";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";

export const metadata: Metadata = {
  title: {
    default: "دليل الليجيو ماريا",
    template: "%s | دليل الليجيو ماريا",
  },
  description: "موقع لقراءة فصول دليل الليجيو ماريا بشكل منظم وسهل.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chapters = await getChapters();

  return (
    <html suppressHydrationWarning className="!scroll-smooth" dir="rtl" lang="ar">
      <body>
        <div className="site-frame">
          <ChaptersSidebar chapters={chapters} />
          <Header />
          <Suspense fallback={null}>
            <SearchHighlighter />
          </Suspense>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
