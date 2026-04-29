import Link from "next/link";
import { Metadata } from "next";

const chapters = [
  {
    number: "١",
    title: "الاسم والأصل",
    href: "/chapters/chapter-1",
    summary: "مدخل تجريبي إلى الدليل وطريقة عرض الفصل داخل الموقع.",
  },
  {
    number: "٢",
    title: "الهدف",
    href: "/chapters/chapter-1",
    summary: "فصل تجريبي ظاهر في القائمة، وسيضاف مساره لاحقًا.",
  },
  {
    number: "٣",
    title: "روح الليجيو ماريا",
    href: "/chapters/chapter-1",
    summary: "عن الروح العامة والتنظيم الهادئ للفصول.",
  },
  {
    number: "٤",
    title: "خدمة الليجيو",
    href: "/chapters/chapter-1",
    summary: "نموذج لفصول القراءة المقبلة داخل الدليل.",
  },
];

export const metadata: Metadata = {
  title: "دليل الليجيو ماريا",
  description: "موقع لقراءة فصول دليل الليجيو ماريا بشكل منظم وسهل.",
};

export default function Home() {
  return (
    <main className="reading-shell">
      <section className="reading-main">
        <div className="reading-content">
          <p className="section-kicker">الفصول</p>
          <h1>دليل الليجيو ماريا</h1>
          <p className="lead">
            موقع لقراءة فصول دليل الليجيو ماريا بشكل منظم وسهل.
          </p>

          <div className="chapter-list" aria-label="قائمة فصول تجريبية">
            {chapters.map((chapter) => (
              <Link className="chapter-row" href={chapter.href} key={chapter.title}>
                <span className="chapter-number">{chapter.number}</span>
                <span>
                  <strong>{chapter.title}</strong>
                  <small>{chapter.summary}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
