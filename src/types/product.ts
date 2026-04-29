export type Product = {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description?: string;
  price: number;
  sizeMl: number;
  notes: string[];
  image: string;
  featured: boolean;
};
