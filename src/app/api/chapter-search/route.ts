import { getChapters } from "@/data/chapters";
import { readdir, readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SearchResult = {
  number: string;
  title: string;
  href: string;
  summary: string;
  excerpt: string;
};

const normalizeText = (value: string) =>
  value
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .toLowerCase()
    .trim();

const extractVisiblePageText = (source: string) => {
  const returnMatch = source.match(/return\s*\(([\s\S]*?)\);\s*}/);
  const jsx = returnMatch?.[1] ?? source;

  return jsx
    .replace(/{\/\*[\s\S]*?\*\/}/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/{[^{}]*}/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
};

const createExcerpt = (content: string, query: string) => {
  const normalizedContent = normalizeText(content);
  const normalizedQuery = normalizeText(query);
  const matchIndex = normalizedContent.indexOf(normalizedQuery);

  if (matchIndex === -1) {
    return content.slice(0, 120);
  }

  const start = Math.max(0, matchIndex - 45);
  const end = Math.min(content.length, matchIndex + query.length + 75);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < content.length ? "..." : "";

  return `${prefix}${content.slice(start, end)}${suffix}`;
};

async function getChapterPages() {
  const chapters = await getChapters();
  const chaptersDirectory = path.join(process.cwd(), "src/app/chapters");
  const entries = await readdir(chaptersDirectory, { withFileTypes: true });

  return Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const href = `/chapters/${entry.name}`;
        const pagePath = path.join(chaptersDirectory, entry.name, "page.tsx");
        const source = await readFile(pagePath, "utf8");
        const chapterInfo = chapters.find((chapter) => chapter.href === href);

        return {
          number: chapterInfo?.number ?? "",
          title: chapterInfo?.title ?? entry.name,
          href,
          summary: chapterInfo?.summary ?? "",
          content: extractVisiblePageText(source),
        };
      }),
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const normalizedQuery = normalizeText(query);
  const pages = await getChapterPages();

  const results: SearchResult[] = pages
    .map((page) => {
      const normalizedTitle = normalizeText(page.title);
      const normalizedSummary = normalizeText(page.summary);
      const normalizedContent = normalizeText(page.content);
      const searchableText = normalizeText(
        [page.number, page.title, page.summary, page.content].join(" "),
      );

      if (!searchableText.includes(normalizedQuery)) {
        return null;
      }

      const score =
        normalizedTitle.includes(normalizedQuery) ? 3
        : normalizedSummary.includes(normalizedQuery) ? 2
        : normalizedContent.includes(normalizedQuery) ? 1
        : 0;

      return {
        number: page.number,
        title: page.title,
        href: page.href,
        summary: page.summary,
        excerpt: createExcerpt(page.content, query),
        score,
      };
    })
    .filter((result): result is SearchResult & { score: number } =>
      Boolean(result),
    )
    .sort((first, second) => second.score - first.score)
    .map(({ score, ...result }) => result);

  return NextResponse.json({ results });
}
