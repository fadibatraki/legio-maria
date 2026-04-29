"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const normalizeText = (value: string) =>
  value
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .toLowerCase();

const unwrapPreviousHighlights = (root: HTMLElement) => {
  root.querySelectorAll("mark.search-highlight").forEach((mark) => {
    const text = document.createTextNode(mark.textContent ?? "");
    mark.replaceWith(text);
  });
  root.normalize();
};

const highlightTextNode = (node: Text, query: string) => {
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

  const mark = document.createElement("mark");
  mark.className = "search-highlight";
  mark.textContent = match;
  fragment.append(mark);

  if (after) {
    fragment.append(document.createTextNode(after));
  }

  node.replaceWith(fragment);
  return true;
};

export default function SearchHighlighter() {
  const searchParams = useSearchParams();
  const highlight = searchParams.get("highlight")?.trim() ?? "";

  useEffect(() => {
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

    textNodes.forEach((node) => highlightTextNode(node, highlight));

    window.setTimeout(() => {
      root.querySelector(".search-highlight")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 80);
  }, [highlight, searchParams]);

  return null;
}
