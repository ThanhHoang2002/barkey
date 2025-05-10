export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  isNew?: boolean;
  isBestSeller?: boolean;
  stock?: number;
  slug: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
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