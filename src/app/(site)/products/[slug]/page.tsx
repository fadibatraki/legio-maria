"use client";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles, Droplet } from "lucide-react";
import { getProductBySlug } from "@/data/products";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07070B]">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        {/* Purple glow */}
        <motion.div
          className="absolute left-1/3 top-20 h-96 w-96 rounded-full bg-[#7C3AED]/25 blur-[120px]"
          animate={{
            x: [0, 40, 0],
            y: [0, 20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Gold glow */}
        <motion.div
          className="absolute right-1/3 top-40 h-96 w-96 rounded-full bg-[#F59E0B]/18 blur-[120px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
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
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 rounded-lg border border-[#7C3AED]/40 bg-[#7C3AED]/15 px-4 py-2 text-white backdrop-blur-xl transition-all hover:border-[#F43F5E]/60 hover:bg-[#F43F5E]/20"
              >
                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span>Back to Products</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Product detail */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="sticky top-32">
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-[#A855F7]/30 bg-gradient-to-br from-[#0B0B12]/90 to-[#0B0B12]/95 backdrop-blur-xl">
                  {/* Glow effects */}
                  <div className="absolute inset-0">
                    <motion.div
                      className="absolute inset-0 bg-[#7C3AED]/15"
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>

                  {/* Placeholder image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="h-48 w-48 rounded-full bg-[#7C3AED] opacity-25 blur-3xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Perfume bottle icon */}
                    <div className="absolute">
                      <svg
                        className="h-40 w-40 text-white/20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={0.5}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Details section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col"
            >
              {/* Featured badge */}
              {product.featured && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/20 px-4 py-2 backdrop-blur-xl"
                >
                  <Sparkles className="h-4 w-4 text-[#F59E0B]" />
                  <span className="text-sm font-bold text-white">Featured Product</span>
                </motion.div>
              )}

              {/* Product name */}
              <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
                {product.name}
              </h1>

              {/* Short description */}
              <p className="mb-6 text-xl text-white/70">{product.shortDescription}</p>

              {/* Price & Size */}
              <div className="mb-8 flex items-baseline gap-4">
                <span className="text-5xl font-extrabold text-[#F59E0B]">
                  ${product.price}
                </span>
                <span className="text-xl text-white/50">{product.sizeMl}ml</span>
              </div>

              {/* Full description */}
              {product.description && (
                <div className="mb-8">
                  <h3 className="mb-3 text-lg font-semibold text-white">About This Fragrance</h3>
                  <p className="leading-relaxed text-white/60">{product.description}</p>
                </div>
              )}

              {/* Notes */}
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2">
                  <Droplet className="h-5 w-5 text-[#7C3AED]" />
                  <h3 className="text-lg font-semibold text-white">Fragrance Notes</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.notes.map((note, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                      className="rounded-lg border border-[#7C3AED]/40 bg-[#7C3AED]/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl"
                    >
                      {note}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full overflow-hidden rounded-xl border border-[#7C3AED]/50 bg-[#7C3AED] px-8 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all hover:bg-[#F43F5E] hover:border-[#F43F5E] hover:shadow-[0_0_40px_rgba(244,63,94,0.5)]"
                >
                  <span className="relative z-10">Coming Soon - Pre-order</span>

                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                </motion.button>

                <p className="mt-4 text-center text-sm text-white/50">
                  Checkout functionality coming soon
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
