"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070B]">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/25 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 text-8xl font-extrabold bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="mb-6 text-3xl font-bold text-white">Product Not Found</h2>
          <p className="mb-8 text-lg text-white/60">
            The perfume you're looking for doesn't exist in our collection.
          </p>

          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 rounded-lg border border-[#7C3AED]/50 bg-gradient-to-r from-[#7C3AED]/20 to-[#F43F5E]/20 px-6 py-3 font-semibold text-white transition-all hover:bg-[#F43F5E]/30 hover:border-[#F43F5E] hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Products</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
