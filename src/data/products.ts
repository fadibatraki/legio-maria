import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    slug: "kurdish-nights",
    name: "Kurdish Nights",
    shortDescription: "A mystical blend inspired by moonlit Kurdish mountains",
    description:
      "Experience the enchanting essence of Kurdish heritage with notes that evoke ancient traditions and timeless landscapes. This signature scent captures the spirit of moonlit nights in the Kurdish highlands.",
    price: 120,
    sizeMl: 50,
    notes: ["Oud", "Amber", "Cedar", "Wild Roses"],
    image: "/images/products/3.png",
    featured: true,
  },
  {
    id: 2,
    slug: "stage-presence",
    name: "Stage Presence",
    shortDescription: "Bold and captivating, made for the spotlight",
    description:
      "A powerful fragrance that embodies confidence and charisma. Perfect for those moments when you need to command attention and leave a lasting impression.",
    price: 95,
    sizeMl: 50,
    notes: ["Leather", "Tobacco", "Vanilla", "Black Pepper"],
    image: "/images/products/3.png",
    featured: true,
  },
  {
    id: 3,
    slug: "poets-muse",
    name: "Poet's Muse",
    shortDescription: "Delicate notes honoring the art of storytelling",
    description:
      "Inspired by the ancient art of Kurdish storytelling and poetry. A delicate composition that whispers tales of love and longing.",
    price: 110,
    sizeMl: 75,
    notes: ["Jasmine", "Sandalwood", "Bergamot", "White Musk"],
    image: "/images/products/3.png",
    featured: true,
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getAllProductSlugs = (): string[] => {
  return products.map((product) => product.slug);
};
