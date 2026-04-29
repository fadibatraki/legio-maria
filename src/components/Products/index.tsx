"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

const ProductsSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#07070B] py-20 md:py-[120px]">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute right-1/4 top-20 h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[120px]"
          animate={{
            x: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute left-1/4 bottom-20 h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[120px]"
          animate={{
            x: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

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
            className="mb-4 flex justify-center"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-10 w-10 text-[#7C3AED]" />
          </motion.div>

          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent">
              Signature Perfumes
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/60">
            Discover our exclusive collection of fragrances inspired by Kurdish heritage and artistry
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="mb-8 sm:mb-10 md:mb-12 grid grid-cols-1 gap-6 sm:gap-7 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-xl border border-[#7C3AED]/50 bg-[#7C3AED]/20 px-8 py-4 font-bold text-white transition-all hover:border-[#F43F5E] hover:bg-[#F43F5E]/20 hover:shadow-[0_0_30px_rgba(244,63,94,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Perfumes
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>

              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-[#F43F5E]/30 opacity-0 transition-opacity group-hover:opacity-100"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
