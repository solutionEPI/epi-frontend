export type ProductCategory = {
  id: number;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  rating: number;
  image: string;
  in_stock: boolean;
  is_featured: boolean;
  description: string;
  created_at: string;
  updated_at: string;
};
