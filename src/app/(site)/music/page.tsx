"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Music, Disc3, Headphones } from "lucide-react";
import TrackCard from "@/components/music/TrackCard";
import AlbumCard from "@/components/music/AlbumCard";
import { featuredRelease, singles, albums } from "@/data/music";

const MusicPage = () => {
  const [activeTab, setActiveTab] = useState<"singles" | "albums">("singles");

  return (
    <section className="relative overflow-hidden bg-[#07070B] pt-32 pb-20 md:pb-[120px]">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-[#7C3AED]/20 blur-[120px]"
          animate={{
            x: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute right-1/4 top-40 h-96 w-96 rounded-full bg-[#F43F5E]/15 blur-[120px]"
          animate={{
            x: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-5 md:px-6">
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
            <Headphones className="h-12 w-12 text-[#7C3AED]" />
          </motion.div>

          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent">
              Music & Releases
            </span>
          </h1>

          <p className="text-lg text-white/60">
            Explore my musical journey through singles and albums, blending traditional Kurdish melodies with contemporary sounds
          </p>
        </motion.div>

        {/* Featured Release */}
        {featuredRelease && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-16 max-w-5xl"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#F59E0B]/50 bg-gradient-to-br from-[#0B0B12]/95 to-[#0B0B12]/90 p-8 backdrop-blur-xl md:p-12">
              {/* Featured Badge */}
              <div className="absolute right-6 top-6 rounded-full border border-[#F59E0B]/50 bg-[#F59E0B]/20 px-4 py-2 text-sm font-bold text-[#F59E0B] backdrop-blur-xl">
                ⭐ FEATURED RELEASE
              </div>

              <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                {/* Left: Cover */}
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#7C3AED]/40 to-[#F43F5E]/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="h-64 w-64 rounded-full bg-[#7C3AED]/50 blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.7, 0.5],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <div className="absolute">
                      <Music className="h-32 w-32 text-white/30" />
                    </div>
                  </div>
                </div>

                {/* Right: Info */}
                <div className="flex flex-col justify-center">
                  <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
                    {featuredRelease.title}
                  </h2>

                  <p className="mb-6 text-lg text-white/70">
                    {featuredRelease.description}
                  </p>

                  <div className="mb-6 flex items-center gap-4 text-sm text-white/50">
                    <span className="font-semibold text-[#F59E0B]">{featuredRelease.duration}</span>
                    <span>•</span>
                    <span>{new Date(featuredRelease.releaseDateISO).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={featuredRelease.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#F43F5E]/50 bg-gradient-to-r from-[#F43F5E]/30 to-[#7C3AED]/30 px-6 py-3.5 font-bold text-white transition-all hover:border-[#F43F5E] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)]"
                    >
                      <Music className="h-5 w-5" />
                      Watch Now
                    </a>

                    {featuredRelease.spotifyUrl && (
                      <a
                        href={featuredRelease.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#A855F7]/50 bg-[#A855F7]/20 px-6 py-3.5 font-bold text-white transition-all hover:border-[#A855F7] hover:bg-[#A855F7]/30"
                      >
                        <Headphones className="h-5 w-5" />
                        Listen
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 flex justify-center"
        >
          <div className="inline-flex rounded-2xl border border-[#A855F7]/30 bg-[#0B0B12]/80 p-1.5 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab("singles")}
              className={`flex items-center gap-2 rounded-xl px-8 py-3 font-semibold transition-all ${activeTab === "singles"
                ? "bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                : "text-white/60 hover:text-white"
                }`}
            >
              <Music className="h-5 w-5" />
              Singles ({singles.length})
            </button>
            <button
              onClick={() => setActiveTab("albums")}
              className={`flex items-center gap-2 rounded-xl px-8 py-3 font-semibold transition-all ${activeTab === "albums"
                ? "bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                : "text-white/60 hover:text-white"
                }`}
            >
              <Disc3 className="h-5 w-5" />
              Albums ({albums.length})
            </button>
          </div>
        </motion.div>

        {/* Singles Grid */}
        {activeTab === "singles" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {singles.map((single, index) => (
              <TrackCard key={single.id} track={single} index={index} />
            ))}
          </motion.div>
        )}

        {/* Albums Grid */}
        {activeTab === "albums" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {albums.map((album, index) => (
              <AlbumCard key={album.id} album={album} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MusicPage;
