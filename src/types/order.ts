
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'delivered';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: 'cash' | 'credit_card' | 'bank_transfer';
  shippingAddress: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface OrderFilter {
  status?: OrderStatus;
  customerId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  sortBy?: 'date_asc' | 'date_desc' | 'amount_asc' | 'amount_desc';
} 