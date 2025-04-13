import { Link } from 'react-router-dom';

import { ProductCard } from './ProductCard';

import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';

interface ProductListProps {
  title: string;
  products: Product[];
  viewAllUrl?: string;
}

export const ProductList = ({ 
  title, 
  products, 
  viewAllUrl 
}: ProductListProps) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          {viewAllUrl && (
            <Link to={viewAllUrl}>
              <Button variant="outline">Xem tất cả</Button>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
