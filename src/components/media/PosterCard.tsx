"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Poster } from "@/data/media";

interface PosterCardProps {
  poster: Poster;
  index?: number;
}

const PosterCard = ({ poster, index = 0 }: PosterCardProps) => {
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
      <div className="relative overflow-hidden rounded-2xl border border-[#A855F7]/30 bg-gradient-to-b from-[#0B0B12]/90 to-[#0B0B12]/95 backdrop-blur-xl transition-all duration-300 hover:border-[#A855F7]/50">
        {/* Glow effect on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-[#7C3AED]/10" />
        </div>

        {/* Poster Image */}
        <div className="relative aspect-[2/3]">
          <Image
            src={poster.src}
            alt={poster.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B12]/60 via-transparent to-transparent" />
        </div>

        {/* Poster Info */}
        <div className="relative p-4">
          <h3 className="mb-2 font-bold text-white transition-colors group-hover:text-[#A855F7]">
            {poster.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Calendar className="h-3.5 w-3.5 text-[#7C3AED]" />
            <span>{formatDate(poster.dateISO)}</span>
          </div>
        </div>

        {/* Border glow animation */}
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

export default PosterCard;
