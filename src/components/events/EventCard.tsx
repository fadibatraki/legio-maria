"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
  index?: number;
}

const EventCard = ({ event, index = 0 }: EventCardProps) => {
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
      className="group relative h-full"
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-[#A855F7]/30 bg-gradient-to-b from-[#0B0B12]/90 to-[#0B0B12]/95 backdrop-blur-xl transition-all duration-300 hover:border-[#A855F7]/50">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-[#7C3AED]/10" />
        </div>

        {/* Content */}
        <div className="relative p-4 sm:p-5 md:p-6">
          {/* Status Badge */}
          <div className="mb-3 sm:mb-4 flex items-center justify-between">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${event.status === "upcoming"
                ? "border border-[#F59E0B]/40 bg-[#F59E0B]/20 text-[#F59E0B]"
                : "border border-white/20 bg-white/5 text-white/60"
                }`}
            >
              {event.status === "upcoming" ? "Upcoming" : "Past Event"}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-bold text-white transition-colors group-hover:text-[#A855F7]">
            {event.title}
          </h3>

          {/* Event Details */}
          <div className="mb-3 sm:mb-4 space-y-2">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-white/70">
              <Calendar className="h-4 w-4 text-[#7C3AED]" />
              <span>{formatDate(event.dateISO)}</span>
              <Clock className="ml-0 sm:ml-2 h-4 w-4 text-[#7C3AED]" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
              <MapPin className="h-4 w-4 text-[#7C3AED]" />
              <span>
                {event.city}, {event.country}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-white/60">{event.venue}</div>
          </div>

          {/* CTA Button */}
          <Link href={`/events/${event.slug}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-lg border border-[#7C3AED]/50 bg-[#7C3AED]/20 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all hover:border-[#F43F5E] hover:bg-[#F43F5E]/20 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
            >
              View Details
            </motion.button>
          </Link>
        </div>

        {/* Border glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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

export default EventCard;
