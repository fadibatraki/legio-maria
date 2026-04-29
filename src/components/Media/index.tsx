"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Image as ImageIcon, ArrowRight, Calendar } from "lucide-react";
import { photos, videos } from "@/data/media";
import Image from "next/image";
const Media = () => {
  const featuredPhotos = photos.slice(0, 4);
  const featuredVideo = videos[0];

  return (
    <section className="relative overflow-hidden bg-[#07070B] py-20 md:py-[120px]">
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
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

          <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent">
              Media Highlights
            </span>
          </h2>

          <p className="text-lg text-white/60">
            Captured moments from performances, studio sessions, and cultural events
          </p>
        </motion.div>

        {/* 2-Column Layout: 4 Photos Grid | 1 Video */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: 4 Photos in 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4">
            {featuredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#A855F7]/30 bg-gradient-to-b from-[#0B0B12]/90 to-[#0B0B12]/95 backdrop-blur-xl transition-all duration-300 hover:border-[#A855F7]/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                  {/* Glow effect on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-[#F43F5E]/10" />
                  </div>

                  {/* Photo Placeholder */}
                  <div className="relative h-full w-full">
                    <Image
                      src={photo.src}
                      alt={photo.category}
                      fill
                      className="object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Dark overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B12]/40 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute left-3 top-3 rounded-full border border-[#7C3AED]/30 bg-[#0B0B12]/90 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur-xl">
                      {photo.category}
                    </div>
                  </div>

                  {/* Border glow animation */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
            ))}
          </div>

          {/* Right Column: Featured Video - Imad Selim */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative"
          >
            <div className="h-full overflow-hidden rounded-2xl border border-[#A855F7]/30 bg-gradient-to-b from-[#0B0B12]/90 to-[#0B0B12]/95 backdrop-blur-xl transition-all duration-300 hover:border-[#A855F7]/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]">

              {/* Featured Badge */}
              <div className="absolute left-4 top-4 z-10 rounded-full border border-[#F59E0B]/50 bg-[#F59E0B]/20 px-3 py-1.5 text-xs font-bold text-[#F59E0B] backdrop-blur-xl">
                FEATURED VIDEO
              </div>

              {/* Video Embed */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <iframe
                  src={featuredVideo.youtubeUrl}
                  title={featuredVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#A855F7]">
                  {featuredVideo.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Calendar className="h-4 w-4 text-[#7C3AED]" />
                    <span>{new Date(featuredVideo.dateISO).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <a
                    href={featuredVideo.youtubeUrl.replace('/embed/', '/watch?v=')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-[#7C3AED]/50 bg-[#7C3AED]/20 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:border-[#F43F5E] hover:bg-[#F43F5E]/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Watch on YouTube
                  </a>
                </div>
              </div>

              {/* Border glow effect */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/media">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 rounded-xl border border-[#7C3AED]/50 bg-gradient-to-r from-[#7C3AED]/20 to-[#F43F5E]/20 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all hover:bg-[#F43F5E]/30 hover:border-[#F43F5E] hover:shadow-[0_0_30px_rgba(244,63,94,0.4)]"
            >
              <span>View All Media</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Media;
