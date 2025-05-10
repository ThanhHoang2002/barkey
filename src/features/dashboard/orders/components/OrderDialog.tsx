import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Order, OrderStatus } from "@/types/order";

interface OrderDialogProps {
  open: boolean;
  onClose: () => void;
  order: Order;
  onUpdateStatus?: (orderId: string, status: OrderStatus) => void;
}

const OrderDialog = ({ open, onClose, order, onUpdateStatus }: OrderDialogProps) => {
  const [newStatus, setNewStatus] = useState<OrderStatus>(order.status);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleStatusChange = (status: OrderStatus) => {
    setNewStatus(status);
  };

  const handleUpdateStatus = () => {
    if (onUpdateStatus && newStatus !== order.status) {
      onUpdateStatus(order.id, newStatus);
    }
    onClose();
  };

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-indigo-100 text-indigo-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Chi tiết đơn hàng #{order.id}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-2">
          {/* Order Info */}
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium text-gray-900">Thông tin đơn hàng</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Mã đơn hàng:</span> {order.id}</p>
                <p><span className="font-medium">Ngày tạo:</span> {formatDate(order.createdAt)}</p>
                <p><span className="font-medium">Phương thức thanh toán:</span> {
                  order.paymentMethod === 'cash' ? 'Tiền mặt' :
                  order.paymentMethod === 'credit_card' ? 'Thẻ tín dụng' : 'Chuyển khoản'
                }</p>
                <p><span className="font-medium">Trạng thái:</span> 
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${getStatusBadgeClass(order.status)}`}>
                    {
                      order.status === 'pending' ? 'Chờ xử lý' :
                      order.status === 'processing' ? 'Đang xử lý' :
                      order.status === 'completed' ? 'Hoàn thành' :
                      order.status === 'delivered' ? 'Đã giao hàng' : 'Đã hủy'
                    }
                  </span>
                </p>
                {order.notes && <p><span className="font-medium">Ghi chú:</span> {order.notes}</p>}
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <h3 className="mb-2 font-medium text-gray-900">Thông tin khách hàng</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Họ tên:</span> {order.customerName}</p>
                <p><span className="font-medium">Email:</span> {order.customerEmail}</p>
                <p><span className="font-medium">Số điện thoại:</span> {order.customerPhone}</p>
                <p><span className="font-medium">Địa chỉ giao hàng:</span> {order.shippingAddress}</p>
              </div>
            </div>

            {/* Update Status */}
            {onUpdateStatus && (
              <div>
                <h3 className="mb-2 font-medium text-gray-900">Cập nhật trạng thái</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={newStatus === 'pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange('pending')}
                    className="h-8"
                  >
                    Chờ xử lý
                  </Button>
                  <Button
                    type="button"
                    variant={newStatus === 'processing' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange('processing')}
                    className="h-8"
                  >
                    Đang xử lý
                  </Button>
                  <Button
                    type="button"
                    variant={newStatus === 'completed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange('completed')}
                    className="h-8"
                  >
                    Hoàn thành
                  </Button>
                  <Button
                    type="button"
                    variant={newStatus === 'delivered' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange('delivered')}
                    className="h-8"
                  >
                    Đã giao hàng
                  </Button>
                  <Button
                    type="button"
                    variant={newStatus === 'cancelled' ? 'destructive' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange('cancelled')}
                    className="h-8"
                  >
                    Hủy đơn
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div>
            <h3 className="mb-2 font-medium text-gray-900">Sản phẩm</h3>
            <div className="max-h-60 overflow-y-auto rounded border">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Sản phẩm</th>
                    <th className="px-4 py-2 text-center">SL</th>
                    <th className="px-4 py-2 text-right">Thành tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          {item.image && (
                            <div className="h-10 w-10 overflow-hidden rounded border">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className="truncate">{item.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">{item.quantity}</td>
                      <td className="px-4 py-2 text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 font-medium">
                  <tr>
                    <td className="px-4 py-2" colSpan={2}>
                      Tổng cộng
                    </td>
                    <td className="px-4 py-2 text-right">
                      {formatCurrency(order.totalAmount)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Delivery Timeline */}
            <div className="mt-4">
              <h3 className="mb-2 font-medium text-gray-900">Lịch sử đơn hàng</h3>
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                    <div className="h-full w-0.5 bg-gray-200"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Đơn hàng đã tạo</p>
                    <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                {order.status !== 'pending' && order.updatedAt && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`h-4 w-4 rounded-full ${
                        order.status === 'cancelled' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="h-full w-0.5 bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {order.status === 'processing' ? 'Đang xử lý đơn hàng' :
                         order.status === 'completed' ? 'Đơn hàng hoàn thành' :
                         order.status === 'delivered' ? 'Đã giao hàng' : 'Đơn hàng đã hủy'}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(order.updatedAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Đóng
          </Button>
          {onUpdateStatus && newStatus !== order.status && (
            <Button type="button" onClick={handleUpdateStatus}>
              Cập nhật trạng thái
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog; 