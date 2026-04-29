"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import { events, getUpcomingEvents, getPastEvents } from "@/data/events";

export default function EventsPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const filteredEvents =
    filter === "all"
      ? events
      : filter === "upcoming"
        ? getUpcomingEvents()
        : getPastEvents();

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
              <Sparkles className="h-12 w-12 text-[#7C3AED]" />
            </motion.div>

            <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent">
                Shows & Performances
              </span>
            </h1>

            <p className="text-lg text-white/60 md:text-xl">
              Experience live performances celebrating Kurdish heritage through music, poetry, and storytelling
            </p>

            {/* Filter Tabs */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-lg px-6 py-2.5 font-semibold transition-all ${filter === "all"
                  ? "border border-[#7C3AED] bg-[#7C3AED]/20 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                  : "border border-white/20 bg-white/5 text-white/70 hover:border-[#7C3AED]/50 hover:text-white"
                  }`}
              >
                All Events
              </button>
              <button
                onClick={() => setFilter("upcoming")}
                className={`rounded-lg px-6 py-2.5 font-semibold transition-all ${filter === "upcoming"
                  ? "border border-[#7C3AED] bg-[#7C3AED]/20 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                  : "border border-white/20 bg-white/5 text-white/70 hover:border-[#7C3AED]/50 hover:text-white"
                  }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter("past")}
                className={`rounded-lg px-6 py-2.5 font-semibold transition-all ${filter === "past"
                  ? "border border-[#7C3AED] bg-[#7C3AED]/20 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                  : "border border-white/20 bg-white/5 text-white/70 hover:border-[#7C3AED]/50 hover:text-white"
                  }`}
              >
                Past Events
              </button>
            </div>
          </motion.div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-white/60">No events found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
