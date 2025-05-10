/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ProductCard } from './ProductCard';
import { getAllProducts, getProductsByType } from '../api/getProducts';

import { Button } from '@/components/ui/button';
import { getCategories } from '@/features/categories/api/getCategories';
import { Category, Product, ProductFilter } from '@/types/product';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<ProductFilter>({});
  const [loading, setLoading] = useState(true);
  // Lọc theo loại sản phẩm từ URL query params
  useEffect(() => {
    const type = searchParams.get('type');
    
    if (type) {
      if (type === 'new' || type === 'bestseller') {
        setProducts(getProductsByType(type));
      } else {
        setProducts(getAllProducts());
      }
    } else {
      setProducts(getAllProducts());
    }
    
    setCategories(getCategories());
    setLoading(false);
  }, [searchParams]);

  // Xử lý lọc theo danh mục
  const handleCategoryFilter = (categoryId: string) => {
    setFilters(prev => {
      if (prev.category === categoryId) {
        const { category, ...rest } = prev;
        return rest;
      }
      return { ...prev, category: categoryId };
    });
  };

  // Xử lý lọc theo giá
  const handlePriceFilter = (minPrice?: number, maxPrice?: number) => {
    setFilters(prev => ({
      ...prev,
      minPrice,
      maxPrice
    }));
  };

  // Lọc sản phẩm dựa trên bộ lọc
  const filteredProducts = products.filter(product => {
    // Lọc theo danh mục
    if (filters.category && product.category.id !== filters.category) {
      return false;
    }
    
    // Lọc theo giá
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }
    
    return true;
  });
  return (
    <motion.div className="py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold">Tất cả sản phẩm</h1>
        
        <div className="grid gap-8 md:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6 rounded-lg bg-white p-6 shadow-sm">
              {/* Category Filter */}
              <div>
                <h3 className="mb-3 text-lg font-semibold">Danh mục sản phẩm</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        onClick={() => handleCategoryFilter(category.id)}
                        className={`w-full text-left hover:text-primary ${
                          filters.category === category.id ? 'font-semibold text-primary' : ''
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Price Filter */}
              <div>
                <h3 className="mb-3 text-lg font-semibold">Khoảng giá</h3>
                <div className="space-y-2">
                  <div>
                    <button
                      onClick={() => handlePriceFilter(undefined, 50000)}
                      className={`w-full text-left hover:text-primary ${
                        filters.maxPrice === 50000 && !filters.minPrice ? 'font-semibold text-primary' : ''
                      }`}
                    >
                      Dưới 50.000₫
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => handlePriceFilter(50000, 100000)}
                      className={`w-full text-left hover:text-primary ${
                        filters.minPrice === 50000 && filters.maxPrice === 100000 ? 'font-semibold text-primary' : ''
                      }`}
                    >
                      50.000₫ - 100.000₫
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => handlePriceFilter(100000, 200000)}
                      className={`w-full text-left hover:text-primary ${
                        filters.minPrice === 100000 && filters.maxPrice === 200000 ? 'font-semibold text-primary' : ''
                      }`}
                    >
                      100.000₫ - 200.000₫
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => handlePriceFilter(200000, undefined)}
                      className={`w-full text-left hover:text-primary ${
                        filters.minPrice === 200000 && !filters.maxPrice ? 'font-semibold text-primary' : ''
                      }`}
                    >
                      Trên 200.000₫
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Reset Filters */}
              {Object.keys(filters).length > 0 && (
                <div className="pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setFilters({})}
                    className="w-full"
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} isLoading={loading} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="mb-4 text-xl font-semibold">Không tìm thấy sản phẩm</h2>
                <p className="text-gray-600">Không có sản phẩm nào phù hợp với bộ lọc của bạn.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsPage; 