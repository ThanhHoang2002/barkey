import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { getProductBySlug, getProductsByType } from '../api/getProducts';
import { ProductCard } from './ProductCard';
import { useCartStore } from '@/stores/cartStore';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const product = getProductBySlug(slug || '');
  const relatedProducts = getProductsByType('bestseller').slice(0, 4);

  useEffect(() => {
    // Cuộn lên đầu trang khi chuyển sản phẩm
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Không tìm thấy sản phẩm</h2>
          <p className="mb-8 text-gray-600">Sản phẩm này không tồn tại hoặc đã bị xóa.</p>
          <Link to="/products">
            <Button>Quay lại trang sản phẩm</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary">
            Trang chủ
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to={`/categories/${product.category.slug}`} className="text-gray-500 hover:text-primary">
            {product.category.name}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>

        {/* Product Info */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
            
            <div className="mb-6 text-2xl font-semibold text-primary">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(product.price)}
            </div>
            
            {product.description && (
              <div className="mb-6 text-gray-700">
                <p>{product.description}</p>
              </div>
            )}
            
            {/* Size Selection */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="mb-6">
                <h2 className="mb-2 text-sm font-semibold uppercase">Kích thước</h2>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:border-primary hover:bg-primary hover:text-white"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-6">
              <h2 className="mb-2 text-sm font-semibold uppercase">Số lượng</h2>
              <div className="flex h-12 w-32 items-center">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="flex h-full w-10 items-center justify-center border border-gray-300 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="h-full w-12 border-y border-gray-300 text-center"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="flex h-full w-10 items-center justify-center border border-gray-300 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleAddToCart}
                className="min-w-[200px]"
                size="lg"
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="outline"
                size="lg"
              >
                Mua ngay
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="mt-8">
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="10" x="2" y="3" rx="2" />
                    <path d="M12 13v8" />
                    <path d="M12 21H6.5a2.5 2.5 0 0 1 0-5H12" />
                    <path d="M12 21h5.5a2.5 2.5 0 0 0 0-5H12" />
                  </svg>
                  <span>Thanh toán an toàn và bảo mật</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4" />
                    <circle cx="12" cy="19" r="2" />
                    <path d="M5 11v4" />
                    <path d="M19 11v4" />
                  </svg>
                  <span>Giao hàng nhanh trong vòng 2 giờ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 