import About from "@/components/About";
import ScrollUp from "@/components/Common/ScrollUp";
import Events from "@/components/Events";
import Stories from "@/components/Stories";
import Media from "@/components/Media";
import LatestReleases from "@/components/LatestReleases";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play Next.js - SaaS Starter Kit and Boilerplate for Next.js",
  description: "Free Next.js SaaS Boilerplate and Starter Kit designed and built for SaaS startups. It comes with all necessary integrations, pages, and components you need to launch a feature-rich SaaS websites.",
};

export default function Home() {
  return (
    <main>
      <ScrollUp />
      <Hero />
      <About />
      {/* <ProductsSection /> */}
      <Events />
      <Stories />
      <Media />
      <LatestReleases />
    </main>
  );
}
