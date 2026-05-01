"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const PENDING_BOOKMARK_HIGHLIGHT_KEY = "legio-reading-pending-bookmark-highlight";
const BOOKMARK_HIGHLIGHT_EVENT = "legio-reading-bookmark-highlight";

type BookmarkHighlight = {
  href: string;
  text?: string;
};

const normalizeText = (value: string) =>
  value
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .toLowerCase();

const unwrapPreviousHighlights = (root: HTMLElement) => {
  root
    .querySelectorAll(".highlight, .bookmark-highlight, mark.search-highlight")
    .forEach((element) => {
      const text = document.createTextNode(element.textContent ?? "");
      element.replaceWith(text);
    });
  root.normalize();
};

const highlightTextNode = (node: Text, query: string, className = "highlight") => {
  const text = node.textContent ?? "";
  const normalizedText = normalizeText(text);
  const normalizedQuery = normalizeText(query);
  const matchIndex = normalizedText.indexOf(normalizedQuery);

  if (matchIndex === -1) {
    return false;
  }

  const before = text.slice(0, matchIndex);
  const match = text.slice(matchIndex, matchIndex + query.length);
  const after = text.slice(matchIndex + query.length);
  const fragment = document.createDocumentFragment();

  if (before) {
    fragment.append(document.createTextNode(before));
  }

  const span = document.createElement("span");
  span.className = className;
  span.textContent = match;
  fragment.append(span);

  if (after) {
    fragment.append(document.createTextNode(after));
  }

  node.replaceWith(fragment);
  return true;
};

const highlightInArticle = (highlight: string, className = "highlight") => {
  const root = document.querySelector<HTMLElement>(".chapter-article");

  if (!root) {
    return;
  }

  unwrapPreviousHighlights(root);

  if (!highlight) {
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;

      if (
        !node.textContent?.trim() ||
        parent?.closest("a, button, script, style")
      ) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  const highlighted = textNodes.some((node) =>
    highlightTextNode(node, highlight, className),
  );

  if (!highlighted) {
    return;
  }

  window.setTimeout(() => {
    root.querySelector(`.${className.split(" ").join(".")}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 80);
};

export default function SearchHighlighter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const highlight = searchParams.get("highlight")?.trim() ?? "";

  useEffect(() => {
    highlightInArticle(highlight);
  }, [highlight, searchParams]);

  useEffect(() => {
    const applyBookmarkHighlight = (text?: string) => {
      if (!text?.trim()) {
        return;
      }

      window.setTimeout(() => {
        highlightInArticle(text, "highlight bookmark-highlight");
      }, 180);
    };

    try {
      const pending = window.sessionStorage.getItem(PENDING_BOOKMARK_HIGHLIGHT_KEY);

      if (pending) {
        const bookmark = JSON.parse(pending) as BookmarkHighlight;

        if (bookmark.href === pathname) {
          window.sessionStorage.removeItem(PENDING_BOOKMARK_HIGHLIGHT_KEY);
          applyBookmarkHighlight(bookmark.text);
        }
      }
    } catch {
      window.sessionStorage.removeItem(PENDING_BOOKMARK_HIGHLIGHT_KEY);
    }

    const handleBookmarkHighlight = (event: Event) => {
      const bookmark = (event as CustomEvent<BookmarkHighlight>).detail;

      if (bookmark.href === pathname) {
        applyBookmarkHighlight(bookmark.text);
      }
    };

    window.addEventListener(BOOKMARK_HIGHLIGHT_EVENT, handleBookmarkHighlight);

    return () => {
      window.removeEventListener(BOOKMARK_HIGHLIGHT_EVENT, handleBookmarkHighlight);
    };
  }, [pathname]);

  return null;
}
