"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { Story } from "@/data/stories";

interface StoryCardProps {
  story: Story;
  index?: number;
}

const StoryCard = ({ story, index = 0 }: StoryCardProps) => {
  const formatDate = (dateISO: string) => {
    const date = new Date(dateISO);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <Link href={`/stories/${story.slug}`}>
        <div className="relative h-full overflow-hidden rounded-2xl border border-[#A855F7]/30 bg-gradient-to-b from-[#0B0B12]/90 to-[#0B0B12]/95 backdrop-blur-xl transition-all duration-300 hover:border-[#A855F7]/50">
          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 bg-[#7C3AED]/10" />
          </div>

          {/* Content */}
          <div className="relative">
            {/* Cover Image Placeholder */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/30 to-[#F43F5E]/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="h-32 w-32 rounded-full bg-[#7C3AED]/40 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>

              {/* Featured Badge */}
              {story.featured && (
                <div className="absolute top-4 right-4 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/20 px-3 py-1 text-xs font-bold text-[#F59E0B] backdrop-blur-xl">
                  Featured
                </div>
              )}
            </div>

            {/* Text Content */}
            <div className="p-6">
              {/* Tags */}
              <div className="mb-3 flex flex-wrap gap-2">
                {story.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-3 py-1 text-xs font-medium text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#A855F7]">
                {story.title}
              </h3>

              {/* Excerpt */}
              <p className="mb-4 line-clamp-2 text-sm text-white/60">
                {story.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-white/50">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#7C3AED]" />
                  <span>{formatDate(story.dateISO)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#7C3AED]" />
                  <span>{story.readTime}</span>
                </div>
              </div>

              {/* Read More */}
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#7C3AED] transition-colors group-hover:text-[#F43F5E]">
                <span>Read Story</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* Border glow animation */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default StoryCard;
