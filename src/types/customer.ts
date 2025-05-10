export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  lastOrderDate?: string;
  notes?: string;
  status: 'active' | 'inactive';
}

export interface CustomerFilter {
  status?: 'active' | 'inactive' | '';
  search?: string;
  sortBy?: 'name_asc' | 'name_desc' | 'date_asc' | 'date_desc' | 'orders_asc' | 'orders_desc' | 'spent_asc' | 'spent_desc';
} 