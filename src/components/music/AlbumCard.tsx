"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Disc3, Calendar, Music } from "lucide-react";
import { Album } from "@/data/music";

interface AlbumCardProps {
  album: Album;
  index?: number;
}

const AlbumCard = ({ album, index = 0 }: AlbumCardProps) => {
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
      <Link href={`/music/${album.slug}`}>
        <div className="relative overflow-hidden rounded-2xl border border-[#A855F7]/30 bg-gradient-to-b from-[#0B0B12]/90 to-[#0B0B12]/95 backdrop-blur-xl transition-all duration-300 hover:border-[#A855F7]/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]">
          {/* Cover Image Placeholder */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#7C3AED]/30 to-[#F43F5E]/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="h-48 w-48 rounded-full bg-[#7C3AED]/40 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="absolute">
                <Disc3 className="h-32 w-32 text-white/20" />
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#07070B]/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <Music className="h-12 w-12 text-[#F43F5E]" />
                </div>
                <p className="text-sm font-semibold text-white">
                  {album.tracks.length} Tracks
                </p>
                <p className="mt-1 text-xs text-white/60">View Album</p>
              </div>
            </div>

            {/* Track Count Badge */}
            <div className="absolute right-3 top-3 rounded-full border border-[#7C3AED]/50 bg-[#0B0B12]/90 px-3 py-1.5 text-xs font-bold text-white/90 backdrop-blur-xl">
              {album.tracks.length} Tracks
            </div>
          </div>

          {/* Album Info */}
          <div className="p-5">
            <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-[#A855F7]">
              {album.title}
            </h3>

            <div className="mb-3 flex items-center gap-2 text-xs text-white/50">
              <Calendar className="h-3.5 w-3.5 text-[#7C3AED]" />
              <span>{formatDate(album.releaseDateISO)}</span>
            </div>

            <p className="line-clamp-2 text-sm text-white/60">
              {album.description}
            </p>
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
      </Link>
    </motion.div>
  );
};

export default AlbumCard;
