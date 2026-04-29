"use client";
import { motion } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { getStoryBySlug, getRelatedStories } from "@/data/stories";
import StoryCard from "@/components/stories/StoryCard";

export default function StoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  if (!slug) {
    notFound();
  }

  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const relatedStories = getRelatedStories(story.slug, 3);

  const formatDate = (dateISO: string) => {
    const date = new Date(dateISO);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07070B]">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute left-1/3 top-20 h-96 w-96 rounded-full bg-[#7C3AED]/25 blur-[120px]"
          animate={{
            x: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute right-1/3 top-40 h-96 w-96 rounded-full bg-[#F59E0B]/18 blur-[120px]"
          animate={{
            x: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-5 md:px-6 pt-[100px] sm:pt-[110px] md:pt-[120px] pb-16 sm:pb-18 md:pb-20">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/stories">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 rounded-lg border border-[#7C3AED]/40 bg-[#7C3AED]/15 px-4 py-2 text-white backdrop-blur-xl transition-all hover:border-[#F43F5E]/60 hover:bg-[#F43F5E]/20"
              >
                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span>Back to Stories</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Story Content */}
          <article className="mx-auto max-w-4xl">
            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 overflow-hidden rounded-3xl border border-[#A855F7]/30 bg-gradient-to-br from-[#0B0B12]/90 to-[#0B0B12]/95"
            >
              <div className="relative aspect-[21/9]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/40 to-[#F43F5E]/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="h-64 w-64 rounded-full bg-[#7C3AED] opacity-30 blur-3xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="absolute">
                    <BookOpen className="h-32 w-32 text-white/20" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl"
            >
              {story.title}
            </motion.h1>

            {/* Meta info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 flex flex-wrap items-center gap-6 text-white/60"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#7C3AED]" />
                <span>{formatDate(story.dateISO)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#7C3AED]" />
                <span>{story.readTime}</span>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 flex flex-wrap gap-2"
            >
              {story.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-2 text-sm font-medium text-white/80"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              {story.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-6 text-lg leading-relaxed text-white/70"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </article>

          {/* Related Stories */}
          {relatedStories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mx-auto mt-20 max-w-7xl"
            >
              <h2 className="mb-8 text-3xl font-bold text-white">
                <span className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent">
                  More Stories
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedStories.map((relatedStory, index) => (
                  <StoryCard key={relatedStory.id} story={relatedStory} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
