"use client";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Video } from "@/data/media";

interface VideoCardProps {
  video: Video;
  index?: number;
}

const VideoCard = ({ video, index = 0 }: VideoCardProps) => {
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
      className="group relative"
    >
      <div className="overflow-hidden rounded-2xl border border-[#A855F7]/30 bg-gradient-to-b from-[#0B0B12]/90 to-[#0B0B12]/95 backdrop-blur-xl transition-all duration-300 hover:border-[#A855F7]/50">
        {/* Video Embed */}
        <div className="relative aspect-video overflow-hidden bg-black">
          <iframe
            src={video.youtubeUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>

        {/* Video Info */}
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2 text-xs text-white/50">
            <Calendar className="h-3.5 w-3.5 text-[#7C3AED]" />
            <span>{formatDate(video.dateISO)}</span>
          </div>
          <h3 className="mb-3 font-semibold text-white transition-colors group-hover:text-[#A855F7]">
            {video.title}
          </h3>

          <a
            href={video.youtubeUrl.replace('/embed/', '/watch?v=')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#7C3AED]/50 bg-[#7C3AED]/20 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:border-[#F43F5E] hover:bg-[#F43F5E]/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Watch on YouTube
          </a>
        </div>

        {/* Border glow effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
    </motion.div>
  );
};

export default VideoCard;
