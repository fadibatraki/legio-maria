"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Play, FileImage } from "lucide-react";
import PhotoGrid from "@/components/media/PhotoGrid";
import VideoCard from "@/components/media/VideoCard";
import PosterCard from "@/components/media/PosterCard";
import { photos, videos, posters } from "@/data/media";

type TabType = "photos" | "videos" | "posters";

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<TabType>("photos");

  const tabs = [
    { id: "photos" as TabType, label: "Photos", icon: ImageIcon, count: photos.length },
    { id: "videos" as TabType, label: "Videos", icon: Play, count: videos.length },
    { id: "posters" as TabType, label: "Posters", icon: FileImage, count: posters.length },
  ];

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
              <ImageIcon className="h-12 w-12 text-[#7C3AED]" />
            </motion.div>

            <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent">
                Media & Gallery
              </span>
            </h1>

            <p className="text-lg text-white/60 md:text-xl">
              Explore moments captured through performances, studio sessions, and cultural celebrations
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 flex justify-center"
          >
            <div className="inline-flex gap-2 rounded-2xl border border-[#7C3AED]/30 bg-[#0B0B12]/60 p-2 backdrop-blur-xl">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all ${isActive
                      ? "bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                      : "text-white/60 hover:text-white"
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                    <span
                      className={`ml-1 text-xs ${isActive ? "text-white/80" : "text-white/40"
                        }`}
                    >
                      ({tab.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === "photos" && <PhotoGrid photos={photos} />}

            {activeTab === "videos" && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {videos.map((video, index) => (
                  <VideoCard key={video.id} video={video} index={index} />
                ))}
              </div>
            )}

            {activeTab === "posters" && (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posters.map((poster, index) => (
                  <PosterCard key={poster.id} poster={poster} index={index} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
