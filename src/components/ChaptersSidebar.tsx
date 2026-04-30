"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import type { Chapter } from "@/data/chapters";

type ChaptersSidebarProps = {
  chapters: Chapter[];
};

export default function ChaptersSidebar({ chapters }: ChaptersSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={`chapters-sidebar-widget${isOpen ? " is-open" : ""}`}>
      <button
        aria-label="إغلاق قائمة الفصول"
        className={`chapters-overlay${isOpen ? " is-open" : ""}`}
        tabIndex={isOpen ? 0 : -1}
        type="button"
        onClick={closeSidebar}
      />

      <aside
        aria-label="قائمة الفصول"
        className={`chapters-sidebar${isOpen ? " is-open" : ""}`}
        id="chapters-sidebar"
      >
        <div className="sidebar-logo">
          <Image
            alt="شعار الليجيو ماريا"
            className="sidebar-logo-image"
            height={64}
            priority
            src="/images/header/2.jpeg"
            width={64}
          />
        </div>

        <button
          aria-controls="chapters-sidebar"
          aria-expanded={isOpen}
          aria-label={isOpen ? "طي قائمة الفصول" : "فتح قائمة الفصول"}
          className="chapters-edge-toggle"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? "›" : "‹"}
        </button>

     

        <button
          aria-controls="chapters-sidebar"
          aria-expanded={isOpen}
          className="chapters-open-button"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <span className="chapters-open-icon" aria-hidden="true">
            <BookOpen size={19} strokeWidth={2.3} />
          </span>
          <span className="chapters-open-label">الفصول</span>
        </button>

        <nav className="chapters-sidebar-list" aria-label="روابط الفصول">
          {chapters.map((chapter) => (
            <Link
              className="sidebar-chapter-row"
              href={chapter.href}
              key={chapter.href}
              onClick={closeSidebar}
            >
              <span className="sidebar-chapter-number">{chapter.number}</span>
              <span className="sidebar-chapter-copy">
                <strong>{chapter.title}</strong>
              </span>
            </Link>
          ))}
        </nav>

        
      </aside>
    </div>
  );
}
