import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCategories } from '../api/getCategories';

import { getProductsByCategory } from '@/features/products/api/getProducts';
import { ProductCard } from '@/features/products/components/ProductCard';
import { Product } from '@/types/product';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Tìm thông tin danh mục từ slug
    const allCategories = getCategories();
    const currentCategory = allCategories.find(cat => cat.slug === slug);
    
    if (currentCategory) {
      setCategoryName(currentCategory.name);
      // Lấy danh sách sản phẩm theo danh mục
      const categoryProducts = getProductsByCategory(currentCategory.id);
      setProducts(categoryProducts);
    }
    
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{categoryName}</h1>
          <div className="mt-2 h-1 w-20 bg-primary"></div>
        </div>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">Không có sản phẩm nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage; 