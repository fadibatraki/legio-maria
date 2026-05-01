"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import ReadingControls from "@/components/ReadingControls";
import type { Chapter } from "@/data/chapters";

type SearchResult = {
  number: string;
  title: string;
  href: string;
  summary: string;
  excerpt: string;
};

type HeaderProps = {
  chapters: Chapter[];
};

const Header = ({ chapters }: HeaderProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const trimmedQuery = query.trim();
  useEffect(() => {
    if (!trimmedQuery) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      try {
        setIsSearching(true);
        const response = await fetch(
          `/api/chapter-search?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal },
        );
        const data = (await response.json()) as { results?: SearchResult[] };

        setSearchResults(data.results ?? []);
      } catch (error) {
        if (!controller.signal.aborted) {
          setSearchResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 180);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [trimmedQuery]);

  const getHighlightedHref = (href: string) =>
    `${href}?highlight=${encodeURIComponent(trimmedQuery)}`;

  const goToChapter = (href: string) => {
    setIsSearchOpen(false);
    setQuery("");
    router.push(getHighlightedHref(href));
  };

  return (
    <header className="site-header">
      <div className="topbar-search-area">
        <div className="topbar-search">
          <Search className="topbar-search-icon" size={20} strokeWidth={2} />
          <input
            aria-controls="chapter-search-results"
            aria-expanded={isSearchOpen && Boolean(trimmedQuery)}
            aria-label="البحث ضمن الفصول"
            autoComplete="off"
            type="search"
            value={query}
            placeholder="ابحث عن الفصول..."
            onBlur={() => {
              window.setTimeout(() => setIsSearchOpen(false), 120);
            }}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setIsSearchOpen(false);
              }

              if (event.key === "Enter" && searchResults[0]) {
                event.preventDefault();
                goToChapter(searchResults[0].href);
              }
            }}
          />

          {isSearchOpen && trimmedQuery ? (
            <div
              className="topbar-search-results"
              id="chapter-search-results"
              role="listbox"
              onMouseDown={(event) => event.preventDefault()}
            >
              {isSearching ? (
                <p className="topbar-search-empty">جاري البحث...</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((chapter) => (
                  <Link
                    className="topbar-search-result"
                    href={getHighlightedHref(chapter.href)}
                    key={`${chapter.number}-${chapter.title}`}
                    role="option"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setQuery("");
                    }}
                  >
                    <span className="topbar-search-result-number">
                      {chapter.number}
                    </span>
                    <span>
                      <strong>{chapter.title}</strong>
                      <small>{chapter.excerpt || chapter.summary}</small>
                    </span>
                  </Link>
                ))
              ) : (
                <p className="topbar-search-empty">لا توجد فصول مطابقة.</p>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="topbar-greeting">
        <div className="topbar-greeting-row">
          <h1>دليل الليجيو ماريا</h1>
          <ReadingControls chapters={chapters} />
        </div>

      </div>
    </header>
  );
};

export default Header;
