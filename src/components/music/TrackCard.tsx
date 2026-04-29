"use client";
import { motion } from "framer-motion";
import { Play, Clock, Headphones, Music2 } from "lucide-react";
import { Track } from "@/data/music";

interface TrackCardProps {
  track: Track;
  index?: number;
}

const TrackCard = ({ track, index = 0 }: TrackCardProps) => {
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
      <div className="relative overflow-hidden rounded-2xl border border-[#A855F7]/30 bg-gradient-to-b from-[#0B0B12]/90 to-[#0B0B12]/95 backdrop-blur-xl transition-all duration-300 hover:border-[#A855F7]/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]">
        {/* Featured Badge */}
        {track.featured && (
          <div className="absolute right-3 top-3 z-10 rounded-full border border-[#F59E0B]/50 bg-[#F59E0B]/20 px-2.5 py-1 text-xs font-bold text-[#F59E0B] backdrop-blur-xl">
            FEATURED
          </div>
        )}

        {/* Cover Image Placeholder */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#7C3AED]/30 to-[#F43F5E]/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="h-32 w-32 rounded-full bg-[#7C3AED]/40 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="absolute">
              <Music2 className="h-24 w-24 text-white/20" />
            </div>
          </div>

          {/* Hover Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F43F5E]/90 backdrop-blur-xl">
              <Play className="h-8 w-8 fill-white text-white" />
            </div>
          </div>
        </div>

        {/* Track Info */}
        <div className="p-5">
          <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-[#A855F7]">
            {track.title}
          </h3>

          <div className="mb-3 flex items-center gap-3 text-xs text-white/50">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-[#7C3AED]" />
              <span>{track.duration}</span>
            </div>
            <span>•</span>
            <span>{formatDate(track.releaseDateISO)}</span>
          </div>

          <p className="mb-4 line-clamp-2 text-sm text-white/60">
            {track.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <a
              href={track.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#7C3AED]/50 bg-[#7C3AED]/20 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-[#F43F5E] hover:bg-[#F43F5E]/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
            >
              <Play className="h-4 w-4" />
              Watch
            </a>

            {(track.spotifyUrl || track.appleMusicUrl) && (
              <a
                href={track.spotifyUrl || track.appleMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-[#A855F7]/30 bg-[#0B0B12]/50 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-[#A855F7]/50 hover:bg-[#A855F7]/20"
              >
                <Headphones className="h-4 w-4" />
                Listen
              </a>
            )}
          </div>
        </div>

        {/* Border glow animation */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)",
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

export default TrackCard;
