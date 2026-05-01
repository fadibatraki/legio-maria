"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Chapter } from "@/data/chapters";

type ChapterNavigationProps = {
  chapters: Chapter[];
};

const arabicNumber = new Intl.NumberFormat("ar");

export default function ChapterNavigation({ chapters }: ChapterNavigationProps) {
  const pathname = usePathname();

  if (!pathname.startsWith("/chapters/")) {
    return null;
  }

  const currentIndex = chapters.findIndex((chapter) => chapter.href === pathname);

  if (currentIndex === -1) {
    return null;
  }

  const previousChapter = chapters[currentIndex - 1];
  const nextChapter = chapters[currentIndex + 1];

  return (
    <nav className="chapter-navigation" aria-label="التنقل بين الفصول">
      <div className="chapter-navigation-inner">
        {nextChapter ? (
          <Link
            className="chapter-navigation-link chapter-navigation-next"
            href={nextChapter.href}
          >
            <span className="chapter-navigation-arrow" aria-hidden="true">
              ←
            </span>
            <span className="chapter-navigation-copy">
              <span className="chapter-navigation-label">الفصل التالي</span>
              <strong>{nextChapter.title}</strong>
            </span>
          </Link>
        ) : (
          <span
            className="chapter-navigation-link chapter-navigation-next is-disabled"
            aria-disabled="true"
          >
            <span className="chapter-navigation-arrow" aria-hidden="true">
              ←
            </span>
            <span className="chapter-navigation-copy">
              <span className="chapter-navigation-label">الفصل التالي</span>
              <strong>غير متاح</strong>
            </span>
          </span>
        )}

        <p className="chapter-navigation-status">
          أنت الآن في الفصل {arabicNumber.format(currentIndex + 1)} من{" "}
          {arabicNumber.format(chapters.length)}
        </p>

        {previousChapter ? (
          <Link
            className="chapter-navigation-link chapter-navigation-previous"
            href={previousChapter.href}
          >
            <span className="chapter-navigation-copy">
              <span className="chapter-navigation-label">الفصل السابق</span>
              <strong>{previousChapter.title}</strong>
            </span>
            <span className="chapter-navigation-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ) : (
          <span
            className="chapter-navigation-link chapter-navigation-previous is-disabled"
            aria-disabled="true"
          >
            <span className="chapter-navigation-copy">
              <span className="chapter-navigation-label">الفصل السابق</span>
              <strong>غير متاح</strong>
            </span>
            <span className="chapter-navigation-arrow" aria-hidden="true">
              →
            </span>
          </span>
        )}
      </div>
    </nav>
  );
}
