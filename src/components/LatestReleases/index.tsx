"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Music, ArrowRight, Loader2 } from "lucide-react";
import TrackCard from "@/components/music/TrackCard";
import { Track } from "@/data/music";

const LatestReleases = () => {
  const [latestSingles, setLatestSingles] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestReleases = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/spotify/latest-releases');
        const result = await response.json();

        if (result.success) {
          setLatestSingles(result.data);
        } else {
          setError(result.error || 'Failed to load releases');
        }
      } catch (err) {
        setError('Failed to connect to Spotify');
        console.error('Error fetching latest releases:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestReleases();
  }, []);

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
            <Music className="h-12 w-12 text-[#7C3AED]" />
          </motion.div>

          <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent">
              Latest Releases
            </span>
          </h2>

          <p className="text-lg text-white/60">
            Discover my newest singles blending Kurdish heritage with contemporary music
          </p>
        </motion.div>

        {/* Singles Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-[#7C3AED]" />
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center">
            <p className="text-lg text-red-400">{error}</p>
            <p className="mt-2 text-sm text-white/60">
              Make sure you've set up your Spotify API credentials in .env.local
            </p>
          </div>
        ) : latestSingles.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg text-white/60">No releases found</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestSingles.map((single, index) => (
              <TrackCard key={single.id} track={single} index={index} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/music">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 rounded-xl border border-[#7C3AED]/50 bg-gradient-to-r from-[#7C3AED]/20 to-[#F43F5E]/20 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all hover:bg-[#F43F5E]/30 hover:border-[#F43F5E] hover:shadow-[0_0_30px_rgba(244,63,94,0.4)]"
            >
              <span>View All Music</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestReleases;
