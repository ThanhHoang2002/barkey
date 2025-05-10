import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { SimpleConfirmDialog } from '@/components/ui/simple-confirm-dialog';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/stores/cartStore';

const CartPage = () => {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity >= 1) {
      updateQuantity(id, quantity);
    }
    toast({
      title: 'Cập nhật số lượng',
      description: 'Đã cập nhật số lượng sản phẩm',
      variant: 'success',
    });
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast({
      title: 'Xóa sản phẩm',
      description: 'Đã xóa sản phẩm khỏi giỏ hàng',
      variant: 'destructive',
    });
  };

  const handleClearCart = () => {
    setIsConfirmDialogOpen(true);
  };

  const confirmClearCart = () => {
    clearCart();
    toast({
      title: 'Đã xóa giỏ hàng',
      description: 'Tất cả sản phẩm đã được xóa khỏi giỏ hàng',
      variant: 'destructive',
    });
  };

  return (
    <motion.div className="py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold">Giỏ hàng</h1>

        {items.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="mb-4 text-xl font-semibold">Giỏ hàng của bạn đang trống</h2>
            <p className="mb-8 text-gray-600">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <Link to="/products">
              <Button>Tiếp tục mua sắm</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="rounded-lg bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left">Sản phẩm</th>
                        <th className="p-4 text-center">Giá</th>
                        <th className="p-4 text-center">Số lượng</th>
                        <th className="p-4 text-center">Tổng</th>
                        <th className="p-4 text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="p-4">
                            <div className="flex items-center gap-4">
                              <Image
                                src={item.image}
                                alt={item.name}
                                className="h-16 w-16 rounded-md object-cover"
                                containerClassName="h-16 w-16 rounded-md"
                              />
                              <div>
                                <h3 className="font-medium">{item.name}</h3>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(item.price)}
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex h-10 items-center justify-center">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="flex h-full w-8 items-center justify-center border border-gray-300 hover:bg-gray-100"
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                value={item.quantity}
                                readOnly
                                className="h-full w-10 border-y border-gray-300 text-center"
                              />
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="flex h-full w-8 items-center justify-center border border-gray-300 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="p-4 text-center font-medium">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(item.price * item.quantity)}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                              aria-label="Xóa sản phẩm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between border-t p-4">
                  <Link to="/products">
                    <Button variant="outline">Tiếp tục mua sắm</Button>
                  </Link>
                  <Button variant="outline" onClick={handleClearCart}>
                    Xóa giỏ hàng
                  </Button>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Tổng giỏ hàng</h2>
                
                <div className="mb-4">
                  <div className="flex justify-between border-b py-2">
                    <span>Tạm tính</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span>Phí vận chuyển</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="mt-4 flex justify-between text-lg font-bold">
                    <span>Tổng</span>
                    <span className="text-primary">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(totalPrice)}
                    </span>
                  </div>
                </div>
                
                {/* Coupon */}
                <div className="mb-6 border-t pt-4">
                  <label htmlFor="coupon" className="mb-2 block font-medium">
                    Mã giảm giá
                  </label>
                  <div className="flex items-stretch">
                    <input
                      id="coupon"
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Nhập mã giảm giá"
                      className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                    />
                    <button className="rounded-r-md bg-gray-200 px-4 font-medium text-gray-700 hover:bg-gray-300">
                      Áp dụng
                    </button>
                  </div>
                </div>
                
                <Button className="w-full">Tiến hành thanh toán</Button>
              </div>
            </div>
          </div>
        )}
        
        <SimpleConfirmDialog 
          isOpen={isConfirmDialogOpen}
          onClose={() => setIsConfirmDialogOpen(false)}
          onConfirm={confirmClearCart}
          title="Xóa giỏ hàng"
          description="Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?"
          confirmText="Xóa tất cả"
          cancelText="Hủy"
          variant="destructive"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          }
        />
      </div>
    </motion.div>
  );
};

export default CartPage; 