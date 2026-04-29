import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الفصل الأول - الاسم والأصل",
  description: "فصل تجريبي من دليل الليجيو ماريا.",
};

export default function ChapterOnePage() {
  return (
    <main className="reading-shell">
      <article className="reading-main">
        <div className="reading-content chapter-article">
          <p className="section-kicker">الفصل الأول</p>
          <h1>الاسم والأصل</h1>

          <p>
            هذا فصل تجريبي لعرض طريقة قراءة فصول دليل الليجيو ماريا داخل الموقع.
            النص هنا مؤقت، والغرض منه اختبار شكل الصفحة، عرض السطر، التباعد، واتجاه
            القراءة العربي.
          </p>

          <p>
            يعتمد التصميم على صفحة هادئة ومباشرة: مساحة وسطى للنص، ترويسة واضحة،
            وقائمة روابط مختصرة تساعد القارئ على الرجوع إلى الفصول دون تشتيت.
          </p>

          <p>
            عند إضافة النصوص الحقيقية لاحقًا، يمكن وضع كل فصل في صفحة ثابتة خاصة
            به مع المحافظة على نفس بنية القراءة ونفس أسلوب التنقل.
          </p>

          <blockquote>
            تتضرعي لأجلنا يا والدة الله القديسة، لكي نستحق مواعيد المسيح.
          </blockquote>

          <Link className="back-link" href="/">
            العودة إلى قائمة الفصول
          </Link>
        </div>
      </article>
    </main>
  );
}
