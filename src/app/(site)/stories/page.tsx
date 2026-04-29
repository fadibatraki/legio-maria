"use client";
import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import StoryCard from "@/components/stories/StoryCard";
import { stories, getFeaturedStory } from "@/data/stories";

export default function StoriesPage() {
  const featuredStory = getFeaturedStory();
  const regularStories = stories.filter((story) => !story.featured);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07070B]">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-[#7C3AED]/20 blur-[120px]"
          animate={{
            x: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute right-1/4 top-40 h-96 w-96 rounded-full bg-[#F43F5E]/15 blur-[120px]"
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
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
          >
            <motion.div
              className="mb-4 flex justify-center"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <BookOpen className="h-12 w-12 text-[#7C3AED]" />
            </motion.div>

            <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent">
                Stories & Tales
              </span>
            </h1>

            <p className="text-lg text-white/60 md:text-xl">
              Explore the rich tapestry of Kurdish culture through music, heritage, and personal journeys
            </p>
          </motion.div>

          {/* Featured Story */}
          {featuredStory && (
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4 flex items-center gap-2"
              >
                <Sparkles className="h-5 w-5 text-[#F59E0B]" />
                <h2 className="text-xl font-bold text-white">Featured Story</h2>
              </motion.div>
              <StoryCard story={featuredStory} index={0} />
            </div>
          )}

          {/* All Stories Grid */}
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6 text-2xl font-bold text-white"
            >
              All Stories
            </motion.h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularStories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
