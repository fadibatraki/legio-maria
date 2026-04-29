"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import { events } from "@/data/events";

const Events = () => {
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
      <div className="container relative z-10 mx-auto px-4 sm:px-5 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-3xl text-center"
        >
          <motion.div
            className="mb-3 sm:mb-4 flex justify-center"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-[#7C3AED]" />
          </motion.div>

          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent">
              Upcoming Shows
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/60">
            Experience live performances celebrating Kurdish heritage through music and storytelling
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link href="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 rounded-xl border border-[#7C3AED]/50 bg-gradient-to-r from-[#7C3AED]/20 to-[#F43F5E]/20 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all hover:bg-[#F43F5E]/30 hover:border-[#F43F5E] hover:shadow-[0_0_30px_rgba(244,63,94,0.4)]"
            >
              <span>View All Events</span>
              <Sparkles className="h-5 w-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
