import { AboutSection } from './AboutSection';
import { Hero } from './Hero';
import { getAboutInfo } from '../api/getAboutInfo';
import { getBanners } from '../api/getBanners';

import { getCategories } from '@/features/categories/api/getCategories';
import { CategoryGrid } from '@/features/categories/components/CategoryGrid';
import { getProductsByType } from '@/features/products/api/getProducts';
import { ProductList } from '@/features/products/components/ProductList';


const HomePage = () => {
  // Dữ liệu mẫu cho banner
  const banners = getBanners();
  
  // Dữ liệu mẫu cho danh mục sản phẩm
  const categories = getCategories();
  
  // Dữ liệu mẫu cho sản phẩm mới
  const newProducts = getProductsByType('new');
  
  // Dữ liệu mẫu cho sản phẩm bán chạy
  const bestSellerProducts = getProductsByType('bestseller');
  
  // Dữ liệu mẫu cho phần giới thiệu
  const aboutInfo = getAboutInfo();

  return (
    <div>
      <Hero banners={banners} />
      
      <CategoryGrid categories={categories} />
      
      <ProductList 
        title="Sản phẩm mới" 
        products={newProducts} 
        viewAllUrl="/products?type=new" 
      />
      
      <ProductList 
        title="Sản phẩm bán chạy" 
        products={bestSellerProducts} 
        viewAllUrl="/products?type=bestseller" 
      />
      
      <AboutSection data={aboutInfo} />
    </div>
  );
};

export default HomePage; 