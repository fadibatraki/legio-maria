import { readdir, readFile } from "fs/promises";
import path from "path";

export type Chapter = {
  number: string;
  title: string;
  href: string;
  summary: string;
};

const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

const toArabicNumber = (value: number) =>
  String(value)
    .split("")
    .map((digit) => arabicDigits[Number(digit)] ?? digit)
    .join("");

const getChapterNumberFromSlug = (slug: string) => {
  const match = slug.match(/^chapter-(\d+)$/);
  return match ? Number(match[1]) : null;
};

const getChapterOrder = (slug: string) =>
  getChapterNumberFromSlug(slug) ?? Number.MAX_SAFE_INTEGER;

const cleanupTitle = (value: string) =>
  value
    .replace(
      /^الفصل\s+(?:[\u0660-\u0669\d]+|الأول|الثاني|الثالث|الرابع|الخامس|السادس|السابع|الثامن|التاسع|العاشر)\s*[-–—:]?\s*/,
      "",
    )
    .trim();

const extractStringValue = (source: string, key: string) => {
  const match = source.match(new RegExp(`${key}\\s*:\\s*[\"']([^\"']+)[\"']`));
  return match?.[1]?.trim() ?? "";
};

const extractTagText = (source: string, tag: string) => {
  const match = source.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return (
    match?.[1]
      ?.replace(/<[^>]*>/g, " ")
      .replace(/\{[^{}]*\}/g, " ")
      .replace(/\s+/g, " ")
      .trim() ?? ""
  );
};

export async function getChapters(): Promise<Chapter[]> {
  const chaptersDirectory = path.join(process.cwd(), "src/app/chapters");
  const entries = await readdir(chaptersDirectory, { withFileTypes: true });
  const chapterDirectories = entries
    .filter((entry) => entry.isDirectory())
    .sort((first, second) => getChapterOrder(first.name) - getChapterOrder(second.name));

  const chapters = await Promise.all(
    chapterDirectories.map(async (entry, index) => {
      const pagePath = path.join(chaptersDirectory, entry.name, "page.tsx");
      const source = await readFile(pagePath, "utf8");
      const metadataTitle = extractStringValue(source, "title");
      const headingTitle = extractTagText(source, "h1");
      const description = extractStringValue(source, "description");
      const firstParagraph = extractTagText(source, "p");
      const chapterNumber = getChapterNumberFromSlug(entry.name) ?? index + 1;
      const title = cleanupTitle(headingTitle || metadataTitle || entry.name);

      return {
        number: toArabicNumber(chapterNumber),
        title,
        href: `/chapters/${entry.name}`,
        summary: description || firstParagraph || "فصل من دليل الليجيو ماريا.",
      };
    }),
  );

  return chapters;
}
