import Link from "next/link";
import { Metadata } from "next";
import { getChapters } from "@/data/chapters";

export const metadata: Metadata = {
  title: "دليل الليجيو ماريا",
  description: "موقع لقراءة فصول دليل الليجيو ماريا بشكل منظم وسهل.",
};

export default async function Home() {
  const chapters = await getChapters();

  return (
    <main className="reading-shell">
      <article className="reading-main">
        <div className="reading-content chapter-article">
          <p className="section-kicker">الفهرس</p>
          <h1>دليل الليجيو ماريا</h1>
          <p className="lead">
            موقع لقراءة فصول دليل الليجيو ماريا بشكل منظم وسهل.
          </p>

          <div className="chapters-index">
            {chapters.map((chapter) => (
              <Link
                key={chapter.href}
                href={chapter.href}
                className="chapter-index-item"
              >
                <span className="chapter-index-number">{chapter.number}</span>
                <div className="chapter-index-content">
                  <h2 className="chapter-index-title">{chapter.title}</h2>
                  <p className="chapter-index-summary">{chapter.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
