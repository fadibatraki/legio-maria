import Footer from "@/components/layout/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";

export const metadata: Metadata = {
  title: {
    default: "دليل الليجيو ماريا",
    template: "%s | دليل الليجيو ماريا",
  },
  description: "موقع لقراءة فصول دليل الليجيو ماريا بشكل منظم وسهل.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="!scroll-smooth" dir="rtl" lang="ar">
      <body>
        <div className="site-frame">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
