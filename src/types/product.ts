export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  images?: string[];
  category: Category;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  description?: string;
  availableSizes?: string[];
  stock?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
}

export interface AboutSection {
  title: string;
  content: string;
  image: string;
  link?: string;
  linkText?: string;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'bestseller' | 'featured' | 'name_asc' | 'name_desc';
}

export type ProductListType = 'featured' | 'bestseller' | 'new'; 