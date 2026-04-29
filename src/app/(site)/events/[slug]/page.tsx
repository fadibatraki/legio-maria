"use client";
import { motion } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock, Sparkles } from "lucide-react";
import { getEventBySlug } from "@/data/events";

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  if (!slug) {
    notFound();
  }

  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const formatDate = (dateISO: string) => {
    const date = new Date(dateISO);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07070B]">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute left-1/3 top-20 h-96 w-96 rounded-full bg-[#7C3AED]/25 blur-[120px]"
          animate={{
            x: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute right-1/3 top-40 h-96 w-96 rounded-full bg-[#F59E0B]/18 blur-[120px]"
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
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/events">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 rounded-lg border border-[#7C3AED]/40 bg-[#7C3AED]/15 px-4 py-2 text-white backdrop-blur-xl transition-all hover:border-[#F43F5E]/60 hover:bg-[#F43F5E]/20"
              >
                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span>Back to Events</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Event Detail */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="sticky top-32">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#A855F7]/30 bg-gradient-to-br from-[#0B0B12]/90 to-[#0B0B12]/95 backdrop-blur-xl">
                  {/* Placeholder with glow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="h-48 w-48 rounded-full bg-[#7C3AED] opacity-25 blur-3xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.25, 0.35, 0.25],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Event icon */}
                    <div className="absolute">
                      <Sparkles className="h-32 w-32 text-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Details section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Status Badge */}
              {event.status === "upcoming" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/20 px-4 py-2 backdrop-blur-xl"
                >
                  <Sparkles className="h-4 w-4 text-[#F59E0B]" />
                  <span className="text-sm font-bold text-white">Upcoming Event</span>
                </motion.div>
              )}

              {/* Title */}
              <h1 className="mb-6 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
                {event.title}
              </h1>

              {/* Event Info */}
              <div className="mb-8 space-y-4 rounded-2xl border border-[#7C3AED]/20 bg-[#0B0B12]/60 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-white">
                  <Calendar className="h-5 w-5 text-[#7C3AED]" />
                  <span className="font-semibold">{formatDate(event.dateISO)}</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Clock className="h-5 w-5 text-[#7C3AED]" />
                  <span className="font-semibold">{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <MapPin className="h-5 w-5 text-[#7C3AED]" />
                  <div>
                    <div className="font-semibold">{event.venue}</div>
                    <div className="text-sm text-white/70">
                      {event.city}, {event.country}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-white">About This Event</h2>
                <p className="text-lg leading-relaxed text-white/70">{event.description}</p>
              </div>

              {/* Highlights */}
              {event.highlights && event.highlights.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-bold text-white">Event Highlights</h3>
                  <ul className="space-y-2">
                    {event.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7C3AED]" />
                        <span className="text-white/70">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full overflow-hidden rounded-xl border border-[#7C3AED]/50 bg-[#7C3AED] px-8 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all hover:bg-[#F43F5E] hover:border-[#F43F5E] hover:shadow-[0_0_40px_rgba(244,63,94,0.5)]"
                >
                  Contact for Collaboration
                </motion.button>
              </Link>

              <p className="mt-4 text-center text-sm text-white/50">
                Interested in booking or collaborations? Get in touch with us.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
