"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Featured badge */}
      {product.featured && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
          className="absolute -right-2 -top-2 z-10"
        >
          <div className="flex items-center gap-1 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/20 px-3 py-1 backdrop-blur-xl">
            <Sparkles className="h-3 w-3 text-[#F59E0B]" />
            <span className="text-xs font-bold text-white">Featured</span>
          </div>
        </motion.div>
      )}

      {/* Card container */}
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="relative h-full overflow-hidden rounded-2xl border border-[#7C3AED]/30 bg-gradient-to-b from-[#0B0B12]/90 to-[#0B0B12]/95 backdrop-blur-xl"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-[#7C3AED]/15" />
        </div>

        {/* Image container */}
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#7C3AED]/10">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Optional overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12]/30 via-transparent to-transparent" />

          {/* Scan line effect */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#7C3AED]/60 to-transparent opacity-0 group-hover:opacity-100"
            animate={{
              top: ["0%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
        {/* Content */}
        <div className="relative p-4 sm:p-5 md:p-6">
          {/* Product name */}
          <h3 className="mb-2 text-lg sm:text-xl font-bold text-white transition-colors group-hover:text-[#A855F7]">
            {product.name}
          </h3>

          {/* Description */}
          <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-white/60">{product.shortDescription}</p>

          {/* Notes */}
          <div className="mb-3 sm:mb-4 flex flex-wrap gap-1.5 sm:gap-2">
            {product.notes.slice(0, 3).map((note, i) => (
              <span
                key={i}
                className="rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-white/70"
              >
                {note}
              </span>
            ))}
            {product.notes.length > 3 && (
              <span className="rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-white/70">
                +{product.notes.length - 3}
              </span>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold text-[#F59E0B]">${product.price}</span>
                <span className="text-xs sm:text-sm text-white/50">{product.sizeMl}ml</span>
              </div>
            </div>

            <Link href={`/products/${product.slug}`} className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group/btn w-full sm:w-auto relative overflow-hidden rounded-lg border border-[#7C3AED]/50 bg-[#7C3AED]/20 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all hover:border-[#F43F5E] hover:bg-[#F43F5E]/20 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
              >
                <span className="relative z-10">View Details</span>
                {/* Button glow */}
                <motion.div
                  className="absolute inset-0 bg-[#F43F5E]/30 opacity-0 transition-opacity group-hover/btn:opacity-100"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                />
              </motion.button>
            </Link>
          </div>
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
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
