import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/stores/cartStore';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute left-2 top-2 rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-white">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="absolute left-2 top-2 rounded-md bg-amber-500 px-2 py-1 text-xs font-medium text-white">
              Best Seller
            </span>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <CardTitle className="line-clamp-1 text-base font-medium">
            {product.name}
          </CardTitle>
          <div className="mt-2 font-medium text-primary">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(product.price)}
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full"
          variant="outline"
        >
          Thêm vào giỏ
        </Button>
      </CardFooter>
    </Card>
  );
};
