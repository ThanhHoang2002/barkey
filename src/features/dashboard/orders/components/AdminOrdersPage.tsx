import { motion } from 'framer-motion';
import { Search, Eye, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useState } from 'react';

import OrderDialog from './OrderDialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllOrders } from '@/features/dashboard/orders/api/getOrders';
import { Order, OrderStatus } from '@/types/order';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>(getAllOrders());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Lọc đơn hàng theo tìm kiếm và trạng thái
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm);
    
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  
  // Xử lý xem chi tiết đơn hàng
  const handleViewOrder = (order: Order) => {
    setCurrentOrder(order);
    setIsOrderDialogOpen(true);
  };
  
  // Xử lý cập nhật trạng thái
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus, 
            updatedAt: new Date().toISOString() 
          } 
        : order
    ));
  };
  
  // Định dạng tiền tệ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };
  
  // Định dạng ngày tháng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };
  
  // Hiển thị trạng thái đơn hàng
  const renderStatus = (status: OrderStatus) => {
    let statusText = '';
    let statusClass = '';
    
    switch (status) {
      case 'pending':
        statusText = 'Chờ xử lý';
        statusClass = 'bg-yellow-100 text-yellow-800';
        break;
      case 'processing':
        statusText = 'Đang xử lý';
        statusClass = 'bg-blue-100 text-blue-800';
        break;
      case 'completed':
        statusText = 'Hoàn thành';
        statusClass = 'bg-green-100 text-green-800';
        break;
      case 'delivered':
        statusText = 'Đã giao hàng';
        statusClass = 'bg-indigo-100 text-indigo-800';
        break;
      case 'cancelled':
        statusText = 'Đã hủy';
        statusClass = 'bg-red-100 text-red-800';
        break;
    }
    
    return (
      <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClass}`}>
        {statusText}
      </span>
    );
  };
  
  // Điều hướng phân trang
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <motion.div 
      className="container mx-auto py-8" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
      </div>
      
      {/* Thanh tìm kiếm và lọc */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm đơn hàng..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
          <Select 
            value={statusFilter} 
            onValueChange={(value) => setStatusFilter(value as OrderStatus | '')}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Tất cả trạng thái</SelectItem>
              <SelectItem value="pending">Chờ xử lý</SelectItem>
              <SelectItem value="processing">Đang xử lý</SelectItem>
              <SelectItem value="completed">Hoàn thành</SelectItem>
              <SelectItem value="delivered">Đã giao hàng</SelectItem>
              <SelectItem value="cancelled">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={String(itemsPerPage)} onValueChange={(value) => setItemsPerPage(Number(value))}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Số lượng hiển thị" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 mục</SelectItem>
              <SelectItem value="10">10 mục</SelectItem>
              <SelectItem value="20">20 mục</SelectItem>
              <SelectItem value="50">50 mục</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar size={16} />
            Lọc theo ngày
          </Button>
        </div>
      </div>
      
      {/* Bảng dữ liệu */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn hàng</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead className="text-right">Tổng tiền</TableHead>
              <TableHead className="text-center">Thanh toán</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Không tìm thấy đơn hàng nào.
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(order.totalAmount)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm capitalize">
                      {order.paymentMethod === 'cash' ? 'Tiền mặt' : 
                       order.paymentMethod === 'credit_card' ? 'Thẻ tín dụng' : 'Chuyển khoản'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {renderStatus(order.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewOrder(order)}
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Xem chi tiết</span>
                      <Eye size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Phân trang */}
      {filteredOrders.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredOrders.length)} trên {filteredOrders.length} đơn hàng
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => goToPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
      
      {/* Dialog Chi tiết đơn hàng */}
      {currentOrder && (
        <OrderDialog
          open={isOrderDialogOpen}
          onClose={() => setIsOrderDialogOpen(false)}
          order={currentOrder}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </motion.div>
  );
};

export default AdminOrdersPage; 