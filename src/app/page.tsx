import { Metadata } from "next";

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
        </div>
      </section>
    </main>
  );
}
