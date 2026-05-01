"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BookMarked, BookOpen, Star } from "lucide-react";
import type { Chapter } from "@/data/chapters";

type ChaptersSidebarProps = {
  chapters: Chapter[];
};

type FavoriteChapter = {
  href: string;
  slug: string;
  number: string;
  title: string;
  addedAt: number;
};

type ReadingBookmark = {
  id: string;
  href: string;
  slug: string;
  number: string;
  title: string;
  selectedText?: string;
  scrollY: number;
  addedAt: number;
};

const FAVORITES_KEY = "legio-reading-favorites";
const FAVORITES_EVENT = "legio-reading-favorites-change";
const BOOKMARKS_KEY = "legio-reading-bookmarks";
const BOOKMARKS_EVENT = "legio-reading-bookmarks-change";
const BOOKMARK_FOCUS_EVENT = "legio-reading-bookmark-focus";
const PENDING_BOOKMARK_KEY = "legio-reading-pending-bookmark";
const PENDING_BOOKMARK_HIGHLIGHT_KEY = "legio-reading-pending-bookmark-highlight";
const BOOKMARK_HIGHLIGHT_EVENT = "legio-reading-bookmark-highlight";

const readStoredFavorites = () => {
  try {
    const storedFavorites = window.localStorage.getItem(FAVORITES_KEY);

    if (!storedFavorites) {
      return [];
    }

    const favorites = JSON.parse(storedFavorites) as FavoriteChapter[];
    return Array.isArray(favorites) ? favorites : [];
  } catch {
    return [];
  }
};

const readStoredBookmarks = () => {
  try {
    const storedBookmarks = window.localStorage.getItem(BOOKMARKS_KEY);

    if (!storedBookmarks) {
      return [];
    }

    const bookmarks = JSON.parse(storedBookmarks) as ReadingBookmark[];
    return Array.isArray(bookmarks) ? bookmarks : [];
  } catch {
    return [];
  }
};

const scrollBookmarkIntoView = (bookmarkId: string) => {
  window.setTimeout(() => {
    const bookmarkRows = Array.from(
      document.querySelectorAll<HTMLElement>("[data-bookmark-id]"),
    );
    const bookmarkRow = bookmarkRows.find(
      (row) => row.dataset.bookmarkId === bookmarkId,
    );

    bookmarkRow?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 340);
};

export default function ChaptersSidebar({ chapters }: ChaptersSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isChaptersExpanded, setIsChaptersExpanded] = useState(true);
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(true);
  const [isBookmarksExpanded, setIsBookmarksExpanded] = useState(true);
  const [favorites, setFavorites] = useState<FavoriteChapter[]>([]);
  const [bookmarks, setBookmarks] = useState<ReadingBookmark[]>([]);

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

  useEffect(() => {
    const focusBookmark = (bookmarkId: string) => {
      setIsOpen(true);
      setIsBookmarksExpanded(true);
      scrollBookmarkIntoView(bookmarkId);
    };

    const syncBookmarks = (event?: Event) => {
      setBookmarks(readStoredBookmarks());

      const bookmarkId =
        event instanceof CustomEvent ? event.detail?.bookmarkId : undefined;

      if (bookmarkId) {
        focusBookmark(bookmarkId);
      }
    };

    const handleBookmarkFocus = (event: Event) => {
      const bookmarkId = (event as CustomEvent<{ bookmarkId?: string }>).detail
        ?.bookmarkId;

      if (!bookmarkId) {
        return;
      }

      setBookmarks(readStoredBookmarks());
      focusBookmark(bookmarkId);
    };

    syncBookmarks();
    window.addEventListener(BOOKMARKS_EVENT, syncBookmarks);
    window.addEventListener(BOOKMARK_FOCUS_EVENT, handleBookmarkFocus);
    window.addEventListener("storage", syncBookmarks);

    return () => {
      window.removeEventListener(BOOKMARKS_EVENT, syncBookmarks);
      window.removeEventListener(BOOKMARK_FOCUS_EVENT, handleBookmarkFocus);
      window.removeEventListener("storage", syncBookmarks);
    };
  }, []);

  useEffect(() => {
    const syncFavorites = () => setFavorites(readStoredFavorites());

    syncFavorites();
    window.addEventListener(FAVORITES_EVENT, syncFavorites);
    window.addEventListener("storage", syncFavorites);

    return () => {
      window.removeEventListener(FAVORITES_EVENT, syncFavorites);
      window.removeEventListener("storage", syncFavorites);
    };
  }, []);

  const persistFavorites = (nextFavorites: FavoriteChapter[]) => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
    setFavorites(nextFavorites);
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  };

  const isFavorite = (href: string) =>
    favorites.some((favorite) => favorite.href === href);

  const toggleFavorite = (chapter: Chapter) => {
    const nextFavorites =
      isFavorite(chapter.href) ?
        favorites.filter((favorite) => favorite.href !== chapter.href)
        : [
          ...favorites,
          {
            href: chapter.href,
            slug: chapter.href.split("/").pop() ?? "",
            number: chapter.number,
            title: chapter.title,
            addedAt: Date.now(),
          },
        ];

    persistFavorites(nextFavorites);
  };

  const removeFavorite = (href: string) => {
    persistFavorites(favorites.filter((favorite) => favorite.href !== href));
  };

  const persistBookmarks = (nextBookmarks: ReadingBookmark[]) => {
    window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(nextBookmarks));
    setBookmarks(nextBookmarks);
    window.dispatchEvent(new Event(BOOKMARKS_EVENT));
  };

  const removeBookmark = (id: string) => {
    persistBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  const goToBookmark = (bookmark: ReadingBookmark) => {
    closeSidebar();

    if (bookmark.href === pathname) {
      window.scrollTo({
        top: bookmark.scrollY,
        behavior: "smooth",
      });

      if (bookmark.selectedText) {
        window.setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent(BOOKMARK_HIGHLIGHT_EVENT, {
              detail: {
                href: bookmark.href,
                text: bookmark.selectedText,
              },
            }),
          );
        }, 120);
      }

      return;
    }

    window.sessionStorage.setItem(PENDING_BOOKMARK_KEY, JSON.stringify(bookmark));

    if (bookmark.selectedText) {
      window.sessionStorage.setItem(
        PENDING_BOOKMARK_HIGHLIGHT_KEY,
        JSON.stringify({
          href: bookmark.href,
          text: bookmark.selectedText,
        }),
      );
    }

    router.push(bookmark.href);
  };

  return (
    <div className={`chapters-sidebar-widget${isOpen ? " is-open" : ""}`}>
      <button
        aria-label="إغلاق قائمة الفصول"
        className={`chapters-overlay${isOpen ? " is-open" : ""}`}
        tabIndex={isOpen ? 0 : -1}
        type="button"
        onClick={closeSidebar}
      />

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


        {favorites.length > 0 ? (
          <section
            className={`sidebar-favorites${isFavoritesExpanded ? " is-expanded" : ""
              }`}
            aria-label="الفصول المفضلة"
          >
            <button
              aria-controls="sidebar-favorites-list"
              aria-expanded={isFavoritesExpanded}
              className="chapters-open-button sidebar-section-toggle"
              type="button"
              onClick={() => {
                if (!isOpen) {
                  setIsOpen(true);
                  setIsFavoritesExpanded(true);
                  return;
                }

                setIsFavoritesExpanded((current) => !current);
              }}
            >
              <span className="chapters-open-icon" aria-hidden="true">
                <Star size={18} strokeWidth={2.3} />
              </span>
              <span className="chapters-open-label">المفضلة</span>
              <span className="sidebar-section-chevron" aria-hidden="true">
                {isFavoritesExpanded ? "⌃" : "⌄"}
              </span>
            </button>

            <div
              className="sidebar-favorites-list"
              id="sidebar-favorites-list"
            >
              {favorites.map((favorite) => (
                <div
                  className="sidebar-chapter-row"
                  key={favorite.href}
                >
                  <Link
                    className="sidebar-chapter-link"
                    href={favorite.href}
                    onClick={closeSidebar}
                  >
                    <span className="sidebar-chapter-number">{favorite.number}</span>
                    <span className="sidebar-chapter-copy">
                      <strong>{favorite.title}</strong>
                    </span>
                  </Link>

                  <button
                    aria-label="إزالة الفصل من المفضلة"
                    aria-pressed="true"
                    className="sidebar-favorite-toggle"
                    type="button"
                    onClick={() => removeFavorite(favorite.href)}
                  >
                    ⭐
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {bookmarks.length > 0 ? (
          <section
            className={`sidebar-bookmarks${isBookmarksExpanded ? " is-expanded" : ""
              }`}
            aria-label="علامات القراءة"
          >
            <button
              aria-controls="sidebar-bookmarks-list"
              aria-expanded={isBookmarksExpanded}
              className="chapters-open-button sidebar-section-toggle"
              type="button"
              onClick={() => {
                if (!isOpen) {
                  setIsOpen(true);
                  setIsBookmarksExpanded(true);
                  return;
                }

                setIsBookmarksExpanded((current) => !current);
              }}
            >
              <span className="chapters-open-icon" aria-hidden="true">
                <BookMarked size={18} strokeWidth={2.3} />
              </span>
              <span className="chapters-open-label">علامات القراءة</span>
              <span className="sidebar-section-chevron" aria-hidden="true">
                {isBookmarksExpanded ? "⌃" : "⌄"}
              </span>
            </button>

            <div
              className="sidebar-bookmarks-list"
              id="sidebar-bookmarks-list"
            >
              {bookmarks.map((bookmark) => (
                <div
                  className="sidebar-bookmark-row"
                  data-bookmark-id={bookmark.id}
                  key={bookmark.id}
                >
                  <button
                    className="sidebar-bookmark-link"
                    type="button"
                    onClick={() => goToBookmark(bookmark)}
                  >
                    <span className="sidebar-chapter-number">
                      {bookmark.number}
                    </span>
                    <span className="sidebar-chapter-copy">
                      <strong>{bookmark.title}</strong>
                      <small
                        className={
                          bookmark.selectedText ? "sidebar-bookmark-quote" : ""
                        }
                      >
                        {bookmark.selectedText || "علامة محفوظة"}
                      </small>
                    </span>
                  </button>

                  <button
                    aria-label="حذف علامة القراءة"
                    className="sidebar-bookmark-delete"
                    type="button"
                    onClick={() => removeBookmark(bookmark.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <button
          aria-controls="chapters-list"
          aria-expanded={isOpen && isChaptersExpanded}
          className="chapters-open-button"
          type="button"
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true);
              setIsChaptersExpanded(true);
              return;
            }

            setIsChaptersExpanded((current) => !current);
          }}
        >
          <span className="chapters-open-icon" aria-hidden="true">
            <BookOpen size={19} strokeWidth={2.3} />
          </span>
          <span className="chapters-open-label">الفصول</span>
          <span className="sidebar-section-chevron" aria-hidden="true">
            {isChaptersExpanded ? "⌃" : "⌄"}
          </span>
        </button>

        <nav className="chapters-sidebar-list" aria-label="روابط الفصول">
          <div
            className={`sidebar-chapters-section${isChaptersExpanded ? " is-expanded" : ""
              }`}
            id="chapters-list"
          >
            {chapters.map((chapter) => (
              <div
                className="sidebar-chapter-row"
                key={chapter.href}
              >
                <Link
                  className="sidebar-chapter-link"
                  href={chapter.href}
                  onClick={closeSidebar}
                >
                  <span className="sidebar-chapter-number">{chapter.number}</span>
                  <span className="sidebar-chapter-copy">
                    <strong>{chapter.title}</strong>
                  </span>
                </Link>

                <button
                  aria-label={
                    isFavorite(chapter.href) ?
                      "إزالة الفصل من المفضلة"
                      : "إضافة الفصل إلى المفضلة"
                  }
                  aria-pressed={isFavorite(chapter.href)}
                  className="sidebar-favorite-toggle"
                  type="button"
                  onClick={() => toggleFavorite(chapter)}
                >
                  {isFavorite(chapter.href) ? "⭐" : "☆"}
                </button>
              </div>
            ))}
          </div>
        </nav>


      </aside>
    </div>
  );
}
