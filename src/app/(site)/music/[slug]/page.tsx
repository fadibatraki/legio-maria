"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Disc3, Calendar, Play, Clock } from "lucide-react";
import Link from "next/link";
import { albums } from "@/data/music";
import { notFound } from "next/navigation";

const AlbumDetailPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const album = albums.find((a) => a.slug === slug);

  if (!album) {
    notFound();
  }

  const formatDate = (dateISO: string) => {
    const date = new Date(dateISO);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const totalDuration = album.tracks.reduce((acc, track) => {
    const [min, sec] = track.duration.split(":").map(Number);
    return acc + min * 60 + sec;
  }, 0);

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes} min`;
  };

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
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/music"
            className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-[#A855F7]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Music</span>
          </Link>
        </motion.div>

        {/* Album Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="grid gap-12 md:grid-cols-[400px,1fr]">
            {/* Album Cover */}
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-[#A855F7]/30 bg-gradient-to-br from-[#7C3AED]/30 to-[#F43F5E]/20 shadow-[0_0_50px_rgba(124,58,237,0.3)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="h-64 w-64 rounded-full bg-[#7C3AED]/40 blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="absolute">
                    <Disc3 className="h-48 w-48 text-white/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Album Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full border border-[#7C3AED]/50 bg-[#7C3AED]/20 px-4 py-1.5 text-sm font-bold text-[#A855F7]">
                  ALBUM
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Calendar className="h-4 w-4 text-[#7C3AED]" />
                  <span>{formatDate(album.releaseDateISO)}</span>
                </div>
              </div>

              <h1 className="mb-6 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent">
                  {album.title}
                </span>
              </h1>

              <p className="mb-8 text-lg text-white/70 leading-relaxed">
                {album.description}
              </p>

              <div className="flex items-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Disc3 className="h-5 w-5 text-[#7C3AED]" />
                  <span className="font-semibold text-white">{album.tracks.length} tracks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#7C3AED]" />
                  <span className="font-semibold text-white">{formatTotalDuration(totalDuration)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tracklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="mb-8 text-2xl font-bold text-white md:text-3xl">
            Tracklist
          </h2>

          <div className="overflow-hidden rounded-2xl border border-[#A855F7]/30 bg-gradient-to-b from-[#0B0B12]/90 to-[#0B0B12]/95 backdrop-blur-xl">
            {album.tracks.map((track, index) => (
              <div
                key={track.id}
                className="group border-b border-[#A855F7]/10 p-4 transition-colors last:border-b-0 hover:bg-[#7C3AED]/10"
              >
                <div className="flex items-center gap-4">
                  {/* Track Number */}
                  <div className="flex w-8 items-center justify-center text-white/40 group-hover:text-[#A855F7]">
                    <span className="font-bold">{index + 1}</span>
                  </div>

                  {/* Track Title */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-[#A855F7]">
                      {track.title}
                    </h3>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Clock className="h-4 w-4" />
                    <span>{track.duration}</span>
                  </div>

                  {/* Play Button */}
                  {track.youtubeUrl && (
                    <a
                      href={track.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-lg border border-[#7C3AED]/50 bg-[#7C3AED]/20 px-4 py-2 text-sm font-semibold text-white opacity-0 transition-all group-hover:opacity-100 hover:border-[#F43F5E] hover:bg-[#F43F5E]/30"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Watch
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AlbumDetailPage;
