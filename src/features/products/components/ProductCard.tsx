import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/stores/cartStore';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  isLoading?: boolean;
}

export const ProductCard = ({ product,isLoading }: ProductCardProps) => {
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast({
      title: 'Thêm vào giỏ hàng',
      description: 'Đã thêm sản phẩm vào giỏ hàng',      
      variant: 'success',
    });
  };
  if (isLoading) {
    return (
      <Card className="group flex flex-col items-center justify-center space-y-4 overflow-hidden p-3 transition-all hover:shadow-md">
        <Skeleton className="h-48 w-44" />
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-10 w-44" />
      </Card>
    );
  }
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            containerClassName="h-full"
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
